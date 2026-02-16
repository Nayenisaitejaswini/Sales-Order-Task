sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (MessageToast, MessageBox) {
    "use strict";

    return {
        reject: function (oContext, aSelectedContexts) {

            console.log("Reject clicked"); // Check in browser console

            if (!aSelectedContexts || aSelectedContexts.length === 0) {
                MessageToast.show("Please select a record");
                return;
            }

            var oSelectedContext = aSelectedContexts[0];
            var oData = oSelectedContext.getObject();
            var oModel = oSelectedContext.getModel();

            // Confirmation Dialog
            MessageBox.confirm(
                "Do you want to reject Sales Order: " + oData.SalesOrder + "?",
                {
                    title: "Confirm Rejection",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,

                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {

                            var payload = {
                                Salesorder: oData.SalesOrder,
                                ID: oData.ID,
                                Status: oData.Status
                            };

                            $.ajax({
                                url: "/odata/v4/sales-order/reject",
                                type: "POST",
                                contentType: "application/json",
                                data: JSON.stringify(payload),

                                success: function () {
                                    MessageToast.show("Sales Order Rejected");
                                    oModel.refresh();
                                },

                                error: function (err) {
                                    console.error(err);
                                    MessageToast.show("Rejection failed");
                                }
                            });
                        }
                    }
                }
            );
        }
    };
});

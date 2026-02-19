sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (MessageToast, MessageBox) {
    'use strict';

    return {
        Number: function (oContext, aSelectedContexts) {

            const oSelectedContext = aSelectedContexts[0];

            if (!oSelectedContext) {
                MessageToast.show("Please select a record");
                return;
            }

            const oData = oSelectedContext.getObject();
            const oModel = oSelectedContext.getModel();

            // Confirmation Dialog
            MessageBox.confirm(
                "Do you want to number : " + oData.SalesOrder + "?",
                {
                    title: "Confirm Approval",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,

                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {

                            const data = {
                                Salesorder: oData.SalesOrder,
                                ID: oData.ID,
                                Status: oData.Status
                            };

                            $.ajax({
                                url: '/odata/v4/sales-order/Number',
                                method: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(data),
                                success: function (response) {
                                    MessageToast.show("Sales items Approved");
                                    oSelectedContext.refresh();
                                    oModel.refresh();
                                },
                                error: function () {
                                    MessageToast.show("Approval failed");
                                }
                            });
                        }
                    }
                }
            );
        }
    };
});

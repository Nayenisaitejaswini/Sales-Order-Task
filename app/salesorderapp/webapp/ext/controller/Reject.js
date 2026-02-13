sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
       reject: function(oContext, aSelectedContexts) {

        console.log("Selected Contexts:", aSelectedContexts);

        const oSelectedContext = aSelectedContexts[0];

        if (!oSelectedContext) {
            MessageToast.show("Please select a record");
            return;
        }

        const oData = oSelectedContext.getObject();
        const oModel=oSelectedContext.getModel();
        console.log("Data:", oData);

        MessageToast.show("reject clicked for SalesOrder: " + oData.SalesOrder);
        try{
            const data={
                Salesorder:oData.SalesOrder,
                ID:oData.ID,
                Status:oData.Status
            }
             $.ajax({
                url: '/odata/v4/sales-order/reject',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (response) {
                    console.log("response is",response);
                    oSelectedContext.refresh();
                    oModel.refresh();

                }
            });
        }catch(error){

        }

    }
};

});
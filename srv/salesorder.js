const cds = require('@sap/cds');
const { SELECT, expand, UPSERT } = require('@sap/cds/lib/ql/cds-ql');
const { UUID, UUIDV4 } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = cds.service.impl(async function () {

    const remote = await cds.connect.to('API_SALES_ORDER_SRV');
    const restapi = await cds.connect.to('API_SALES_ORDER_SRV');
    const {Salesorder} = this.entities; 

    this.on('READ', 'Salesorder', async req => {
        console.log("rEAD FILE");
       const res = await remote.run(
        SELECT.from('A_SalesOrder').columns(
            'SalesOrder',
            'SalesOrderType',
            'SalesOrderTypeInternalCode',
            'SalesOrganization',
            'DistributionChannel',
            'SoldToParty',
            'SalesOrderDate',
            {ref:["to_Item"], expand:["*"]}
        )
    );
    //console.log("res is",res);

    const Saleorder_entries=[], saleorderItem_entries=[];
    res.forEach(entry => {
        Saleorder_entries.push({
            ID: uuidv4(),
            SalesOrder:entry.SalesOrder,
            SalesOrderType:entry.SalesOrderType,
            SalesOrderTypeInternalCode:entry.SalesOrderTypeInternalCode,
            SalesOrganization:entry.SalesOrganization,
            DistributionChannel:entry.DistributionChannel,
            SoldToParty:entry.SoldToParty,
            SalesOrderDate:entry.SalesOrderDate
        });

        if (entry.to_Item?.length) {
        entry.to_Item.forEach(items => {
            saleorderItem_entries.push({
                ID: uuidv4(),
                up__ID: uuidv4(),
                SalesOrderItem:items.SalesOrderItem,
                HigherLevelItem: items.HigherLevelItem,
                SalesOrderItemCategory: items.SalesOrderItemCategory,
                SalesOrderItemText: items.SalesOrderItemText,
                PurchaseOrderByCustomer: items.PurchaseOrderByCustomer,
                PurchaseOrderByShipToParty:items.PurchaseOrderByShipToParty,
                UnderlyingPurchaseOrderItem: items.UnderlyingPurchaseOrderItem,
                Material: items.Material
            })

        })    
    }
    res.$count=res.length;
    })

    console.log("item enttries are",saleorderItem_entries); 
   
    if (Saleorder_entries.length) {

        const res1= await cds.run(UPSERT.into("com.satinfotech.Konnekt.salesorder").entries(Saleorder_entries));
        console.log("res1 is",res1);
    }
    if (saleorderItem_entries.length) {
        const res2=await cds.run(UPSERT.into("com.satinfotech.Konnekt.salesorder_salesorderitems").entries(saleorderItem_entries));
        console.log("res2 is",res2);
    }
        const result = await cds.run(req.query);
    return result;
    });

this.on('UPDATE', 'Salesorder', async req => {

    const salesOrder = req.data.SalesOrder;
    console.log("req",req.data);

    const updateData = {
        SalesOrderType: req.data.SalesOrderType,
        SalesOrderTypeInternalCode: req.data.SalesOrderTypeInternalCode,
        SalesOrganization: req.data.SalesOrganization,
        DistributionChannel: req.data.DistributionChannel,
        SoldToParty: req.data.SoldToParty,
        SalesorderItems: [
    {
      ID: req.data.ID,
      up__ID: req.data.up__ID,
      Material: req.data.Material,
      SalesOrderItem: req.data.SalesOrderItem,
      HigherLevelItem: req.data.HigherLevelItem,
      SalesOrderItemText: req.data.SalesOrderItemText,
      SalesOrderItemCategory: req.data.SalesOrderItemCategory,
      PurchaseOrderByCustomer: req.data.PurchaseOrderByCustomer,
      PurchaseOrderByShipToParty: req.data.PurchaseOrderByShipToParty,
      UnderlyingPurchaseOrderItem: req.data.UnderlyingPurchaseOrderItem
    }
  ],

    };

    await remote.send({
        method: 'PATCH',
        path: `/A_SalesOrder('${salesOrder}')`,
        headers: {
            'If-Match': '*'
        },
        data: updateData
    });

    return req.data;
});
this.on('approve',async req => {
    console.log("approve is",req);
    const {ID}= req.data;
    await cds.run(
        cds.update(Salesorder)
        .set({Status:'APPROVED'})
        .where({ID : ID})
    )
    return "status approved"
});
this.on('reject',async req => {
    console.log("result is",req);
    const {ID}=req.data;
    const {reason}= req.data;
    await cds.run(
        cds.update(Salesorder)
        .set({Status:"REJECTED",Rejectreason:reason})
        .where({ID})
    );
    return "status rejected"

});

});

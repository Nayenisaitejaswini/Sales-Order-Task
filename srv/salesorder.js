const cds = require('@sap/cds');
const { SELECT, expand, INSERT } = require('@sap/cds/lib/ql/cds-ql');
const { UUID, UUIDV4 } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const js2xmlparser = require("js2xmlparser");



module.exports = cds.service.impl(async function () {

    const remote = await cds.connect.to('API_SALES_ORDER_SRV');
    const restapi = await cds.connect.to('API_SALES_ORDER_SRV');
    const {Salesorder,SalesNumber} = this.entities; 

    this.before("READ", "SalesNumber", async (req) => {
    const { SalesNumber } = this.entities;

    try {
      
      const results = await remote.run(SELECT.from('A_SalesOrder'));

      if (results.length > 0) {
        
        const upsertEntries = results.map((entry) => ({
          SalesOrder: entry.SalesOrder,
          SalesOrderType: entry.SalesOrderType
          
        }));

        // Upsert data into Prodord
        const insertcqn = UPSERT.into(SalesNumber).entries(upsertEntries);
        await cds.run(insertcqn);
      }
    } catch (error) {
      console.error("Error during SalesNumber processing:", error);
    }
  });

    this.on("READ", "salesitems", async (req) => {
    try {
      console.log("Request Data:", req.data);

    
    const SalesorderID = req.data?.SalesOrder;
    console.log("Extracted SalesorderID:", SalesorderID);

    if (!SalesorderID) {
      return req.reject(400, "SalesorderID is required to fetch components.");
    }

    
    const res = await remote.run(
      SELECT.from('A_SalesOrderItem')
        .where({ SalesOrder: SalesorderID })
    );
    console.log(res);
      return res;
    } catch (error) {
      console.error("Error during SalesOrder READ:", error);
      return [];
    }
  });







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
    var cid;
    const Saleorder_entries=[], saleorderItem_entries=[];
    res.forEach(entry => {
        cid = uuidv4()
        Saleorder_entries.push({
            ID: cid,
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
                up__ID: cid,
                SalesOrder:items.SalesOrder,
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

    // console.log("item enttries are",saleorderItem_entries); 
   
    if (Saleorder_entries.length) {

        const res1= await cds.run(INSERT.into("com.satinfotech.Konnekt.Salesorder").entries(Saleorder_entries));
        // console.log("res1 is",res1);
    }
    if (saleorderItem_entries.length) {
        const res2=await cds.run(INSERT.into("com.satinfotech.Konnekt.Salesorder.SalesorderItems").entries(saleorderItem_entries));
        // console.log("res2 is",res2);
    }
        const result = await cds.run(req.query);
    return result;
    });

this.on('UPDATE', 'Salesorder', async req => {

    const salesOrder = req.data.SalesOrder;
    // console.log("req",req.data);

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
      SalesOrder:req.data.SalesOrder,
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
this.on('rejects',async req => {
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
this.on('getData', async req => {

    const { ID } = req.data;
    console.log("GetData:", ID);
    try{
        const Salesorder= await cds.run (
            SELECT.from("Salesorder").where({ID:ID})
        );
        console.log("Saleorder for printing",Salesorder);

        if(!Salesorder) {
            return req.error(404, 'Salesorder ${ID} not found');
        }
        console.log("items for printing");

        const SalesorderItems= await cds.run (
            SELECT.from("Salesorder.SalesorderItems").where({SalesOrder:'23'})
        );
        console.log("SaleorderItems for printing",SalesorderItems);

        if(!SalesorderItems) {
            return req.error(404, 'SalesorderItems ${ID} not found');
        }

        const headerClean={
        SalesOrder:Salesorder.SalesOrder,
        SalesOrderType:Salesorder.SalesOrderType,
        SalesOrderTypeInternalCode:Salesorder.SalesOrderTypeInternalCode,
        SalesOrganization:Salesorder.SalesOrganization,
        DistributionChannel:Salesorder.DistributionChannel,
        SoldToParty:Salesorder.SoldToParty,
        SalesOrderDate:Salesorder.SalesOrderDate,
        Status:Salesorder.Status==="REJECTED" ? "DRAFT": ""
    };
    headerClean.Items= {
        Item:[]
    };

    for (const item of SalesorderItems) {

        headerClean.Items.Item.push({
            SalesOrder:item.SalesOrder,
            Material: item.Material,
            SalesOrderItem: item.SalesOrderItem,
            SalesOrderItemText: item.SalesOrderItemText,
            HigherLevelItem: item.HigherLevelItem,
            PurchaseOrderByCustomer: item.PurchaseOrderByCustomer,
            SalesOrderItemCategory: item.SalesOrderItemCategory,
            UnderlyingPurchaseOrderItem: item.UnderlyingPurchaseOrderItem,
            PurchaseOrderByShipToParty: item.PurchaseOrderByShipToParty,
        });
    }

    const combined={
        Salesorder: {
            Header:headerClean
        }
    };

    console.log(" combined JSON ready for XML",JSON.stringify(combined,null,2));
    const xmlData=js2xmlparser.parse("Salesorder",combined);
    console.log("Generated XML Output:\n",xmlData);

    }catch{
        
    }
    

    return "Data fetched successfully";
});



this.on('Number', async req => {

    const SalesorderNum = req.data.Salesorder;
    console.log("Number:", SalesorderNum);

    // Local DB - Header
    const Salesorder = await cds.run(
        SELECT.one.from(SalesNumber).where({ SalesOrder: SalesorderNum })
    );

    if (!Salesorder) {
        return req.error(404, `Salesorder ${SalesorderNum} not found`);
    }

    console.log("Header:", Salesorder);

    // Connect to External S4
    const remote = await cds.connect.to('API_SALES_ORDER_SRV');

    // Fetch Items from external service
    const SalesorderItems = await remote.run(
        SELECT.from('A_SalesOrderItem')
            .where({ SalesOrder: SalesorderNum })
    );

    console.log("Items from S4:", SalesorderItems);

    if (!SalesorderItems || SalesorderItems.length === 0) {
        return req.error(404, `SalesorderItems for ${SalesorderNum} not found`);
    }

    // Prepare XML structure
    const headerClean = {
        SalesOrder: Salesorder.SalesOrder,
        SalesOrderType: Salesorder.SalesOrderType,
        Status: Salesorder.Status === "REJECTED" ? "DRAFT" : "",
        Items: { Item: [] }
    };

    for (const item of SalesorderItems) {
        headerClean.Items.Item.push({
            SalesOrder: item.SalesOrder,
            SalesOrderItem: item.SalesOrderItem
        });
    }

    const combined = {
        Salesorder: {
            Header: headerClean
        }
    };

    const xmlData = js2xmlparser.parse("Salesorder", combined);
    console.log(xmlData);

    return xmlData;
});










});

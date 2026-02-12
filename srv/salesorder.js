const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');
const { UUID } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = cds.service.impl(async function () {

    const remote = await cds.connect.to('API_SALES_ORDER_SRV');
    const restapi = await cds.connect.to('API_SALES_ORDER_SRV');
    const {Salesorder} = this.entities; 

    this.before('READ', 'Salesorder', async req => {
        console.log("rEAD FILE");
       const res = await remote.run(
        SELECT.from('A_SalesOrder').columns(
            'SalesOrder',
            'SalesOrderType',
            'SalesOrderTypeInternalCode',
            'SalesOrganization',
            'DistributionChannel',
            'SoldToParty',
            'SalesOrderDate'
        )
    );

    console.log("res : ",res);

    const new_entries = res.map(entry => ({
        ID: uuidv4(),
        SalesOrder: entry.SalesOrder,
        SalesOrderType: entry.SalesOrderType,
        SalesOrderTypeInternalCode: entry.SalesOrderTypeInternalCode,
        SalesOrganization: entry.SalesOrganization,
        DistributionChannel: entry.DistributionChannel,
        SoldToParty: entry.SoldToParty,
        SalesOrderDate: entry.SalesOrderDate
    }));
    console.log("Fetched entries:", new_entries.length);
     if (new_entries.length){
       const res2= await cds.run(INSERT.into(Salesorder).entries(new_entries));
       console.log(res2);
    }
    return new_entries;  
    });

this.on('UPDATE', 'Salesorder', async req => {

    const salesOrder = req.data.SalesOrder;

    const updateData = {
        SalesOrderType: req.data.SalesOrderType,
        SalesOrderTypeInternalCode: req.data.SalesOrderTypeInternalCode,
        SalesOrganization: req.data.SalesOrganization,
        DistributionChannel: req.data.DistributionChannel,
        SoldToParty: req.data.SoldToParty
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

});


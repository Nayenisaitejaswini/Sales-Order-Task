namespace com.satinfotech.Konnekt;
using {cuid, managed} from '@sap/cds/common';

entity Salesorder: managed, cuid {
    key ID : UUID;
    @title: 'Status'
    Status: String(15);
    @title:'SalesOrder'
    SalesOrder: String(10);
    @title: 'SalesOrderType'
    SalesOrderType: String(40);
    @title: 'SalesOrderTypeInternalCode'
    SalesOrderTypeInternalCode: String(40);
    @title: 'SalesOrganization'
    SalesOrganization: String(40);
    @title: 'DistributionChannel'
    DistributionChannel: String(40);
    @title: 'SoldToParty'
    SoldToParty: String(20);
    @title: 'SalesOrderDate'
    SalesOrderDate: String(15);
    
}
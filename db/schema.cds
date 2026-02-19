namespace com.satinfotech.Konnekt;
using {cuid, managed} from '@sap/cds/common';
using { API_SALES_ORDER_SRV as external } from '../srv/external/API_SALES_ORDER_SRV';

entity salesitems as projection on external.A_SalesOrderItem{
    *
}
entity SalesNumber:managed {
    
    @title: 'Status'
    Status: String(15);
    @title:'SalesOrder'
    key SalesOrder: String(10);
    @title: 'SalesOrderType'
    SalesOrderType: String(40);

    salesitems:Composition of many salesitems on salesitems.SalesOrder=$self.SalesOrder
}
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

    SalesorderItems:Composition of many{
        key ID:UUID @UI.Hidden;
        SalesOrder:String;
        SalesOrderItem:String;
        HigherLevelItem: String;
        SalesOrderItemCategory: String;
        SalesOrderItemText: String;
        PurchaseOrderByCustomer: String;
        PurchaseOrderByShipToParty: String;
        UnderlyingPurchaseOrderItem: String;
        Material: String;

    }
    
}
using {SalesOrder as SalesOrder} from './salesorder';


annotate SalesOrder.SalesNumber with @(
    UI.LineItem: [
        {
            $Type:'UI.DataField',
            Label : 'SalesOrderType',
            Value: SalesOrderType
        },
        {
            $Type:'UI.DataField',
            Label : 'Sales Order',
            Value: SalesOrder
        }
    ],
     UI.FieldGroup #SalesOrder2 : {
        $Type : 'UI.FieldGroupType',
        Data : [
             {
            $Type:'UI.DataField',
            Value: Status
        },
        {
            $Type:'UI.DataField',
            Value: SalesOrder
        }
        ]}
);

annotate SalesOrder.SalesNumber with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'SalesOrderGeneral',
            Label : 'General Information',
            Target : '@UI.FieldGroup#SalesOrder2'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ItemsFacet',
            Label : 'Sales Order Items',
            Target : 'salesitems/@UI.LineItem'
        }
    ]
);
annotate SalesOrder.salesitems with @(
    UI.LineItem: [
        
        {
            $Type:'UI.DataField',
            Label : 'Sales Order',
            Value: SalesOrder
        },
          {
            $Type:'UI.DataField',
            Label : 'Sales Order Item',
            Value: SalesOrderItem
        },
    ]
);

annotate SalesOrder with @(
    UI.LineItem: [
        {
            $Type:'UI.DataField',
            Label : 'Status',
            Value: Status
        },
        {
            $Type:'UI.DataField',
            Label : 'Sales Order',
            Value: SalesOrder
        },
         {
            $Type:'UI.DataField',
            Label : 'SalesOrderType',
            Value: SalesOrderType
        },
         {
            $Type:'UI.DataField',
            Label : 'SalesOrderTypeInternalCode',
            Value: SalesOrderTypeInternalCode
        },
         {
            $Type:'UI.DataField',
            Label : 'DistributionChannel',
            Value: DistributionChannel
        },
        {
            $Type:'UI.DataField',
            Label : 'SalesOrganization',
            Value: SalesOrganization
        },
        {
            $Type:'UI.DataField',
            Label : 'SoldToParty',
            Value: SoldToParty
        },
        {
            $Type:'UI.DataField',
            Label : 'SalesOrderDate',
            Value: SalesOrderDate
        },
        
    ]
);
annotate SalesOrder.Salesorder.SalesorderItems with @(
    UI.LineItem: [
        {
            $Type:'UI.DataField',
            Label : 'SalesOrderItem',
            Value: SalesOrderItem
        },
        {
            $Type:'UI.DataField',
            Label : 'HigherLevelItem',
            Value: HigherLevelItem
        },
        {
            $Type:'UI.DataField',
            Label : 'SalesOrderItemCategory',
            Value: SalesOrderItemCategory
        },
        {
            $Type:'UI.DataField',
            Label : 'SalesOrderItemText',
            Value: SalesOrderItemText
        },
         {
            $Type:'UI.DataField',
            Label : 'PurchaseOrderByCustome',
            Value: PurchaseOrderByCustomer
        },
         {
            $Type:'UI.DataField',
            Label : 'PurchaseOrderByShipToParty',
            Value: PurchaseOrderByShipToParty
        },
        {
        
            $Type:'UI.DataField',
            Label : 'Material',
            Value: Material
        },
    ]
);
annotate SalesOrder.Salesorder.SalesorderItems with @(
    UI.FieldGroup #SalesorderItems : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
            $Type:'UI.DataField',
            Label : 'SalesOrderItem',
            Value: SalesOrderItem
        },
             {
            $Type:'UI.DataField',
            Value: HigherLevelItem
        },
        {
            $Type:'UI.DataField',
            Value: SalesOrderItemCategory
        },
        {
            $Type:'UI.DataField',
            Value: SalesOrderItemText
        },
         {
            $Type:'UI.DataField',
            Value: PurchaseOrderByCustomer
        },
         {
            $Type:'UI.DataField',
            Value: PurchaseOrderByShipToParty
        },
        {
        
            $Type:'UI.DataField',
            Value: Material
        },
    ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet2',
            Label : 'General Information',
            Target : '@UI.FieldGroup#SalesorderItems',
       },
    ], 
);


annotate SalesOrder with @(
    UI.FieldGroup #SalesOrder : {
        $Type : 'UI.FieldGroupType',
        Data : [
             {
            $Type:'UI.DataField',
            Value: Status
        },
        {
            $Type:'UI.DataField',
            Value: SalesOrder
        },
         {
            $Type:'UI.DataField',
            Value: SalesOrderType
        },
        {
            $Type:'UI.DataField',
            Value: SalesOrderTypeInternalCode
        },
         {
            $Type:'UI.DataField',
            Value: DistributionChannel
        },
        {
            $Type:'UI.DataField',
            Value: SalesOrganization
        },
        {
            $Type:'UI.DataField',
            Value: SoldToParty
        },
        {
            $Type:'UI.DataField',
            Value: SalesOrderDate
        },
    ]
    },
    
);

annotate SalesOrder with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'SalesOrderGeneral',
            Label : 'General Information',
            Target : '@UI.FieldGroup#SalesOrder'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ItemsFacet',
            Label : 'Sales Order Items',
            Target : 'SalesorderItems/@UI.LineItem'
        }
    ]
);

annotate SalesOrder with @(
    Capabilities.UpdateRestrictions : {
        Updatable : true
    }
);



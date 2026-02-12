using {SalesOrder.Salesorder as SalesOrder} from './salesorder';

annotate SalesOrder with @(
    UI.LineItem: [
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

annotate SalesOrder with @(
    UI.FieldGroup #SalesOrder : {
        $Type : 'UI.FieldGroupType',
        Data : [
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
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#SalesOrder',
        },
    ], 
);
annotate SalesOrder with @(
    Capabilities.UpdateRestrictions : {
        Updatable : true
    }
);




using {com.satinfotech.Konnekt as Slorder} from '../db/schema';
using { API_SALES_ORDER_SRV as external } from './external/API_SALES_ORDER_SRV';

service SalesOrder{
    @odata.draft.enabled
    entity Salesorder as projection on Slorder.Salesorder;

    action approve(Salesorder:String,ID:String,Status:String)   returns String;
    action rejects(Salesorder:String,ID:String,Status:String)   returns String;
    action getData(Salesorder:String,ID:String,Status:String)   returns String;
    action Number(Salesorder:String,ID:String,Status:String)   returns String;
    entity salesitems as projection on Slorder.salesitems{
        *
    };
    entity SalesNumber as projection on Slorder.SalesNumber{
        *
    };

}









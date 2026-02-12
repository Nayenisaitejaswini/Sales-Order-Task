
using {com.satinfotech.Konnekt as Slorder} from '../db/schema';
using { API_SALES_ORDER_SRV as external } from './external/API_SALES_ORDER_SRV';

service SalesOrder{
     @odata.draft.enabled
    entity Salesorder as projection on Slorder.Salesorder;
}





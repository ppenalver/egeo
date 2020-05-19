import { StTableHeader } from '../';


export interface StDynamicTableHeader extends StTableHeader {
   reference: string;
}

export interface StDynamicTableUISpecification {
   sortable?: boolean;
   styles?: {
      [key: string]: string;
   };
   fk?: {
      table: string;
      field: string;
   };
   group_field?: {
      name: string;
   };
   templateRef?: string;
}


export interface StDynamicTableUserInterface {
   [key: string]: StDynamicTableUISpecification;
}

import { ApplicationInterface } from 'interfaces/application';
import { GetQueryInterface } from 'interfaces';

export interface FundingInterface {
  id?: string;
  amount: number;
  funding_date: any;
  funding_status: string;
  application_id: string;
  created_at?: any;
  updated_at?: any;

  application?: ApplicationInterface;
  _count?: {};
}

export interface FundingGetQueryInterface extends GetQueryInterface {
  id?: string;
  funding_status?: string;
  application_id?: string;
}

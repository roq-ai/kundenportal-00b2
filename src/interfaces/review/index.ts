import { ApplicationInterface } from 'interfaces/application';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  rating: number;
  comment?: string;
  review_date: any;
  application_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  application?: ApplicationInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  comment?: string;
  application_id?: string;
  user_id?: string;
}

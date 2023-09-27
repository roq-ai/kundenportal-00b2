import { FundingInterface } from 'interfaces/funding';
import { ReviewInterface } from 'interfaces/review';
import { ProgramInterface } from 'interfaces/program';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  status: string;
  submission_date: any;
  approval_date?: any;
  rejection_date?: any;
  program_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  funding?: FundingInterface[];
  review?: ReviewInterface[];
  program?: ProgramInterface;
  user?: UserInterface;
  _count?: {
    funding?: number;
    review?: number;
  };
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  program_id?: string;
  user_id?: string;
}

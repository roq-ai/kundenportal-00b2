import queryString from 'query-string';
import { FundingInterface, FundingGetQueryInterface } from 'interfaces/funding';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFundings = async (query?: FundingGetQueryInterface): Promise<PaginatedInterface<FundingInterface>> => {
  return fetcher('/api/fundings', {}, query);
};

export const createFunding = async (funding: FundingInterface) => {
  return fetcher('/api/fundings', { method: 'POST', body: JSON.stringify(funding) });
};

export const updateFundingById = async (id: string, funding: FundingInterface) => {
  return fetcher(`/api/fundings/${id}`, { method: 'PUT', body: JSON.stringify(funding) });
};

export const getFundingById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/fundings/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteFundingById = async (id: string) => {
  return fetcher(`/api/fundings/${id}`, { method: 'DELETE' });
};

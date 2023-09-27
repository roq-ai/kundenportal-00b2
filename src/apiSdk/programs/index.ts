import queryString from 'query-string';
import { ProgramInterface, ProgramGetQueryInterface } from 'interfaces/program';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPrograms = async (query?: ProgramGetQueryInterface): Promise<PaginatedInterface<ProgramInterface>> => {
  return fetcher('/api/programs', {}, query);
};

export const createProgram = async (program: ProgramInterface) => {
  return fetcher('/api/programs', { method: 'POST', body: JSON.stringify(program) });
};

export const updateProgramById = async (id: string, program: ProgramInterface) => {
  return fetcher(`/api/programs/${id}`, { method: 'PUT', body: JSON.stringify(program) });
};

export const getProgramById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/programs/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteProgramById = async (id: string) => {
  return fetcher(`/api/programs/${id}`, { method: 'DELETE' });
};

import * as yup from 'yup';

export const programValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  status: yup.string().required(),
  company_id: yup.string().nullable().required(),
});

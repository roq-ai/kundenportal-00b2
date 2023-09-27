import * as yup from 'yup';

export const fundingValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  funding_date: yup.date().required(),
  funding_status: yup.string().required(),
  application_id: yup.string().nullable().required(),
});

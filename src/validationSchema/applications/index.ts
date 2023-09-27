import * as yup from 'yup';

export const applicationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  submission_date: yup.date().required(),
  approval_date: yup.date().nullable(),
  rejection_date: yup.date().nullable(),
  program_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});

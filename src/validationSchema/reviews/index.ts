import * as yup from 'yup';

export const reviewValidationSchema = yup.object().shape({
  rating: yup.number().integer().required(),
  comment: yup.string().nullable(),
  review_date: yup.date().required(),
  application_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});

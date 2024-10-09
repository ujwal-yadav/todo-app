import * as Yup from 'yup';

export const todoFormValidation = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(50, 'Title must not exceed 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters')
    .max(300, 'Description must not exceed 300 characters'),
  deadline: Yup.date()
    .required('Deadline is required')
    .min(new Date(), 'Deadline must be in the future')
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'Deadline cannot be more than 1 year from now'
    ),
  newSubtask: Yup.string()
    .trim()
    .min(3, 'Subtask title must be at least 3 characters')
    .max(50, 'Subtask title must not exceed 50 characters')
    .notRequired(),
});

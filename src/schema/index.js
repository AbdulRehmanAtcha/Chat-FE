import * as Yup from 'yup'

export const registerSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(5, "Password must contain at least 5 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/,
      "Password must contain at least one uppercase letter, one number, and one special character"),

  conPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(5, "Password must contain at least 5 characters")
});

export const profileSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  color: Yup.number().default(0).oneOf([0, 1, 2, 3])
});

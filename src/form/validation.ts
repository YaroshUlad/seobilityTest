import { FormikErrorType } from './Form';

export type ValuesType = {
  fullName: string;
  email: string;
  phone: string;
  birthDate: Date;
  message: string;
};

const minLength = 10;
const maxLength = 300;

export const validation = (values: ValuesType): FormikErrorType => {
  const errors: FormikErrorType = {};

  if (!values.fullName) {
    errors.fullName = 'Required';
  } else if (/^( )/i.test(values.fullName)) {
    errors.fullName = 'do not start with empty character';
  } else if (/( )$/i.test(values.fullName)) {
    errors.fullName = 'do not end with empty character';
  } else if (!/^([a-zA-Z]{3,30} ([a-zA-Z]){3,30})$/i.test(values.fullName)) {
    errors.fullName =
      'First and last name should includes 3-30 characters with only one space';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  } else if (
    !/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d[- .]?\d\d$/.test(
      values.phone,
    )
  ) {
    errors.phone = 'incorrect enter';
  }
  if (!values.birthDate) {
    errors.birthDate = 'Required';
  }
  if (!values.message) {
    errors.message = 'Required';
  } else if (values.message.length < minLength) {
    errors.message = 'too short';
  } else if (values.message.length > maxLength) {
    errors.message = 'too long';
  }

  return errors;
};

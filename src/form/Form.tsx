import React, { ReactElement, useEffect } from 'react';

import { Button, FormControl, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { createFeedbackMessage } from '../app/app-reducer';
import { useAppDispatch, useAppSelector } from '../app/store';

import styles from './Form.module.css';
import { validation } from './validation';

export type FormikErrorType = {
  fullName?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  message?: string;
};

export const Form = (): ReactElement => {
  const isLoading = useAppSelector(state => state.app.isLoading);
  const reset = useAppSelector(state => state.app.reset);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '+7 ',
      birthDate: new Date(),
      message: '',
    },
    validate: validation,
    onSubmit: () => {
      dispatch(createFeedbackMessage());
    },
  });

  useEffect(() => {
    if (reset) {
      formik.resetForm();
    }
  }, [reset, formik]);

  return (
    <Paper elevation={12} className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl className={styles.wrapperDiv}>
          <TextField
            type="text"
            label="Full name"
            margin="normal"
            name="fullName"
            className={styles.wrapperDiv}
            onBlur={formik.handleBlur}
            onChange={e =>
              formik.setFieldValue('fullName', e.currentTarget.value.toUpperCase(), true)
            }
            error={formik.touched.fullName && !!formik.errors.fullName}
            helperText={formik.touched.fullName ? formik.errors.fullName : ''}
            value={formik.values.fullName}
          />

          <TextField
            type="text"
            name="email"
            margin="normal"
            label="Email"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email ? formik.errors.email : ''}
            onChange={formik.handleChange}
          />

          <MuiPhoneNumber
            name="phone"
            margin="normal"
            variant="outlined"
            label="Phone number"
            defaultCountry="ru"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={e => formik.setFieldValue('phone', e, true)}
            helperText={formik.touched.phone ? formik.errors.phone : ''}
            error={formik.touched.phone && !!formik.errors.phone}
          />

          <DatePicker
            selected={formik.values.birthDate}
            dateFormat="dd MMMM yyyy"
            placeholderText="Date of birth"
            className={styles.wrapperDiv}
            maxDate={new Date()}
            showYearDropdown
            showMonthDropdown
            customInput={<TextField label="Date of birth" margin="normal" />}
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            onChange={e => formik.setFieldValue('birthDate', e, true)}
          />

          <TextField
            type="text"
            label="Your message"
            margin="normal"
            name="message"
            multiline
            minRows={4}
            maxRows={6}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.message && !!formik.errors.message}
            helperText={formik.touched.message ? formik.errors.message : ''}
            value={formik.values.message}
          />

          <Button variant="contained" disabled={isLoading} type="submit">
            SENT
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
};

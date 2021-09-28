import React from 'react';

import { TextField, Button } from '@material-ui/core';
import { useFormik, FormikConfig } from 'formik';
import * as yup from 'yup';

export type FormValues = {
  title: string;
  description: string;
}

const validationSchema = yup.object({
  title: yup.string().required('Please provide a title'),
  description: yup.string(),
});

type Props = {
  onSubmit: (values: FormValues) => Promise<any>;
  disabled?: boolean;
  initialValues?: FormValues;
}

export default function ProjectModalForm({ onSubmit, disabled, initialValues }: Props) {
  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = async (values) => {
    await onSubmit(values);
    formik.resetForm();
  };

  const formik = useFormik<FormValues>({
    initialValues: initialValues || { title: '', description: '' },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form noValidate autoComplete="off" className="pt-8 flex-1 flex flex-col justify-between" onSubmit={formik.handleSubmit}>
      <fieldset>
        <TextField
          size="small"
          color="secondary"
          label="Project Title"
          variant="outlined"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
          autoFocus
        />
        <TextField
          size="small"
          color="secondary"
          label="Project Description (Optional)"
          variant="outlined"
          className="mt-4 w-full"
          name="description"
          multiline
          minRows={3}
          maxRows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </fieldset>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        className="text-white"
        disabled={disabled}
      >
        Submit
      </Button>
    </form>
  );
}

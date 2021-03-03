import React, { useEffect } from 'react';
import {
  Typography, TextField, Button,
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { useFormik, FormikConfig } from 'formik';
import * as yup from 'yup';
import Modal from '../../Modal';
import { SaveProject, SaveProjectVariables } from './types/SaveProject';
import { addCacheItem } from '../../../cacheUtils';

const SAVE_PROJECT = gql`
  mutation SaveProject($title: String!, $description: String) {
    createProject(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

type FormValues = {
  title: string;
  description: string;
}

const validationSchema = yup.object({
  title: yup.string().required('Please provide a title'),
  description: yup.string(),
});

type Props ={
  open: boolean;
  onClose?: () => void;
}

export default function AddProjectModal({ onClose, ...props }: Props) {
  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = async (values) => {
    saveProject({ variables: values });
    formik.resetForm();
  };

  const [saveProject, { loading, called }] = useMutation<SaveProject, SaveProjectVariables>(
    SAVE_PROJECT,
    addCacheItem<SaveProject, SaveProjectVariables>('projects', 'createProject'),
  );

  const formik = useFormik<FormValues>({
    initialValues: { title: '', description: '' },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!loading && called && onClose) {
      onClose();
    }
  }, [loading, called]);

  return (
    <Modal
      {...props}
      onClose={onClose}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 500,
      }}
    >
      <div className="flex flex-col h-full">
        <Typography variant="h4">Add Project</Typography>
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
            />
            <TextField
              size="small"
              color="secondary"
              label="Project Description (Optional)"
              variant="outlined"
              className="mt-4 w-full"
              name="description"
              multiline
              rows={3}
              rowsMax={4}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </fieldset>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className="text-white"
            disabled={loading}
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
}

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AuthorSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  birthDate: Yup.date().required('Required'),
  biography: Yup.string().required('Required')
});

const AuthorForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '', birthDate: '', biography: '' }}
      validationSchema={AuthorSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label>Birth Date</label>
            <Field type="date" name="birthDate" />
            <ErrorMessage name="birthDate" component="div" />
          </div>
          <div>
            <label>Biography</label>
            <Field type="text" name="biography" />
            <ErrorMessage name="biography" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthorForm;

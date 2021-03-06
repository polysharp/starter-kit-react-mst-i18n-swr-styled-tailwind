import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useStore } from 'store';
import { SIGN_UP } from 'gql/user';

import { Divider, Error, Form } from '../shared';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'What a short name...')
    .max(200, 'What a long name...')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'What a short name...')
    .max(200, 'What a long name...')
    .required('Required'),
  email: Yup.string()
    .lowercase()
    .email('Please provide a valid email')
    .min(6, 'Please provide a valid email')
    .max(200, 'Please provide a valid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Minimum of 8 characters')
    .max(255, 'Maximum of 255 characters')
    .matches(/\S+/, { excludeEmptyString: true, message: 'Inccorect password format' })
    .required('Required'),
  language: Yup.string().oneOf(['fr-FR', 'en-EN', 'es-ES']).required('Required'),
  currency: Yup.string().oneOf(['euro', 'dollar', 'yen']).required('Required'),
});

const SignUpPage = () => {
  const { user } = useStore();
  const { i18n } = useTranslation();

  const [auth, { loading }] = useMutation(SIGN_UP, {
    onCompleted: () => user.sign(),
    onError: (error) => console.log(error),
  });

  return (
    <main className="w-full bg-white md:w-2/3 lg:w-1/2 xl:w-1/3">
      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          language: i18n.language || 'fr-FR',
          currency: 'euro',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password, firstName, lastName, language, currency } = values;
          setSubmitting(true);
          console.log('Please provide an auth fetcher');
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          dirty,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-full">
              <h1>Création d&apos;un compte</h1>
            </div>
            <div className="flex flex-row items-center justify-between w-full mt-8">
              <input
                className="mr-2 placeholder-gray-900"
                aria-label="First name"
                name="firstName"
                type="text"
                placeholder="Prénom"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <input
                className="ml-2 placeholder-gray-900"
                aria-label="Last name"
                name="lastName"
                type="test"
                placeholder="Nom"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
            </div>
            <div className="w-full mt-6">
              <input
                className="placeholder-gray-900"
                aria-label="Email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <input
                className="mt-4 placeholder-gray-900"
                aria-label="Password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            {!isValid && <Error errors={errors} touched={touched} />}
            <div className="w-full mt-8">
              <button
                type="submit"
                disabled={!(isValid && dirty) || isSubmitting}
                className="transition duration-150 ease-in"
              >
                Créer mon compte
              </button>
              <Divider label="OU" />
              <NavLink
                to="/auth/signin"
                disabled={isSubmitting}
                className="mt-6 transition duration-150 ease-in"
              >
                Se connecter
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default SignUpPage;

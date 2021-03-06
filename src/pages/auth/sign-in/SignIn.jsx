import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useStore } from 'store';
import { SIGN_IN } from 'gql/user';

import { Divider, Error, Form } from '../shared';

const SignInSchema = Yup.object().shape({
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
});

const SignInPage = () => {
  const { user } = useStore();

  const [auth, { loading }] = useMutation(SIGN_IN, {
    onCompleted: () => user.sign(),
    onError: (error) => console.log(error),
  });

  return (
    <main className="w-full bg-white md:w-2/3 lg:w-1/2 xl:w-1/3">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => {
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-full">
              <h1>Bienvenue</h1>
            </div>
            <div className="w-full mt-8">
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
              <div className="mt-4">
                <input
                  className="placeholder-gray-900"
                  aria-label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
            </div>
            {!isValid && <Error errors={errors} touched={touched} />}
            <div className="w-full mt-8">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="transition duration-150 ease-in"
              >
                Se connecter
              </button>
              <Divider label="OU" />
              <NavLink
                to="/auth/signup"
                disabled={isSubmitting}
                className="mt-6 transition duration-150 ease-in"
              >
                Créer un compte
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default SignInPage;

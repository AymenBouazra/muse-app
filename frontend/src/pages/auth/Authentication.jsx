import { useState } from 'react';
import { User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleAuth, loginForm, registerForm } from '../../API/authApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageContainer from '../../components/PageContainer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      ...(isSignUp && {
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
      }),
    }),
    onSubmit: async (values) => {
      try {
        if (isSignUp) {
          const response = await registerForm('/auth/register', { ...values, name: `${values.firstname} ${values.lastname}` });
          toast.promise(
            Promise.resolve(response),
            {
              loading: 'Registering...',
              success: (data) => {
                dispatch(setUser({ user: data.user, token: data.token }));
                navigate('/');
                return data.message || 'Registration successful!';
              },
              error: (err) => err.message || 'Error during registration',
            }
          );
        } else {
          const response = await loginForm('/auth/login', values);
          toast.promise(
            Promise.resolve(response),
            {
              loading: 'Logging in...',
              success: (data) => {
                dispatch(setUser({ user: data.user, token: data.token }));
                navigate('/');
                return data.message || 'Login successful!';
              },
              error: (err) => {
                console.log(err);
                return err.response.message || 'Error during login';
              },
            }
          );
        }
      } catch (error) {
        toast.error(error.response.data.message || 'Error during login');
      }
    },
  });

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await googleAuth('/auth/google', { token: credentialResponse.credential });

      toast.promise(
        Promise.resolve(response),
        {
          loading: 'Loading...',
          success: (data) => {
            dispatch(setUser({ user: data.user, token: data.token }));
            navigate('/');
            return data.message || 'Login successful!';
          },
          error: (err) => err.message || 'Error when fetching',
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'An error occurred during login.');
    }
  };

  const handleGoogleLoginFailure = () => {
    console.log('Google Login Failed');
  };

  return (
    <PageContainer>
      <GoogleOAuthProvider clientId="252940881350-a2bt6c9o8hj69kre61a0ocbknos1seev.apps.googleusercontent.com">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              {isSignUp ? (
                <UserPlus className="text-purple-900 w-8 h-8" />
              ) : (
                <LogIn className="text-purple-900 w-8 h-8" />
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    className="w-full pl-12 pr-4 py-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                  />
                  <User className="absolute left-3 top-3 text-purple-500" />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.firstname}</div>
                  ) : null}
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    className="w-full pl-12 pr-4 py-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                  />
                  <User className="absolute left-3 top-3 text-purple-500" />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.lastname}</div>
                  ) : null}
                </div>
              </>
            )}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <Mail className="absolute left-3 top-3 text-purple-500" />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 border text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <Lock className="absolute left-3 top-3 text-purple-500" />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-[#4A2584] text-white py-3 rounded-lg hover:bg-purple-800 transition duration-300"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={toggleAuthMode}
              className="text-purple-900 hover:text-purple-700 underline focus:outline-none"
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>
        </div>
      </GoogleOAuthProvider>
    </PageContainer>
  );
};

export default AuthForm;
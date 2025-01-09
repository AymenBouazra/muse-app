import { useState } from "react";
import { User, Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleAuth } from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const AuthForm = () => {
 const [isSignUp, setIsSignUp] = useState(false);
 const navigate = useNavigate();
 const toggleAuthMode = () => {
  setIsSignUp(!isSignUp);
 };

 const handleGoogleLoginSuccess = async (credentialResponse) => {
  try {
   const response = await googleAuth("/auth/google", { token: credentialResponse.credential });

   toast.promise(
    Promise.resolve(response), // Wrap the response in a promise
    {
     loading: 'Loading...', // Displayed while the promise is pending
     success: (data) => data.message || 'Login successful!', // Use response.message or a fallback message
     error: (err) => err.message || 'Error when fetching', // Use error.message or a fallback message
    }
   );

   navigate("/"); // Navigate to the home page after successful login
  } catch (error) {
   console.log(error);
   toast.error(error.message || 'An error occurred during login.'); // Display error toast
  }
 };

 const handleGoogleLoginFailure = () => {
  console.log("Google Login Failed");
 };

 return (
  <GoogleOAuthProvider clientId="252940881350-a2bt6c9o8hj69kre61a0ocbknos1seev.apps.googleusercontent.com">
   <div className="min-h-screen flex items-center justify-center bg-purple-900">
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
      {isSignUp ? "Sign Up" : "Sign In"}
     </h2>
     <form className="space-y-4">
      {isSignUp && (
       <>
        <div className="flex space-x-4">
         <div className="relative flex-1">
          <input
           type="text"
           placeholder="First Name"
           className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <User className="absolute left-3 top-2.5 text-purple-500" />
         </div>
         <div className="relative flex-1">
          <input
           type="text"
           placeholder="Last Name"
           className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <User className="absolute left-3 top-2.5 text-purple-500" />
         </div>
        </div>
       </>
      )}
      <div className="relative">
       <input
        type="email"
        placeholder="Email"
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
       />
       <Mail className="absolute left-3 top-2.5 text-purple-500" />
      </div>
      <div className="relative">
       <input
        type="password"
        placeholder="Password"
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
       />
       <Lock className="absolute left-3 top-2.5 text-purple-500" />
      </div>
      <button
       type="submit"
       className="w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-300"
      >
       {isSignUp ? "Sign Up" : "Sign In"}
      </button>
     </form>
     <div className="mt-6 text-center">
      <button
       onClick={toggleAuthMode}
       className="text-purple-900 hover:text-purple-700 underline focus:outline-none"
      >
       {isSignUp
        ? "Already have an account? Sign In"
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
   </div>
  </GoogleOAuthProvider>
 );
};

export default AuthForm;
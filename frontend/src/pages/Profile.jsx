import { useContext, useState } from "react";
import { useFormik } from "formik";
import { Plus } from "lucide-react"; // Import the Plus icon from Lucide React
import toast from "react-hot-toast"; // Import React Hot Toast
import PageContainer from "../components/PageContainer";
import { UserContext } from "../utils/context/UserContext";
import { editProfile } from "../API/userApi";

const ProfilePage = () => {
 const { userData, updateUserData } = useContext(UserContext);
 const [profilePicture, setProfilePicture] = useState(userData?.picture || null);
 const [isDragging, setIsDragging] = useState(false);

 // Formik setup
 const formik = useFormik({
  initialValues: {
   firstname: userData?.firstname || "",
   lastname: userData?.lastname || "",
   email: userData?.email || "",
  },
  onSubmit: async (values) => {
   // Wrap the API call in toast.promise
   toast.promise(
    (async () => {
     const formData = new FormData();
     formData.append("firstname", values.firstname);
     formData.append("lastname", values.lastname);
     formData.append("email", values.email);
     if (profilePicture instanceof File) {
      formData.append("picture", profilePicture);
     }

     const response = await editProfile("/user/edit-profile/" + userData?.id, formData, {
      headers: {
       "Content-Type": "multipart/form-data",
      },
     });

     const { _id, firstname, lastname, email, name, picture, favoritTracks, favoritChannels, googleId } = response;
     const data = { id: _id, firstname, lastname, email, name, picture, favoritTracks, favoritChannels, googleId }
     updateUserData(data);
     localStorage.setItem("user-data", JSON.stringify(data));

     return response;
    })(),
    {
     loading: "Updating profile...",
     success: () => `Profile updated successfully!`,
     error: (error) => `Failed to update profile: ${error.message}`,
    }
   ).catch((error) => {
    console.error("Error updating profile:", error);
   });
  },
 });

 // Handle file drop
 const handleDrop = (e) => {
  e.preventDefault();
  setIsDragging(false);
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
   setProfilePicture(file);
  }
 };

 // Handle file input change
 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
   setProfilePicture(file);
  }
 };

 return (
  <PageContainer>
   <div className="max-w-7xl w-3/4 mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
    {/* Profile Header */}
    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 h-48">
     <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
      <div
       className={`relative w-32 h-32 rounded-full border-4 bg-white border-white shadow-xl group ${isDragging ? "border-purple-300" : "border-white"
        }`}
       onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
       }}
       onDragLeave={() => setIsDragging(false)}
       onDrop={handleDrop}
      >
       {profilePicture ? (
        <>
         <img
          src={
           profilePicture instanceof File
            ? URL.createObjectURL(profilePicture)
            : profilePicture
          }
          alt="Profile Preview"
          className="w-full h-full object-cover rounded-full"
         />
         {/* Gray Overlay on Hover */}
         <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-medium">Change Image</span>
         </div>
        </>
       ) : (
        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
         <span className="text-gray-500">No Image</span>
        </div>
       )}
       {/* + Icon for Upload */}
       <div className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1.5 border-2 border-white">
        <Plus className="w-5 h-5 text-white" />
       </div>
       <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id="profile-picture"
       />
      </div>
     </div>
    </div>

    {/* Profile Information */}
    <div className="mt-20 text-center px-6">
     <h1 className="text-3xl font-bold text-gray-800">
      {userData?.firstname} {userData?.lastname}
     </h1>
     <p className="text-gray-600 mt-2">Designer</p>
     <div className="flex justify-center space-x-8 mt-4">
      <div className="text-center">
       <span className="text-gray-800 font-bold text-xl">938</span>
       <span className="text-gray-600 block text-sm">Posts</span>
      </div>
      <div className="text-center">
       <span className="text-gray-800 font-bold text-xl">3,586</span>
       <span className="text-gray-600 block text-sm">Followers</span>
      </div>
      <div className="text-center">
       <span className="text-gray-800 font-bold text-xl">2,659</span>
       <span className="text-gray-600 block text-sm">Following</span>
      </div>
     </div>
    </div>

    {/* Profile Form */}
    <form onSubmit={formik.handleSubmit} className="mt-8 px-6 pb-8">
     {/* First Name Field */}
     <div className="mb-6">
      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
       First Name
      </label>
      <input
       type="text"
       id="firstname"
       name="firstname"
       value={formik.values.firstname}
       onChange={formik.handleChange}
       className="w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
      />
     </div>

     {/* Last Name Field */}
     <div className="mb-6">
      <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
       Last Name
      </label>
      <input
       type="text"
       id="lastname"
       name="lastname"
       value={formik.values.lastname}
       onChange={formik.handleChange}
       className="w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
      />
     </div>

     {/* Email Field */}
     <div className="mb-8">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
       Email
      </label>
      <input
       type="email"
       id="email"
       name="email"
       value={formik.values.email}
       onChange={formik.handleChange}
       className="w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
      />
     </div>

     {/* Submit Button */}
     <div className="flex justify-end">
      <button
       type="submit"
       className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
      >
       Save Changes
      </button>
     </div>
    </form>
   </div>
  </PageContainer>
 );
};

export default ProfilePage;
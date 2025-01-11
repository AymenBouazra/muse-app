
/* eslint-disable react/prop-types */
const PageContainer = ({ children }) => {
 return (
  <div className="py-32 min-h-screen flex justify-center bg-gradient-to-b from-[#4A2584] via-black to-black text-white pt-16">
   {children}
  </div>
 )
}

export default PageContainer
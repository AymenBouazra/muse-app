
/* eslint-disable react/prop-types */
const PageContainer = ({ children }) => {
 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black text-white pt-16">
   {children}
  </div>
 )
}

export default PageContainer
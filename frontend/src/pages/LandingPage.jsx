import { Music, Download, PlayCircle, Heart, Award } from 'lucide-react';

const LandingPage = () => {
 return (
  <div className="min-h-screen bg-gradient-to-b from-[#4A2584] via-black to-black text-white pt-16">
   {/* Hero Section */}
   <section className="pt-32 md:pt-40 px-6">
    <div className="">
     <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
       <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        Music Without <span className="text-green-400">Limits</span>
       </h1>
       <p className="text-xl text-gray-300">
        Stream millions of songs and podcasts on your device.
        Premium sound quality with zero ads.
       </p>
       <div className="flex space-x-4">
        <button className="bg-green-400 hover:bg-green-500 text-black px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
         Get Started
        </button>
        <button className="border border-white hover:border-green-400 px-8 py-3 rounded-full transition-all duration-300 hover:text-green-400">
         Learn More
        </button>
       </div>
      </div>
      <div className="relative">
       <img
        src="/assets/img/landingpage/slide-1.jpg"
        alt="App Interface"
        className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
       />
       <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl"></div>
      </div>
     </div>
    </div>
   </section>

   {/* Features Section */}
   <section id="features" className="py-20 px-6">
    <div className="max-w-7xl mx-auto">
     <h2 className="text-4xl font-bold text-center mb-16">
      Why Choose <span className="text-green-400">Muse</span>?
     </h2>
     <div className="grid md:grid-cols-3 gap-12">
      {[
       {
        icon: <PlayCircle className="w-12 h-12 text-green-400" />,
        title: "High Quality Audio",
        description: "Experience crystal clear sound with our HD audio streaming technology."
       },
       {
        icon: <Download className="w-12 h-12 text-green-400" />,
        title: "Offline Mode",
        description: "Download your favorite tracks and listen anywhere, anytime."
       },
       {
        icon: <Heart className="w-12 h-12 text-green-400" />,
        title: "Smart Playlists",
        description: "AI-powered recommendations based on your listening habits."
       }
      ].map((feature, index) => (
       <div key={index} className="bg-purple-900/20 p-8 rounded-2xl hover:bg-purple-900/30 transition-all duration-300 transform hover:-translate-y-2">
        <div className="mb-6">{feature.icon}</div>
        <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
        <p className="text-gray-300">{feature.description}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* Premium Section */}
   <section id="premium" className="py-20 px-6 bg-black/50">
    <div className="max-w-7xl mx-auto">
     <h2 className="text-4xl font-bold text-center mb-16">Choose Your Plan</h2>
     <div className="grid md:grid-cols-3 gap-8">
      {[
       {
        title: "Free",
        price: "0",
        features: ["Ad-supported listening", "Basic audio quality", "Mobile streaming"]
       },
       {
        title: "Premium",
        price: "9.99",
        features: ["Ad-free listening", "HD audio quality", "Offline mode", "Custom playlists"]
       },
       {
        title: "Family",
        price: "14.99",
        features: ["Up to 6 accounts", "Parental controls", "All Premium features", "Family mix"]
       }
      ].map((plan, index) => (
       <div key={index} className="bg-purple-900/20 p-8 rounded-2xl hover:bg-purple-900/30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
        <p className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg font-normal">/month</span></p>
        <ul className="space-y-4 mb-8">
         {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center space-x-2">
           <Award className="w-5 h-5 text-green-400" />
           <span>{feature}</span>
          </li>
         ))}
        </ul>
        <button className="w-full bg-green-400 hover:bg-green-500 text-black py-3 rounded-full transition-all duration-300">
         Get Started
        </button>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* Footer */}
   <footer className="py-12 px-6 bg-black/80">
    <div className="max-w-7xl mx-auto text-center">
     <div className="flex items-center justify-center space-x-2 mb-8">
      <Music className="w-8 h-8 text-green-400" />
      <span className="text-2xl font-bold">Muse</span>
     </div>
     <p className="text-gray-400">© 2025 Muse. All rights reserved.</p>
    </div>
   </footer>
  </div>
 )
};

export default LandingPage;
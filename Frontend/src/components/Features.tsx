// import { motion } from "motion/react";
// import { Brain, Heart, Shield, Smartphone, Bell, Users } from "lucide-react";

// const features = [
//   {
//     icon: <Brain className="text-teal-500" />,
//     title: "AI Prediction Model",
//     description: "Our proprietary AI analyzes 20+ cardiovascular markers to predict risks with 99.2% accuracy.",
//   },
//   {
//     icon: <Heart className="text-red-500" />,
//     title: "Real-time Monitoring",
//     description: "Connect your wearable devices for continuous heart rate and rhythm analysis throughout the day.",
//   },
//   {
//     icon: <Shield className="text-blue-500" />,
//     title: "Privacy First",
//     description: "Your health data is encrypted with military-grade standards and is fully HIPAA compliant.",
//   },
//   {
//     icon: <Smartphone className="text-purple-500" />,
//     title: "Mobile Integration",
//     description: "Access your heart health dashboard anytime, anywhere with our seamless mobile application.",
//   },
//   {
//     icon: <Bell className="text-yellow-500" />,
//     title: "Smart Alerts",
//     description: "Receive instant notifications for irregular heart rhythms or significant changes in your health data.",
//   },
//   {
//     icon: <Users className="text-indigo-500" />,
//     title: "Family Sharing",
//     description: "Securely share your health status with family members or healthcare providers for better care.",
//   },
// ];

// export default function Features() {
//   return (
//     <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-950/50">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-20">
//           <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
//             Advanced Features for Your Heart
//           </h2>
//           <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
//             CardioSense AI combines medical expertise with cutting-edge technology to provide the most comprehensive heart health monitoring.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, i) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             >
//               <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
//                 {feature.title}
//               </h3>
//               <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

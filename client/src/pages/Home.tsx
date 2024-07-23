import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="z-10 text-center">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-800 heading"
            whileHover={{ scale: 1.05 }}
          >
            E-Kaksha
          </motion.h1>
        </motion.div>

        <motion.p
          className="mt-6 text-xl text-gray-600 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Your gateway to interactive online learning
        </motion.p>

        <motion.button
          className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/student/login")}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Home;

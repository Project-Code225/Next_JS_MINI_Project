import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';

const BackgroundAnimation = () => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={'#00bcd4'} />
    </mesh>
  );
};

const headingVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const inputVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const buttonVariants = {
  hover: { scale: 1.1, transition: { yoyo: Infinity } },
};

const Contact = () => {
  useEffect(() => {
    gsap.to('.contact-background', {
      background: 'linear-gradient(45deg, #ff6f61, #de6dff)',
      duration: 2,
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const fields = [
    { placeholder: 'Name', type: 'text' },
    { placeholder: 'Email', type: 'email' },
    { placeholder: 'Phone Number', type: 'tel' },
    { placeholder: 'Password', type: 'password' },
    { placeholder: 'Confirm Password', type: 'password' },
  ];

  return (
    <>
      <Navbar />
      <div className="contact-background min-h-screen p-4 flex flex-col items-center justify-center relative">
        <motion.h1
          className="text-4xl font-bold mb-6 text-white"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          Contact Us
        </motion.h1>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-lg shadow-lg w-full max-w-md">
          <form className="space-y-6">
            {fields.map((field, i) => (
              <motion.div
                key={i}
                className="form-control"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={inputVariants}
              >
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">{field.placeholder}</span>
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="input input-bordered input-primary w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out rounded-full px-4 py-3"
                />
              </motion.div>
            ))}
            <motion.div
              className="form-control mt-6"
              whileHover="hover"
              variants={buttonVariants}
            >
              <button className="btn btn-primary btn-block bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition duration-150 ease-in-out rounded-full py-3">
                Submit
              </button>
            </motion.div>
          </form>
        </div>
        <Canvas className="absolute top-0 left-0 w-full h-full z-[-1]">
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <BackgroundAnimation />
        </Canvas>
      </div>
    </>
  );
};

export default Contact;

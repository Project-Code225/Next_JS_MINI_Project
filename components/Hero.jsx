import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { PlaneGeometry, MeshBasicMaterial } from 'three';

// Extend Three.js objects
extend({ PlaneGeometry, MeshBasicMaterial });

const AnimatedBackground = () => {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, '/images/hero.jpg');

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 1, ease: 'easeInOut' },
    },
  };

  return (
    <div className="relative h-screen">
      <Canvas className="absolute inset-0">
        <AnimatedBackground />
      </Canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <motion.h1
          className="text-white text-4xl md:text-6xl font-bold mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Welcome to Our Website
        </motion.h1>
        <motion.p
          className="text-white text-lg md:text-xl mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 1 }}
        >
          Discover our amazing content and services.
        </motion.p>
        <motion.button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 1.5 }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;

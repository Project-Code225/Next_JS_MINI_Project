import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { BoxGeometry, MeshStandardMaterial } from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Extend Three.js objects
extend({ BoxGeometry, MeshStandardMaterial });

const RotatingBox = () => {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const CarouselItem = ({ image, text }) => (
  <motion.div
    className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.8 }}
  >
    <img src={image} alt={text} className="absolute w-full h-full object-cover" />
    <div className="relative z-10 text-white text-center">
      <h3 className="text-2xl md:text-4xl font-bold mb-2">{text}</h3>
      <Canvas className="mt-4" style={{ height: '200px' }}>
        <OrbitControls enableZoom={false} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingBox />
      </Canvas>
    </div>
  </motion.div>
);

const About = () => {
  const carouselItems = [
    { image: '/images/car1.jpg', text: 'Our Mission' },
    { image: '/images/car2.png', text: 'Our Vision' },
    { image: '/images/car3.jpg', text: 'Our Values' },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
        <div className="carousel relative w-full overflow-hidden">
          <AnimatePresence>
            {carouselItems.map((item, index) =>
              index === current ? <CarouselItem key={index} image={item.image} text={item.text} /> : null
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

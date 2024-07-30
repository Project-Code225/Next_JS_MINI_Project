import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { BoxGeometry } from 'three';
import { MeshStandardMaterial } from 'three';
import { motion } from 'framer-motion';

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

const cardVariants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Card = ({ image, text }) => (
  <motion.div
    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.8 }}
    variants={cardVariants}
  >
    <img src={image} alt={text} className="w-full h-48 object-cover" />
    <div className="p-4">
      <p className="mt-2 text-gray-800 text-lg font-semibold">{text}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Learn More</button>
    </div>
    <Canvas style={{ height: '150px' }}>
      <OrbitControls enableZoom={false} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RotatingBox />
    </Canvas>
  </motion.div>
);

const Cards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <Card image="/images/img1.jpg" text="Card 1" />
    <Card image="/images/img2.jpg" text="Card 2" />
    <Card image="/images/img3.jpg" text="Card 3" />
    <Card image="/images/car1.jpg" text="Card 4" />
    <Card image="/images/car2.png" text="Card 5" />
    <Card image="/images/car3.jpg" text="Card 6" />
  </div>
);

export default Cards;

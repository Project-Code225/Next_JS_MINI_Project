import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const cardVariants = {
  offscreen: {
    opacity: 0,
    scale: 0.8,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Card = ({ image, text }) => (
  <motion.div
    className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.8 }}
    variants={cardVariants}
  >
    <img src={image} alt={text} className="w-full h-48 object-cover" />
    <div className="p-4">
      <p className="mt-2 text-gray-800 text-lg font-semibold">{text}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Learn More</button>
    </div>
  </motion.div>
);

const Career = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    gsap.from(cardsRef.current.children, {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
    });
  }, []);

  const cardData = [
    { image: '/images/card1.png', text: 'Explore Opportunities' },
    { image: '/images/card2.png', text: 'Our Work Culture' },
    { image: '/images/card3.jpg', text: 'Employee Benefits' },
    { image: '/images/card4.jpg', text: 'Career Growth' },
    { image: '/images/card5.jpg', text: 'Join Our Team' },
    { image: '/images/card6.jpg', text: 'Success Stories' },
  ];

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Career</h1>
        <p className="text-gray-600 mb-8">
          At our company, we offer a dynamic and inclusive work environment where you can grow your career.
          Explore the opportunities we have for you and join our team of dedicated professionals.
        </p>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <Card key={index} image={card.image} text={card.text} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Career;

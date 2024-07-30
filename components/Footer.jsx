const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center">
    <div className="container mx-auto">
      <div className="flex justify-center space-x-4 mb-4">
        <a href="#" className="text-white hover:text-gray-400">Facebook</a>
        <a href="#" className="text-white hover:text-gray-400">Twitter</a>
        <a href="#" className="text-white hover:text-gray-400">LinkedIn</a>
        <a href="#" className="text-white hover:text-gray-400">Instagram</a>
      </div>
      <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;

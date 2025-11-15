export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {currentYear} Andrei Dodu. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="#about"
              className="text-gray-500 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#work"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Work
            </a>
            <a
              href="#contact"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

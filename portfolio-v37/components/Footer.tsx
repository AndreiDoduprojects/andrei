'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 border-t border-white/[0.05]">
      <div className="container">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
          <div className="text-sm text-gray-500">
            © {currentYear} Andrei Dodu
          </div>
          <div className="text-sm text-gray-500">
            Göteborg, Sweden
          </div>
        </div>
      </div>
    </footer>
  );
}

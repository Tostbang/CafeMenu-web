import { QrCode, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { MyButton } from '../myButtons';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-[#FF6B6B] p-2 rounded-xl">
              <QrCode className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              MenuQR
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Özellikler
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Nasıl Çalışır
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-[#FF6B6B] transition-colors">
              Fiyatlandırma
            </a>
            <MyButton className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white">
              Hemen Başla
            </MyButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a
              href="#features"
              className="block text-gray-700 hover:text-[#FF6B6B] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Özellikler
            </a>
            <a
              href="#how-it-works"
              className="block text-gray-700 hover:text-[#FF6B6B] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nasıl Çalışır
            </a>
            <a
              href="#pricing"
              className="block text-gray-700 hover:text-[#FF6B6B] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fiyatlandırma
            </a>
            <MyButton className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white">
              Hemen Başla
            </MyButton>
          </div>
        )}
      </nav>
    </header>
  );
}

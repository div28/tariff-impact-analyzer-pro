import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Menu } from 'lucide-react';

interface HeaderProps {
  onGetStarted: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetStarted }) => {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">TariffPro Calculator</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => document.querySelector('#tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Tools
            </button>
            <button 
              onClick={() => document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              FAQ
            </button>
            <a 
              href="mailto:support@tariffpro.com"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* CTA & Trust Badge */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block text-sm text-muted-foreground">
              Used by 1000+ businesses
            </div>
            <Button 
              onClick={onGetStarted} 
              className="btn-primary"
            >
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
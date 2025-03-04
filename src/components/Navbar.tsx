import { useState, useEffect } from 'react';
import { Menu, X, ChefHat, User } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import AuthModal from './auth/AuthModal';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href='/' className="ml-2 text-xl font-bold text-gray-900">FindMyRecipe</a>
            </div>

            {/* Navegação Desktop */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <a href="/" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="/pricing" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </a>
              <a href="/about" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              
              {/* Botão de Login/Dashboard */}
              {user ? (
                <a
                  href="/dashboard"
                  className="flex items-center space-x-2 bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </a>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </button>
              )}
            </div>

            {/* Botão do Menu Mobile */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100 transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="/" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="/" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
              About
            </a>

            {/* Botão de Login/Dashboard Mobile */}
            {user ? (
              <a
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                <User size={18} />
                <span>Dashboard</span>
              </a>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full text-left text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal de Autenticação */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}

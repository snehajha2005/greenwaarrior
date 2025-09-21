import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication status whenever location changes
    const checkAuth = () => {
      const token = localStorage.getItem('greenwarrior_auth');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('greenwarrior_auth');
    localStorage.removeItem('greenwarrior_user');
    setIsAuthenticated(false);
    navigate('/login');
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Citizen Portal', href: '/citizen-portal' },
    { label: 'Worker Portal', href: '/worker-portal' },
    { label: 'Pickup & Scheduling', href: '/pickup-scheduling' },
    { label: 'Challenges', href: '/challenges' },
    { label: 'Learning', href: '/learning' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-primary rounded-full p-2 group-hover:scale-110 transition-transform">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-primary">Green Warrior</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-card-hover ${
                  location.pathname === item.href 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full flex items-center gap-2" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="btn-primary">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-card-hover transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 bg-white rounded-xl shadow-medium mt-2 mx-4">
            <div className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.href 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-card-hover'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full flex items-center justify-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="btn-primary w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
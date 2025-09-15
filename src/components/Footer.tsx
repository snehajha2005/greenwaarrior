import React from 'react';
import { Leaf, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Citizen Portal', href: '/citizen-portal' },
    { label: 'Worker Portal', href: '/worker-portal' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-full p-2">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-heading font-bold">Green Warrior</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Making waste management rewarding and fun for everyone.
            </p>
            <p className="text-accent-yellow font-semibold text-sm mt-2">
              "Smart Waste, Clean Future"
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Features</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80 text-sm">QR Code Scanning</li>
              <li className="text-primary-foreground/80 text-sm">Rewards System</li>
              <li className="text-primary-foreground/80 text-sm">Leaderboards</li>
              <li className="text-primary-foreground/80 text-sm">Community Challenges</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="bg-white/10 p-2 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2024 Green Warrior. All rights reserved. | 
            <span className="font-medium"> Smart Waste, Clean Future</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
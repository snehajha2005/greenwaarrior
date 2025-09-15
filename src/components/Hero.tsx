import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Scan, MapPin, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-waste-scanning.jpg';

const Hero = () => {
  const stats = [
    { icon: Users, label: 'Active Users', value: '50K+' },
    { icon: Scan, label: 'Bins Scanned', value: '2.5M' },
    { icon: MapPin, label: 'Cities Covered', value: '125' },
    { icon: Trophy, label: 'Rewards Claimed', value: '₹15L' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8 fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Turn Waste Into
                <span className="block text-accent-yellow">Rewards</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-lg">
                Scan bins, earn points, climb the leaderboard, and make your city cleaner — all in one app.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="btn-accent text-lg px-8 py-4 group">
                  Join Green Warrior
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/citizen-portal">
                <Button variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  Try Scanner
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center space-y-2 bounce-in" style={{animationDelay: `${index * 0.2}s`}}>
                    <div className="bg-white/10 rounded-full p-3 w-fit mx-auto">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative slide-up">
            <div className="relative bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
              <img 
                src={heroImage} 
                alt="Person scanning waste bin QR code with smartphone showing reward points"
                className="w-full h-auto rounded-2xl shadow-strong"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-accent-yellow rounded-full p-4 animate-bounce">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-success rounded-full p-4 pulse-eco">
                <Scan className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
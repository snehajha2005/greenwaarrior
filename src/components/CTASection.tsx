import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 fade-in">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join thousands of eco-warriors who are already making their cities cleaner and earning rewards
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button className="btn-accent text-lg px-8 py-4 group">
                <Zap className="mr-2 h-5 w-5" />
                Start Earning Points
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/challenges">
              <Button variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                View Leaderboard
              </Button>
            </Link>
          </div>

          {/* Floating Animation Elements */}
          <div className="relative mt-12">
            <div className="absolute left-1/4 top-0 w-8 h-8 bg-white/10 rounded-full animate-bounce"></div>
            <div className="absolute right-1/4 top-8 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute left-1/3 bottom-0 w-4 h-4 bg-white/15 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
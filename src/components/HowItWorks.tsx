import React from 'react';
import { Scan, Trophy, Gift, Users } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Scan,
      title: 'Scan & Earn',
      description: 'Simply scan QR codes on waste bins to earn points instantly',
      color: 'bg-gradient-primary',
    },
    {
      icon: Trophy,
      title: 'Climb Leaderboards',
      description: 'Compete with friends and neighbors to become the top eco-warrior',
      color: 'bg-gradient-secondary',
    },
    {
      icon: Gift,
      title: 'Redeem Rewards',
      description: 'Use your points for exclusive rewards and eco-friendly prizes',
      color: 'bg-gradient-accent',
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with like-minded people making a real environmental impact',
      color: 'bg-gradient-primary',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Making waste management fun and rewarding with gamification
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index} 
                className="text-center space-y-6 slide-up group"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className={`${step.color} rounded-3xl p-6 w-24 h-24 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-medium`}>
                  <IconComponent className="h-12 w-12 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
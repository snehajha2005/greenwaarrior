import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Users, Recycle, DollarSign, 
  MapPin, Calendar, Award, Target, Zap,
  BarChart3, PieChart, Activity, Leaf
} from 'lucide-react';

const Dashboard = () => {
  const overallStats = {
    totalUsers: 50234,
    binsScanned: 2547890,
    citiesCovered: 125,
    rewardsClaimed: 15.7, // in lakhs
    carbonSaved: 2340, // in tons
    wasteSegregated: 89.5 // percentage
  };

  const recentActivity = [
    { type: 'scan', user: 'Priya S.', location: 'Sector 15', points: 15, time: '2 min ago' },
    { type: 'challenge', user: 'Green Valley Society', action: 'Won Weekly Challenge', points: 500, time: '1 hour ago' },
    { type: 'reward', user: 'Amit K.', action: 'Redeemed Eco Bag', points: -300, time: '3 hours ago' },
    { type: 'report', user: 'Maya R.', action: 'Reported Overflowing Bin', points: 25, time: '5 hours ago' },
    { type: 'scan', user: 'Raj P.', location: 'Market Area', points: 20, time: '6 hours ago' },
  ];

  const topPerformers = [
    { name: 'Green Tech University', type: 'College', score: 12450, change: '+22%' },
    { name: 'Eco Park Society', type: 'Neighborhood', score: 8920, change: '+15%' },
    { name: 'Clean Future Academy', type: 'School', score: 7560, change: '+18%' },
    { name: 'Sunrise Apartments', type: 'Society', score: 6890, change: '+12%' },
  ];

  const wasteCategories = [
    { name: 'Organic', percentage: 45, color: 'bg-green-500', amount: '245 tons' },
    { name: 'Recyclable', percentage: 35, color: 'bg-blue-500', amount: '189 tons' },
    { name: 'Hazardous', percentage: 15, color: 'bg-red-500', amount: '81 tons' },
    { name: 'Other', percentage: 5, color: 'bg-gray-500', amount: '27 tons' },
  ];

  const cityProgress = [
    { city: 'Mumbai', progress: 92, users: 12450 },
    { city: 'Delhi', progress: 88, users: 10230 },
    { city: 'Bangalore', progress: 85, users: 9870 },
    { city: 'Chennai', progress: 82, users: 8760 },
    { city: 'Pune', progress: 79, users: 7540 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'scan':
        return <Recycle className="h-4 w-4 text-primary" />;
      case 'challenge':
        return <Award className="h-4 w-4 text-accent-yellow" />;
      case 'reward':
        return <DollarSign className="h-4 w-4 text-success" />;
      case 'report':
        return <MapPin className="h-4 w-4 text-warning" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-heading font-bold text-foreground animate-fade-in">
                📊 Green Warrior Dashboard
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in">
                Real-time insights into our collective environmental impact
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Activity className="mr-2 h-4 w-4" />
              Live Data
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <Card className="card-eco hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">👥 Total Users</p>
                    <p className="text-2xl font-bold text-primary">{overallStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-eco hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">♻️ Bins Scanned</p>
                    <p className="text-2xl font-bold text-secondary">{(overallStats.binsScanned / 1000000).toFixed(1)}M</p>
                  </div>
                  <Recycle className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-eco hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">🗺️ Cities Covered</p>
                    <p className="text-2xl font-bold text-accent-orange">{overallStats.citiesCovered}</p>
                  </div>
                  <MapPin className="h-8 w-8 text-accent-orange" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-eco">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rewards Claimed</p>
                    <p className="text-2xl font-bold text-success">₹{overallStats.rewardsClaimed}L</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-eco">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Carbon Saved</p>
                    <p className="text-2xl font-bold text-info">{overallStats.carbonSaved}T</p>
                  </div>
                  <Leaf className="h-8 w-8 text-info" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-eco">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Accuracy Rate</p>
                    <p className="text-2xl font-bold text-primary">{overallStats.wasteSegregated}%</p>
                  </div>
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Activity */}
            <Card className="card-eco lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Live feed of user actions across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-card-hover hover:scale-102 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        {getActivityIcon(activity.type)}
                        <div>
                          <div className="font-medium text-sm">
                            {activity.user} 
                            {activity.action && <span className="text-muted-foreground"> {activity.action}</span>}
                            {activity.location && <span className="text-muted-foreground"> at {activity.location}</span>}
                          </div>
                          <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                      <Badge variant={activity.points > 0 ? 'default' : 'secondary'}>
                        {activity.points > 0 ? '+' : ''}{activity.points} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="card-eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent-yellow" />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Leading communities this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{performer.name}</div>
                        <div className="text-xs text-muted-foreground">{performer.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary text-sm">{performer.score.toLocaleString()}</div>
                        <div className="text-xs text-success flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {performer.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Waste Distribution */}
            <Card className="card-eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Waste Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of waste categories processed this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wasteCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.amount}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className={`${category.color} h-2 rounded-full progress-animated`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* City Progress */}
            <Card className="card-eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  City Progress
                </CardTitle>
                <CardDescription>
                  Adoption rates across major cities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cityProgress.map((city, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{city.city}</span>
                        <span className="text-sm text-muted-foreground">{city.users.toLocaleString()} users</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full progress-animated"
                            style={{ width: `${city.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{city.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Scan, Trophy, MapPin, Camera, Award, Star, Gift, 
  CheckCircle, XCircle, Users, Recycle, Leaf, AlertTriangle 
} from 'lucide-react';
import { toast } from 'sonner';

const CitizenPortal = () => {
  const [qrInput, setQrInput] = useState('');
  const [lastScan, setLastScan] = useState<{result: 'correct' | 'incorrect', points: number} | null>(null);
  const [reportData, setReportData] = useState({ location: '', description: '' });

  const userStats = {
    points: 1250,
    rank: 42,
    scansToday: 8,
    totalScans: 157,
    badges: ['Eco Warrior', 'Recycling Pro', 'Green Champion']
  };

  const leaderboard = [
    { rank: 1, name: 'Green School Academy', points: 5420, type: 'School' },
    { rank: 2, name: 'Eco Society Heights', points: 4890, type: 'Society' },
    { rank: 3, name: 'Ward 15 Community', points: 4120, type: 'Ward' },
    { rank: 4, name: 'Clean City College', points: 3890, type: 'School' },
    { rank: 5, name: 'Sunrise Apartments', points: 3650, type: 'Society' },
  ];

  const rewards = [
    { name: 'Plant Sapling Kit', points: 500, image: '🌱', available: true },
    { name: 'Eco-friendly Tote Bag', points: 300, image: '🛍️', available: true },
    { name: 'Recycled Notebook', points: 200, image: '📓', available: true },
    { name: '10% Off Green Products', points: 150, image: '🏷️', available: true },
  ];

  const handleQRScan = () => {
    if (!qrInput.trim()) {
      toast.error('Please enter a QR code to scan');
      return;
    }

    // Simulate QR scanning result
    const isCorrect = Math.random() > 0.3; // 70% chance of correct disposal
    const points = isCorrect ? Math.floor(Math.random() * 20) + 10 : 0;
    
    setLastScan({ result: isCorrect ? 'correct' : 'incorrect', points });
    
    if (isCorrect) {
      toast.success(`✅ Correct disposal! You earned ${points} points!`);
    } else {
      toast.error('❌ Incorrect disposal. Please check segregation guidelines.');
    }
    
    setQrInput('');
  };

  const handleReportIssue = () => {
    if (!reportData.location || !reportData.description) {
      toast.error('Please fill in all fields');
      return;
    }
    
    toast.success('Thank you! Your report has been submitted to authorities.');
    setReportData({ location: '', description: '' });
  };

  const handleRedeemReward = (reward: any) => {
    if (userStats.points >= reward.points) {
      toast.success(`🎉 ${reward.name} redeemed successfully!`);
    } else {
      toast.error('Insufficient points to redeem this reward');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Citizen Portal
            </h1>
            <p className="text-xl text-muted-foreground">
              Scan, Earn, and Make a Difference
            </p>
          </div>

          <Tabs defaultValue="scanner" className="space-y-8">
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
              <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="report">Report Issues</TabsTrigger>
              <TabsTrigger value="awareness">Awareness</TabsTrigger>
            </TabsList>

            {/* QR Scanner Tab */}
            <TabsContent value="scanner" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scan className="h-5 w-5 text-primary" />
                      QR Code Scanner
                    </CardTitle>
                    <CardDescription>
                      Scan the QR code on waste bins to verify correct disposal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="qr-input">Enter QR Code</Label>
                      <Input
                        id="qr-input"
                        placeholder="Paste QR code or type bin ID"
                        value={qrInput}
                        onChange={(e) => setQrInput(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleQRScan} className="btn-primary w-full">
                      <Scan className="mr-2 h-4 w-4" />
                      Scan & Verify
                    </Button>
                    
                    {lastScan && (
                      <div className={`p-4 rounded-lg ${lastScan.result === 'correct' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {lastScan.result === 'correct' ? 
                            <CheckCircle className="h-5 w-5 text-green-600" /> :
                            <XCircle className="h-5 w-5 text-red-600" />
                          }
                          <span className={`font-medium ${lastScan.result === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                            {lastScan.result === 'correct' ? 'Correct Disposal!' : 'Incorrect Disposal'}
                          </span>
                        </div>
                        {lastScan.result === 'correct' && (
                          <p className="text-green-700">You earned {lastScan.points} points!</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{userStats.points}</div>
                        <div className="text-sm text-muted-foreground">Total Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{userStats.rank}</div>
                        <div className="text-sm text-muted-foreground">Current Rank</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent-orange">{userStats.scansToday}</div>
                        <div className="text-sm text-muted-foreground">Scans Today</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{userStats.totalScans}</div>
                        <div className="text-sm text-muted-foreground">Total Scans</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-accent-yellow" />
                      Your Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {userStats.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="w-full justify-start">
                          <Award className="mr-2 h-4 w-4" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-eco lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-primary" />
                      Available Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rewards.map((reward, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{reward.image}</span>
                            <div>
                              <div className="font-medium">{reward.name}</div>
                              <div className="text-sm text-muted-foreground">{reward.points} points</div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => handleRedeemReward(reward)}
                            disabled={userStats.points < reward.points}
                            className="btn-primary"
                          >
                            Redeem
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Top performing schools, societies, and wards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((entry) => (
                      <div key={entry.rank} className="flex items-center justify-between p-4 border rounded-lg hover:bg-card-hover transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                            ${entry.rank === 1 ? 'bg-accent-yellow text-white' : 
                              entry.rank === 2 ? 'bg-gray-400 text-white' :
                              entry.rank === 3 ? 'bg-amber-600 text-white' :
                              'bg-muted text-muted-foreground'}`}>
                            {entry.rank}
                          </div>
                          <div>
                            <div className="font-medium">{entry.name}</div>
                            <Badge variant="outline" className="text-xs">
                              {entry.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{entry.points}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Report Issues Tab */}
            <TabsContent value="report">
              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Report Issues
                  </CardTitle>
                  <CardDescription>
                    Report overflowing bins or improper waste disposal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter location or address"
                      value={reportData.location}
                      onChange={(e) => setReportData(prev => ({...prev, location: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Issue Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the waste management issue"
                      value={reportData.description}
                      onChange={(e) => setReportData(prev => ({...prev, description: e.target.value}))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <Button onClick={handleReportIssue} className="btn-primary flex-1">
                      Submit Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Awareness Tab */}
            <TabsContent value="awareness">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Recycle className="h-5 w-5 text-primary" />
                      Segregation Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                        <span><strong>Green Bin:</strong> Kitchen waste, fruit peels, leaves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                        <span><strong>Blue Bin:</strong> Paper, plastic bottles, glass</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                        <span><strong>Red Bin:</strong> Batteries, medical waste, chemicals</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-success" />
                      Eco Challenges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800">Weekly Challenge</div>
                        <div className="text-sm text-green-600">Scan 50 bins this week</div>
                        <div className="text-xs text-green-500">Progress: 32/50</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-800">Monthly Goal</div>
                        <div className="text-sm text-blue-600">Help 10 neighbors with segregation</div>
                        <div className="text-xs text-blue-500">Progress: 6/10</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-accent-yellow" />
                      Quick Facts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>🌍 Proper segregation reduces landfill waste by 70%</p>
                      <p>♻️ Recycling one aluminum can saves energy to power a TV for 3 hours</p>
                      <p>🌱 Composting reduces methane emissions by 50%</p>
                      <p>💡 1 ton of recycled paper saves 17 trees</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CitizenPortal;
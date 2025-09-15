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
    points: 450,
    rank: 42,
    scansToday: 8,
    totalScans: 157,
    badges: ['🌱 Eco Starter', '♻️ Recycler', '🏆 Community Hero']
  };

  const leaderboard = [
    { rank: 1, name: 'Sunrise School', points: 1200, type: 'School', emoji: '🥇' },
    { rank: 2, name: 'Green Valley Society', points: 980, type: 'Society', emoji: '🥈' },
    { rank: 3, name: 'Ward 14', points: 860, type: 'Ward', emoji: '🥉' },
    { rank: 4, name: 'Eco Club College', points: 750, type: 'School', emoji: '4' },
    { rank: 5, name: 'BlueSky Apartments', points: 600, type: 'Society', emoji: '5' },
  ];

  const rewards = [
    { name: '5% Discount – GreenMart', points: 50, image: '🏷️', available: true, type: 'coupon' },
    { name: 'Free Cloth Bag – EcoShop', points: 100, image: '🛍️', available: true, type: 'coupon' },
    { name: 'Plant Sapling Kit', points: 300, image: '🌱', available: true, type: 'product' },
    { name: 'Recycled Notebook', points: 200, image: '📓', available: true, type: 'product' },
  ];

  const handleQRScan = () => {
    if (!qrInput.trim()) {
      toast.error('Please enter a QR code to scan');
      return;
    }

    // Simulate QR scanning result
    const isCorrect = Math.random() > 0.3; // 70% chance of correct disposal
    const points = isCorrect ? 10 : 0;
    
    setLastScan({ result: isCorrect ? 'correct' : 'incorrect', points });
    
    if (isCorrect) {
      toast.success('✅ Waste disposal logged successfully! +10 points');
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
            <TabsList className="grid grid-cols-2 lg:grid-cols-6 w-full">
              <TabsTrigger value="scanner">🔍 QR Scanner</TabsTrigger>
              <TabsTrigger value="dashboard">🏆 Rewards</TabsTrigger>
              <TabsTrigger value="leaderboard">📊 Leaderboard</TabsTrigger>
              <TabsTrigger value="report">⚠️ Report Issues</TabsTrigger>
              <TabsTrigger value="awareness">📚 Awareness</TabsTrigger>
              <TabsTrigger value="green-score">🌿 Green Score</TabsTrigger>
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
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-102">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{reward.image}</span>
                            <div>
                              <div className="font-medium">{reward.name}</div>
                              <div className="text-sm text-muted-foreground">{reward.points} points</div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {reward.type}
                              </Badge>
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
                      <div key={entry.rank} className="flex items-center justify-between p-4 border rounded-lg hover:bg-card-hover hover:scale-105 transition-all duration-200 hover:shadow-md">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">
                            {entry.emoji}
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

            {/* Green Score Tab */}
            <TabsContent value="green-score">
              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-success" />
                    Your Green Score
                  </CardTitle>
                  <CardDescription>
                    Track your environmental impact and carbon credits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border">
                      <div className="text-4xl font-bold text-primary mb-2">78</div>
                      <div className="text-lg font-semibold mb-1">Green Score</div>
                      <div className="text-sm text-muted-foreground">out of 100</div>
                      <div className="mt-4">
                        <div className="w-full bg-muted rounded-full h-3">
                          <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border">
                      <div className="text-4xl font-bold text-secondary mb-2">45</div>
                      <div className="text-lg font-semibold mb-1">Carbon Credits</div>
                      <div className="text-sm text-muted-foreground">accumulated</div>
                      <Button variant="outline" className="mt-4 w-full">
                        <Star className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border">
                      <div className="text-4xl font-bold text-accent-orange mb-2">₹450</div>
                      <div className="text-lg font-semibold mb-1">Redeemable Value</div>
                      <div className="text-sm text-muted-foreground">in partner shops</div>
                      <Button className="btn-primary mt-4 w-full">
                        <Gift className="mr-2 h-4 w-4" />
                        Redeem Now
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">💡 Improve Your Score</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Scan more bins correctly (+5 points each)</li>
                      <li>• Complete weekly challenges (+20 points)</li>
                      <li>• Help neighbors with segregation (+10 points)</li>
                      <li>• Report waste issues (+15 points)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CitizenPortal;
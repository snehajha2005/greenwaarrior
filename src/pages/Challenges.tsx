import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, Users, Star, Award, Share2, Download,
  Target, Zap, Calendar, TrendingUp, Crown, Medal
} from 'lucide-react';
import { toast } from 'sonner';

const Challenges = () => {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);

  const leaderboardData = {
    neighborhoods: [
      { rank: 1, name: 'Green Valley Society', score: 8450, members: 120, trend: '+15%' },
      { rank: 2, name: 'Eco Park Apartments', score: 7920, members: 95, trend: '+12%' },
      { rank: 3, name: 'Sunrise Community', score: 7350, members: 78, trend: '+8%' },
      { rank: 4, name: 'Nature View Heights', score: 6890, members: 102, trend: '+5%' },
      { rank: 5, name: 'Clean City Residency', score: 6420, members: 88, trend: '+3%' },
    ],
    colleges: [
      { rank: 1, name: 'Green Tech University', score: 12450, members: 1200, trend: '+22%' },
      { rank: 2, name: 'Eco Science College', score: 11280, members: 950, trend: '+18%' },
      { rank: 3, name: 'Sustainable Arts Institute', score: 10150, members: 780, trend: '+15%' },
      { rank: 4, name: 'Environmental Studies Academy', score: 9650, members: 890, trend: '+12%' },
      { rank: 5, name: 'Clean Future University', score: 8920, members: 670, trend: '+9%' },
    ]
  };

  const activeWins = [
    {
      title: 'Weekly Waste Warriors',
      description: 'Most bins scanned this week',
      winner: 'Green Valley Society',
      prize: '₹5,000 Community Fund',
      participants: 45,
      endDate: '2024-01-21'
    },
    {
      title: 'Monthly Eco Champions',
      description: 'Highest segregation accuracy',
      winner: 'Green Tech University',
      prize: 'Sustainability Workshop',
      participants: 128,
      endDate: '2024-01-31'
    }
  ];

  const currentChallenges = [
    {
      id: 'recycling-race',
      title: 'February Recycling Race',
      description: 'Collect and properly segregate 1000 recyclable items',
      target: 1000,
      current: 750,
      prize: '₹10,000 + Eco Certificates',
      deadline: '2024-02-29',
      participants: 89,
      type: 'Community'
    },
    {
      id: 'zero-waste-week',
      title: 'Zero Waste Challenge',
      description: 'Achieve zero landfill waste for 7 consecutive days',
      target: 7,
      current: 4,
      prize: 'Green Warrior Badge + ₹2,000',
      deadline: '2024-02-15',
      participants: 156,
      type: 'Individual'
    },
    {
      id: 'composting-champion',
      title: 'Composting Champions',
      description: 'Create 50kg of quality compost from organic waste',
      target: 50,
      current: 32,
      prize: 'Gardening Kit + Recognition',
      deadline: '2024-03-10',
      participants: 34,
      type: 'Household'
    }
  ];

  const achievements = [
    { name: 'Waste Warrior', icon: '⚔️', earned: true, date: '2024-01-10' },
    { name: 'Recycling Pro', icon: '♻️', earned: true, date: '2024-01-15' },
    { name: 'Compost Master', icon: '🌱', earned: false, date: null },
    { name: 'Community Leader', icon: '👑', earned: false, date: null },
    { name: 'Eco Champion', icon: '🏆', earned: true, date: '2024-01-20' },
    { name: 'Green Guru', icon: '🧘', earned: false, date: null },
  ];

  const joinChallenge = (challengeId: string) => {
    setActiveChallenge(challengeId);
    toast.success('Successfully joined the challenge! Let\'s make a difference! 🌱');
  };

  const shareResults = () => {
    toast.success('Results shared successfully! Inspiring others to join the green movement! 📱');
  };

  const downloadCertificate = (achievement: string) => {
    toast.success(`${achievement} certificate download started! 📜`);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Community Challenges
            </h1>
            <p className="text-xl text-muted-foreground">
              Compete, collaborate, and create a cleaner future together
            </p>
          </div>

          <Tabs defaultValue="leaderboard" className="space-y-8">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="winners">Recent Winners</TabsTrigger>
            </TabsList>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Neighborhoods */}
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Top Neighborhoods
                    </CardTitle>
                    <CardDescription>
                      Leading residential communities this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboardData.neighborhoods.map((entry) => (
                        <div key={entry.rank} className="flex items-center justify-between p-4 border rounded-lg hover:bg-card-hover transition-colors">
                          <div className="flex items-center gap-4">
                            {getRankIcon(entry.rank)}
                            <div>
                              <div className="font-medium">{entry.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {entry.members} members
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">{entry.score.toLocaleString()}</div>
                            <div className="text-xs text-success flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {entry.trend}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Colleges */}
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-accent-yellow" />
                      Top Colleges
                    </CardTitle>
                    <CardDescription>
                      Leading educational institutions this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboardData.colleges.map((entry) => (
                        <div key={entry.rank} className="flex items-center justify-between p-4 border rounded-lg hover:bg-card-hover transition-colors">
                          <div className="flex items-center gap-4">
                            {getRankIcon(entry.rank)}
                            <div>
                              <div className="font-medium">{entry.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {entry.members} students
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">{entry.score.toLocaleString()}</div>
                            <div className="text-xs text-success flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {entry.trend}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button onClick={shareResults} className="btn-secondary">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Leaderboard
                </Button>
              </div>
            </TabsContent>

            {/* Active Challenges Tab */}
            <TabsContent value="challenges" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {currentChallenges.map((challenge) => (
                  <Card key={challenge.id} className="card-eco">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <Badge variant="outline">{challenge.type}</Badge>
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{challenge.current}/{challenge.target}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(challenge.current / challenge.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-accent-yellow" />
                          <span>{challenge.prize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>Ends {challenge.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-secondary" />
                          <span>{challenge.participants} participants</span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => joinChallenge(challenge.id)} 
                        className={`w-full ${activeChallenge === challenge.id ? 'btn-secondary' : 'btn-primary'}`}
                        disabled={activeChallenge === challenge.id}
                      >
                        {activeChallenge === challenge.id ? (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
                            Joined!
                          </>
                        ) : (
                          <>
                            <Target className="mr-2 h-4 w-4" />
                            Join Challenge
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className={`card-eco ${achievement.earned ? 'border-primary' : ''}`}>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{achievement.name}</h3>
                          {achievement.earned ? (
                            <p className="text-sm text-success">Earned on {achievement.date}</p>
                          ) : (
                            <p className="text-sm text-muted-foreground">Not yet earned</p>
                          )}
                        </div>
                        {achievement.earned ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => downloadCertificate(achievement.name)}
                            className="w-full"
                          >
                            <Download className="mr-2 h-3 w-3" />
                            Download Certificate
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            In Progress
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recent Winners Tab */}
            <TabsContent value="winners">
              <div className="grid lg:grid-cols-2 gap-6">
                {activeWins.map((winner, index) => (
                  <Card key={index} className="card-eco">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent-yellow" />
                        {winner.title}
                      </CardTitle>
                      <CardDescription>{winner.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Crown className="h-6 w-6 text-yellow-500" />
                          <div>
                            <div className="font-bold text-lg">{winner.winner}</div>
                            <div className="text-sm text-muted-foreground">Champion</div>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-accent-yellow" />
                            <span>{winner.prize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{winner.participants} participants</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-secondary" />
                            <span>Ended {winner.endDate}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Star className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
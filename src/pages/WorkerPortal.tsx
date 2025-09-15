import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, Wallet, CheckCircle, MapPin, Clock, 
  Shield, BookOpen, DollarSign, Award, Calendar,
  Truck, AlertCircle, Star
} from 'lucide-react';
import { toast } from 'sonner';

const WorkerPortal = () => {
  const [workerId, setWorkerId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const workerData = {
    id: 'GW2024001',
    name: 'Rajesh Kumar',
    earnings: 2350,
    incentives: 500,
    tasksCompleted: 89,
    rating: 4.8,
    level: 'Senior Collector'
  };

  const todayTasks = [
    { id: 1, location: 'Bin #14 – Park Road', bins: 25, status: 'completed', time: '09:00 AM', emoji: '✅' },
    { id: 2, location: 'Bin #22 – Main Market', bins: 18, status: 'pending', time: '11:30 AM', emoji: '❌' },
    { id: 3, location: 'Bin #27 – School Lane', bins: 32, status: 'pending', time: '02:00 PM', emoji: '❌' },
    { id: 4, location: 'Bin #31 – Community Center', bins: 22, status: 'pending', time: '04:30 PM', emoji: '❌' },
  ];

  const handleLogin = () => {
    if (!workerId.trim()) {
      toast.error('Please enter your Worker ID');
      return;
    }
    
    setIsLoggedIn(true);
    toast.success('Welcome back, Rajesh! Ready for today\'s tasks.');
  };

  const handleTaskComplete = (taskId: number) => {
    toast.success('Task marked as completed! ₹150 added to your wallet.');
  };

  const LoginForm = () => (
    <div className="max-w-md mx-auto">
      <Card className="card-eco">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Worker Login
          </CardTitle>
          <CardDescription>
            Enter your digital worker ID to access your portal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="worker-id">Worker ID</Label>
            <Input
              id="worker-id"
              placeholder="Enter your Worker ID"
              value={workerId}
              onChange={(e) => setWorkerId(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin} className="btn-primary w-full">
            <User className="mr-2 h-4 w-4" />
            Access Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 pb-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                Worker Portal
              </h1>
              <p className="text-xl text-muted-foreground">
                Digital platform for waste management workers
              </p>
            </div>
            <LoginForm />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-heading font-bold text-foreground">
                Welcome, {workerData.name}
              </h1>
              <p className="text-xl text-muted-foreground">Worker ID: {workerData.id}</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {workerData.level}
            </Badge>
          </div>

          <Tabs defaultValue="tasks" className="space-y-8">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
              <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
              <TabsTrigger value="wallet">E-Wallet</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Daily Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                <Card className="card-eco">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                      <div className="text-2xl font-bold text-success">{workerData.tasksCompleted}</div>
                      <div className="text-sm text-muted-foreground">Tasks Completed</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="card-eco">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Star className="h-8 w-8 text-accent-yellow mx-auto mb-2" />
                      <div className="text-2xl font-bold text-accent-yellow">{workerData.rating}</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="card-eco">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">4</div>
                      <div className="text-sm text-muted-foreground">Tasks Today</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Today's Route & Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:scale-102 transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <div className="text-xl">
                            {task.emoji}
                          </div>
                          <div>
                            <div className="font-medium">{task.location}</div>
                            <div className="text-sm text-muted-foreground">
                              {task.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            task.status === 'completed' ? 'default' : 'outline'
                          }>
                            {task.status === 'completed' ? 'Completed' : 'Pending'}
                          </Badge>
                          {task.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleTaskComplete(task.id)}
                              className="btn-primary"
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* E-Wallet Tab */}
            <TabsContent value="wallet" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      Earnings Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <DollarSign className="h-6 w-6 text-success mx-auto mb-2" />
                        <div className="text-2xl font-bold text-success">₹{workerData.earnings}</div>
                        <div className="text-sm text-muted-foreground">Base Earnings</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-primary">₹{workerData.incentives}</div>
                        <div className="text-sm text-muted-foreground">Incentives</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">
                          ₹{workerData.earnings + workerData.incentives}
                        </div>
                        <div className="text-sm text-muted-foreground">Total This Month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { type: 'Task Completion', amount: 150, time: '2 hours ago' },
                        { type: 'Quality Bonus', amount: 50, time: '5 hours ago' },
                        { type: 'Task Completion', amount: 150, time: '1 day ago' },
                        { type: 'Efficiency Incentive', amount: 100, time: '2 days ago' },
                      ].map((transaction, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <div>
                            <div className="font-medium">{transaction.type}</div>
                            <div className="text-sm text-muted-foreground">{transaction.time}</div>
                          </div>
                          <div className="font-bold text-success">+₹{transaction.amount}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Training Tab */}
            <TabsContent value="training">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Safety Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-lg">🧤</span>
                        <span>Always wear protective gloves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">😷</span>
                        <span>Use masks for dust protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">🦺</span>
                        <span>Wear reflective safety jackets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lg">⚠️</span>
                        <span>Handle hazardous waste carefully</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle>Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Check bin segregation before collection</li>
                      <li>• Maintain route efficiency</li>
                      <li>• Document any issues found</li>
                      <li>• Engage positively with citizens</li>
                      <li>• Keep vehicles clean and organized</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-warning" />
                      Emergency Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium">Supervisor</div>
                        <div className="text-muted-foreground">+91 98765 43210</div>
                      </div>
                      <div>
                        <div className="font-medium">Medical Emergency</div>
                        <div className="text-muted-foreground">108</div>
                      </div>
                      <div>
                        <div className="font-medium">Control Room</div>
                        <div className="text-muted-foreground">+91 11 2345 6789</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Name</Label>
                      <div className="font-medium">{workerData.name}</div>
                    </div>
                    <div>
                      <Label>Worker ID</Label>
                      <div className="font-medium">{workerData.id}</div>
                    </div>
                    <div>
                      <Label>Level</Label>
                      <div className="font-medium">{workerData.level}</div>
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <div className="font-medium flex items-center gap-2">
                        {workerData.rating} <Star className="h-4 w-4 text-accent-yellow" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-eco lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{workerData.tasksCompleted}</div>
                        <div className="text-sm text-muted-foreground">Tasks Done</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">96%</div>
                        <div className="text-sm text-muted-foreground">On-Time Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning">12</div>
                        <div className="text-sm text-muted-foreground">Days Streak</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-info">5</div>
                        <div className="text-sm text-muted-foreground">Commendations</div>
                      </div>
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

export default WorkerPortal;
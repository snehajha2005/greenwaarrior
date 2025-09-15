import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Trophy, Star, Play, Download, 
  Gamepad2, Brain, Award, CheckCircle, Target
} from 'lucide-react';
import { toast } from 'sonner';
import kidsGameImage from '@/assets/kids-game.png';

const Learning = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [gameItems, setGameItems] = useState([
    { id: 1, item: '🍌', type: 'organic', dropped: false },
    { id: 2, item: '🥤', type: 'recyclable', dropped: false },
    { id: 3, item: '🔋', type: 'hazardous', dropped: false },
    { id: 4, item: '🍎', type: 'organic', dropped: false },
    { id: 5, item: '📱', type: 'hazardous', dropped: false },
    { id: 6, item: '📰', type: 'recyclable', dropped: false },
  ]);

  const quizQuestions = [
    {
      question: "Which bin should you use for banana peels?",
      options: ["Green Bin", "Blue Bin", "Red Bin"],
      correct: 0
    },
    {
      question: "Where do plastic bottles belong?",
      options: ["Red Bin", "Blue Bin", "Green Bin"],
      correct: 1
    },
    {
      question: "What should you do with old batteries?",
      options: ["Green Bin", "Blue Bin", "Red Bin"],
      correct: 2
    },
    {
      question: "Which material decomposes fastest?",
      options: ["Plastic bottle", "Banana peel", "Glass jar"],
      correct: 1
    }
  ];

  const resources = [
    {
      title: "Waste Segregation Guide",
      type: "PDF",
      description: "Complete guide to proper waste segregation",
      icon: Download,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Recycling Video Tutorial",
      type: "Video",
      description: "5-minute video on home recycling",
      icon: Play,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Composting Basics",
      type: "Article",
      description: "Learn to create compost at home",
      icon: BookOpen,
      color: "bg-amber-100 text-amber-700"
    }
  ];

  const handleDrop = (itemId: number, binType: string) => {
    const item = gameItems.find(i => i.id === itemId);
    if (item && item.type === binType) {
      setGameItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, dropped: true } : i
      ));
      toast.success("Correct! Well done! 🎉");
    } else {
      toast.error("Try again! Check the segregation guide.");
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      toast.success("Correct! Great job! 🌟");
    } else {
      toast.error("Not quite right. Keep learning!");
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      toast.success(`Quiz completed! Your score: ${score + (answerIndex === quizQuestions[currentQuestion].correct ? 1 : 0)}/${quizQuestions.length}`);
      setQuizStarted(false);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
  };

  const resetGame = () => {
    setGameItems(prev => prev.map(item => ({ ...item, dropped: false })));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Learning Center
            </h1>
            <p className="text-xl text-muted-foreground">
              Fun and interactive way to learn about waste management
            </p>
          </div>

          <Tabs defaultValue="kids-game" className="space-y-8">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
              <TabsTrigger value="kids-game">Kids Game</TabsTrigger>
              <TabsTrigger value="quiz">Quiz Zone</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>

            {/* Kids Game Tab */}
            <TabsContent value="kids-game" className="space-y-6">
              <Card className="card-eco">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Gamepad2 className="h-6 w-6 text-primary" />
                    Segregate the Waste Game
                  </CardTitle>
                  <CardDescription>
                    Drag and drop waste items into the correct bins!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Game Area */}
                    <div className="space-y-6">
                      {/* Waste Items */}
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-dashed border-yellow-300">
                        <h3 className="text-lg font-semibold mb-4 text-center">Waste Items</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {gameItems.filter(item => !item.dropped).map((item) => (
                            <div
                              key={item.id}
                              className="text-4xl cursor-pointer hover:scale-110 transition-transform text-center p-2 bg-white rounded-lg shadow-sm"
                              draggable
                              onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id.toString())}
                            >
                              {item.item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bins */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { type: 'organic', color: 'bg-green-500', label: 'Organic' },
                          { type: 'recyclable', color: 'bg-blue-500', label: 'Recyclable' },
                          { type: 'hazardous', color: 'bg-red-500', label: 'Hazardous' }
                        ].map((bin) => (
                          <div
                            key={bin.type}
                            className={`${bin.color} text-white p-6 rounded-xl text-center min-h-32 flex flex-col justify-center`}
                            onDrop={(e) => {
                              e.preventDefault();
                              const itemId = parseInt(e.dataTransfer.getData('text/plain'));
                              handleDrop(itemId, bin.type);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                          >
                            <div className="text-2xl mb-2">🗑️</div>
                            <div className="font-bold">{bin.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button onClick={resetGame} variant="outline" className="flex-1 hover:scale-105 transition-transform">
                          Reset Game
                        </Button>
                        <Button className="btn-primary flex-1 hover:scale-105 transition-transform">
                          {gameItems.every(item => item.dropped) ? 
                            <>
                              <Trophy className="mr-2 h-4 w-4" />
                              Completed! 🎉
                            </> :
                            `${gameItems.filter(item => item.dropped).length}/${gameItems.length} Sorted`
                          }
                        </Button>
                      </div>
                    </div>

                    {/* Game Image */}
                    <div className="flex items-center justify-center">
                      <img 
                        src={kidsGameImage} 
                        alt="Colorful waste segregation game for kids"
                        className="w-full max-w-md rounded-xl shadow-medium"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="space-y-6">
              <Card className="card-eco">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    Eco Knowledge Quiz
                  </CardTitle>
                  <CardDescription>
                    Test your knowledge about waste management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!quizStarted ? (
                    <div className="text-center space-y-6">
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl">
                        <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Ready to Test Your Knowledge?</h3>
                        <p className="text-muted-foreground mb-6">
                          Answer {quizQuestions.length} questions about waste management and sustainability
                        </p>
                        <Button onClick={startQuiz} className="btn-primary hover:scale-105 transition-transform">
                          Start Quiz
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">
                          Question {currentQuestion + 1} of {quizQuestions.length}
                        </Badge>
                        <Badge variant="secondary">
                          Score: {score}/{quizQuestions.length}
                        </Badge>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-6">
                          {quizQuestions[currentQuestion].question}
                        </h3>
                        <div className="space-y-3">
                          {quizQuestions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground"
                              onClick={() => handleQuizAnswer(index)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => {
                  const IconComponent = resource.icon;
                  return (
                    <Card key={index} className="card-eco">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${resource.color}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          {resource.title}
                        </CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {resource.type}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {resource.description}
                        </p>
                        <Button className="btn-primary w-full hover:scale-105 transition-transform">
                          <Download className="mr-2 h-4 w-4" />
                          Access Resource
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-6 w-6 text-accent-yellow" />
                      Available Certificates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {[
                        { name: 'Waste Segregation Master', requirement: 'Complete quiz with 100% score', earned: false },
                        { name: 'Eco Warrior', requirement: 'Complete kids game 3 times', earned: true },
                        { name: 'Green Champion', requirement: 'Access all resources', earned: false },
                        { name: 'Sustainability Expert', requirement: 'Complete all activities', earned: false },
                      ].map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md hover:scale-102 transition-all duration-200">
                        <div className="flex items-center gap-3">
                          {cert.earned ? 
                            <CheckCircle className="h-5 w-5 text-success" /> :
                            <Target className="h-5 w-5 text-muted-foreground" />
                          }
                          <div>
                            <div className="font-medium">{cert.name}</div>
                            <div className="text-sm text-muted-foreground">{cert.requirement}</div>
                            {cert.earned && (
                              <div className="text-xs text-success mt-1">
                                🏆 This certificate is proudly awarded to [Child's Name] for completing the Green Warrior Waste Learning program.
                              </div>
                            )}
                          </div>
                        </div>
                        {cert.earned && (
                          <Button size="sm" className="btn-primary hover:scale-105 transition-transform">
                            Download
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-6 w-6 text-primary" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Kids Game Completed</span>
                          <span>1/3</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Quiz Attempts</span>
                          <span>2/5</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-secondary h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Resources Accessed</span>
                          <span>1/3</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-accent-orange h-2 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">25%</div>
                          <div className="text-sm text-muted-foreground">Overall Progress</div>
                        </div>
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

export default Learning;
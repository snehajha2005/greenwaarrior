import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('greenwarrior_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ email: '', password: '' });
    
    // Validate form
    let isValid = true;
    
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      isValid = false;
    } else if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      isValid = false;
    }
    
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      isValid = false;
    }
    
    if (!isValid) return;

    setIsLoading(true);
    
    try {
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('greenwarrior_email', email);
      } else {
        localStorage.removeItem('greenwarrior_email');
      }
      
      // Simulate login process - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
      // Store auth token in localStorage (in a real app, this would be a JWT)
      localStorage.setItem('greenwarrior_auth', 'dummy-auth-token');
      
      toast.success('Login successful! Welcome back to Green Warrior 🌱');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <Card className="card-eco shadow-lg border-0">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-primary rounded-full p-3 shadow-md">
                <Leaf className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-heading">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Sign in to your Green Warrior account to continue earning rewards
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={`rounded-xl ${errors.email ? 'border-destructive focus:ring-destructive' : ''}`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    className={`rounded-xl pr-10 ${errors.password ? 'border-destructive focus:ring-destructive' : ''}`}
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              <Button 
                type="submit" 
                className="btn-primary w-full py-6 text-base font-medium transition-all duration-200 hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-8 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up for free
                </Link>
              </p>
              <Link to="/" className="text-sm text-primary hover:underline inline-block">
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
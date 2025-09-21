import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Eye, EyeOff, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Calculate password strength when password field changes
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };
  
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };
  
  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-muted';
    if (passwordStrength === 1) return 'bg-destructive';
    if (passwordStrength === 2) return 'bg-warning';
    if (passwordStrength === 3) return 'bg-info';
    return 'bg-success';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    
    let isValid = true;
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (passwordStrength < 2) {
      newErrors.password = 'Please create a stronger password';
      isValid = false;
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    // Validate terms acceptance
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store auth token in localStorage (in a real app, this would be a JWT)
      localStorage.setItem('greenwarrior_auth', 'dummy-auth-token');
      localStorage.setItem('greenwarrior_user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        joined: new Date().toISOString()
      }));
      
      toast.success('Account created successfully! Welcome to Green Warrior 🌱');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed. Please try again later.');
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
            <CardTitle className="text-2xl md:text-3xl font-heading">Join Green Warrior</CardTitle>
            <CardDescription className="text-base">
              Start earning rewards for making your city cleaner
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`rounded-xl ${errors.name ? 'border-destructive focus:ring-destructive' : ''}`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
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
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
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
                
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-xs font-medium flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        Password Strength: 
                        <span className={`ml-1 ${
                          passwordStrength === 0 ? 'text-muted-foreground' :
                          passwordStrength === 1 ? 'text-destructive' :
                          passwordStrength === 2 ? 'text-warning' :
                          passwordStrength === 3 ? 'text-info' :
                          'text-success'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden flex">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-full w-1/4 ${i < passwordStrength ? getPasswordStrengthColor() : 'bg-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`rounded-xl ${errors.confirmPassword ? 'border-destructive focus:ring-destructive' : ''}`}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                />
                {errors.confirmPassword && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 block text-xs text-muted-foreground">
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Free to join and use
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Instant rewards for eco-actions
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Track your environmental impact
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="btn-primary w-full py-6 text-base font-medium transition-all duration-200 hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-8 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
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

export default Signup;
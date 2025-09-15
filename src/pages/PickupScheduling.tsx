import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, Calendar, MapPin, Clock, CheckCircle, 
  Package, AlertCircle, Phone, Recycle, Zap
} from 'lucide-react';
import { toast } from 'sonner';

const PickupScheduling = () => {
  const [formData, setFormData] = useState({
    address: '',
    wasteType: '',
    quantity: '',
    preferredDate: '',
    preferredTime: '',
    description: '',
    phone: ''
  });

  const trackingData = [
    { 
      id: 'PU2024001', 
      status: 'completed', 
      wasteType: 'E-Waste', 
      date: '2024-01-15',
      location: 'Picked up from Sector 15',
      recycler: 'Green Tech Recyclers'
    },
    { 
      id: 'PU2024002', 
      status: 'in-transit', 
      wasteType: 'Hazardous', 
      date: '2024-01-18',
      location: 'En route to facility',
      recycler: 'Safe Disposal Co.'
    },
    { 
      id: 'PU2024003', 
      status: 'scheduled', 
      wasteType: 'Bulk Items', 
      date: '2024-01-20',
      location: 'Pickup scheduled',
      recycler: 'City Waste Management'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.address || !formData.wasteType || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Pickup scheduled successfully! You will receive confirmation shortly.');
    
    // Reset form
    setFormData({
      address: '',
      wasteType: '',
      quantity: '',
      preferredDate: '',
      preferredTime: '',
      description: '',
      phone: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-transit':
        return <Truck className="h-4 w-4" />;
      case 'scheduled':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Pickup & Scheduling
            </h1>
            <p className="text-xl text-muted-foreground">
              Schedule pickup for e-waste, hazardous materials, and bulk items
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Scheduling Form */}
            <Card className="card-eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Schedule New Pickup
                </CardTitle>
                <CardDescription>
                  Fill out the form to request a special waste pickup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Pickup Address *</Label>
                    <Input
                      id="address"
                      placeholder="Enter complete address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waste-type">Waste Type *</Label>
                    <Select value={formData.wasteType} onValueChange={(value) => handleInputChange('wasteType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select waste type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="e-waste">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            E-Waste (Electronics)
                          </div>
                        </SelectItem>
                        <SelectItem value="hazardous">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Hazardous Materials
                          </div>
                        </SelectItem>
                        <SelectItem value="bulk">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Bulk Items
                          </div>
                        </SelectItem>
                        <SelectItem value="construction">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            Construction Waste
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Estimated Quantity</Label>
                      <Input
                        id="quantity"
                        placeholder="e.g., 2 bags, 5 items"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                          <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the items, accessibility, special instructions..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Pickup
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Tracking System */}
            <div className="space-y-6">
              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Track Your Pickups
                  </CardTitle>
                  <CardDescription>
                    Monitor the status of your scheduled pickups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingData.map((pickup) => (
                      <div key={pickup.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">#{pickup.id}</div>
                            <div className="text-sm text-muted-foreground">{pickup.wasteType}</div>
                          </div>
                          <Badge className={getStatusColor(pickup.status)}>
                            {getStatusIcon(pickup.status)}
                            <span className="ml-1 capitalize">{pickup.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{pickup.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{pickup.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Recycle className="h-3 w-3" />
                            <span>{pickup.recycler}</span>
                          </div>
                        </div>

                        {pickup.status === 'scheduled' && (
                          <Button size="sm" variant="outline" className="w-full">
                            <Phone className="mr-2 h-3 w-3" />
                            Contact Driver
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="text-lg">Pickup Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>E-waste includes phones, laptops, batteries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Hazardous: paints, chemicals, medical waste</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Bulk items: furniture, appliances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Schedule 24 hours in advance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PickupScheduling;
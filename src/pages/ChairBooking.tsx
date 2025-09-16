import { useState } from "react";
import { Calendar, Clock, Armchair, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import officeChairs from "@/assets/office-chairs.jpg";

const chairTypes = [
  {
    id: "ergonomic",
    name: "Ergonomic Chairs",
    description: "Perfect for long work sessions with lumbar support",
    available: 8,
    total: 12,
    color: "bg-blue-500"
  },
  {
    id: "bean-bag",
    name: "Bean Bag Chairs", 
    description: "Comfortable casual seating for creative work",
    available: 3,
    total: 6,
    color: "bg-green-500"
  },
  {
    id: "high-stool",
    name: "High Stools",
    description: "Standing desk compatible with adjustable height",
    available: 5,
    total: 8,
    color: "bg-purple-500"
  }
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
];

export default function ChairBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedChairType, setSelectedChairType] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleBooking = () => {
    if (!selectedDate || !selectedChairType || !selectedTimeSlot || !selectedDuration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all booking details",
        variant: "destructive",
      });
      return;
    }
    setShowConfirmDialog(true);
  };

  const confirmBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your chair has been successfully reserved",
    });
    setShowConfirmDialog(false);
    // Reset form
    setSelectedChairType("");
    setSelectedTimeSlot("");
    setSelectedDuration("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Book a Chair</h1>
          <p className="text-muted-foreground">Reserve your perfect workspace</p>
        </div>
        <div 
          className="hidden md:block w-32 h-20 rounded-lg bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${officeChairs})` }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chair Types */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Armchair className="h-5 w-5" />
            Select Chair Type
          </h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            {chairTypes.map((chair) => (
              <Card 
                key={chair.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedChairType === chair.id 
                    ? "ring-2 ring-primary bg-primary-soft" 
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedChairType(chair.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${chair.color}`} />
                    {selectedChairType === chair.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{chair.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{chair.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={chair.available > 0 ? "default" : "destructive"}>
                      {chair.available} available
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      of {chair.total}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Select Time & Duration
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Start Time
                </label>
                <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Duration
                </label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar & Booking Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-2 font-medium">
                  {selectedDate?.toLocaleDateString() || "Not selected"}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Chair Type:</span>
                <span className="ml-2 font-medium">
                  {selectedChairType ? 
                    chairTypes.find(c => c.id === selectedChairType)?.name : 
                    "Not selected"
                  }
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Time:</span>
                <span className="ml-2 font-medium">
                  {selectedTimeSlot || "Not selected"}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2 font-medium">
                  {selectedDuration ? `${selectedDuration} minutes` : "Not selected"}
                </span>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={handleBooking}
                disabled={!selectedDate || !selectedChairType || !selectedTimeSlot || !selectedDuration}
              >
                Book Chair
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              Please review your booking details before confirming.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chair Type:</span>
              <span className="font-medium">
                {chairTypes.find(c => c.id === selectedChairType)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{selectedTimeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{selectedDuration} minutes</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={confirmBooking}>
              <Check className="h-4 w-4 mr-2" />
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
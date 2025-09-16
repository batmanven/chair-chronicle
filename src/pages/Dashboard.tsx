import { Calendar, Clock, Armchair, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import heroChairs from "@/assets/hero-chairs.jpg";

export default function Dashboard() {
  const upcomingBookings = [
    { id: 1, chair: "Ergonomic Chair #12", time: "10:00 AM - 12:00 PM", date: "Today", status: "confirmed" },
    { id: 2, chair: "Bean Bag #5", time: "2:00 PM - 4:00 PM", date: "Tomorrow", status: "confirmed" },
    { id: 3, chair: "High Stool #8", time: "9:00 AM - 11:00 AM", date: "Dec 16", status: "pending" },
  ];

  const quickStats = [
    {
      title: "Active Bookings",
      value: "3",
      description: "Current reservations",
      icon: Calendar,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Hours This Week",
      value: "8.5",
      description: "Total chair time",
      icon: Clock,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Favorite Chair",
      value: "Ergonomic",
      description: "Most booked type",
      icon: Armchair,
    },
    {
      title: "Booking Success",
      value: "98%",
      description: "Success rate",
      icon: TrendingUp,
      trend: { value: 2, isPositive: true }
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-primary-foreground">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroChairs})` }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-lg text-primary-foreground/90">
            Ready to book your perfect workspace chair?
          </p>
          <Button 
            className="mt-4 bg-white text-primary hover:bg-white/90"
            size="lg"
          >
            Book a Chair Now
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <div
            key={stat.title}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <DashboardCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Bookings */}
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{booking.chair}</h4>
                  <p className="text-sm text-muted-foreground">
                    {booking.date} • {booking.time}
                  </p>
                </div>
                <Badge 
                  variant={booking.status === "confirmed" ? "default" : "secondary"}
                  className="ml-2"
                >
                  {booking.status === "confirmed" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {booking.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start h-12" variant="outline">
              <Armchair className="h-5 w-5 mr-3" />
              Browse Available Chairs
            </Button>
            <Button className="w-full justify-start h-12" variant="outline">
              <Calendar className="h-5 w-5 mr-3" />
              View Calendar
            </Button>
            <Button className="w-full justify-start h-12" variant="outline">
              <Users className="h-5 w-5 mr-3" />
              Popular Booking Times
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
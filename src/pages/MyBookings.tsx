import { useState } from "react";
import { Calendar, Clock, Armchair, MoreHorizontal, Edit3, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const upcomingBookings = [
  {
    id: 1,
    chair: "Ergonomic Chair #12",
    type: "Ergonomic",
    date: "2024-12-15",
    time: "10:00 AM - 12:00 PM",
    status: "confirmed",
    location: "Floor 2, Zone A"
  },
  {
    id: 2,
    chair: "Bean Bag #5",
    type: "Bean Bag",
    date: "2024-12-16",
    time: "2:00 PM - 4:00 PM",
    status: "confirmed",
    location: "Floor 1, Lounge"
  },
  {
    id: 3,
    chair: "High Stool #8",
    type: "High Stool",
    date: "2024-12-17",
    time: "9:00 AM - 11:00 AM",
    status: "pending",
    location: "Floor 3, Standing Area"
  }
];

const pastBookings = [
  {
    id: 4,
    chair: "Ergonomic Chair #15",
    type: "Ergonomic",
    date: "2024-12-10",
    time: "1:00 PM - 3:00 PM",
    status: "completed",
    location: "Floor 2, Zone B"
  },
  {
    id: 5,
    chair: "Bean Bag #3",
    type: "Bean Bag",
    date: "2024-12-08",
    time: "10:00 AM - 12:00 PM",
    status: "completed",
    location: "Floor 1, Lounge"
  },
  {
    id: 6,
    chair: "High Stool #2",
    type: "High Stool",
    date: "2024-12-05",
    time: "3:00 PM - 5:00 PM",
    status: "cancelled",
    location: "Floor 3, Standing Area"
  }
];

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default">Confirmed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCancelBooking = (id: number, chair: string) => {
    toast({
      title: "Booking Cancelled",
      description: `Your booking for ${chair} has been cancelled`,
    });
  };

  const handleEditBooking = (id: number, chair: string) => {
    toast({
      title: "Edit Booking",
      description: `Editing functionality for ${chair} will be available soon`,
    });
  };

  const BookingTable = ({ bookings, showActions = false }: { bookings: any[], showActions?: boolean }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Chair</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          {showActions && <TableHead className="w-[50px]"></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Armchair className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{booking.chair}</p>
                  <p className="text-sm text-muted-foreground">{booking.type}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {new Date(booking.date).toLocaleDateString()}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {booking.time}
              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {booking.location}
            </TableCell>
            <TableCell>
              {getStatusBadge(booking.status)}
            </TableCell>
            {showActions && (
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditBooking(booking.id, booking.chair)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Booking
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleCancelBooking(booking.id, booking.chair)}
                      className="text-destructive"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground">Manage your chair reservations</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground shadow-primary">
          <Armchair className="h-4 w-4 mr-2" />
          Book New Chair
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary-soft rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-success/10 rounded-lg">
                <Clock className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">12.5</p>
                <p className="text-sm text-muted-foreground">Hours This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Armchair className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">Ergonomic</p>
                <p className="text-sm text-muted-foreground">Favorite Chair Type</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Bookings ({upcomingBookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length > 0 ? (
                <BookingTable bookings={upcomingBookings} showActions={true} />
              ) : (
                <div className="text-center py-8">
                  <Armchair className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming bookings</p>
                  <Button className="mt-4" variant="outline">
                    Book Your First Chair
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Past Bookings ({pastBookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pastBookings.length > 0 ? (
                <BookingTable bookings={pastBookings} />
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No past bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
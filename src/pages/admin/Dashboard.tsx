import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Car,
  FileText,
  Home,
  Menu,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Expenses", href: "/admin/expenses", icon: Car },
  { name: "Session Logger", href: "/admin/session-logger", icon: FileText },
];

const upcomingAppointments = [
  {
    id: 1,
    client: "John Smith",
    service: "Loan Signing",
    date: "Today",
    time: "2:00 PM",
    location: "123 Main St, Houston",
    status: "confirmed",
  },
  {
    id: 2,
    client: "Sarah Johnson",
    service: "General Notary",
    date: "Today",
    time: "4:30 PM",
    location: "456 Oak Ave, Houston",
    status: "pending",
  },
  {
    id: 3,
    client: "Michael Brown",
    service: "RON",
    date: "Tomorrow",
    time: "10:00 AM",
    location: "Remote",
    status: "confirmed",
  },
];

const recentClients = [
  { name: "John Smith", email: "john@example.com", signings: 3 },
  { name: "Sarah Johnson", email: "sarah@example.com", signings: 1 },
  { name: "Michael Brown", email: "michael@example.com", signings: 2 },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentDate = new Date();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-primary-foreground/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <FileText className="w-4 h-4 text-secondary-foreground" />
            </div>
            <span className="font-serif font-bold text-primary-foreground">
              ReFurrm Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-primary-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button asChild variant="hero" className="w-full">
            <Link to="/">View Website</Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-16 bg-card border-b border-border flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-foreground hover:text-primary"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center justify-between ml-4 lg:ml-0">
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            <div className="text-sm text-muted-foreground">
              {currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Today's Appointments", value: "3", icon: Calendar, color: "text-secondary" },
              { label: "This Month Revenue", value: "$2,450", icon: DollarSign, color: "text-secondary" },
              { label: "Total Clients", value: "47", icon: Users, color: "text-secondary" },
              { label: "Miles This Month", value: "342", icon: Car, color: "text-secondary" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Appointments */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled signings</CardDescription>
                </div>
                <Button size="sm" variant="gold">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{apt.client}</span>
                          <Badge
                            variant={apt.status === "confirmed" ? "default" : "secondary"}
                            className={apt.status === "confirmed" ? "bg-secondary text-secondary-foreground" : ""}
                          >
                            {apt.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {apt.date}, {apt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {apt.location}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">{apt.service}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Clients */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Your client directory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClients.map((client) => (
                    <div
                      key={client.email}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                      <Badge variant="outline">{client.signings} signings</Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Clients
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Log Mileage", icon: Car, href: "/admin/expenses" },
              { label: "Add Expense", icon: DollarSign, href: "/admin/expenses" },
              { label: "Log Session", icon: FileText, href: "/admin/session-logger" },
              { label: "Add Client", icon: Users, href: "/admin/clients" },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-secondary hover:shadow-md transition-all"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{action.label}</span>
              </Link>
            ))}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;

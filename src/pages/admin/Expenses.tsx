import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Calendar,
  Car,
  DollarSign,
  Menu,
  X,
  Home,
  Users,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Expenses", href: "/admin/expenses", icon: Car },
  { name: "Session Logger", href: "/admin/session-logger", icon: FileText },
];

const mileageEntries = [
  {
    id: 1,
    date: "2024-01-15",
    purpose: "Loan Signing - John Smith",
    startLocation: "Office",
    endLocation: "123 Main St, Houston",
    miles: 24,
    rate: 0.67,
  },
  {
    id: 2,
    date: "2024-01-15",
    purpose: "General Notary - Sarah Johnson",
    startLocation: "123 Main St, Houston",
    endLocation: "456 Oak Ave, Houston",
    miles: 12,
    rate: 0.67,
  },
  {
    id: 3,
    date: "2024-01-14",
    purpose: "Loan Signing - Michael Brown",
    startLocation: "Office",
    endLocation: "789 Pine Rd, Houston",
    miles: 31,
    rate: 0.67,
  },
];

const expenses = [
  {
    id: 1,
    date: "2024-01-12",
    category: "Supplies",
    description: "Notary stamps and ink",
    amount: 45.99,
    receipt: true,
  },
  {
    id: 2,
    date: "2024-01-10",
    category: "Software",
    description: "Document signing platform subscription",
    amount: 29.99,
    receipt: true,
  },
  {
    id: 3,
    date: "2024-01-05",
    category: "Marketing",
    description: "Business cards printing",
    amount: 89.00,
    receipt: true,
  },
];

const expenseCategories = [
  "Supplies",
  "Software",
  "Marketing",
  "Insurance",
  "Education",
  "Professional Fees",
  "Other",
];

const Expenses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMileageDialogOpen, setIsMileageDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

  const totalMiles = mileageEntries.reduce((sum, entry) => sum + entry.miles, 0);
  const totalMileageValue = mileageEntries.reduce((sum, entry) => sum + entry.miles * entry.rate, 0);
  const totalExpenses = expenses.reduce((sum, entry) => sum + entry.amount, 0);

  const handleAddMileage = () => {
    toast.success("Mileage entry added successfully");
    setIsMileageDialogOpen(false);
  };

  const handleAddExpense = () => {
    toast.success("Expense entry added successfully");
    setIsExpenseDialogOpen(false);
  };

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
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.href === "/admin/expenses"
                  ? "bg-primary-foreground/10 text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
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
            <h1 className="text-lg font-semibold text-foreground">Business Tracker</h1>
          </div>
        </header>

        {/* Expenses Content */}
        <main className="p-4 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Miles (Month)</p>
                    <p className="text-2xl font-bold text-foreground">{totalMiles}</p>
                  </div>
                  <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                    <Car className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage Deduction</p>
                    <p className="text-2xl font-bold text-foreground">${totalMileageValue.toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Other Expenses</p>
                    <p className="text-2xl font-bold text-foreground">${totalExpenses.toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="mileage" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="mileage" className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Mileage
                </TabsTrigger>
                <TabsTrigger value="expenses" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Expenses
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Dialog open={isMileageDialogOpen} onOpenChange={setIsMileageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Car className="w-4 h-4 mr-2" />
                      Log Mileage
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Log Mileage</DialogTitle>
                      <DialogDescription>
                        Record business travel for tax deductions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Purpose / Client</Label>
                        <Input placeholder="e.g., Loan Signing - John Smith" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Location</Label>
                          <Input placeholder="e.g., Office" />
                        </div>
                        <div className="space-y-2">
                          <Label>End Location</Label>
                          <Input placeholder="e.g., Client address" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Miles Driven</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsMileageDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="gold" onClick={handleAddMileage}>
                        Save Entry
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="gold" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Expense</DialogTitle>
                      <DialogDescription>
                        Record a business expense
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {expenseCategories.map((cat) => (
                              <SelectItem key={cat} value={cat.toLowerCase()}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input placeholder="What was the expense for?" />
                      </div>
                      <div className="space-y-2">
                        <Label>Amount</Label>
                        <Input type="number" placeholder="0.00" step="0.01" />
                      </div>
                      <div className="space-y-2">
                        <Label>Notes (Optional)</Label>
                        <Textarea placeholder="Additional details" rows={2} />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsExpenseDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="gold" onClick={handleAddExpense}>
                        Save Expense
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <TabsContent value="mileage" className="space-y-4">
              {mileageEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-secondary text-secondary-foreground">
                            {entry.miles} miles
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {entry.date}
                          </span>
                        </div>
                        <p className="font-medium text-foreground mb-1">{entry.purpose}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.startLocation} → {entry.endLocation}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-secondary">
                          ${(entry.miles * entry.rate).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          @ ${entry.rate}/mile
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              {expenses.map((expense) => (
                <Card key={expense.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{expense.category}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {expense.date}
                          </span>
                          {expense.receipt && (
                            <Badge variant="secondary" className="text-xs">
                              Receipt
                            </Badge>
                          )}
                        </div>
                        <p className="font-medium text-foreground">{expense.description}</p>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        ${expense.amount.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
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

export default Expenses;

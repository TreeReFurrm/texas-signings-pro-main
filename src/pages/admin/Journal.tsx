import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Calendar,
  User,
  MapPin,
  ChevronLeft,
  Menu,
  X,
  Home,
  Users,
  Car,
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
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Expenses", href: "/admin/expenses", icon: Car },
  { name: "Journal", href: "/admin/journal", icon: FileText },
];

const journalEntries = [
  {
    id: 1,
    date: "2024-01-15",
    time: "2:30 PM",
    type: "Acknowledgment",
    signerName: "John Smith",
    signerAddress: "123 Main St, Houston, TX 77001",
    idType: "Texas DL",
    idNumber: "****5678",
    documentType: "Deed of Trust",
    fee: "$25.00",
    notes: "Refinance documents for residential property",
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "4:45 PM",
    type: "Jurat",
    signerName: "Sarah Johnson",
    signerAddress: "456 Oak Ave, Houston, TX 77002",
    idType: "US Passport",
    idNumber: "****1234",
    documentType: "Affidavit",
    fee: "$25.00",
    notes: "Personal affidavit for court filing",
  },
  {
    id: 3,
    date: "2024-01-14",
    time: "10:00 AM",
    type: "Acknowledgment",
    signerName: "Michael Brown",
    signerAddress: "789 Pine Rd, Houston, TX 77003",
    idType: "Texas DL",
    idNumber: "****9012",
    documentType: "Power of Attorney",
    fee: "$25.00",
    notes: "Durable POA for healthcare decisions",
  },
];

const notaryActTypes = [
  "Acknowledgment",
  "Jurat",
  "Oath/Affirmation",
  "Copy Certification",
  "Signature Witnessing",
];

const idTypes = [
  "Texas Driver's License",
  "Texas ID Card",
  "US Passport",
  "US Military ID",
  "Other State DL/ID",
];

const Journal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddEntry = () => {
    toast.success("Journal entry added successfully");
    setIsDialogOpen(false);
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
              TMN Admin
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
                item.href === "/admin/journal"
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
            <h1 className="text-lg font-semibold text-foreground">Notary Journal</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gold">
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>New Journal Entry</DialogTitle>
                  <DialogDescription>
                    Record a notarial act for Texas compliance
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Type of Notarial Act</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {notaryActTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Signer's Full Name</Label>
                    <Input placeholder="As shown on ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Signer's Address</Label>
                    <Input placeholder="Full address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ID Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          {idTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>ID Number (Last 4)</Label>
                      <Input placeholder="XXXX" maxLength={4} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Document Type</Label>
                      <Input placeholder="e.g., Deed of Trust" />
                    </div>
                    <div className="space-y-2">
                      <Label>Fee Charged</Label>
                      <Input placeholder="$25.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea placeholder="Additional details about the notarization" rows={3} />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="gold" onClick={handleAddEntry}>
                    Save Entry
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Journal Content */}
        <main className="p-4 lg:p-8">
          {/* Search & Filter */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by signer name or document..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {notaryActTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Journal Entries */}
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className="bg-secondary text-secondary-foreground">
                          {entry.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {entry.date} at {entry.time}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Signer</p>
                          <p className="font-medium text-foreground flex items-center gap-1">
                            <User className="w-4 h-4 text-primary" />
                            {entry.signerName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Document</p>
                          <p className="font-medium text-foreground">{entry.documentType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ID Presented</p>
                          <p className="font-medium text-foreground">
                            {entry.idType} ({entry.idNumber})
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fee</p>
                          <p className="font-medium text-secondary">{entry.fee}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="text-sm text-foreground flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {entry.signerAddress}
                        </p>
                      </div>
                      {entry.notes && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-sm text-muted-foreground">{entry.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
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

export default Journal;

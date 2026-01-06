import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Calendar,
  User,
  MapPin,
  Menu,
  X,
  Home,
  Users,
  Car,
  DollarSign,
  CreditCard,
  Clock,
  Shield,
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
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Expenses", href: "/admin/expenses", icon: Car },
  { name: "Session Logger", href: "/admin/session-logger", icon: FileText },
];

const sessionEntries = [
  {
    id: 1,
    date: "2024-01-15",
    time: "2:30 PM",
    type: "Acknowledgment",
    signerName: "John Smith",
    signerAddress: "123 Main St, Houston, TX 77001",
    idType: "Texas DL",
    idNumber: "****5678",
    idExpiration: "2027-05-15",
    documentType: "Deed of Trust",
    notaryFee: 6.00,
    travelFee: 50.00,
    mileage: 24,
    totalFee: 56.00,
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
    idExpiration: "2029-08-22",
    documentType: "Affidavit",
    notaryFee: 6.00,
    travelFee: 25.00,
    mileage: 12,
    totalFee: 31.00,
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
    idExpiration: "2026-11-30",
    documentType: "Power of Attorney",
    notaryFee: 6.00,
    travelFee: 75.00,
    mileage: 31,
    totalFee: 81.00,
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

const SessionLogger = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    notaryFee: "6.00",
    travelFee: "",
    mileage: "",
  });

  const handleAddEntry = () => {
    toast.success("Session entry logged successfully for Texas compliance");
    setIsDialogOpen(false);
  };

  const totalSessions = sessionEntries.length;
  const totalRevenue = sessionEntries.reduce((sum, e) => sum + e.totalFee, 0);
  const totalMileage = sessionEntries.reduce((sum, e) => sum + e.mileage, 0);

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
                item.href === "/admin/session-logger"
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
            <div>
              <h1 className="text-lg font-semibold text-foreground">Session Logger</h1>
              <p className="text-xs text-muted-foreground">Texas Notary Compliance Record-Keeping</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gold">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Session
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-secondary" />
                    Log Notary Session
                  </DialogTitle>
                  <DialogDescription>
                    Record notarial act details for Texas compliance (Gov. Code §406.014)
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date of Notarization</Label>
                      <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input type="time" />
                    </div>
                  </div>

                  {/* Notarial Act */}
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

                  <Separator />

                  {/* Signer Information */}
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Signer Information
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <Label>Signer's Full Legal Name</Label>
                    <Input placeholder="As shown on identification" />
                  </div>
                  <div className="space-y-2">
                    <Label>Signer's Address</Label>
                    <Input placeholder="Full address including city, state, zip" />
                  </div>

                  <Separator />

                  {/* ID Verification - Texas Requirement */}
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-primary" />
                      ID Verification (Texas Required)
                    </h4>
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
                      <Label>ID Number (Last 4 Digits)</Label>
                      <Input placeholder="XXXX" maxLength={4} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>ID Expiration Date</Label>
                    <Input type="date" />
                  </div>

                  <Separator />

                  {/* Document Details */}
                  <div className="space-y-2">
                    <Label>Document Type/Description</Label>
                    <Input placeholder="e.g., Deed of Trust, Affidavit, POA" />
                  </div>

                  <Separator />

                  {/* Fees & Mileage - Texas Compliance */}
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Fees & Mileage
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Texas max notary fee: $6.00 per signature/seal
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Notary Fee</Label>
                      <Input 
                        type="number" 
                        value={formData.notaryFee}
                        onChange={(e) => setFormData({...formData, notaryFee: e.target.value})}
                        step="0.01"
                        placeholder="6.00" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Travel Fee</Label>
                      <Input 
                        type="number"
                        value={formData.travelFee}
                        onChange={(e) => setFormData({...formData, travelFee: e.target.value})}
                        step="0.01" 
                        placeholder="0.00" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Mileage</Label>
                      <Input 
                        type="number"
                        value={formData.mileage}
                        onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                        placeholder="0" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Session Notes</Label>
                    <Textarea placeholder="Additional details about the notarization" rows={2} />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="gold" onClick={handleAddEntry}>
                    Save Session
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Session Logger Content */}
        <main className="p-4 lg:p-8">
          {/* Texas Compliance Notice */}
          <Card className="mb-6 border-secondary/50 bg-secondary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Texas Compliance Record-Keeping</h3>
                  <p className="text-sm text-muted-foreground">
                    This logger helps you maintain records required under Texas Government Code §406.014. 
                    Records include date, type of act, signer identification, fees charged, and document details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{totalSessions}</p>
                  </div>
                  <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Mileage</p>
                    <p className="text-2xl font-bold text-foreground">{totalMileage} mi</p>
                  </div>
                  <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                    <Car className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filter */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by signer name, document, or ID..."
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

          {/* Session Entries */}
          <div className="space-y-4">
            {sessionEntries.map((entry) => (
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
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Signer</p>
                          <p className="font-medium text-foreground flex items-center gap-1">
                            <User className="w-4 h-4 text-primary" />
                            {entry.signerName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Document</p>
                          <p className="font-medium text-foreground">{entry.documentType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">ID Verified</p>
                          <p className="font-medium text-foreground">
                            {entry.idType} ({entry.idNumber})
                          </p>
                          <p className="text-xs text-muted-foreground">Exp: {entry.idExpiration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Fees</p>
                          <p className="font-semibold text-secondary">${entry.totalFee.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            Notary: ${entry.notaryFee.toFixed(2)} + Travel: ${entry.travelFee.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {entry.signerAddress}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Car className="w-3.5 h-3.5 text-primary" />
                          {entry.mileage} miles
                        </span>
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

export default SessionLogger;

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  FileText,
  Menu,
  X,
  Home,
  Briefcase,
  User,
  LogOut,
  Loader2,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  commission_number: string;
  commission_expiry: string;
  is_available: boolean;
}

const navItems = [
  { name: 'Dashboard', href: '/notary/jobs', icon: Home },
  { name: 'Available Jobs', href: '/notary/jobs', icon: Briefcase },
  { name: 'My Jobs', href: '/notary/my-jobs', icon: FileText },
  { name: 'Profile', href: '/notary/profile', icon: User },
];

const NotaryProfile = () => {
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'TX',
    zip_code: '',
    commission_number: '',
    commission_expiry: '',
    is_available: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { user, signOut, isAdmin } = useAuth();
  const { toast } = useToast();

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setProfile({
        full_name: data.full_name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || 'TX',
        zip_code: data.zip_code || '',
        commission_number: data.commission_number || '',
        commission_expiry: data.commission_expiry || '',
        is_available: data.is_available ?? true
      });
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const saveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        zip_code: profile.zip_code,
        commission_number: profile.commission_number,
        commission_expiry: profile.commission_expiry || null,
        is_available: profile.is_available
      })
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save profile.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Profile saved',
        description: 'Your profile has been updated successfully.'
      });
    }
    
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-primary-foreground/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <FileText className="w-4 h-4 text-secondary-foreground" />
            </div>
            <span className="font-serif font-bold text-primary-foreground">
              ReFurrm
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
          
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-primary-foreground/10 transition-colors mt-4"
            >
              <Briefcase className="w-5 h-5" />
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
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
            <h1 className="text-lg font-semibold text-foreground">My Profile</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8 max-w-3xl">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profile.full_name}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profile.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                  <CardDescription>Your service area base location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={profile.state}
                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip_code">ZIP Code</Label>
                      <Input
                        id="zip_code"
                        value={profile.zip_code}
                        onChange={(e) => setProfile({ ...profile, zip_code: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notary Commission</CardTitle>
                  <CardDescription>Your Texas notary credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commission_number">Commission Number</Label>
                      <Input
                        id="commission_number"
                        value={profile.commission_number}
                        onChange={(e) => setProfile({ ...profile, commission_number: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commission_expiry">Commission Expiry</Label>
                      <Input
                        id="commission_expiry"
                        type="date"
                        value={profile.commission_expiry}
                        onChange={(e) => setProfile({ ...profile, commission_expiry: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Control whether you appear as available for jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Available for jobs</p>
                      <p className="text-sm text-muted-foreground">
                        Turn off when you're not accepting new assignments
                      </p>
                    </div>
                    <Switch
                      checked={profile.is_available}
                      onCheckedChange={(checked) => setProfile({ ...profile, is_available: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                variant="gold" 
                onClick={saveProfile}
                disabled={saving}
                className="w-full md:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          )}
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

export default NotaryProfile;

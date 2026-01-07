import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  List, 
  Map as MapIcon,
  FileText,
  Menu,
  X,
  Home,
  Briefcase,
  User,
  LogOut,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Job {
  id: string;
  service_type: string;
  client_name: string;
  address: string;
  city: string;
  state: string;
  scheduled_date: string;
  scheduled_time: string;
  fee: number;
  travel_fee: number;
  status: string;
  latitude: number | null;
  longitude: number | null;
}

const serviceTypeLabels: Record<string, string> = {
  acknowledgment: 'Acknowledgment',
  jurat: 'Jurat',
  copy_certification: 'Copy Certification',
  oath_affirmation: 'Oath/Affirmation',
  signature_witnessing: 'Signature Witnessing',
  loan_signing: 'Loan Signing'
};

const navItems = [
  { name: 'Dashboard', href: '/notary/jobs', icon: Home },
  { name: 'Available Jobs', href: '/notary/jobs', icon: Briefcase },
  { name: 'My Jobs', href: '/notary/my-jobs', icon: FileText },
  { name: 'Profile', href: '/notary/profile', icon: User },
];

const JobBoard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<'list' | 'map'>('list');
  
  const { user, signOut, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'open')
      .order('scheduled_date', { ascending: true });

    if (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load available jobs.',
        variant: 'destructive'
      });
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const claimJob = async (jobId: string) => {
    if (!user) return;
    
    setClaimingId(jobId);
    
    const { error } = await supabase
      .from('jobs')
      .update({ 
        claimed_by: user.id, 
        status: 'claimed',
        claimed_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .eq('status', 'open');

    if (error) {
      toast({
        title: 'Could not claim job',
        description: 'This job may have already been claimed by another notary.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Job claimed!',
        description: 'This job has been assigned to you.'
      });
      fetchJobs();
    }
    
    setClaimingId(null);
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
            <h1 className="text-lg font-semibold text-foreground">Available Jobs</h1>
            <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'map')}>
              <TabsList>
                <TabsTrigger value="list">
                  <List className="w-4 h-4 mr-2" />
                  List
                </TabsTrigger>
                <TabsTrigger value="map">
                  <MapIcon className="w-4 h-4 mr-2" />
                  Map
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : jobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Jobs Available</h3>
                <p className="text-muted-foreground">
                  Check back soon for new notary opportunities in your area.
                </p>
              </CardContent>
            </Card>
          ) : view === 'list' ? (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                            {serviceTypeLabels[job.service_type] || job.service_type}
                          </Badge>
                          <Badge variant="outline">Open</Badge>
                        </div>
                        
                        <h3 className="font-semibold text-foreground mb-2">
                          {job.client_name}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.address}, {job.city}, {job.state}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {format(new Date(job.scheduled_date), 'MMM d, yyyy')} at {job.scheduled_time}
                          </span>
                          <span className="flex items-center gap-1 text-secondary font-medium">
                            <DollarSign className="w-4 h-4" />
                            ${Number(job.fee) + Number(job.travel_fee)}
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="gold"
                        onClick={() => claimJob(job.id)}
                        disabled={claimingId === job.id}
                      >
                        {claimingId === job.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Claiming...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Claim Job
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Map View</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      To enable the map view, add your Mapbox token.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {jobs.length} jobs available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default JobBoard;

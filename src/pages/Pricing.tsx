import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Home, Car, Monitor, Download, MapPin, Clock, Building2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const standardFees = [
  { service: "First signature (acknowledgment or jurat)", price: "$10" },
  { service: "Each additional signature (same document)", price: "$1" },
  { service: "Administering an oath or affirmation", price: "$10" },
  { service: "Certificate under seal", price: "$10" },
  { service: "Copy of record/paper (per page)", price: "$1" },
  { service: "Deposition (per 100 words)", price: "$1" },
  { service: "Swearing witness to deposition", price: "$10" },
  { service: "Remote Online Notarization (RON) fee", price: "up to $25", note: "Additional to standard fees" },
];

const travelFees = [
  { service: "Base travel fee (within 20 miles)", price: "$50", icon: MapPin },
  { service: "Additional mileage (beyond 20 miles)", price: "$1/mile", icon: Car },
  { service: "After-hours (before 8 AM, after 6 PM, weekends)", price: "$25", icon: Clock },
  { service: "Hospital or nursing home visit", price: "$40", icon: Building2 },
  { service: "Jail or detention center visit", price: "$50", icon: AlertCircle },
  { service: "Printing fee (over 150 pages)", price: "$0.20/page", icon: FileText },
];

const servicePackages = [
  {
    icon: FileText,
    title: "General Notary",
    description: "Standard notarizations for personal and business documents",
    examples: ["Affidavits", "Power of Attorney", "Wills & Trusts", "Contracts"],
  },
  {
    icon: Home,
    title: "Loan Signings",
    description: "Certified signing agent for real estate closings",
    examples: ["Refinances", "Purchases", "HELOCs", "Reverse Mortgages"],
  },
  {
    icon: Car,
    title: "Mobile Services",
    description: "We travel to your location across Texas",
    examples: ["Home Visits", "Office Visits", "Hospitals", "Flexible Hours"],
  },
  {
    icon: Monitor,
    title: "Remote Online Notary",
    description: "Secure video-based notarization from anywhere",
    examples: ["24/7 Availability", "Secure Platform", "Fast Turnaround"],
    comingSoon: true,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              Transparent <span className="text-secondary">Pricing</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Texas law sets maximum notary fees. We charge fair, transparent rates with no hidden costs.
            </p>
          </div>
        </section>

        {/* Standard Notary Fees */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2 text-center">
                Standard Notary Fees
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Maximum fees allowed under Texas law
              </p>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {standardFees.map((fee, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <span className="text-foreground">{fee.service}</span>
                          {fee.note && (
                            <span className="block text-sm text-muted-foreground mt-1">
                              {fee.note}
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-secondary ml-4">{fee.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Travel Fees */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2 text-center">
                Travel Fees
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Separate from notary fees — covers our mobile service
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {travelFees.map((fee, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <fee.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-foreground">{fee.service}</span>
                      </div>
                      <span className="font-semibold text-secondary">{fee.price}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2 text-center">
              Our Services
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Comprehensive notary services tailored to meet your needs
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicePackages.map((service) => (
                <Card
                  key={service.title}
                  className={`relative ${service.comingSoon ? "opacity-90" : ""}`}
                >
                  {service.comingSoon && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-secondary text-secondary-foreground text-xs">
                        Coming Soon
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-serif text-lg">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {service.examples.map((example) => (
                        <li key={example} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Download Section */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                Helpful Resources
              </h2>
              <p className="text-muted-foreground mb-8">
                Download guides and checklists for your notarization needs
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/resources/unclaimed-property-checklist.txt"
                  download="Unclaimed-Property-Claim-Checklist.txt"
                  className="block"
                >
                  <Card className="hover:shadow-md transition-all hover:border-secondary/50 cursor-pointer">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <Download className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Unclaimed Property Checklist</h3>
                        <p className="text-sm text-muted-foreground">
                          Documents needed for Texas unclaimed property claims
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                <a
                  href="/resources/client-intake-script.txt"
                  download="Notary-Client-Intake-Script.txt"
                  className="block"
                >
                  <Card className="hover:shadow-md transition-all hover:border-secondary/50 cursor-pointer">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <Download className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Client Intake Guide</h3>
                        <p className="text-sm text-muted-foreground">
                          Information we'll need to schedule your appointment
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Ready to Book?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Schedule your notarization appointment today. Same-day appointments available!
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/book">Book Appointment</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

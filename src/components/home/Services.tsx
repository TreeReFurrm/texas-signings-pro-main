import { FileText, Home, Monitor, Car } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: FileText,
    title: "General Notary",
    description:
      "Acknowledgments, jurats, oaths, affirmations, and certified copies. All standard notarial acts for personal and business documents.",
    features: ["Affidavits", "Power of Attorney", "Wills & Trusts", "Contracts"],
    comingSoon: false,
  },
  {
    icon: Home,
    title: "Loan Signings",
    description:
      "Certified loan signing agent for real estate closings. Experienced with all major title companies and lenders.",
    features: ["Refinances", "Purchases", "HELOCs", "Reverse Mortgages"],
    comingSoon: false,
  },
  {
    icon: Monitor,
    title: "Remote Online Notary (RON)",
    description:
      "Secure video-based notarization from anywhere. Perfect for out-of-state signers or busy schedules.",
    features: ["24/7 Availability", "Secure Platform", "Digital Documents", "Fast Turnaround"],
    comingSoon: true,
  },
  {
    icon: Car,
    title: "Mobile Services",
    description:
      "We travel to your home, office, hospital, or any location. Flexible scheduling including evenings and weekends.",
    features: ["Home Visits", "Office Visits", "Hospitals", "Flexible Hours"],
    comingSoon: false,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-secondary">Services</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Comprehensive notary services tailored to meet your needs. From simple 
            document notarizations to complex loan signings, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className={`group bg-card hover:shadow-lg transition-all duration-300 border-border hover:border-secondary/50 relative ${
                service.comingSoon ? "opacity-90" : ""
              }`}
            >
              {service.comingSoon && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-secondary text-secondary-foreground text-xs">
                    Coming Soon
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <CardTitle className="font-serif text-xl text-foreground">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

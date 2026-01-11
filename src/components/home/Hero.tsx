import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-notary.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional notary services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              Licensed & Bonded in Texas
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            ReFurrm
            <span className="block text-secondary">Mobile Notary</span>
          </h1>

          <p className="text-lg text-primary-foreground/90 leading-relaxed mb-8 max-w-xl">
            We come to you! Whether it's a real estate closing, legal documents, 
            or personal paperwork — get your documents notarized at your convenience, 
            anywhere in Texas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild variant="hero" size="xl">
              <Link to="/book">Book Appointment</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href="tel:+4792143959">Call Now</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, text: "Same-Day Service" },
              { icon: MapPin, text: "Mobile Across Texas" },
              { icon: Shield, text: "Background Checked" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-foreground/10 backdrop-blur-sm"
              >
                <item.icon className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-primary-foreground">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

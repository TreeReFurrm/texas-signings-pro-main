import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Get Your Documents{" "}
            <span className="text-secondary">Notarized?</span>
          </h2>
          <p className="text-lg text-primary-foreground/90 leading-relaxed mb-10">
            Schedule your appointment with ReFurrm Mobile Notary today and experience 
            professional, convenient notary services wherever you are in Texas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/book" className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Online
              </Link>
            </Button>
            <Button
              asChild
              variant="heroOutline"
              size="xl"
            >
              <a href="tel:+1234567890" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                (123) 456-7890
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

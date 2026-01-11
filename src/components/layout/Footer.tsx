import { Link } from "react-router-dom";
import { FileText, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-primary-foreground leading-tight">
                  ReFurrm
                </span>
                <span className="text-xs text-secondary font-semibold tracking-wider uppercase">
                  Mobile Notary
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Professional mobile notary services across Texas. Available 7 days a week for your convenience.
            </p>
          </div>

          {/* Quick Links */}

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-secondary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/#services" },
                { name: "About", href: "/#about" },
                { name: "Book Now", href: "/book" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-secondary mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>General Notary</li>
              <li>Loan Signings</li>
              <li>Remote Online Notary</li>
              <li>Mobile Services</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-secondary mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@refurrm.com"
                  className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@refurrm.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Serving all of Texas
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} ReFurrm Mobile Notary. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Texas Notary Commission #135540519
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Award, CheckCircle2, Users, Calendar } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Calendar, value: "5+", label: "Years Experience" },
  { icon: Award, value: "100%", label: "Satisfaction Rate" },
];

const qualifications = [
  "Texas-commissioned Notary Public",
  "NNA Certified Signing Agent",
  "Background Checked & Bonded",
  "E&O Insurance Coverage",
  "RON Certified for Remote Notarizations",
  "Continuing Education Maintained",
];

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Your Trusted <span className="text-secondary">Texas Notary</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ReFurrm Mobile Notary is dedicated to providing accurate, professional 
              notary services across Texas. Whether you're closing on your dream home 
              or need personal documents notarized, I'm committed to making the process 
              smooth and convenient.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              As a mobile notary, I bring my services directly to you — saving you 
              time and providing flexibility for your busy schedule. Available 
              evenings and weekends by appointment.
            </p>

            {/* Qualifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {qualifications.map((qual) => (
                <div key={qual} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm text-foreground">{qual}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-primary rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-primary-foreground/10"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-foreground/80">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

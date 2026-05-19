import React from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Globe, Star } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="from-primary/20 to-secondary/20 dark:from-primary/80 dark:to-secondary/80 relative bg-gradient-to-r py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {/* Badge */}
          <Badge className="bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-foreground font-medium tracking-wide">
            <Globe className="mr-2 h-4 w-4" />
            Explore the World
          </Badge>

          {/* Main Headline */}
          <h2 className="text-primary dark:text-primary-foreground text-4xl font-bold md:text-5xl">
            Embark on Your{' '}
            <span className="text-accent dark:text-accent-foreground">Dream Adventure</span>
          </h2>

          {/* Subheadline */}
          <p className="text-primary/80 dark:text-primary-foreground/80 mx-auto max-w-2xl text-lg">
            Discover breathtaking destinations with curated travel experiences designed just for
            you. Let’s make your journey unforgettable.
          </p>

          {/* Feature Highlights */}
          <div className="text-primary/80 dark:text-primary-foreground/80 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-center space-x-2">
              <Star className="text-accent dark:text-accent-foreground h-5 w-5" />
              <span>Top-Rated Guides</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Globe className="text-accent dark:text-accent-foreground h-5 w-5" />
              <span>Global Itineraries</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 dark:bg-accent-foreground dark:text-accent dark:hover:bg-accent-foreground/90 transform transition-transform hover:scale-105"
              >
                Plan Your Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/destinations">
              <Button
                variant="outline"
                className="border-primary/50 text-primary dark:border-primary-foreground/50 dark:text-primary-foreground hover:bg-primary/10 dark:hover:bg-primary-foreground/10"
              >
                Browse Destinations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

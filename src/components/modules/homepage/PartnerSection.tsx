import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Star, Award, Users, Globe, Shield } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  category: 'airline' | 'hotel' | 'transport' | 'insurance' | 'activity';
  rating?: number;
  established?: string;
}

const PartnerSection: React.FC = () => {
  const partners: Partner[] = [
    {
      id: 1,
      name: 'SkyLine Airways',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=100&fit=crop',
      description: 'Premium airline services with global reach and exceptional comfort.',
      category: 'airline',
      rating: 4.8,
      established: '1995',
    },
    {
      id: 2,
      name: 'Grand Hotels',
      logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=100&fit=crop',
      description: 'Luxury accommodations in prime destinations worldwide.',
      category: 'hotel',
      rating: 4.9,
      established: '1987',
    },
    {
      id: 3,
      name: 'Elite Transport',
      logo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=100&fit=crop',
      description: 'Professional ground transportation and tour services.',
      category: 'transport',
      rating: 4.7,
      established: '2001',
    },
    {
      id: 4,
      name: 'SecureTravel Insurance',
      logo: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=100&fit=crop',
      description: 'Comprehensive travel protection and peace of mind.',
      category: 'insurance',
      rating: 4.6,
      established: '1992',
    },
    {
      id: 5,
      name: 'Adventure Experiences',
      logo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=100&fit=crop',
      description: 'Unique activities and unforgettable adventure experiences.',
      category: 'activity',
      rating: 4.8,
      established: '2005',
    },
    {
      id: 6,
      name: 'Global Connect',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=100&fit=crop',
      description: 'International connectivity and communication solutions.',
      category: 'transport',
      rating: 4.5,
      established: '1998',
    },
  ];

  const getCategoryIcon = (category: Partner['category']) => {
    switch (category) {
      case 'airline':
        return <Globe className="text-primary h-5 w-5" />;
      case 'hotel':
        return <Award className="text-primary h-5 w-5" />;
      case 'transport':
        return <Users className="text-primary h-5 w-5" />;
      case 'insurance':
        return <Shield className="text-primary h-5 w-5" />;
      case 'activity':
        return <Star className="text-primary h-5 w-5" />;
      default:
        return <Handshake className="text-primary h-5 w-5" />;
    }
  };

  const getCategoryLabel = (category: Partner['category']) => {
    switch (category) {
      case 'airline':
        return 'Airlines';
      case 'hotel':
        return 'Hotels';
      case 'transport':
        return 'Transport';
      case 'insurance':
        return 'Insurance';
      case 'activity':
        return 'Activities';
      default:
        return 'Partner';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : index < rating
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'text-muted-foreground/30'
        }`}
      />
    ));
  };

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 text-sm font-medium tracking-wide">
            <Handshake className="mr-2 h-4 w-4" />
            TRUSTED PARTNERS
          </Badge>

          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Our <span className="text-primary">Trusted</span> Partners
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            We collaborate with industry-leading partners to provide you with exceptional travel
            experiences, ensuring quality, reliability, and value in every journey.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-primary mb-2 text-3xl font-bold">150+</div>
            <div className="text-muted-foreground text-sm">Global Partners</div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-2 text-3xl font-bold">25+</div>
            <div className="text-muted-foreground text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-2 text-3xl font-bold">4.8</div>
            <div className="text-muted-foreground text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-2 text-3xl font-bold">100%</div>
            <div className="text-muted-foreground text-sm">Satisfaction</div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="group hover:border-primary/20 border transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                {/* Partner Logo */}
                <div className="bg-muted relative mb-6 overflow-hidden rounded-lg">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">{getCategoryIcon(partner.category)}</div>
                </div>

                {/* Partner Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-foreground group-hover:text-primary text-lg font-semibold transition-colors">
                        {partner.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {getCategoryLabel(partner.category)}
                      </Badge>
                    </div>
                    {partner.established && (
                      <span className="text-muted-foreground text-xs">
                        Est. {partner.established}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Rating */}
                  {partner.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">{renderStars(partner.rating)}</div>
                      <span className="text-foreground text-sm font-medium">{partner.rating}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-muted/50 mt-16 rounded-2xl p-8 text-center">
          <h3 className="mb-4 text-2xl font-semibold">
            Interested in <span className="text-primary">Partnership?</span>
          </h3>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            Join our network of trusted partners and help us deliver exceptional travel experiences
            to customers worldwide.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium transition-colors">
              Become a Partner
            </button>
            <button className="border-border hover:bg-muted rounded-lg border px-6 py-3 font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;

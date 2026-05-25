import { Headphones, ShieldCheck, Star, WalletCards } from 'lucide-react';

const benefits = [
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: 'Verified Guides',
    description: 'Approved guides help travelers explore destinations with local knowledge.',
  },
  {
    icon: <WalletCards className="h-8 w-8" />,
    title: 'Secure Booking',
    description: 'Book tours through a structured flow with payment and booking status tracking.',
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Real Reviews',
    description: 'Traveler feedback helps you compare tours before choosing your next trip.',
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: 'Trip Support',
    description: 'Keep booking, guide, payment, and schedule details organized in your dashboard.',
  },
];

const WhyBookWithTravelerSection = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-primary text-lg font-semibold">Why Book With Traveler</p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">
              Built for Safer, Easier Tour Planning
            </h2>
            <p className="text-muted-foreground mt-4 leading-7">
              From curated destinations to guide-managed tours, Traveler gives tourists a clear way
              to plan trips and gives guides the tools to support each booking.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-md border p-5 shadow-sm">
                <div className="text-primary">{benefit.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithTravelerSection;

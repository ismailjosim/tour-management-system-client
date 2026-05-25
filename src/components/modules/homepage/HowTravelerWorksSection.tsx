import { BadgeCheck, CalendarCheck, MapPinned } from 'lucide-react';

const steps = [
  {
    icon: <MapPinned className="h-9 w-9" />,
    title: 'Choose a Destination',
    description:
      'Browse approved tours by location, travel style, date, and budget to find the trip that fits your plan.',
  },
  {
    icon: <CalendarCheck className="h-9 w-9" />,
    title: 'Book Your Tour',
    description:
      'Reserve your package, confirm your guest details, and keep every booking update in one account.',
  },
  {
    icon: <BadgeCheck className="h-9 w-9" />,
    title: 'Travel with Confidence',
    description:
      'Connect with assigned guides, follow your schedule, and complete the journey with support from Traveler.',
  },
];

const HowTravelerWorksSection = () => {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-primary text-lg font-semibold">How Traveler Works</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">
            Plan, Book, and Travel in Three Simple Steps
          </h2>
          <p className="text-muted-foreground mt-4">
            Traveler keeps tour discovery, booking, guide assignment, and trip updates connected
            from the first search to the final review.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-background rounded-md border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-primary">{step.icon}</span>
                <span className="text-primary/20 text-5xl font-bold">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-6">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowTravelerWorksSection;

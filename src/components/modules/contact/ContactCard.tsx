import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ContactCardData {
  icon: React.ReactNode;
  title: string;
  details1: string;
  details2: string;
}

const cardData: ContactCardData[] = [
  {
    icon: <MapPin className="h-12 w-12" />,
    title: 'Office Location',
    details1: '445 Mount Eden Road, Mt Eden Basundhara Chakrapath',
    details2: '',
  },
  {
    icon: <Phone className="h-12 w-12" />,
    title: 'Phone Number',
    details1: '977-444-222-000',
    details2: '977-444-222-000',
  },
  {
    icon: <Mail className="h-12 w-12" />,
    title: 'Email Address',
    details1: 'contact@traveler.com',
    details2: 'info@traveler.com',
  },
];

const ContactCard = () => {
  return (
    <>
      {cardData.map((data: ContactCardData, idx: number) => (
        <Card
          key={idx}
          className="border-border bg-card border shadow-sm transition-shadow hover:shadow-md"
        >
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="text-primary mb-6">{data.icon}</div>
            <div>
              <h3 className="text-foreground mb-4 text-xl font-semibold">{data.title}</h3>
              <p className="text-muted-foreground mb-2">{data.details1}</p>
              {data.details2 && <p className="text-muted-foreground">{data.details2}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ContactCard;

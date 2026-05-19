import React from 'react';
import PageHeading from '@/utils/PageHeading';
import ContactCard from '@/components/modules/contact/ContactCard';
import ContactForm from '@/components/modules/contact/ContactForm';
import MapRender from '../components/modules/map/MapRender';

const Contact: React.FC = () => {
  return (
    <section>
      <PageHeading headTitle={'contact us'} />
      <div className="bg-background min-h-screen">
        <div className="mb-12 px-4 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">INFORMATION ABOUT US</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base font-medium">
            Find our locations and get directions to reach us easily.
          </p>
        </div>
        <div className="container mx-auto mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ContactCard />
        </div>

        <section className="mx-auto w-11/12 pb-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <MapRender
              origin={{
                lat: 23.8103,
                lng: 90.4125,
                title: 'Dhaka',
              }}
              destination={{
                lat: 21.4272,
                lng: 92.0058,
                title: "Cox's Bazar",
              }}
              height="500px"
              zoom={8}
            />
            <ContactForm />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Contact;

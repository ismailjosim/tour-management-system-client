import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import SectionHeading from '../../../utils/SectionHeading';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const QuestionSection: React.FC = () => {
  const leftColumnFAQs: FAQItem[] = [
    {
      id: 'item-1',
      question: 'Who We Are?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!',
    },
    {
      id: 'item-2',
      question: 'Wanna Know Our Special Features?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!',
    },
    {
      id: 'item-3',
      question: 'Check Your Status',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!',
    },
  ];

  const rightColumnFAQs: FAQItem[] = [
    {
      id: 'item-4',
      question: 'Why Choose Us?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!',
    },
    {
      id: 'item-5',
      question: 'How Do I Post My Listing?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!',
    },
    {
      id: 'item-6',
      question: 'Can I Upload Attachments?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!',
    },
  ];

  const heading = {
    subHeading: 'Faq',
    headingOne: 'Frequent Asked',
    headingTwo: 'Questions',
    describe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  };

  return (
    <div>
      <SectionHeading heading={heading} />

      <div className="container mx-auto mb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column */}
          <div>
            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-6">
              {leftColumnFAQs.map((faq: FAQItem) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-border bg-card rounded-xl border shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <h3 className="text-foreground pr-4 text-lg font-semibold">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column */}
          <div>
            <Accordion type="single" collapsible className="space-y-6">
              {rightColumnFAQs.map((faq: FAQItem) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-border bg-card rounded-xl border shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <h3 className="text-foreground pr-4 text-lg font-semibold">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;

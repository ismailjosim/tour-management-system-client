import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';
import StarRating from './StarRating';
import type { ReviewContent } from '../../../types/home.type';

const TestimonialCard: React.FC<{ content: ReviewContent; index: number }> = ({
  content,
  index,
}) => {
  const { name, post, details, avatar, rating = 5 } = content;

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="group h-full transform border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-800/25 dark:hover:shadow-gray-700/50">
      <CardContent className="relative flex h-full flex-col p-8">
        {/* Quote Icon - Themed */}
        <Quote className="mb-4 h-8 w-8 text-blue-600 opacity-60 transition-all duration-200 group-hover:opacity-80 dark:text-blue-400" />

        {/* Star Rating */}
        <StarRating rating={rating} />

        {/* Review Text - Themed */}
        <blockquote className="relative mb-8 flex-grow text-center leading-relaxed text-gray-700 italic dark:text-gray-300">
          <span className="absolute -top-2 -left-2 text-2xl text-blue-600 dark:text-blue-400">
            "
          </span>
          {details}
          <span className="absolute -right-2 -bottom-4 text-2xl text-blue-600 dark:text-blue-400">
            "
          </span>
        </blockquote>

        {/* Author Info - Themed */}
        <div className="flex flex-col items-center border-t border-gray-100 pt-4 dark:border-gray-700">
          <Avatar className="mb-4 h-16 w-16 shadow-md ring-2 ring-blue-100 transition-all duration-200 hover:ring-blue-200 dark:ring-blue-900/50 dark:hover:ring-blue-800/70">
            <AvatarImage src={avatar} alt={`${name} - ${post}`} className="object-cover" />
            <AvatarFallback className="bg-blue-100 text-lg font-semibold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
              {name}
            </h3>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {post}
            </Badge>
          </div>
        </div>

        {/* Card number indicator */}
        <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white opacity-20 transition-opacity duration-200 group-hover:opacity-40 dark:bg-blue-500">
          {index + 1}
        </div>
      </CardContent>
    </Card>
  );
};
export default TestimonialCard;

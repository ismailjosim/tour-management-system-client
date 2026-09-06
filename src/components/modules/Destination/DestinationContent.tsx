import type { IDestination } from '../../../types';
import DestinationCardSkeleton from '../../../utils/DestinationCardSkeleton';
import DestinationFlexCard from './DestinationFlexCard';
import DestinationGridCard from './DestinationGridCard';
import Error from '../../../utils/Error';

type DestinationContentProps = {
  data?: {
    data: IDestination[];
  };
  isLoading: boolean;
  isError: boolean;
  isFlexLayout: boolean;
};

const SKELETON_COUNT = 8;

const DestinationContent = ({
  data,
  isLoading,
  isError,
  isFlexLayout,
}: DestinationContentProps) => {
  const containerClasses = isFlexLayout
    ? 'flex flex-wrap gap-10'
    : 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10';

  if (isLoading) {
    return (
      <div className={containerClasses}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <DestinationCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Error
        message="Something went wrong"
        description="We had trouble loading destinations. Please check your connection and try again."
      />
    );
  }

  if (!data?.data?.length) {
    return (
      <Error
        message="No destinations found"
        description="We couldn't find any destinations matching your filters. Try broadening your search."
      />
    );
  }

  return (
    <div className={containerClasses}>
      {data.data.map((destination) =>
        isFlexLayout ? (
          <DestinationFlexCard key={destination._id} item={destination} />
        ) : (
          <DestinationGridCard key={destination._id} item={destination} />
        )
      )}
    </div>
  );
};

export default DestinationContent;

import ButtonNavigate from '../utils/ButtonNavigate';

const Support = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-body mb-3 text-3xl font-bold">Support</h1>

      <p className="text-primary-foreground max-w-md">
        The Support page is currently under development. We’re working on help resources, FAQs, and
        contact options.
      </p>

      {/* Animated badge */}
      <div className="relative my-6">
        <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-300 opacity-40 blur-md" />
        <div className="relative inline-flex animate-bounce items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
          🛠️ Work in Progress
        </div>
      </div>

      <ButtonNavigate btnText="Back To Home" destination="/" size="lg" />
    </div>
  );
};

export default Support;

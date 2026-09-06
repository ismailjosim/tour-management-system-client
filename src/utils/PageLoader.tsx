const PageLoader = () => {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-6">
      <span className="custom_loader"></span>
      <span className="animate-pulse text-sm font-medium tracking-widest text-slate-400 uppercase">
        Loading...
      </span>
    </div>
  );
};

export default PageLoader;

interface HeadingProps {
  heading: {
    subHeading: string;
    headingOne: string;
    headingTwo: string;
    describe: string;
  };
}

const SectionHeading: React.FC<HeadingProps> = ({ heading }) => {
  const { subHeading, headingOne, headingTwo, describe } = heading;
  return (
    <div className="py-5 text-center lg:py-10">
      <h3 className="text-secondary text-2xl font-semibold">{subHeading}</h3>
      <h2 className="my-2 text-2xl font-extrabold md:text-3xl lg:text-5xl">
        {headingOne} <span className="text-primary">{headingTwo}</span>
      </h2>
      <p className="mx-auto text-base lg:w-1/2">{describe}</p>
    </div>
  );
};

export default SectionHeading;

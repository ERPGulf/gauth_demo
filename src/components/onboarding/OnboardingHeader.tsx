type Props = {
  heading: string;
  short_description?: string;
};

const OnboardingHeader = ({ heading, short_description }: Props) => {
  return (
    <div className="w-full -space-y-0 text-left">
      <h2 className="text-4xl font-semibold text-primary">{heading}</h2>
      <p className="text-xs font-light text-primary/80">{short_description}</p>
    </div>
  );
};

export default OnboardingHeader;

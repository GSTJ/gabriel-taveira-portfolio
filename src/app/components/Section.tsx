interface RootProps {
  children: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <div className="min-h-screen md:min-h-0 flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

interface HeaderProps {
  title: string;
  subtitle?: string;
  step?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, step }) => {
  return (
    <div className="text-center mt-16 mb-10">
      {step && (
        <p className="text-rose-500 uppercase text-sm mb-4 font-semibold">
          {step}
        </p>
      )}
      <h2 className="text-4xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 max-w-md">{subtitle}</p>
    </div>
  );
};

export const Section = {
  Root,
  Header,
};

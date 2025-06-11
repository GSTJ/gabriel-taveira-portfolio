import type { DetailedHTMLProps, HTMLAttributes } from "react";

interface RootProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={`min-h-screen md:min-h-0 flex flex-col justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  subtitle?: string;
  step?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  step,
  className,
  ...props
}) => {
  return (
    <div className={`text-center mt-16 mb-10 ${className}`} {...props}>
      {!!step && (
        <p className="text-rose-500 uppercase text-sm mb-4 font-semibold">
          {step}
        </p>
      )}
      <h2 className="heading text-4xl font-bold mb-2">{title}</h2>
      {!!subtitle && (
        <p className="text-sm text-black/70 dark:text-zinc-500 max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const Section = {
  Root,
  Header,
};

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/utils";

interface ButtonLinkProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  to?: string;
  email?: string;
}

function ButtonLink({ to, className = "", email, ...props }: ButtonLinkProps) {
  const ChildComponent = () => (
    <button
      {...props}
      className={cn(
        "mt-8 rounded-2xl border border-solid border-white px-10 py-3 uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:backdrop-brightness-150",
        className,
      )}
    />
  );

  return !!email ? (
    <a href={`mailto:${email}`}>
      <ChildComponent />
    </a>
  ) : (
    <Link to={to ?? "/"}>
      <ChildComponent />
    </Link>
  );
}

export default ButtonLink;

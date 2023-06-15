import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Link } from "react-router-dom";

import { block } from "million/react";

import { MillionProps } from "@/types";
import { cn } from "@/utils";

interface ButtonLinkProps
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    MillionProps {
  to?: string;
  email?: string;
}

const ButtonLink = block<ButtonLinkProps>(
  ({ to, className = "", email, ...props }) => {
    const ChildComponent = () => (
      <button
        {...props}
        className={cn(
          "mt-8 rounded-2xl border border-solid border-white px-8 py-2 uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:backdrop-brightness-150",
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
  },
);

export default ButtonLink;

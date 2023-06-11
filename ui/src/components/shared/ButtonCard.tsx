import { CardMediaProps } from "@mui/material";
import { block } from "million/react";

import ButtonLink from "@/components/shared/ButtonLink.tsx";
import { MillionProps } from "@/types";

interface ButtonCardProps extends CardMediaProps<"img">, MillionProps {
  slug: string;
  summary?: string;
}

const ButtonCard = block<ButtonCardProps>(props => {
  return (
    <div
      role={props.role}
      style={props.style}
      className="aspect-square bg-cover bg-center"
    >
      <div className="flex h-full flex-col place-content-center place-items-center bg-black/60 text-center text-white">
        <ButtonLink to={props.slug} className="mx-8">
          {props.alt}
        </ButtonLink>
        {!!props.summary && <p className="m-8">{props.summary}</p>}
      </div>
    </div>
  );
});

export default ButtonCard;

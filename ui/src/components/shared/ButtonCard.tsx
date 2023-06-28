import { CardMediaProps } from "@mui/material";

import ButtonLink from "@/components/shared/ButtonLink.tsx";

interface ButtonCardProps extends CardMediaProps<"img"> {
  slug: string;
  summary?: string;
}

function ButtonCard(props: ButtonCardProps) {
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
}

export default ButtonCard;

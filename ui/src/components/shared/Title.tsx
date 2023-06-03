import { Helmet } from "react-helmet";

interface TitleProps {
  title?: string;
  keywords: string[];
  description: string;
}

function Title({
  title = "Portfolio of KVD Studio",
  keywords = [],
  description,
}: TitleProps) {
  return (
    <Helmet>
      <title>{!!title ? `${title} | ` : ""}KVD Studio</title>
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default Title;

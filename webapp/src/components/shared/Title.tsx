import { Helmet } from "react-helmet";

interface TitleProps {
  title?: string;
  keywords: string[];
  description: string;
}

function Title({ title, keywords, description }: TitleProps) {
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

Title.defaultProps = {
  description: "Portfolio of KVD Studio",
  keywords: [],
};

export default Title;

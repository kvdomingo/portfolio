import ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax";

import "katex/dist/katex.min.css";
import rehypeMathJaxBrowser from "rehype-mathjax/browser";
import remarkMath from "remark-math";

interface RenderMarkdownProps {
  children: string;
}

function RenderMarkdown({ children }: RenderMarkdownProps) {
  return (
    <MathJax.Provider>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeMathJaxBrowser]}
      >
        {children}
      </ReactMarkdown>
    </MathJax.Provider>
  );
}

export default RenderMarkdown;

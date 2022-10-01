import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";

function BioRenderer({ jsx, ...props }) {
  return <JsxParser jsx={jsx} {...props} />;
}

BioRenderer.propTypes = {
  jsx: PropTypes.string.isRequired,
  props: PropTypes.object,
};

export default BioRenderer;

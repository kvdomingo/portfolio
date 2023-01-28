import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";

function JsxRenderer({ jsx, ...props }) {
  return <JsxParser jsx={jsx} {...props} showWarnings onError={err => console.error(err)} />;
}

JsxRenderer.propTypes = {
  jsx: PropTypes.string.isRequired,
  bindings: PropTypes.object,
  components: PropTypes.object,
  props: PropTypes.object,
};

export default JsxRenderer;

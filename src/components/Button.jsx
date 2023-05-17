import React from "react";
import PropTypes from "prop-types";
const Button = ({ onClick, title, _style, disabled }) => {
  return (
    <button style={_style} onClick={onClick} disable={disabled}>
      {title}
    </button>
  );
};
Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  _style: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};
export default Button;

import React from "react";
import PropTypes from "prop-types";
export const Input = ({ placeholder, type, onChange, _style, icon, value }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 6px",
        borderRadius: "50px",
        border: "1px solid #EFF0F6",
        boxShadow: "1px 2px 2px #888888",
      }}
    >
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={{
          width: "100%",
          height: "100%",
          padding: 13,
          border: "none",
          outline: "none",
          borderRadius: "10px",
          color: "#6F6C90",
        }}
      />
      <span
        style={{
          marginRight: "15px",
        }}
      >
        {" "}
        {icon}
      </span>
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  _style: PropTypes.object.isRequired,
  icon: PropTypes.element,
};
export default Input;

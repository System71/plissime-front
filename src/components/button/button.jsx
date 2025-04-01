/* eslint-disable react/prop-types */
import "./button.css";

const Button = ({ type, action, text }) => {
  return (
    <button type={type} onClick={action} className="standard-button">
      {text}
    </button>
  );
};

export default Button;

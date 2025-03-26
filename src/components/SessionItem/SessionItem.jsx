import "./session-item.css";

const SessionItem = ({ title }) => {
  return (
    <div className="session-item-container">
      <p>SESSION ITEM</p>
      <p>{title}</p>
    </div>
  );
};

export default SessionItem;

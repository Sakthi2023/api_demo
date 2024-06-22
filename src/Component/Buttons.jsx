import "./Buttons.css";
const Buttons = ({ tagName, setTag, selected }) => {
  const tagStyle = {
    Html: { backgroundColor: "#f97316" },
    Css: { backgroundColor: "#2563eb" },
    React: { backgroundColor: "#f87171" },
    Javascript: { backgroundColor: "#fdba74" },
    default: { backgroundColor: "#fafaf9" },
  };
  return (
    <>
      <button
        type="button"
        className="click-buttons"
        style={selected ? tagStyle[tagName] : tagStyle.default}
        onClick={() => setTag(tagName)}
      >
        {tagName}
      </button>
    </>
  );
};

export default Buttons;

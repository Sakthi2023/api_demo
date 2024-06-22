import Buttons from "./Buttons";
import "./TaskCard.css";
import viewIcon from "../assets/view-icon.png";
import editIcon from "../assets/Edit-icon.png";
import { Link } from "react-router-dom";
const TaskCared = ({ heading, icon, tagName, handleDelete, id }) => {
  return (
    <div className="task_card">
      <p className="para">{heading}</p>
      <div className="content_Card">
        <div>
          {tagName.map((item, index) => (
            <Buttons key={index} tagName={item} selected />
          ))}
        </div>
        <img
          className="dlt_icon"
          src={icon}
          alt=""
          onClick={() => handleDelete(id)}
        />
        <Link to={`/edit/${id}`}>
          <img className="dlt_icon" src={editIcon} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default TaskCared;

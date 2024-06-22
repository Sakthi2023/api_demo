// import React from "react";
import "./Section.css";
import TaskCared from "./TaskCared";
import dlt_icon from "../assets/dlt_icon.jpeg";
const Section = ({ heading, icon, tasks, active, handleDelete }) => {
  return (
    <>
      <div className="main_content">
        <h1 className="section_heading">
          <img className="icon_imges" src={icon} alt="" /> {heading}
        </h1>
        {tasks.map(
          (item, index) =>
            item.active === active && (
              <TaskCared
                key={index}
                heading={item.task}
                tagName={item.tags}
                icon={dlt_icon}
                handleDelete={handleDelete}
                id={item.id}
              />
            )
        )}
      </div>
    </>
  );
};

export default Section;

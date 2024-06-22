import { useState } from "react";
import Buttons from "./Buttons";
import "./TaskForm.css";
import axios from "../API/inpuTask";

const TaskForm = ({ inpuTask, handlePost }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    active: "todo",
    tags: [],
  });

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const handleTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      let filterData = taskData.tags.filter((filtertag) => filtertag !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterData };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleSummit = async (e) => {
    e.preventDefault();
    const id = inpuTask.length > 0 ? inpuTask[inpuTask.length - 1].id + 1 : 1;
    const newtask = { ...taskData, id };
    handlePost(newtask);
    setTaskData({
      task: "",
      active: "todo",
      tags: [],
    });
  };

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <header className="app-header">
        <form action="" onSubmit={handleSummit}>
          <input
            value={taskData.task}
            type="text"
            className="header-input"
            placeholder="Enter your task"
            onChange={handleEvent}
            name="task"
          />
          <div className="header-buttons">
            <div>
              <Buttons
                tagName="Html"
                name="Tag"
                setTag={() => handleTag("Html")}
                selected={checkTag("Html")}
              />
              <Buttons
                tagName="Css"
                name="Tag"
                setTag={() => handleTag("Css")}
                selected={checkTag("Css")}
              />
              <Buttons
                tagName="Javascript"
                name="Tag"
                setTag={() => handleTag("Javascript")}
                selected={checkTag("Javascript")}
              />
              <Buttons
                tagName="React"
                name="Tag"
                setTag={() => handleTag("React")}
                selected={checkTag("React")}
              />
            </div>
            <div>
              <select
                name="active"
                className="option-button"
                onChange={handleEvent}
                value={taskData.active}
              >
                <option value="todo">ToDo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
              <button className="submit-button" type="submit">
                +Add
              </button>
            </div>
          </div>
        </form>
      </header>
    </div>
  );
};

export default TaskForm;

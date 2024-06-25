import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Buttons from "./Buttons";
import axios from "../API/inpuTask";

const EditTask = ({ handleUpdate }) => {
  const API_URL = "http://localhost:3500/inpuTask";
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    task: "",
    active: "todo",
    tags: [],
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      setTaskData(data);
    };
    fetchTask();
  }, [id]);

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

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdate(id, taskData);
    navigate("/");
  };

  return (
    <div>
      <header className="app-header">
        <form action="" onSubmit={handleSubmit}>
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
                Update
              </button>
            </div>
          </div>
        </form>
        {errors && <em>{errors}</em>}
      </header>
    </div>
  );
};

export default EditTask;

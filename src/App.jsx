import "./App.css";
import Section from "./Component/Section";
import todo from "./assets/target_icon.jpeg";
import star_icon from "./assets/star_icon.jpeg";
import check_icon from "./assets/check_icon.jpeg";
import TaskForm from "./Component/TaskForm";
import { useEffect, useState } from "react";
import axios from "./API/inpuTask";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditTask from "./Component/EditTask";

function App() {
  const [inpuTask, setInputTask] = useState([]);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const newTask = inpuTask.filter((item) => item.id !== id);
    setInputTask(newTask);
  };

  const handlePost = (newtask) => {
    setInputTask((prev) => [...prev, newtask]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <TaskForm
              setInputTask={setInputTask}
              inpuTask={inpuTask}
              handlePost={handlePost}
            />
            {errors ? (
              <em>{errors}</em>
            ) : (
              <main className="section-main">
                <Section
                  heading="ToDo"
                  icon={todo}
                  tasks={inpuTask}
                  active="todo"
                  handleDelete={handleDelete}
                />
                <Section
                  heading="Doing"
                  icon={star_icon}
                  tasks={inpuTask}
                  active="doing"
                  handleDelete={handleDelete}
                />
                <Section
                  heading="Done"
                  icon={check_icon}
                  tasks={inpuTask}
                  active="done"
                  handleDelete={handleDelete}
                />
              </main>
            )}
          </>
        }
      />
      <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
  );
}

export default App;

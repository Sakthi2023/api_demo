import "./App.css";
import Section from "./Component/Section";
import todo from "./assets/target_icon.jpeg";
import star_icon from "./assets/star_icon.jpeg";
import check_icon from "./assets/check_icon.jpeg";
import TaskForm from "./Component/TaskForm";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditTask from "./Component/EditTask";

function App() {
  const API_URL = "http://localhost:3500/inpuTask";
  const [inpuTask, setInputTask] = useState([]);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMethod = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setInputTask(data);
        setErrors(null);
      } catch (err) {
        setErrors(err.massage);
      }
    };
    fetchMethod();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const newTask = inpuTask.filter((item) => item.id !== id);
      console.log(newTask);
      setInputTask(newTask);
    } catch (err) {
      setErrors(err.message);
    }
  };

  const handlePost = async (newtask) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newtask),
      });
      const data = await response.json();
      setInputTask((prev) => [...prev, data]);
    } catch (err) {
      setErrors(err.message);
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();
      const updatedTasks = inpuTask.map((task) =>
        task.id === updatedTask.id ? data : task
      );
      setInputTask(updatedTasks);
      navigate("/");
    } catch (err) {
      setErrors(err.message);
    }
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
      <Route
        path="/edit/:id"
        element={<EditTask handleUpdate={handleUpdate} />}
      />
    </Routes>
  );
}

export default App;

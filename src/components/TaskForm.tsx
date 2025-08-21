import React, { useState } from "react";
import axios from "axios";
import { enableNotifications } from "../firebase"; 

interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  user: {
    email: string;
  };
}

interface Props {
  onTaskAdded: () => void;
}

function TaskForm({ onTaskAdded }: Props): React.ReactElement {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    dueDate: "",
    status: "PENDING",
    user: {
      email: "",
    },
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "email") {
      setTask({ ...task, user: { ...task.user, email: value } });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.title || !task.dueDate || !task.user.email) {
      setError("Title, Due Date, and Email are required.");
      return;
    }
    localStorage.setItem("email", task.user.email);

    axios
      .post("http://localhost:8080/api/tasks", task)
      .then((response) => {
        console.log("Task added:", response.data);
        onTaskAdded();
      })
      .catch((error) => {
        console.error("Failed to add task:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: "center" }}>Add Task</h2>

      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        style={inputStyle}
      />
      <input
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        style={inputStyle}
      />
      <input
        name="dueDate"
        type="datetime-local"
        value={task.dueDate}
        onChange={handleChange}
        style={inputStyle}
      />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="PENDING">PENDING</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
      </select>
      <input
        type="email"
        name="email"
        value={task.user.email}
        onChange={(e) =>
          setTask({ ...task, user: { ...task.user, email: e.target.value } })
        }
        placeholder="Enter your email"
        style={inputStyle}
        required
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" style={buttonStyle}>
        Add Task
      </button>
    </form>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "16px",
  border: "2px solid #ccc",
  borderRadius: "8px",
  margin: "5px auto",
  width: "30%",
  backgroundColor: "aquamarine",
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  fontSize: "1rem",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default TaskForm;

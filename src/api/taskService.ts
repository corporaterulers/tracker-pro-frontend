import axios from 'axios';

const API_URL = 'http://localhost:5173/tasks';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (task: {
  title: string;
  description: string;
  dueDate: string;
}) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};
axios.delete(`http://localhost:8080/api/tasks/${taskId}`)
  .then(() => {
    console.log("Task deleted");
    onTaskDeleted(); 
  })
  .catch((error) => {
    console.error(" Failed to delete:", error);
  });

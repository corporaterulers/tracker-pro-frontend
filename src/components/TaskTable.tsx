import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  email: string;
  user?: {
    id: number;
    name: string;
    email: string;
    fcmToken: string;
  };
}

interface Props {
  refresh: boolean;
}

function TaskTable({ refresh }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = () => {
    axios
      .get<Task[]>('http://localhost:8080/api/tasks')
      .then(response => {
        const sortedTasks = response.data.sort(
          (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
        setTasks(sortedTasks);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const markAsComplete = (task: Task) => {
    const updatedTask = { ...task, status: 'COMPLETED' };
    axios
      .put(`http://localhost:8080/api/tasks/${task.id}`, updatedTask)
      .then(() => fetchTasks())
      .catch(err => console.error('Failed to mark complete:', err));
  };

  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:8080/api/tasks/${id}`)
      .then(() => fetchTasks())
      .catch(err => console.error('Failed to delete task:', err));
  };

  const tableContainer: React.CSSProperties = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const tableStyle: React.CSSProperties = {
    width: '90%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'blue',
    padding: '10px',
    borderBottom: '2px solid #ccc',
    fontWeight: 'bold',
  };

  const cellStyle: React.CSSProperties = {
    backgroundColor : 'aliceblue',
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

  const buttonStyle: React.CSSProperties = {
    margin: '0 5px',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
  };

  return (
    <div style={tableContainer}>
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Title</th>
              <th style={headerStyle}>Description</th>
              <th style={headerStyle}>Due Date</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td style={cellStyle}>{task.title}</td>
                <td style={cellStyle}>{task.description}</td>
                <td style={cellStyle}>
                  {new Date(task.dueDate).toLocaleString('en-IN')}
                </td>
                <td style={cellStyle}>{task.status}</td>
                <td style={cellStyle}>
                  <button
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#4217edff',
                      color: 'white',
                    }}
                    disabled={task.status === 'COMPLETED'}
                    onClick={() => markAsComplete(task)}
                  >
                    Mark Complete
                  </button>
                  <button
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#f20cdbff',
                      color: 'white',
                    }}
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskTable;

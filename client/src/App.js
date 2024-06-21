import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    fetchTasks();
  }, [sortOption]);

  const fetchTasks = () => {
    fetch('http://localhost:3001/tasks')
      .then(response => response.json())
      .then(data => {
        const sortedTasks = sortTasks(data.data);
        setTasks(sortedTasks);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  const sortTasks = (tasks) => {
    switch (sortOption) {
      case 'a-z':
        return tasks.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return tasks.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'newest':
        return tasks.slice().reverse(); // Reverse the array to show newest tasks first
      default:
        return tasks;
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const addTask = (task) => {
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
      const newTasks = [...tasks, data.data];
      setTasks(sortTasks(newTasks));
      setIsModalOpen(false);
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
  };

  const updateTask = (updatedTask) => {
    fetch(`http://localhost:3001/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    .then(() => {
      const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
      setTasks(sortTasks(updatedTasks));
      setIsModalOpen(false);
      setSelectedTask(null);
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      const remainingTasks = tasks.filter(task => task.id !== id);
      setTasks(sortTasks(remainingTasks));
      setIsModalOpen(false);
      setSelectedTask(null);
    })
    .catch(error => {
      console.error('Error deleting task:', error);
    });
  };

  const markTaskAsCompleted = (id) => {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    updateTask(task);
  };

  const openAddTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="app-container">
      <h1>task_view</h1>
      <h2>Made with too much coffee by Ethan (Hong Kah Lok) 🍵</h2>
      <button className="add-task-button" onClick={openAddTaskModal}>Add Task</button>
      <div className="sort-container">
        <label-sort htmlFor="sortOptions">Sort by: </label-sort>
        <select id="sortOptions" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default (Oldest First)</option>
          <option value="newest">Newest First</option>
          <option value="a-z">Title A-Z</option>
          <option value="z-a">Title Z-A</option>
        </select>
      </div>
      <TaskList tasks={tasks} onEditTask={openEditTaskModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TaskForm 
          addTask={addTask} 
          updateTask={updateTask} 
          deleteTask={deleteTask} 
          markTaskAsCompleted={markTaskAsCompleted} 
          selectedTask={selectedTask} 
        />
      </Modal>
    </div>
  );
};

export default App;

import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onEditTask }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <button className="edit-task-button" onClick={() => onEditTask(task)}>
            Edit
          </button>
          <div className="task-info">
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

import React from 'react';

const TaskDetails = ({ task }) => {
  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
};

export default TaskDetails;

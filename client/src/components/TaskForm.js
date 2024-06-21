import React, { useState, useEffect } from 'react';
import './TaskForm.css';
import ModalConfirmDelete from './ModalConfirmDelete'; // Import the ModalConfirmDelete component

const TaskForm = ({ addTask, updateTask, deleteTask, markTaskAsCompleted, selectedTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete modal

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [selectedTask]);

  useEffect(() => {
    // Check description length on load
    if (description.length > 5000) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.length > 5000) {
      setDescriptionError(true);
      return; // Prevent submission if error
    }
    setDescriptionError(false); // Reset error state
    if (selectedTask) {
      updateTask({ ...selectedTask, title, description });
    } else {
      addTask({ title, description });
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.length > 5000) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteTask(selectedTask.id);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  // Determine button label and disabled state based on selectedTask and description length
  const buttonLabel = selectedTask ? 'Update Task' : 'Add Task';
  const isDisabled = description.length > 5000;

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={64}
          required
        />
        <small className="text-muted">{`${title.length}/64 characters`}</small>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
        {descriptionError && <small className="text-danger">Maximum length exceeded (5000 characters)</small>}
      </div>
      <div className="form-buttons">
        <button type="submit" disabled={isDisabled} className={isDisabled ? 'disabled-button' : ''}>
          {buttonLabel}
        </button>
        {selectedTask && (
          <>
            <button type="button" onClick={() => markTaskAsCompleted(selectedTask.id)}>
              {selectedTask.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button type="button" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
      {/* Modal for delete confirmation */}
      <ModalConfirmDelete
        isOpen={showDeleteModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </form>
  );
};

export default TaskForm;

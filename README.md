# task_view

A simple task management app. 

## Running the project.

Prereq: Node.js, npm install react

Ensure you have the pre-requisites above, then clone the project, and navigate to the project directory (\client). Open a terminal window in this directory and run:

### `npm start`

In a separate terminal window, navigate to the root dir of the project and run:

### `node server.js`

Open [http://localhost:3000](http://localhost:3000) and view it in your browser.

For running on Linux, you might need to reinstall the node_modules by deleting them first and running npm-i due to cross-platform incompatibilities. 

## User Manual

When launching the application, users will be greeted with the main page, which contains the list of items to do. 

To add new notes, select the 'Add Task' button at the top right.\
Within the prompt, you can type in a title (limit of 64 characters) as well as a description (5000 character limit). Both these fields are required when adding a task. Hit the 'Add Task' button to add it to the list.

On the main screen, added tasks will be displayed in a list format, and can be sorted by oldest or newest added and also sorted alphabetically A-Z or Z-A

For each added task, details can be edited by selecting the edit button. Here, you can update the title and description, but also for marking a task as complete, or deleting a task.

Tips:\
All tasks marked as complete will be shown in a green box.\
You can hit the 'ESC' key when there is a modal window open to dismiss it. 

-- END --
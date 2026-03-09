# Task Manager

Task Manager is a web application built with React and Node.js that allows users to manage their tasks efficiently. It provides a user-friendly interface to create, view, update, and delete tasks.

## Features

- Create new tasks with title, description, priority, and completion status.
- View a list of all tasks with their details.
- Update task details such as title, description, priority, and completion status.
- Mark tasks as complete or incomplete.
- Delete tasks.
- Filter tasks by status and priority.
- Responsive design for optimal viewing on different devices.

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/task-manager.git`
2. Install dependencies:
   - For the client: `cd client` and `npm install`
   - For the server: `cd server` and `npm install`
3. Start the application:
   - For the client: `npm run dev`
   - For the server: `npm start`

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the client application.
2. Create a new task by filling in the form and clicking the "Add Task" button.
3. View a list of all tasks in the task list.
4. Click on a task to edit its details or mark it as complete/incomplete.
5. Use the filters on the right side to filter tasks by status and priority.
6. Click the "Delete" button on a task to remove it from the list.

## Technologies Used

- React
- Node.js
- Express
- Vite
- CSS

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

_NOTE :- This project is made using cursor , just fixed the bugs and a bit of functionalities issues manually ._

### Bugs i Fixed manually 
 1. I tried to change the commonjs type to module , but it didn't work . So i change the file extension from js to mjs.
 2. At first while writing different routes , cursor was just suggesting 
   ```JS
   router.get('/' , (req,res) => {
      res.status(200).send('Get all the tasks')
   })
   ```
   so i write a complete route manually , then by getting this context it started suggesting more reasonable logic of routes .
 3. Tasks' status was getting updated but it was not triggering re-render , so i updated the update logic in the handleToggleComplete function .
 4. In the backend , whenever a new task was added its' id would be tasks.length + 1 , which could be bug prone ( may cause id duplication if we delete a task from the middle of the list ) . So i updated it with Date.now() .
 5. The Date.now return number datatype , but frontend could send the id in string format , so i changed  the updateTask controller to convert the id into a number datatype .
 6. Improved the UI a bit .
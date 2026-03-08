let tasks = [
  { id: 1, title: "Task 1", description: "Task 1 description", completed: false },
  { id: 2, title: "Task 2", description: "Task 2 description", completed: false },
  { id: 3, title: "Task 3", description: "Task 3 description", completed: false },
];

export const getAllTasks = (req, res) => {
  res.status(200).json({ message: "Tasks fetched successfully", tasks: tasks });
};

export const createTask = (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title;
  task.description = description;

  res.status(200).json(task);
};

export const deleteTask = (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.status(200).json({ message: "Task deleted successfully" });
};


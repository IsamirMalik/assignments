let tasks = [
  { id: 1, title: "Task 1", description: "Task 1 description", completed: false, priority: "low" },
  { id: 2, title: "Task 2", description: "Task 2 description", completed: true, priority: "medium" },
  { id: 3, title: "Task 3", description: "Task 3 description", completed: false, priority: "high" },
];

export const getAllTasks = (req, res) => {
  console.log(tasks);
  res.status(200).json({ message: "Tasks fetched successfully", tasks });
};

export const createTask = (req, res) => {
  const { title, description, priority = "medium" } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false,
    priority,
  };

  tasks.push(newTask);
  console.log(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, priority, completed } = req.body;

  let task = tasks.find((task) => task.id == Number(id));

  // console.log(task);
  // res.status(200).send(task);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (priority) task.priority = priority;
  if (completed) task.completed = !task.completed;

  res.status(200).json({ message: "Task updated successfully", task });
};

export const deleteTask = (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id, 10));
  res.status(200).json({ message: "Task deleted successfully" });
};

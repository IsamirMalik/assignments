let tasks = [
  { id: Date.now(), title: "Task 1", description: "Task 1 description", completed: false, priority: "low" },
  { id: Date.now(), title: "Task 2", description: "Task 2 description", completed: true, priority: "medium" },
  { id: Date.now(), title: "Task 3", description: "Task 3 description", completed: false, priority: "high" },
];

export const getAllTasks = (req, res) => {
  res.status(200).json({ message: "Tasks fetched successfully", tasks });
};

export const createTask = (req, res) => {
  const { title, description, priority = "medium" } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  // const newTask = {
  //   id: Date.now(),
  //   title,
  //   description,
  //   completed: false,
  //   priority,
  // };

  tasks.push(newTask);
  console.log(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed, priority } = req.body;

  const task = tasks.find((task) => task.id === id);

  console.log(task);
  res.status(200).send(task);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority;

  res.status(200).json({ message: "Task updated successfully", task });
};

export const deleteTask = (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id, 10));
  res.status(200).json({ message: "Task deleted successfully" });
};

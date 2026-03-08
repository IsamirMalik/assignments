import { useEffect, useState } from "react";
import "./style.css";
import TaskForm from "./Components/TaskForm.jsx";
import TaskFilters from "./Components/TaskFilters.jsx";
import TaskList from "./Components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/v1/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        const receivedTasks = Array.isArray(data) ? data : data.tasks || [];
        setTasks(receivedTasks);
      } catch (error) {
        setError(error.message || "Something went wrong while fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async ({ title, description, priority }) => {
    try {
      setCreating(true);
      setError("");
      const response = await fetch("/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTask = await response.json();
      console.log(newTask);
      
      setTasks((previousTasks) => [...previousTasks, newTask]);
    } catch (error) {
      setError(error.message || "Something went wrong while creating task");
    } finally {
      setCreating(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      setError("");
      // console.log(task);
      const response = await fetch(`/api/v1/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();
      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item,
        ),
      );
    } catch (error) {
      setError(error.message || "Something went wrong while updating task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setError("");
      const response = await fetch(`/api/v1/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== taskId),
      );
    } catch (error) {
      setError(error.message || "Something went wrong while deleting task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "incomplete" && !task.completed);

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  return (
    <main className="app">
      <h1>Task Manager</h1>

      <TaskForm onAddTask={handleAddTask} isSubmitting={creating} />

      <TaskFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
      />

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </main>
  );
}

export default App;

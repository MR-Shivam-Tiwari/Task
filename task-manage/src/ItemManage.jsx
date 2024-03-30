import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import { useNavigate } from "react-router-dom";
function ItemManage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = () => {
    const filterdTask = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks(filterdTask);
  };
  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, []);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    category: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://task-lake.vercel.app/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks:", data.message);
      }
    } catch (error) {
      console.error("Error during task fetch:", error.message);
    }
  };

  const handleTaskCreate = async () => {
    try {
      const response = await fetch("https://task-lake.vercel.app/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Task created successfully:", data);
        // Optionally, you can fetch tasks again to update the task list
        fetchTasks();
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          priority: 'None',
          category: "",
        });
      } else {
        console.error("Failed to create task:", data.message);
      }
    } catch (error) {
      console.error("Error during task creation:", error.message);
    }
  };

  const handleTaskUpdate = async (taskId, updatedTaskData) => {
    try {
      const response = await fetch(
        `https://task-lake.vercel.app/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTaskData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Task updated successfully:", data);
        // Optionally, you can fetch tasks again to update the task list
        fetchTasks();
        setEditingTask(null); // Clear editing task
      } else {
        console.error("Failed to update task:", data.message);
      }
    } catch (error) {
      console.error("Error during task update:", error.message);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const response = await fetch(
        `https://task-lake.vercel.app/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Task deleted successfully:", data);
        // Optionally, you can fetch tasks again to update the task list
        fetchTasks();
      } else {
        console.error("Failed to delete task:", data.message);
      }
    } catch (error) {
      console.error("Error during task deletion:", error.message);
    }
  };
  const handleCompletedClick = async (taskId) => {
    try {
      const response = await fetch(
        `https://task-lake.vercel.app/api/taskscompleted/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !tasks.completed }), // Toggle the completed value
        }
      );

      const updatedTask = await response.json();

      if (response.ok) {
        // Assuming setTasks is a state setter function
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === taskId ? updatedTask : t))
        );
      } else {
        console.error("Failed to update task:", updatedTask.message);
      }
    } catch (error) {
      console.error("Error during task update:", error.message);
    }
  };

  const handlePriorityChange = (e) => {
    setNewTask({ ...newTask, priority: e.target.value });
  };

  return (
    <div>
      <div className="text-center">
        <header className="flex items-center gap-4 py-4 px-5 md:py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-6 w-6"
          >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
            <path d="M12 3v6"></path>
          </svg>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <button
            style={{
              backgroundColor: "black ",
              color: "white",
            }}
            type="submit"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
          >
            New Task
          </button>
          <div className="ml-auto flex items-center gap-4 md:gap-2">
            <button
              onClick={handlelogout}
              className=" text-sm font-medium    border    px-2 h-10  rounded-md"
              style={{ background: "gray" }}
            >
              <p className="px-4">Logout</p>
            </button>
          </div>
        </header>

        <div className="row mb-4">
          <div className=" col-12 col-lg-6 mb-3">
            <div className="flex gap-2 px-5">
              <input
                className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-gray-950"
                type="text"
                placeholder="Search Tasks.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium         h-10 px-4 py-2 "
                style={{ backgroundColor: "gray ", color: "white" }}
                onClick={handleSearch}
              >
                {" "}
                Search
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium        h-10 px-4 py-2 "
                style={{
                  backgroundColor: "black ",
                  color: "white",
                  width: "20%",
                }}
                type="submit"
                onClick={() => setOpen(true)}
              >
                Add Task
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-2"></div>
          <form className="flex-1"></form>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Create New Task</DialogTitle>

            <form
              onSubmit={(event) => {
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Task Name</FormLabel>
                  <Input
                    placeholder="Title"
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    autoFocus
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Due Date</FormLabel>
                  <Input
                    type="number"
                    placeholder="Due Date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Categorize</FormLabel>
                  <Input
                    type="text"
                    placeholder="Categorize"
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Set Priority</FormLabel>
                  <select
                    id="priority"
                    name="priority"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newTask.priority}
                    onChange={handlePriorityChange}
                  >
                    <option value="None">None</option>
                    <option value="Prioritize">Prioritize</option>
                  </select>
                </FormControl>

                <Button type="submit" onClick={handleTaskCreate}>
                  Submit
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>

        <div>
          <div
            className="  gap-4 px-6  "
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "10px",
              margin: "0 auto",
              maxWidth: "800px",
            }}
          >
            {tasks.map((task) => (
              <div
                className="rounded-lg border  shadow-sm"
                key={task._id}
                style={{ marginBottom: "25px" }}
              >
                <div className="space-y-1.5 p-6 flex flex-row items-center  gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <div className="grid gap-1">
                    <h3
                      className="text-2xl font-semibold  "
                      style={{ textAlign: "start" }}
                    >
                      {task.title}
                    </h3>
                    <p className="text-sm " style={{ textAlign: "start" }}>
                      {task.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-6 ">
                  <span className="text-gray-500  border px-2 rounded-md bg-green-100 mb-3">
                    Category - {task?.category ?? "null"}
                  </span>
                </div>
                <div className="p-6 grid grid-cols-1 md:flex md:flex-col md:justify-between ">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-4 h-4"
                    >
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="4"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400 mb-3">
                      Due: {task.dueDate} days remaining
                    </span>
                  </div>

                  <div className="flex items-center gap-1 ">
                    <span className="text-gray-500  border px-2 rounded-md  mb-3">
                      {task?.priority}
                    </span>
                  </div>

                  <div className="gap-4 mt-2 grid grid-cols-1 md:flex md:flex-col lg:grid-cols-3">
                    <Button
                      className="mb-2 m-2 text-white"
                      variant="soft"
                      style={{
                        backgroundColor: task.completed ? "#c3f6b7" : "#ffc0c0",
                      }}
                      onClick={() => handleCompletedClick(task._id)}
                    >
                      {task.completed ? "Completed" : " Incomplete"}
                    </Button>
                    <Button
                      variant="soft"
                      className="mb-2 m-2"
                      onClick={() => {
                        setEditingTask(task._id);
                        setEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="soft"
                      className="mb-3 m-2"
                      onClick={() => handleTaskDelete(task._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {editingTask === task._id && (
                  <Modal open={Edit} onClose={() => setEdit(false)}>
                    <ModalDialog>
                      <div className="fw-bold">Edit Task</div>
                      <div>
                        <div>
                          <Input
                            className="mb-2"
                            type="text"
                            placeholder="New Title"
                            value={editedTask.title}
                            onChange={(e) =>
                              setEditedTask({
                                ...editedTask,
                                title: e.target.value,
                              })
                            }
                          />
                          <Input
                            className="mb-2"
                            type="text"
                            placeholder="New Description"
                            value={editedTask.description}
                            onChange={(e) =>
                              setEditedTask({
                                ...editedTask,
                                description: e.target.value,
                              })
                            }
                          />
                          <Input
                            className="mb-2"
                            type="text"
                            placeholder="New Due Date"
                            value={editedTask.dueDate}
                            onChange={(e) =>
                              setEditedTask({
                                ...editedTask,
                                dueDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        {/* Button to save changes */}
                        <Button
                          fullWidth
                          onClick={() => {
                            handleTaskUpdate(task._id, editedTask);
                            setEditingTask(null);
                          }}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </ModalDialog>
                  </Modal>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemManage;

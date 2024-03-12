import { createSignal, onCleanup, onMount } from "solid-js";
import {
  readTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../lib/pocketbase";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "@solidjs/router";

function App() {
  const navigate = useNavigate();
  const [tasks, setTasks] = createSignal([]);

  if (!pb.authStore.model) navigate("/", { replace: true });

  onMount(async () => {
    const tasksData = await readTasks();
    setTasks(tasksData);

    // pb.collection("tasks").subscribe("*", async () => {
    //   const tasksData = await readTasks();
    //   setTasks(tasksData);
    // });

    // onCleanup(async () => pb.collection("tasks").unsubscribe("*"));
  });

  async function handleCreateTask(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newTask = {
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: new Date(formData.get("dueDate")).toISOString(),
      file: formData.get("file"),
    };

    const createdTask = await createTask(newTask);
    setTasks([...tasks(), createdTask]);

    event.target.reset();
  }

  async function handleUpdateTask(task) {
    const updatedTask = {
      id: task.id,
      title: task.title + " Updated",
      description: task.description + " Updated",
      dueDate: new Date().toISOString(),
      file: task.file,
    };
    await updateTask(updatedTask);
    setTasks(tasks().map((t) => (t.id === task.id ? updatedTask : t)));
  }

  async function handleDeleteTask(task) {
    await deleteTask(task.id);
    setTasks(tasks().filter((t) => t.id !== task.id));
  }

  return (
    <div class="p-8">
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold mb-4">pb-todo</h1>
        <button
          class="btn btn-outline"
          onClick={() => {
            pb.authStore.clear();
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>
      <form onSubmit={handleCreateTask} class="mb-4">
        <div class="flex flex-col mb-4">
          <label for="title" class="mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            class="input input-bordered"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="description" class="mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            class="textarea textarea-bordered"
            required
          ></textarea>
        </div>
        <div class="flex flex-col mb-4">
          <label for="dueDate" class="mb-1">
            Due Date:
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            class="input input-bordered"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="file" class="mb-1">
            File:
          </label>
          <input type="file" id="file" name="file" class="file-input" />
        </div>
        <button type="submit" class="btn btn-primary">
          Create Task
        </button>
      </form>
      <h1 class="font-bold text-5xl mt-16 mb-8">Tasks</h1>
      <div className="flex flex-wrap gap-8">
        {tasks().map((task) => (
          <div className="card w-96 bg-emerald-950 shadow-xl" key={task.id}>
            <figure>
              <img
                src={`http://127.0.0.1:8080/api/files/tasks/${task.id}/${task.file}`}
                alt="task image"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{task.title}</h2>
              <p>{task.description}</p>
              <p>{new Date(task.dueDate).toLocaleString()}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleDeleteTask(task)}
                  className="btn btn-error"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateTask(task)}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

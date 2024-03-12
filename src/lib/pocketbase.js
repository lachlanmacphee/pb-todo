import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8080");

// Auth functions

export async function signUp({ name, email, password, passwordConfirm }) {
  return await pb
    .collection("users")
    .create({ name, email, password, passwordConfirm });
}

export async function login({ email, password }) {
  return await pb.collection("users").authWithPassword(email, password);
}

// Task functions

export async function createTask({ title, description, dueDate, file }) {
  return await pb.collection("tasks").create({
    title,
    description,
    dueDate,
    file,
    user: pb.authStore.model.id,
  });
}

export async function readTasks() {
  return await pb.collection("tasks").getFullList({
    filter: pb.filter("user = {:user}", {
      user: pb.authStore.model.id,
    }),
  });
}

export async function updateTask({ id, title, description, dueDate }) {
  return await pb
    .collection("tasks")
    .update(id, { title, description, dueDate });
}

export async function deleteTask(id) {
  return await pb.collection("tasks").delete(id);
}

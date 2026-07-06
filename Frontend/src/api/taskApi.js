const BASE_URL = "http://localhost:3000/api/tasks";

export async function getAllTasks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Khong lay duoc danh sach task");
  return res.json();
}

export async function createTask(title, dueDate = null) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, dueDate }),
  });
  if (!res.ok) throw new Error("Khong tao duoc task");
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Khong cap nhat duoc task");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Khong xoa duoc task");
  return res.json();
}
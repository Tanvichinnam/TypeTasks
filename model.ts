// TypeTasks — Part 1: the typed data model

// A status can only ever be one of these three exact strings.
export type TaskStatus = "todo" | "in-progress" | "done";

// Every Task must have this exact shape.
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// Next id = highest existing id + 1, so ids stay unique even after deletes
function nextId(tasks: Task[]): number {
  return tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

export function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = { id: nextId(tasks), title, status: "todo" };
  return [...tasks, newTask];
}

export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// ---- My own extra operations ----

// Moves a task one step forward: todo -> in-progress -> done
export function advanceTask(tasks: Task[], id: number): Task[] {
  const next: Record<TaskStatus, TaskStatus> = {
    "todo": "in-progress",
    "in-progress": "done",
    "done": "done",
  };
  return tasks.map((t) => (t.id === id ? { ...t, status: next[t.status] } : t));
}

export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return filterByStatus(tasks, status).length;
}

// ---- Type-safety checks (uncomment one at a time, run tsc, see the error) ----
// const noStatus: Task = { id: 1, title: "Missing status" };
// const badId: Task = { id: "3", title: "Wrong id type", status: "todo" };
//filterByStatus([], "finished");
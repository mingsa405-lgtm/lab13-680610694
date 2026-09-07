import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { type TaskCardProps } from "../libs/Todolist";
import Modal from "../components/Modal";

// ข้อมูลตั้งต้น
const defaultTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "Read a book",
    description: "Vite + React + TS",
    isDone: false,
  },
  {
    id: "2",
    title: "Write code",
    description: "Finish project",
    isDone: false,
  },
  {
    id: "3",
    title: "Deploy app",
    description: "Push to Vercel",
    isDone: false,
  },
];

const STORAGE_KEY = "lecture13.tasks";

// อ่านข้อมูลจาก localStorage
function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

export default function TodolistPage() {
  // โหลดข้อมูลจาก localStorage ตอนเริ่มต้น
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  // บันทึก tasks ลง localStorage ทุกครั้งที่ tasks เปลี่ยน
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // เพิ่ม
  const handleAdd = (newTask: TaskCardProps) => {
    setTasks([...tasks, newTask]);
  };

  // ลบ
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  // เปลี่ยนสถานะ Done
  const toggleDoneTask = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? { ...t, isDone: !t.isDone }
          : t
      )
    );
  };
  const countDone = tasks.filter((t) => t.isDone).length;

  return (
    <div className="container text-center">
      <h2>Todo List</h2>
    <p> All :({tasks.length}) Done : ({countDone})</p>
      <button
        className="btn btn-primary my-3"
        data-bs-toggle="modal"
        data-bs-target="#todoModal"
      >
        Add
      </button>

      <Modal onAdd={handleAdd} />

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          isDone={task.isDone}
          deleteTaskFunc={deleteTask}
          toggleDoneTaskFunc={toggleDoneTask}
        />
      ))}
    </div>
  );
}
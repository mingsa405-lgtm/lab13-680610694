import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { type TaskCardProps } from "../libs/Todolist";

type props = { onAdd: (todo: TaskCardProps) => void };

export default function Modal({ onAdd }: props) {
  // 1 ช่องกรอก = 1 state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return; // กันเพิ่มงานที่ไม่มีชื่อ
    onAdd({ id: uuidv4(), title, description, isDone: false });
    setTitle(""); // เคลียร์ฟอร์ม = set state กลับเป็นค่าว่าง
    setDescription("");
  };

  return (
    <div className="modal fade" id="todoModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Todo</h5>
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control"
              placeholder="description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

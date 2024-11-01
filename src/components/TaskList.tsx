import { Task } from "@/lib/types";
import { TaskCard } from "./TaskCard";
import { AnimatePresence } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
}

export const TaskList = ({ tasks, onToggleComplete }: TaskListProps) => {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
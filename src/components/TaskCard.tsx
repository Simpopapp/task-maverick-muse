import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-rose-100 text-rose-800",
};

export const TaskCard = ({ task, onToggleComplete }: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-1 text-gray-400 hover:text-blue-500 transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              "font-medium",
              task.completed && "line-through text-gray-400"
            )}>
              {task.title}
            </h3>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full font-medium",
              priorityColors[task.priority]
            )}>
              {task.priority}
            </span>
          </div>
          
          <p className={cn(
            "text-sm text-gray-600 mt-1",
            task.completed && "text-gray-400"
          )}>
            {task.description}
          </p>
          
          <div className="mt-2 text-xs text-gray-400">
            Created {task.createdAt.toLocaleDateString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
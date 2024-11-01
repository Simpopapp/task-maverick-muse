import { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTasks } from "@/hooks/useTasks";

const Index = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { tasks, isLoading, updateTask } = useTasks();

  const handleToggleComplete = (id: string) => {
    const task = tasks?.find(t => t.id === id);
    if (task) {
      updateTask.mutate({ id, completed: !task.completed });
    }
  };

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  }) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <CreateTaskDialog />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter:</span>
              <Select
                value={filter}
                onValueChange={(value: "all" | "active" | "completed") =>
                  setFilter(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter tasks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-500">
              {tasks?.length || 0} total task{(tasks?.length || 0) !== 1 && "s"}
            </div>
          </div>

          {(!tasks || tasks.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No tasks yet</p>
              <CreateTaskDialog />
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
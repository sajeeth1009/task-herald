import apiInstance from "@/api/instances/unauthenticatedApi";
import { Task, TaskList } from "@/api/types/task";
import { AxiosResponse } from "axios";

// Task API's
export const getTaskListRequest = (): Promise<AxiosResponse<TaskList>> =>
  apiInstance.get<TaskList>("/v1/tasks");

export const getTaskRequest = (taskId: string): Promise<AxiosResponse<Task>> =>
  apiInstance.get<Task>(`/v1/tasks/${taskId}`);

export const saveTaskRequest = (task: Task): Promise<AxiosResponse<string>> =>
  apiInstance.post<string>("/v1/tasks", { task });

export const updateTaskRequest = (
  taskId: string,
  task: Partial<Task>
): Promise<AxiosResponse<Task>> =>
  apiInstance.patch<Task>(`/v1/tasks/${taskId}`, task);

export const deleteTaskRequest = (
  taskId: string
): Promise<AxiosResponse<Task>> =>
  apiInstance.delete<Task>(`/v1/tasks/${taskId}`);

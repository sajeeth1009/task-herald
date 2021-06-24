import apiInstance from "@/api/instances/unauthenticatedApi";
import { Task, TaskList } from "@/api/types/task";
import { AxiosResponse } from "axios";

// Task API's

/**
 * Get all Tasks
 */
export const getTaskListRequest = (): Promise<AxiosResponse<TaskList>> =>
  apiInstance.get<TaskList>("/v1/tasks");

/**
 * Create a new task
 * @param task
 */
export const saveTaskRequest = (task: Task): Promise<AxiosResponse<string>> =>
  apiInstance.post<string>("/v1/tasks", task);

/**
 * Update Existing Task
 * @param taskId
 * @param task
 */
export const updateTaskRequest = (
  taskId: string,
  task: Partial<Task>
): Promise<AxiosResponse<Task>> =>
  apiInstance.patch<Task>(`/v1/tasks/${taskId}`, task);

/**
 * Delete a task by it's ID
 * @param taskId
 */
export const deleteTaskRequest = (
  taskId: string
): Promise<AxiosResponse<Task>> =>
  apiInstance.delete<Task>(`/v1/tasks/${taskId}`);

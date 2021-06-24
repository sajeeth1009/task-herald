import { Commit, Dispatch } from "vuex";
import { Task, TaskList } from "@/api/types/task";
import {
  getTaskListRequest,
  updateTaskRequest,
  saveTaskRequest,
  deleteTaskRequest,
} from "@/api/taskAPI";

export interface TaskState {
  taskList: Task[];
  completedTasks: number;
  pendingTasks: number;
}

export interface CommitFunction {
  dispatch: Dispatch;
  commit: Commit;
}

// INITIAL STATE
const state = function (): TaskState {
  return {
    taskList: [] as Task[],
    completedTasks: 0,
    pendingTasks: 0,
  };
};

// ACTIONS
const actions = {
  /**
   * Action to call the API to fetch all tasks from task-manager,
   * and intialize store state.
   *
   * @param param0 Commit Function to call mutation set task
   */
  getTasks({ commit }: CommitFunction): Promise<TaskList> {
    return new Promise((resolve, reject) => {
      getTaskListRequest()
        .then((response) => {
          commit("setTasks", response.data);
          resolve(response.data);
        })
        .catch((err) => {
          console.log("Failed to set Tasks", err);
          reject(err);
        });
    });
  },

  /**
   * Action to call update Task API
   * @param param0 Commit Function to call mutation update task
   * @param payload taskId, and task partial type
   */
  updateTask(
    { commit }: CommitFunction,
    payload: { taskId: string; task: Partial<Task> }
  ): Promise<Task> {
    return new Promise((resolve, reject) => {
      updateTaskRequest(payload.taskId, payload.task)
        .then((response) => {
          commit("updateTaskStore", response.data);
          resolve(response.data);
        })
        .catch((err) => {
          console.log("Failed to update Task ", err);
          reject(err);
        });
    });
  },

  /**
   * Action to call the create new Task API
   * @param param0 Dispatch to trigger fresh collection of all tasks
   * @param task Task details.
   */
  createTask({ dispatch }: CommitFunction, task: Task): Promise<string> {
    return new Promise((resolve, reject) => {
      saveTaskRequest(task)
        .then((response) => {
          dispatch("getTasks");
          resolve(response.data);
        })
        .catch((err) => {
          console.log("Failed to create Task ", err);
          reject(err);
        });
    });
  },

  /**
   * Action to call the delete Task API
   * @param param0 Dispatch to trigger fresh collection of all tasks
   * @param taskId Id of the task to be deleted
   */
  deleteTask({ dispatch }: CommitFunction, taskId: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      deleteTaskRequest(taskId)
        .then((response) => {
          dispatch("getTasks");
          resolve(response.data);
        })
        .catch((err) => {
          console.log("Failed to create Task ", err);
          reject(err);
        });
    });
  },
};

// MUTATIONS
const mutations = {
  /**
   * Replace List of tasks in state, and update completed and pending tasks
   * @param state
   * @param taskResponse
   */
  setTasks(state: TaskState, taskResponse: Task[]): void {
    state.taskList = taskResponse;
    updateTaskReport(state, taskResponse);
  },

  /**
   * Update A task in the state, and re-calculate completed & pending tasks
   * @param state
   * @param taskResponse
   */
  updateTaskStore(state: TaskState, taskResponse: Task): void {
    state.taskList = state.taskList.map((task) => {
      return task.id === taskResponse.id ? taskResponse : task;
    });
    updateTaskReport(state);
  },

  /**
   * Remove a task from state, and re-calculate completed & pending tasks
   * @param state
   * @param taskId
   */
  deleteTask(state: TaskState, taskId: string): void {
    state.taskList = state.taskList.filter((task) => {
      task.id === taskId;
    });
    updateTaskReport(state);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

/**
 * Helper function to update state completed tasks and pending tasks
 * @param state
 * @param taskResponse
 */
function updateTaskReport(state: TaskState, taskResponse?: Task[]) {
  state.completedTasks = taskResponse
    ? taskResponse.filter((task) => task.completed).length
    : state.taskList.filter((task) => task.completed).length;
  state.pendingTasks = state.taskList.length - state.completedTasks;
}

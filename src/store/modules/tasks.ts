import { Commit } from "vuex";
import { Task } from "@/api/types/task";
import { getTaskListRequest, updateTaskRequest } from "@/api/taskAPI";

export interface TaskState {
  taskList: Task[];
  completedTasks: number;
  pendingTasks: number;
}

export interface CommitFunction {
  commit: Commit;
}

// initial state
const state = function (): TaskState {
  return {
    taskList: [] as Task[],
    completedTasks: 0,
    pendingTasks: 0,
  };
};

// getters
const getters = {};

// actions
const actions = {
  getTasks({ commit }: CommitFunction): void {
    getTaskListRequest()
      .then((response) => {
        commit("setTasks", response.data);
      })
      .catch((err) => {
        console.log("Failed to set Tasks", err);
      });
  },
  updateTask(
    { commit }: CommitFunction,
    payload: { taskId: string; task: Partial<Task> }
  ): void {
    updateTaskRequest(payload.taskId, payload.task)
      .then((response) => {
        commit("updateTaskStore", response.data);
      })
      .catch((err) => {
        console.log("Failed to update Task ", err);
      });
  },
};

// mutations
const mutations = {
  setTasks(state: TaskState, taskResponse: Task[]): void {
    state.taskList = taskResponse;
    updateTaskReport(state, taskResponse);
  },

  updateTaskStore(state: TaskState, taskResponse: Task): void {
    state.taskList.map((task) => {
      if (task.id === taskResponse.id) task = taskResponse;
    });
    updateTaskReport(state);
  },

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
  getters,
  actions,
  mutations,
};
function updateTaskReport(state: TaskState, taskResponse?: Task[]) {
  state.completedTasks = taskResponse
    ? taskResponse.filter((task) => task.completed).length
    : state.taskList.filter((task) => task.completed).length;
  state.pendingTasks = state.taskList.length - state.completedTasks;
}

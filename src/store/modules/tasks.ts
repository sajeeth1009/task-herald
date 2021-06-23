import { Commit } from "vuex";
import { Task } from "@/api/types/task";
import { getTaskListRequest } from "@/api/taskAPI";

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
        console.log(err);
      });
  },
};

// mutations
const mutations = {
  setTasks(state: TaskState, taskResponse: Task[]): void {
    state.taskList = taskResponse;
    state.completedTasks = taskResponse.filter((task) => task.completed).length;
    state.pendingTasks = state.taskList.length - state.completedTasks;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

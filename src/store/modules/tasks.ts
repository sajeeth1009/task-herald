import { Task } from "@/api/types/task";

export interface TaskState {
  taskList: Task[];
  completedTasks: number;
  pendingTasks: number;
}

// initial state
const state = {
  taskList: [] as Task[],
  completedTasks: 0,
  pendingTasks: 0,
} as TaskState;

// getters
const getters = {
  completedTaskCount: (state: TaskState): number => state.completedTasks,
  pendingTaskCount: (state: TaskState): number => state.pendingTasks,
};

// actions
const actions = {};

// mutations
const mutations = {
  setTaskState(state: TaskState, taskState: TaskState): void {
    state = taskState;
  },

  updateTaskList(state: TaskState, taskList: Task[]): void {
    state.taskList = taskList;
    state.completedTasks = taskList.filter((task) => task.completed).length;
    state.pendingTasks = taskList.length - state.completedTasks;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import { loginUser } from "@/Services/Services";
import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    token: null,
    selectedEntryId: null,
    project: {},
    projects: [],
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null;
    },
    getUser(state) {
      return state.user;
    },
    getSelectedEntryId(state) {
      return state.selectedEntryId;
    },
    getProject(state) {
      return state.project;
    },
    getProjects(state) {
      return state.projects;
    }
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    setToken(state, token) {
      state.token = token;
    },
    clearUserData(state) {
      state.user = null;
      state.token = null;
    },
    setSelectedEntryId(state, entryId) {
      state.selectedEntryId = entryId;
    },
    setProject(state, project) {
      state.project = project;
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
  },
    actions: {
      restoreSession({ commit }) {
        const user = localStorage.getItem("user");
        if (user) {
          commit("setUserData", JSON.parse(user));
        }
      },
      logout({ commit }) {
        commit("clearUserData");
        console.log("Logged out");
        router.push("/login");
      },
      updateSelectedEntryId({ commit }, entryId) {
        commit("setSelectedEntryId", entryId);
      },
      getProject({ commit }, project) {
        commit("setProject", project);
      },
      getProjects({ commit }, projects) {
        commit("setProjects", projects);
      }
    },
});

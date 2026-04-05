import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  code: string;
  description?: string;
  managerId?: string;
  managerName?: string;
  status: string;
  priority: string;
  budget: number;
  spent: number;
  progress: number;
  startDate?: string;
  endDate?: string;
  deadline?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId?: string;
  assigneeId?: string;
  assigneeName?: string;
  status: string;
  priority: string;
  dueDate?: string;
  progress: number;
}

interface ProjectState {
  projects: Project[];
  tasks: Task[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    status?: string;
    priority?: string;
  };
}

const initialState: ProjectState = {
  projects: [],
  tasks: [],
  selectedProject: null,
  isLoading: false,
  error: null,
  filters: {
    search: '',
  },
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjectsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProjectsSuccess(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
      state.isLoading = false;
    },
    fetchProjectsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    selectProject(state, action: PayloadAction<Project | null>) {
      state.selectedProject = action.payload;
    },
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload);
    },
    updateProject(state, action: PayloadAction<Project>) {
      const index = state.projects.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
      if (state.selectedProject?.id === action.payload.id) {
        state.selectedProject = action.payload;
      }
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateProjectProgress(
      state,
      action: PayloadAction<{ id: string; progress: number }>
    ) {
      const project = state.projects.find((p) => p.id === action.payload.id);
      if (project) {
        project.progress = action.payload.progress;
      }
    },
    setFilters(
      state,
      action: PayloadAction<Partial<ProjectState['filters']>>
    ) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  fetchTasksSuccess,
  selectProject,
  addProject,
  updateProject,
  deleteProject,
  addTask,
  updateTask,
  deleteTask,
  updateProjectProgress,
  setFilters,
} = projectSlice.actions;

export default projectSlice.reducer;

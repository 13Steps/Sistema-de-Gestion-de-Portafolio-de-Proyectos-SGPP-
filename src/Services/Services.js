import axios from "axios";

const BASE_URL = "http://34.225.211.222:3000";

// Función para registrar un usuario
export async function registerUser(userData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para iniciar sesión
export async function loginUser(credentials) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// FUncion para obtener todos los usuarios
export async function getUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Funcion para obtener un usuario por ID
export async function getUserById(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Funcion para actualizar un usuario
export async function updateUser(userId, userData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/users/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function deleteUser(userId) {
//   try {
//     const response = await fetch(`/api/users/${userId}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Error al eliminar el usuario');
//     }

//     return response.json();
//   } catch (error) {
//     console.error('Error en deleteUser:', error);
//     throw error;
//   }
// }

// Función para eliminar un usuario
export async function deleteUser(userId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un proyecto
export async function createProject(projectData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/projects`,
      projectData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los proyectos
export async function getProjects() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/projects`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un proyecto por ID
export async function getProjectById(projectId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/projects/${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un proyecto
export async function updateProject(projectId, projectData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/projects/${projectId}`,
      projectData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un proyecto
export async function deleteProject(projectId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/projects/${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear una gerencia
export async function createManagement(managementData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/managements`,
      managementData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Funcion para generar reportes de un proyecto 
export async function generateReport(projectId) {
  try {
    const response = await axios.get(
      
      `${BASE_URL}/api/v1/projects/reports/${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Funcion para obtener los reportes
export async function generateManyReport(userId) {
  try {
    const response = await axios.get(
      
      `${BASE_URL}/api/v1/projects/reports/many/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todas las gerencias
export async function getManagements() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/managements`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener una gerencia por ID
export async function getManagementById(managementId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/managements/${managementId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar una gerencia
export async function updateManagement(managementId, managementData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/managements/${managementId}`,
      managementData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar una gerencia
export async function deleteManagement(managementId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/managements/${managementId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear una tarea
export async function createTask(taskData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todas las tareas
export async function getTasks() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/tasks`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener una tarea por ID
export async function getTaskById(taskId) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar una tarea
export async function updateTask(taskId, taskData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/tasks/${taskId}`,
      taskData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar una tarea
export async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un trabajador
export async function createWorker(workerData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/workers`, workerData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los trabajadores
export async function getWorkers() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/workers`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un trabajador por ID
export async function getWorkerById(workerId) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/workers/${workerId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un trabajador
export async function updateWorker(workerId, workerData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/workers/${workerId}`,
      workerData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un trabajador
export async function deleteWorker(workerId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/workers/${workerId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un dato adicional
export async function createAdditionalData(additionalData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/additional-data`,
      additionalData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los datos adicionales
export async function getAdditionalData() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/additional-data`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un dato adicional por ID
export async function getAdditionalDataById(additionalDataId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/additional-data/${additionalDataId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un dato adicional
export async function updateAdditionalData(additionalDataId, additionalData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/additional-data/${additionalDataId}`,
      additionalData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un dato adicional
export async function deleteAdditionalData(additionalDataId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/additional-data/${additionalDataId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un equipo
export async function createTeam(teamData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/teams`, teamData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// Función para obtener todos los equipos
export async function getTeams() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/teams`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un equipo por ID
export async function getTeamById(teamId) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un equipo
export async function updateTeam(teamId, teamData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/teams/${teamId}`,
      teamData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un equipo
export async function deleteTeam(teamId) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear una entrada de fase
export async function createPhaseInput(phaseInputData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/phase-inputs`,
      phaseInputData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todas las entradas de fase
export async function getPhaseInputs() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/phase-inputs`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener una entrada de fase por ID
export async function getPhaseInputById(phaseInputId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/phase-inputs/${phaseInputId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar una entrada de fase
export async function updatePhaseInput(phaseInputId, phaseInputData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/phase-inputs/${phaseInputId}`,
      phaseInputData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar una entrada de fase
export async function deletePhaseInput(phaseInputId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/phase-inputs/${phaseInputId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un estado de entrada
export async function createInputStatus(inputStatusData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/input-status`,
      inputStatusData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los estados de entrada
export async function getInputStatuses() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/input-status`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un estado de entrada por ID
export async function getInputStatusById(inputStatusId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/input-status/${inputStatusId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un estado de entrada
export async function updateInputStatus(inputStatusId, inputStatusData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/input-status/${inputStatusId}`,
      inputStatusData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un estado de entrada
export async function deleteInputStatus(inputStatusId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/input-status/${inputStatusId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un historial de usuario
export async function createUserHistory(userHistoryData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user-histories`,
      userHistoryData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los historiales de usuario
export async function getUserHistories() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user-histories`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un historial de usuario por ID
export async function getUserHistoryById(userHistoryId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user-histories/${userHistoryId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un historial de usuario
export async function updateUserHistory(userHistoryId, userHistoryData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/user-histories/${userHistoryId}`,
      userHistoryData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un historial de usuario
export async function deleteUserHistory(userHistoryId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/user-histories/${userHistoryId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un costo
export async function createCost(costData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/costs`, costData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los costos
export async function getCosts() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/costs`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un costo por ID
export async function getCostById(costId) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/costs/${costId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un costo
export async function updateCost(costId, costData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/costs/${costId}`,
      costData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un costo
export async function deleteCost(costId) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/costs/${costId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un estado de tarea
export async function createTaskStatus(taskStatusData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/task-status`,
      taskStatusData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los estados de tarea
export async function getTaskStatuses() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/task-status`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un estado de tarea por ID
export async function getTaskStatusById(taskStatusId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/task-status/${taskStatusId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un estado de tarea
export async function updateTaskStatus(taskStatusId, taskStatusData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/task-status/${taskStatusId}`,
      taskStatusData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un estado de tarea
export async function deleteTaskStatus(taskStatusId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/task-status/${taskStatusId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un area tecnica
export async function createTechnicalArea(technicalAreaData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/technical-areas`,
      technicalAreaData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todas las areas tecnicas
export async function getTechnicalAreas() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/technical-areas`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un area tecnica por ID
export async function getTechnicalAreaById(technicalAreaId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/technical-areas/${technicalAreaId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un area tecnica
export async function updateTechnicalArea(technicalAreaId, technicalAreaData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/technical-areas/${technicalAreaId}`,
      technicalAreaData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un area tecnica
export async function deleteTechnicalArea(technicalAreaId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/technical-areas/${technicalAreaId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un tipo de proyecto
export async function createProjectType(projectTypeData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/type-projects`,
      projectTypeData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los tipos de proyecto
export async function getProjectTypes() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/type-projects`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un tipo de proyecto por ID
export async function getProjectTypeById(projectTypeId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/type-projects/${projectTypeId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un tipo de proyecto
export async function updateProjectType(projectTypeId, projectTypeData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/type-projects/${projectTypeId}`,
      projectTypeData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un tipo de proyecto
export async function deleteProjectType(projectTypeId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/type-projects/${projectTypeId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear una fase de proyecto
export async function createProjectPhase(projectPhaseData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/projects-phase`,
      projectPhaseData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todas las fases de proyecto
export async function getProjectPhases() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/projects-phase`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener una fase de proyecto por ID
export async function getProjectPhaseById(projectPhaseId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/projects-phase/${projectPhaseId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar una fase de proyecto
export async function updateProjectPhase(projectPhaseId, projectPhaseData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/projects-phase/${projectPhaseId}`,
      projectPhaseData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar una fase de proyecto
export async function deleteProjectPhase(projectPhaseId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/projects-phase/${projectPhaseId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para crear un seguimiento
export async function createTracking(trackingData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/trackings`,
      trackingData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener todos los seguimientos
export async function getTrackings() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/trackings`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener un seguimiento por ID
export async function getTrackingById(trackingId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/trackings/${trackingId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un seguimiento
export async function updateTracking(trackingId, trackingData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/trackings/${trackingId}`,
      trackingData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un seguimiento
export async function deleteTracking(trackingId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/trackings/${trackingId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

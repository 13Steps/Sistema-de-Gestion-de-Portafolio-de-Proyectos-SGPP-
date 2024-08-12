<template>
  <div class="table-container">
    <table class="highlight fixedTable">
      <thead>
        <tr class="tableHead">
          <th>Titulo</th>
          <th>Estado</th>
          <th>Cumplimiento</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="task in tasksData" :key="task.i013i_tarea" class="tableBody">
          <td>{{ task?.in_nombre }}</td>
          <td>
            {{ task?.i013f_i014t_seguimiento?.i014f_i015t_estado_tarea?.in_titulo }}
          </td>
          <td>
            {{
              task?.i013f_i014t_seguimiento?.nu_completado_real &&
              task.i013f_i014t_seguimiento.nu_completado_real.length > 0
                ? task.i013f_i014t_seguimiento.nu_completado_real[
                    task.i013f_i014t_seguimiento.nu_completado_real.length - 1
                  ]
                : 0
            }}%
          </td>
          <td class="actionButtons">
            <a class="btn-floating" @click="openModal(task)"
              ><i class="material-icons">more_vert</i></a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal -->
  <div class="modal" ref="modal">
    <div class="modalHeader right">
      <a class="btn-flat" @click="closeModal()">
        <i class="material-icons" style="font-size: 24px"> close </i>
      </a>
    </div>
    <div class="modal-content">
      <h4>{{task.in_nombre}}</h4>
      <span style="margin: 0px">Estado: {{task?.i013f_i014t_seguimiento?.i014f_i015t_estado_tarea?.in_titulo}}</span>
      <div class="divider"></div>
      <div class="modalDesc" style="max-height: 230px">
        <div class="">
          <div class="col l6">

            <span class="Descripcion">Descripcion</span>
            <p style="max-height: 180px; overflow-y: scroll; text-align: justify">
              {{ task?.tx_descripcion }}
            </p>
          </div>

          <div class="col l6 fechasTarea">
            <div class="card teal fechasContainer">
              <span class="mainLabel">Inicio de tarea:</span>
              <div class="center cardSections">
                <div class="section center">
                  <span class="fechaValue">{{
                    formatValue(task?.i013f_i014t_seguimiento?.fe_real_inicio)
                  }}</span>
                  <span class="fechaLabel">Real</span>
                </div>
                <div class="v-divider"></div>
                <div class="section center">
                  <span class="fechaValue">{{
                    formatValue(task?.i013f_i014t_seguimiento?.fe_plan_inicio)
                  }}</span>
                  <span class="fechaLabel">Planificado</span>
                </div>
              </div>
            </div>
            <div class="card indigo lighten-2 fechasContainer">
              <span class="mainLabel">Finalizacion de tarea:</span>
              <div class="center cardSections">
                <div class="section center">
                  <span class="fechaValue">{{
                    formatValue(task?.i013f_i014t_seguimiento?.fe_real_fin)
                  }}</span>
                  <span class="fechaLabel">Real</span>
                </div>
                <div class="v-divider"></div>
                <div class="section center">
                  <span class="fechaValue">{{
                    formatValue(task?.i013f_i014t_seguimiento?.fe_plan_fin)
                  }}</span>
                  <span class="fechaLabel">Planificado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="divider"></div>
    <div class="modal-footer">
      <div class="footerContent">
        <div class="col l8 left-align">
          <span> Cumplimiento Actual </span>
        </div>
        <div class="col l3 input-field dataField">
          <input
            type="number"
            placeholder=""
            id="cumplimiento_actual"
            min="0"
            max="100"
            step="10"
            v-model="nu_completado_real"
            @input="validateInput"
            class="center"
          />
          <label for="cumplimiento_actual"></label>
          <div class="subirCumplimiento">
            <a class="btn z-depth-0" @click="updateTarea">
              <i class="material-icons"> check </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTasks, updateProject } from "@/Services/Services";

export default {
  props: {
    project: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tasksData: [],
      task: {
        i013f_i014t_seguimiento: {
          fe_real_inicio: null,
          fe_real_fin: null,
          i014f_i015t_estado_tarea: {
            in_titulo: ""
          }
        }
      },
      nu_completado_real: 0,
    };
  },
  mounted() {
    this.initModal();
    this.fetchTask();
  },
  watch: {
    'task.i013f_i014t_seguimiento.i014f_i015t_estado_tarea.in_titulo': function(newVal, oldVal) {
      if (newVal !== oldVal) {
        const today = this.getLocalDate(); // Utiliza la fecha local

        switch(newVal) {
          case 'Por Iniciar':
            this.task.i013f_i014t_seguimiento.fe_real_inicio = null;
            this.task.i013f_i014t_seguimiento.fe_real_fin = null;
            break;
          case 'En Desarrollo':
            this.task.i013f_i014t_seguimiento.fe_real_inicio = today;
            this.task.i013f_i014t_seguimiento.fe_real_fin = null;
            break;
          case 'Completada':
            this.task.i013f_i014t_seguimiento.fe_real_fin = today;
            break;
          case 'Atrasada':
            this.checkForDelayedTasks()
            break;
        }
      }
    }
  },
  methods: {
    formatValue(value) {
      return value === null ? "-" : value;
    },
    getLocalDate() {
      const today = new Date();
      const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
      return localDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    },
    checkForDelayedTasks() {
      const today = this.getLocalDate(); // Formato YYYY-MM-DD

      this.tasksData = this.tasksData.map(task => {
        const planFinishDate = task.i013f_i014t_seguimiento.fe_plan_fin;

        if (new Date(planFinishDate) < new Date(today) && task.i013f_i014t_seguimiento.nu_completado_real < 100) {
          task.i013f_i014t_seguimiento.i014f_i015t_estado_tarea = {
            i015i_estado_tarea: 4,
            in_titulo: "Atrasada",
            tx_descripcion: " "
          };
          // Inicializar fechas reales como null si no están definidas
          if (!this.task.i013f_i014t_seguimiento.fe_real_inicio) {
            this.task.i013f_i014t_seguimiento.fe_real_inicio = null;
          }
          if (!this.task.i013f_i014t_seguimiento.fe_real_fin) {
            this.task.i013f_i014t_seguimiento.fe_real_fin = null;
          }
          if(this.nu_completado_real < 100 && this.nu_completado_real >= 0){
            this.task.i013f_i014t_seguimiento.fe_real_fin = null;
          }
          if(this.nu_completado_real > 0){
            this.task.i013f_i014t_seguimiento.fe_real_inicio = today;
          }
          if(this.nu_completado_real === 0){
            this.task.i013f_i014t_seguimiento.fe_real_inicio = null;
          }
        }
        return task;
      });
    },
    async fetchTask() {
      try {
        this.tasksData = await this.project?.i003f_i013t_tareas;
        console.log(this.tasksData); 
        this.checkForDelayedTasks();  // Revisa si hay tareas atrasadas
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    },
    initModal() {
      const modalElements = this.$refs.modal;
      this.modalInstance = M.Modal.init(modalElements, {
        dismissible: false,
      });
    },
    openModal(task) {
      if (this.modalInstance) {
        this.modalInstance.open();
        this.task = task;
        this.checkForDelayedTasks();

        this.nu_completado_real = this.task.i013f_i014t_seguimiento.nu_completado_real[this.task.i013f_i014t_seguimiento.nu_completado_real.length - 1];
      }
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.close();
      }
    },
    validateInput(event) {
      let value = event.target.value;
      const numericValue = Number(value);

      if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
        alert("Por favor, ingresa un valor numérico entre 0 y 100.");
        event.target.value = "";
        this.nu_completado_real = 0;
        return;
      }

      this.nu_completado_real = numericValue;
    },
    updateTarea() {
      const seguimientoEditado = this.tasksData.map(item => {
        if (item.i013i_tarea === this.task.i013i_tarea) {
          item.i013f_i014t_seguimiento.nu_completado_real = [...item.i013f_i014t_seguimiento.nu_completado_real, this.nu_completado_real];
          const today = this.getLocalDate(); // Utiliza la fecha local
          const planFinishDate = new Date(item.i013f_i014t_seguimiento.fe_plan_fin);

          if (planFinishDate < new Date() && this.nu_completado_real < 100) {
            item.i013f_i014t_seguimiento.i014f_i015t_estado_tarea = {
              i015i_estado_tarea: 4,
              in_titulo: "Atrasada",
              tx_descripcion: " ",
            };
          } else if (this.nu_completado_real === 0) {
            item.i013f_i014t_seguimiento.i014f_i015t_estado_tarea = {
              i015i_estado_tarea: 3,
              in_titulo: "Por Iniciar",
              tx_descripcion: " "
            };
          } else if (this.nu_completado_real > 0 && this.nu_completado_real < 100) {
            item.i013f_i014t_seguimiento.i014f_i015t_estado_tarea = {
              i015i_estado_tarea: 2,
              in_titulo: "En Desarrollo",
              tx_descripcion: " "
            };
          } else if (this.nu_completado_real === 100) {
            item.i013f_i014t_seguimiento.i014f_i015t_estado_tarea = {
              i015i_estado_tarea: 1,
              in_titulo: "Completada",
              tx_descripcion: " "
            };
            this.task.i013f_i014t_seguimiento.fe_real_fin = today; // Ajusta la fecha de finalización
          }
          
        }
        return item;
      });

      const newSeguimiento = {
        i003f_i013t_tareas: seguimientoEditado
      };

      updateProject(this.project.i003i_entrada, newSeguimiento)
        .then((response) => {
          console.log(response);
          this.$store.dispatch("getShowLoader", false);
        })
        .catch((error) => {
          this.$store.dispatch("getShowLoader", false);
          console.log(error);
        });
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

.fixedTable {
  padding: 8px;
  border-collapse: collapse;
  width: 100%;
}
.tableHead th {
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  background-color: rgb(52, 52, 97);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}

.tableBody td {
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  max-width: 250px;
}
.btn-floating i {
  font-size: 16px;
}
.btn-floating {
  background-color: rgb(52, 52, 97);
  margin: 0 2px 0 2px;
}
.btn-floating:hover {
  background-color: rgb(98, 98, 155);
}

/* modal */
.modal-content h4 {
  margin: 0 5px 5px 0;
  color: rgb(52, 52, 97);
}
.modalDesc {
  margin: 10px 0 10px 0;
  max-height: 300px;
  overflow: scroll;
  scrollbar-width: none;
}
.modalDesc .Descripcion {
  color: rgb(52, 52, 97);
  font-weight: 700;
}
.modalDesc p {
  margin-left: 3px;
}

.fechasContainer {
  padding: 5px;
}
.cardSections {
  display: flex;
  justify-content: space-evenly;
  margin: 10px 0 0 0;
}
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}
.v-divider {
  width: 2px;
  height: auto;
  background-color: #eceaeae1;
  margin: 0;
  padding: 0;
  border-radius: 100%;
}
.mainLabel {
  font-weight: 700;
  color: #eceaeae1;
  font-size: 14px;
}
.fechaValue {
  font-size: 18px;
  letter-spacing: 2px;
  color: #eceaeae1;
}
.fechaLabel {
  font-size: 17px;
  font-weight: 700;
  color: #eceaeae1;
}

.footerContent {
  display: flex;
  align-items: center;
}
.footerContent span {
  font-size: 24px;
  color: rgb(52, 52, 97);
  font-weight: 600;
}
.footerContent .btn {
  background-color: rgb(52, 52, 97);
}
.footerContent .btn:hover {
  background-color: rgb(73, 73, 133);
}
.dataField {
  display: flex;
  align-items: center;
  margin: 0;
  gap: 10px;
}
</style>

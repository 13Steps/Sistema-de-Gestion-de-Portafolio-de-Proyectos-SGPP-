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
          <td>{{task?.tx_descripcion}}</td>
          <td>{{task?.i013f_i003t_entrada.i003f_i006t_estado_entrada?.in_nombre_estado}}</td>
          <td>{{task?.i013f_i014t_seguimiento?.nu_completado}}%</td>
          <td class="actionButtons">
            <a class="btn-floating" @click="openModal"
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
      <h4>Generación de reportes</h4>
      <span style="margin: 0px">Estado: En desarrollo</span>
      <div class="divider"></div>
      <div class="modalDesc" style="max-height: 230px">
        <div class="col l7">
          <span class="Descripcion">Descripcion</span>
          <p style="max-height: 180px; overflow-y: scroll; text-align: justify">
            Desarrollar los reportes generales y especificos del sistema.
          </p>
        </div>
        <div class="col l5 fechasTarea">
          <div class="card teal fechasContainer">
            <span class="mainLabel">Inicio de tarea:</span>
            <div class="center cardSections">
              <div class="section center">
                <span class="fechaValue">28/05/24</span>
                <span class="fechaLabel">Real</span>
              </div>
              <div class="v-divider"></div>
              <div class="section center">
                <span class="fechaValue">25/05/24</span>
                <span class="fechaLabel">Planificado</span>
              </div>
            </div>
          </div>
          <div class="card indigo lighten-2 fechasContainer">
            <span class="mainLabel">Finalizacion de tarea:</span>
            <div class="center cardSections">
              <div class="section center">
                <span class="fechaValue">17/07/24</span>
                <span class="fechaLabel">Real</span>
              </div>
              <div class="v-divider"></div>
              <div class="section center">
                <span class="fechaValue">29/06/24</span>
                <span class="fechaLabel">Planificado</span>
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
import { getTasks } from '@/Services/Services';

export default {
    data() {
        return {
            tasksData: [],
        }
    },
  mounted() {
    this.initModal();
    this.fetchTask();
  },
  methods: {
    async fetchTask() {
      try {
          this.tasksData = await getTasks();
          console.log(this.tasksData); // Haz algo con la respuesta, como almacenarla en el estado del componente
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
    openModal() {
      if (this.modalInstance) {
        this.modalInstance.open();
      }
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.close();
      }
    },
    validateInput() {
      let value = event.target.value;
      if (value < 0) {
        event.target.value = 0;
      } else if (value > 100) {
        event.target.value = 100;
      }
    },
    updateTarea() {
      // Logica de carga de datos de tarea

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

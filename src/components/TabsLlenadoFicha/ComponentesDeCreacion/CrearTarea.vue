<template>
  <br />
  <ul class="col l8">
    <div v-if="!tareas || tareas.length === 0">
      <p>No hay tareas registradas.</p>
    </div>
    <div class="table-container" v-else>
      <table class="highlight fixedTable">
        <thead>
          <tr class="tableHead">
            <th>Titulo</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Finalización</th>
            <th>Descripción</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableBody" v-for="(tarea, index) in tareas" :key="index">
            <td class="tableTitle">{{ tarea.in_nombre }}</td>
            <td>{{ tarea.i013f_i014t_seguimiento.fe_plan_inicio }}</td>
            <td>{{ tarea.i013f_i014t_seguimiento.fe_plan_fin }}</td>
            <td class="hoverExpandir">{{ tarea.tx_descripcion }}</td>
            <td class="actionButtons">
              <button class="btn-floating" @click="eliminarTarea(index)">
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </ul>

  <div class="col l4 styleForm">
    <form @submit.prevent="agregarTarea">
      <div class="formTitulo">
        <span>Agregar Tarea</span>
      </div>
      <div class="col l12 input-field">
        <input
          v-model="nuevaTarea.in_nombre"
          placeholder="Titulo"
          maxlength="30"
          required
        />
      </div>
      <div class="col l8 input-field">
        <input
          type="date"
          v-model="nuevaTarea.fechaInicio"
          required
        />
        <input type="date" v-model="nuevaTarea.fechaFinalizacion" required />
      </div>
      <div class="col l4 centerButton">
        <button type="submit" class="btn-floating">
          <i class="material-icons" style="font-size: 36px"> add </i>
        </button>
      </div>
      <div class="input-field col l12 input-field">
        <span>Descripción:</span>
        <textarea
          class="materialize-textarea"
          v-model="nuevaTarea.tx_descripcion"
          maxlength="180"
          required
        ></textarea>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tareas: [],
      nuevaTarea: {
        in_nombre: "",
        fechaInicio: "",
        fechaFinalizacion: "",
        tx_descripcion: "",
      },
    };
  },
  props: {
    tareasAc: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    tareasAc: {
      handler() {
        this.tareas = this.tareasAc;
      },
      immediate: true,
    },
  },
  methods: {
    agregarTarea() {
      if (this.nuevaTarea.in_nombre.trim() !== "") {
        const nuevaTareaEstructurada = {
          tx_descripcion: this.nuevaTarea.tx_descripcion,
          in_nombre: this.nuevaTarea.in_nombre,
          i013f_i014t_seguimiento: {
            nu_completado_planificado: [0],
            nu_completado_real: [0],
            fe_plan_inicio: new Date(this.nuevaTarea.fechaInicio),
            fe_plan_fin: new Date(this.nuevaTarea.fechaFinalizacion),
            fe_real_inicio: new Date(this.nuevaTarea.fechaInicio),
            fe_real_fin: new Date(this.nuevaTarea.fechaFinalizacion),
            i014f_i015t_estado_tarea: 4,
          },
        };
        this.tareas.push(nuevaTareaEstructurada);
        this.nuevaTarea = {
          in_nombre: "",
          fechaInicio: "",
          fechaFinalizacion: "",
          tx_descripcion: "",
        };
console.log(this.tareas)
        localStorage.setItem("tareas", JSON.stringify(this.tareas));
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  max-height: 420px;
  overflow-y: scroll;
}
.fixedTable {
  padding: 8px;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
th {
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  background-color: rgb(52, 52, 97);
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
}
td {
  padding: 5px;
  text-align: center;
  border: 1px solid #ddd;
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tableTitle,
.hoverExpandir {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tableTitle:hover,
.hoverExpandir:hover {
  overflow: visible;
  white-space: normal;
}

.styleForm {
  border: 2px solid rgb(212, 210, 210);
  border-radius: 10px;
  background-color: rgb(52, 52, 97);
}
.centerButton {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.centerButton .btn-floating {
  background-color: rgb(255, 248, 248);
  border: none;
  cursor: pointer;
}
.centerButton .btn-floating:hover,
.btn-floating:focus {
  background-color: rgb(202, 202, 228);
}
.centerButton .btn-floating i {
  color: rgb(52, 52, 97);
}
.formTitulo {
  font-size: 24px;
  font-weight: bold;
  display: block;
  text-align: center;
  width: 100%;
  padding: 10px;
  color: rgb(253, 253, 253) !important;
}
.input-field {
  color: rgb(253, 253, 253) !important;
}
.input-field input {
  color: rgb(253, 253, 253) !important;
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field input[type="text"]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field label.active {
  color: rgb(52, 52, 97) !important;
}
textarea {
  height: 80px !important;
  overflow-y: scroll !important;
  font-size: 14px !important;
  background-color: #e2e2e2 !important;
  border-radius: 5px !important;
  border: 1px solid rgb(0, 0, 0) !important;
  padding: 5px !important;
}
textarea.active,
textarea:focus {
  box-shadow: none !important;
}
.btn-floating i {
  font-size: 16px;
}
.btn-floating {
  background-color: rgb(52, 52, 97);
}
.btn-floating:hover,
.btn-floating:focus {
  background-color: rgb(98, 98, 155);
}
.btn {
  margin: 20px 10px 0 0;
  background-color: rgb(52, 52, 97) !important;
}
.btn:hover,
.btn:focus {
  background-color: rgb(98, 98, 155) !important;
}
.btn span {
  display: flex;
  gap: 5px;
}
.btn i {
  font-size: 24px;
}
</style>

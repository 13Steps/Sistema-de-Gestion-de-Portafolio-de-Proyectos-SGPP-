<template>
  <div class="table-container">
    <table class="highlight fixedTable">
      <thead>
        <tr class="tableHead">
          <th>Titulo</th>
          <th>Estado</th>
          <th>Area Tecnica</th>
          <th>Tipo de Proyecto</th>
          <th>Fecha de Inicio</th>
          <th>Fecha de Finalizacion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 50%;
        "
        v-if="filteredEntradas.length == 0"
      >
        <tr class="tableBody">
          <p>No hay entradas</p>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          class="tableBody"
          v-for="entrada in filteredEntradas"
          :key="entrada?.i003i_entrada"
        >
          <td class="tableTitle">{{ entrada?.in_titulo }}</td>
          <td>{{ entrada?.i003f_i006t_estado_entrada?.in_nombre_estado }}</td>
          <td>{{ entrada?.i003f_i010t_area_tecnica?.in_nombre }}</td>
          <td>{{ entrada?.i003f_i011_tipo_proyecto?.in_nombre }}</td>
          <td>
            {{
              isValidDate(entrada?.fechaInicio)
                ? entrada.fechaInicio.getDate() +
                  " " +
                  entrada.fechaInicio.toLocaleDateString("es-ES", {
                    month: "long",
                  }) +
                  " " +
                  entrada.fechaInicio.getFullYear()
                : entrada.fechaInicio
            }}
          </td>
          <td>
            {{
              isValidDate(entrada?.fechaFin)
                ? entrada.fechaFin.getDate() +
                  " " +
                  entrada.fechaFin.toLocaleDateString("es-ES", {
                    month: "long",
                  }) +
                  " " +
                  entrada.fechaFin.getFullYear()
                : entrada.fechaFin
            }}
          </td>
          <td class="actionButtons">
            <a 
              class="btn-floating"
              @click="abrirModalSeeEntrada(entrada?.i003i_entrada)"
            >
              <i class="material-icons">visibility</i>
            </a>
            <a v-if="rol !== 'rolGerente' && rol !== 'rolTrabajador'"
              class="btn-floating"
              @click="abrirModalEditEntrada(entrada?.i003i_entrada)"
            >
              <i class="material-icons">edit</i>
            </a>
            <a v-if="rol !== 'rolGerente' && rol !== 'rolTrabajador'"
              class="btn-floating"
              @click="abrirModalDeleteEntrada(entrada?.i003i_entrada)"
            >
              <i class="material-icons">delete</i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ModalesPequeños
    ref="modalesPequeñosRef"
    :entryId="selectedEntryId"
    @confirmarEliminar="borrarEntrada"
    @confirmVer="movToFichaEntrada"
    @confirmEdit="movToFichaLlenado"
  />
</template>

<script>
import ModalesPequeños from "../ModalsPequeños.vue";
import { movToFichaEntrada, movToFichaLlenado } from "@/Tools/NavOptions";

export default {
  props: {
    filter: {
      type: String,
      default: "",
    },
    tab: {
      type: String,
      default: "Proyectos",
    },
    entradas: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ModalesPequeños,
  },
  data() {
    return {
      proyectos: [],
      selectedEntryId: null,
      modalInstances: null,
      rol: null,
    };
  },
  async mounted() {
    this.proyectos = this.entradas;
    this.rol = JSON.parse(localStorage.getItem("user")).role;
    console.log("Entradas", this.proyectos, this.entradas);
  },
  watch: {
    entradas: {
      handler(newVal) {
        this.proyectos = newVal;
      },
      deep: true,
    },
  },
  computed: {
    filteredEntradas() {
      if (this.proyectos.length === 0) {
        return [];
      }

      const proyectosConFechas = this.proyectos.map((proyecto) => {
        let fechaInicio;
        if (
          !proyecto.i003f_i013t_tareas ||
          proyecto.i003f_i013t_tareas.length === 0
        ) {
          fechaInicio = "Por definir";
        } else {
          const fechasInicio = proyecto.i003f_i013t_tareas
          .map(tarea => tarea?.i013f_i014t_seguimiento?.fe_real_inicio 
            ? new Date(tarea.i013f_i014t_seguimiento.fe_real_inicio) 
            : null
          )
          .filter(fecha => fecha !== null);
          fechaInicio = new Date(Math.min(...fechasInicio));
        }

        // Calcular fecha de fin
        let fechaFin;
        if (
          !proyecto.i003f_i013t_tareas ||
          proyecto.i003f_i013t_tareas.length === 0
        ) {
          fechaFin = "Por definir";
        } else {
          const fechasFin = proyecto.i003f_i013t_tareas
          .map(tarea => tarea?.i013f_i014t_seguimiento?.fe_real_fin 
            ? new Date(tarea.i013f_i014t_seguimiento.fe_real_fin) 
            : null
          )
          .filter(fecha => fecha !== null);
          fechaFin = new Date(Math.max(...fechasFin));
        }

        // Asignar fechaInicio y fechaFin al objeto proyecto
        return {
          ...proyecto,
          fechaInicio,
          fechaFin,
        };
      });

      const tab =
        this.tab.toLowerCase() === "proyectos"
          ? 1
          : this.tab.toLowerCase() === "requerimientos"
            ? 2
            : 3;

      let faseEntrada = proyectosConFechas.filter((entrada) => {
        if (entrada?.i003f_i005t_fase_entrada?.i0005i_fase_entrada) {
          return entrada.i003f_i005t_fase_entrada.i0005i_fase_entrada == tab;
        } else {
          return false;
        }
      });

      let currentEntradas = faseEntrada;
      if (this.filter) {
        return currentEntradas.filter((entrada) =>
          entrada.in_titulo.toLowerCase().includes(this.filter.toLowerCase())
        );
      }
      return currentEntradas;
    },
  },
  methods: {
    isValidDate(date) {
      return date instanceof Date && !isNaN(date);
    },
    abrirModalDeleteEntrada(entryId) {
      this.selectedEntryId = entryId;
      this.$refs.modalesPequeñosRef.openModal(3);
    },
    borrarEntrada(entryId) {
      this.selectedEntryId = entryId;
      console.log("Entrada borrada", entryId);
    },
    abrirModalSeeEntrada(entryId) {
      this.selectedEntryId = entryId;
      this.$store.dispatch("updateSelectedEntryId", entryId);
      this.$refs.modalesPequeñosRef.openModal(4);
    },
    movToFichaEntrada(entryId) {
      movToFichaEntrada(this.$router, entryId);
    },
    abrirModalEditEntrada(entryId) {
      this.selectedEntryId = entryId;
      this.$refs.modalesPequeñosRef.openModal(5);
    },
    movToFichaLlenado(entryId) {
      movToFichaLlenado(this.$router, entryId);
      if (entryId) {
        //Obtener la entrada seleccionada
        const entrada = this.proyectos.find(
          (entrada) => entrada.i003i_entrada === entryId
        );
        const entradaData = {
          i003i_entrada: entrada.i003i_entrada,
          co_entrada: entrada.in_titulo,
          i003f_i010t_area_tecnica: entrada.i003f_i010t_area_tecnica,
          in_titulo: entrada.in_titulo,
          tx_descripcion: entrada.tx_descripcion,
          tx_objetivo: entrada.tx_objetivo,
          tx_alcance: entrada.tx_alcance,
        };

        localStorage.setItem("entradaData", JSON.stringify(entradaData));
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  max-height: 400px;
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
  background-color: #e1dfdf;
}

.tableBody td {
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  height: 80px;
  vertical-align: middle;
  max-width: 250px;
}
.tableBody .tableTitle {
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  height: 80px;
  vertical-align: middle;
  max-width: 200px;
  word-wrap: break-word;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.table-container {
  overflow-x: auto;
  scrollbar-width: thin;
}

.table-container::-webkit-scrollbar {
  height: 8px;
  background-color: rgba(52, 52, 97, 0.5);
}

.table-container::-webkit-scrollbar-thumb {
  background-color: rgba(52, 52, 97, 0.5);
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>

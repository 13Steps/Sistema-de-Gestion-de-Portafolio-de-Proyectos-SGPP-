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
      <tbody>
        <tr
          class="tableBody"
          v-for="entrada in filteredEntradas"
          :key="entrada.i003i_entrada"
        >
          <td class="tableTitle">{{ entrada.in_titulo }}</td>
          <td>{{ entrada.i003f_i006t_estado_entrada.in_nombre_estado }}</td>
          <td>{{ entrada.i003f_i010t_area_tecnica.in_nombre }}</td>
          <td>{{ entrada.i003f_i011_tipo_proyecto.in_nombre }}</td>
          <td>{{ entrada.inicioR }}</td>
          <td>{{ entrada.finR }}</td>
          <td class="actionButtons">
            <a class="btn-floating" @click="abrirModalSeeEntrada(entrada.i003i_entrada)">
              <i class="material-icons">visibility</i>
            </a>
            <a class="btn-floating" @click="abrirModalEditEntrada(entrada.i003i_entrada)">
              <i class="material-icons">edit</i>
            </a>
            <a class="btn-floating" @click="abrirModalDeleteEntrada(entrada.id)">
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
import { getProjects } from "@/Services/Services";

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
  },
  components: {
    ModalesPequeños,
  },
  data() {
    return {
      proyectos: [],
      selectedEntryId: null,
      modalInstances: null,
      entradas: {
        proyectos: [
          {
            id: 1,
            titulo: "Sistema de Prueba",
            estado: "En desarrollo",
            area: "Exploracion",
            tipo: "Desarrollo de Software",
            inicioR: "May 24, 2023",
            finR: "Nov 27, 2024",
          },
        ],
        requerimientos: [
          {
            id: 2,
            titulo: "Sistema de Prueba",
            estado: "",
            area: "",
            tipo: "Desarrollo de Software",
            inicioR: "May 24, 2023",
            finR: "Nov 27, 2024",
          },
        ],
        solicitudes: [
          {
            id: 3,
            titulo: "Sistema de Prueba",
            estado: "",
            area: "",
            tipo: "",
            inicioR: "May 24, 2023",
            finR: "Nov 27, 2024",
          },
          {
            id: 4,
            titulo: "Sistema de Prueba",
            estado: "",
            area: "",
            tipo: "",
            inicioR: "May 24, 2023",
            finR: "Nov 27, 2024",
          },
          {
            id: 5,
            titulo: "Sistema de Prueba",
            estado: "",
            area: "",
            tipo: "",
            inicioR: "May 24, 2023",
            finR: "Nov 27, 2024",
          },
          {
            id: 6,
            titulo: "Sistema de Prueba",
            estado: "",
            area: "",
            tipo: "",
            inicioR: "May 24, 2023",
            finR: "Nov 27, 2024",
          },
          {
            id: 7,
            titulo: "Sistema de Prueba",
            estado: "",
            area: "",
            tipo: "",
            inicioR: "May 24, 2023",
            finR: "Nov 27, 2024",
          },
          {
            id: 8,
            titulo: "Sistema de Prueba",
            estado: "",
            area: "",
            tipo: "",
            inicioR: "May 24, 2023",
            finR: "Nov 27, 2024",
          },
        ],
      },
    };
  },
  async mounted() {
    try {
      const response = await getProjects(); // Llama a getProjects()
      this.proyectos = response; // Guarda la respuesta en la variable projects
      this.$store.dispatch('getProjects', this.proyectos);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  },
  computed: {
    filteredEntradas() {
      if (this.proyectos.length === 0) {
        return [];
      }

      let faseEntrada = this.proyectos.filter((entrada) => {
        return entrada.i003f_i005t_fase_entrada.in_nombre_fase.toLowerCase().includes(this.tab.toLowerCase().replace("s", ""));
      });

      let currentEntradas = faseEntrada
console.log(faseEntrada)
      if (this.filter) {
        return currentEntradas.filter((entrada) =>
          entrada.in_titulo.toLowerCase().includes(this.filter.toLowerCase())
        );
      }
      return currentEntradas;
    },
  },
  methods: {
    abrirModalDeleteEntrada(entryId) {
      this.selectedEntryId = entryId;
      this.$refs.modalesPequeñosRef.openModal(3);
    },
    borrarEntrada(entryId) {
      console.log("Entrada borrada", entryId);
    },
    abrirModalSeeEntrada(entryId) {
      this.selectedEntryId = entryId;
      this.$store.dispatch('updateSelectedEntryId', entryId);
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
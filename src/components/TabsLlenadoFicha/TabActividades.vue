<template>
  <div class="row">
    <h6>Gerencias</h6>
    <div class="col l12">
      <br />
      <div class="col l3 right">
        <label>Gerencia GALBA</label>
        <select v-model="galba" class="browser-default">
          <option disabled selected class="hide"></option>
          <option
            v-for="gerenciaG in gerencias"
            :value="gerenciaG.i009i_gerencia"
          >
            {{ gerenciaG.in_nombre }}
          </option>
        </select>
      </div>
      <div class="col l3 right">
        <label>Gerencia Técnica</label>
        <select v-model="technical" :value="technical" class="browser-default">
          <option disabled selected class="hide"></option>
          <option
            v-for="gerenciaT in gerencias"
            :value="gerenciaT.i009i_gerencia"
          >
            {{ gerenciaT.in_nombre }}
          </option>
        </select>
      </div>
      <div class="col l3 right">
        <label>Gerencia Funcional</label>
        <select v-model="functional" :value="functional" class="browser-default">
          <option disabled selected class="hide"></option>
          <option
            v-for="gerenciaF in gerencias"
            :value="gerenciaF.i009i_gerencia"
          >
            {{ gerenciaF.in_nombre }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div class="row">
    <h6>Definición de Tareas</h6>
    <div class="col l12">
      <div class="col l4">
        <label>Tipo de Proyecto</label>
        <select v-model="selectedType" class="browser-default">
          <option disabled selected class="hide"></option>
          <option
            v-for="types in projectTypes"
            :value="types.i011i_tipo_proyecto"
          >
            {{ types.in_nombre }}
          </option>
        </select>
      </div>
    </div>
    <div class="col l12 tableArea">
      <CrearTarea :tareasAc="tareas" />
    </div>
  </div>
  <div class="row tableArea tableArea">
    <h6>Equipo de Trabajo</h6>
    <CrearEquipo :equipo="equipo" />
  </div>

  <div class="row center">
    <div class="divider"></div>
    <button class="btn" @click="setActividades()">
      <span> <i class="material-icons"> save </i>Guardar </span>
    </button>
  </div>
</template>

<script>
import CrearTarea from "./ComponentesDeCreacion/CrearTarea.vue";
import CrearEquipo from "./ComponentesDeCreacion/CrearEquipo.vue";
import {
  getManagements,
  getProjectTypes,
  updateProject,
  getProjectById
} from "@/Services/Services";

export default {
  components: {
    CrearTarea,
    CrearEquipo,
  },
  data() {
    return {
      tareas: [],
      equipo: [],
      gerencias: [],
      functional: {},
      technical: {},
      galba: {},
      projectTypes: [],
      selectedType: {},
      entrada: null,
      projectTareas: [],
      project: {},
    };
  },
  watch: {
    projectTareas: {
      handler: function (val) {
        this.tareas = val;
      },
      deep: true,
    },
  },
  async mounted() {
    this.entrada = JSON.parse(localStorage.getItem("entradaData"));
    this.project = await getProjectById(this.entrada.i003i_entrada);
   this.projectTareas = this.project?.i003f_i013t_tareas
this.functional = this.project?.i0003f_i008t_equipo_trabajo?.c008f_i009t_gerencia_funcional?.i009i_gerencia
this.technical = this.project?.i0003f_i008t_equipo_trabajo?.c008f_i009t_gerencia_tecnica?.i009i_gerencia
this.galba = this.project?.i0003f_i008t_equipo_trabajo?.c008f_i009t_gerencia_galba?.i009i_gerencia
this.selectedType = this.project?.i003f_i011_tipo_proyecto?.i011i_tipo_proyecto
this.tareas = this.project?.i003f_i013t_tareas
this.equipo = this.project?.i0003f_i008t_equipo_trabajo

    try {
      const gerencias = await getManagements();
      this.gerencias = gerencias.filter((area) => area.in_nombre !== null);
      const projectTypes = await getProjectTypes();
      this.projectTypes = projectTypes.filter((type) => type.in_nombre !== null);
      console.log("Áreas técnicas:", this.technicalAreas);
      console.log("Gestiones:", this.managements);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  },
 methods: {
  setActividades() {
    this.$store.dispatch("getShowLoader", true);
    const miembros = JSON.parse(localStorage.getItem("miembros")) ?? {};
    const trabajadores = JSON.parse(localStorage.getItem("trabajadores")) ?? [];
    const tareas = JSON.parse(localStorage.getItem("tareas")) ?? [];
    const actividades = {
      i0003f_i008t_equipo_trabajo: {
        c008f_i009t_gerencia_funcional: this.functional,
        c008f_i009t_gerencia_tecnica: this.technical,
        c008f_i009t_gerencia_galba: this.galba,
        c008f_i001t_lider_funcional:
          miembros?.c008f_i001t_lider_funcional?.i001i_usuario,
        c008f_i001t_lider_negocio:
          miembros?.c008f_i001t_lider_negocio?.i001i_usuario,
        c008f_i001t_lider_tecnico:
          miembros?.c008f_i001t_lider_tecnico?.i001i_usuario,
        in_cargo: "strasdasdasing",
        c008f_i001t_trabajador: trabajadores.map(item => (item.indicador)),
      },
      i003f_i011_tipo_proyecto: this.selectedType,
      i003f_i013t_tareas: [],
    };

    // Verificar el contenido de this.projectTareas
    console.log("Contenido de projectTareas:", tareas);

    if (this.projectTareas.length > 0) {
      actividades.i003f_i013t_tareas = [...tareas, ...this.projectTareas];
    } else {
      actividades.i003f_i013t_tareas = this.tareas;
    }

    console.log("Actividades1:", actividades);
    console.log("Actividades2:", this.projectTareas);
    console.log("Actividades3:", this.tareas, actividades);

    updateProject(this.entrada.i003i_entrada, actividades)
      .then((response) => {
        console.log(response);
        this.$store.dispatch("getShowLoader", false);
      })
      .catch((error) => {
        this.$store.dispatch("getShowLoader", false);
        console.log(error);
      });
    this.$emit("changeTab", actividades);
  },
}
};
</script>

<style scoped>
.tableArea {
  min-height: 420px !important;
}
/* Botones */
.btn {
  margin: 20px 10px 0 0;
  background-color: rgb(52, 52, 97) !important;
}
.btn:hover {
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
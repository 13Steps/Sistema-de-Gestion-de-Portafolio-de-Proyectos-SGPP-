<template>
  <div class="row">
    <h6>Gerencias</h6>
    <div class="col l12">
      <br />
      <div class="col l3 right">
        <label>Gerencia GALBA</label>
        <select v-model="galba" class="browser-default">
          <option disabled selected class="hide"></option>
          <option v-for="gerenciaG in gerencias" :value="gerenciaG.i009i_gerencia">
            {{ gerenciaG.in_nombre }}
          </option>
        </select>
      </div>
      <div class="col l3 right">
        <label>Gerencia Técnica</label>
        <select v-model="technical" class="browser-default">
          <option disabled selected class="hide"></option>
          <option v-for="gerenciaT in gerencias" :value="gerenciaT.i009i_gerencia">
            {{ gerenciaT.in_nombre }}
          </option>
        </select>
      </div>
      <div class="col l3 right">
        <label>Gerencia Funcional</label>
        <select v-model="functional" class="browser-default">
          <option disabled selected class="hide"></option>
          <option v-for="gerenciaF in gerencias" :value="gerenciaF.i009i_gerencia">
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
          <option v-for="types in projectTypes" :value="types.i011i_tipo_proyecto">
            {{ types.in_nombre }}
          </option>
        </select>
      </div>
    </div>
    <div class="col l12 tableArea">
      <CrearTarea />
    </div>
  </div>
  <div class="row tableArea tableArea">
    <h6>Equipo de Trabajo</h6>
    <CrearEquipo />
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
import { getManagements, getProjectTypes } from "@/Services/Services";

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
    };
  },
  async mounted() {
    try {
      this.gerencias = await getManagements();
      this.projectTypes = await getProjectTypes();
      console.log("Áreas técnicas:", this.technicalAreas);
      console.log("Gestiones:", this.managements);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  },
  methods: {
    setActividades() {
      const miembros = JSON.parse(localStorage.getItem("miembros"));
      const actividades = {
        i0003f_i008t_equipo_trabajo: {
          c008f_i009t_gerencia_funcional: this.functional,
          c008f_i009t_gerencia_tecnica: this.technical,
          c008f_i009t_gerencia_galba: this.galba,
          c008f_i001t_lider_funcional: miembros?.c008f_i001t_lider_funcional?.i001i_usuario,
          c008f_i001t_lider_negocio: miembros?.c008f_i001t_lider_negocio?.i001i_usuario,
          c008f_i001t_lider_tecnico: miembros?.c008f_i001t_lider_tecnico?.i001i_usuario,
          in_cargo: "strasdasdasing",
        },
        i003f_i011_tipo_proyecto: this.selectedType,
      };
      localStorage.setItem("actividades", JSON.stringify(actividades));
      this.$emit("changeTab", actividades);
    },
  },
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

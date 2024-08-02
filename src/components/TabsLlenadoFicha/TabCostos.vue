<template>
  <h6>Estimación de Costo</h6>
  <CrearCosto />

  <div class="row center">
    <div class="divider"></div>
    <button class="btn" @click="CrearProyecto()">
      <span> <i class="material-icons"> save </i>Guardar </span>
    </button>
  </div>
</template>

<script>
import CrearCosto from "./ComponentesDeCreacion/CrearCosto.vue";
import { createProject, updateProject } from "@/Services/Services";

export default {
  components: {
    CrearCosto,
  },
  data() {
    return {
      costos: [],
    };
  },
  methods: {
    CrearProyecto() {
      this.$store.dispatch('getShowLoader', true);
      const entrada = JSON.parse(localStorage.getItem("entradaData"));
      const requerimientos = JSON.parse(localStorage.getItem("requerimientos"));
      const actividades = JSON.parse(localStorage.getItem("actividades"));
      const costos = JSON.parse(localStorage.getItem("costos"));
      const historias = JSON.parse(localStorage.getItem("historias"));
      const tareas = JSON.parse(localStorage.getItem("tareas"));
      const projectPayload = {
        ...entrada,
        ...actividades,
        i003f_i005t_fase_entrada: 1,
        i003f_i006t_estado_entrada: 5,
        i004i_datos_adi: {
          ...requerimientos,
        },
        i003f_i013t_tareas: tareas,
        i003f_i007i_historia_usuario: historias,
        i003f_i016i_costo: costos,
      };

      updateProject(id, projectPayload)
        .then((response) => {
          console.log(response);
          localStorage.removeItem("entradaData");
          localStorage.removeItem("requerimientos");
          localStorage.removeItem("actividades");
          localStorage.removeItem("costos");
          this.$store.dispatch('getShowLoader', false);
        })
        .catch((error) => {
          this.$store.dispatch('getShowLoader', false);
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
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

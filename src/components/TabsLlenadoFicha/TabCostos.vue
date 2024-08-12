<template>
  <h6>Estimación de Costo</h6>
  <CrearCosto :costosEdi="costos"/>

  <div class="row center">
    <div class="divider"></div>
    <button class="btn" @click="CrearProyecto()">
      <span> <i class="material-icons"> save </i>Guardar </span>
    </button>
  </div>
</template>

<script>
import CrearCosto from "./ComponentesDeCreacion/CrearCosto.vue";
import { createProject, updateProject, getProjectById } from "@/Services/Services";

export default {
  components: {
    CrearCosto,
  },
  data() {
    return {
      costos: [],
      entrada: null,
    };
  },
  async mounted() {
    this.entrada = JSON.parse(localStorage.getItem("entradaData"));
    this.project = await getProjectById(this.entrada.i003i_entrada);
    this.costos = this.project.i003f_i016i_costo;
  },
  methods: {
    CrearProyecto() {
      this.$store.dispatch('getShowLoader', true);
      const costos = JSON.parse(localStorage.getItem("costos"));
      const projectPayload = {
        i003f_i016i_costo: costos,
      };

      updateProject(this.entrada.i003i_entrada, projectPayload)
        .then((response) => {
          console.log(response);
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

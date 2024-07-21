<template>
  <div id="tabResumen">
    <div class="row">
      <div class="col l6 hide-on-med-and-down">
        <CartaInformativa />
      </div>
      <div class="col l3 m5 offset-m1 s6">
        <div class="card cartaFecha teal z-depth-2 hoverable">
          <div class="cardContent">
            <div class="cardIcon">
              <i class="material-icons"> event </i>
            </div>
            <div class="cardInfo center">
              <h4>24</h4>
              <span>Abril 2024</span>
            </div>
          </div>
          <div class="white teal-text center cardLabel">
            <h6>Fecha de Inicio</h6>
          </div>
        </div>
      </div>
      <div class="col l3 m5 s6">
        <div class="card cartaFecha indigo lighten-2 z-depth-2 hoverable">
          <div class="cardContent">
            <div class="cardIcon">
              <i class="material-icons"> event_available </i>
            </div>
            <div class="cardInfo center">
              <h4>31</h4>
              <span>Mayo 2026</span>
            </div>
          </div>
          <div class="white indigo-text center cardLabel">
            <h6>Fecha de Finalización</h6>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col l3 m8 offset-m2 hide-on-small-only">
        <div
         class="card z-depth-2 hoverable miembrosEntrada">
          <ListaTrabajadores />
        </div>
      </div>

      <div class="col l9 m12 s12">
        <div class="card-panel z-depth-2 hoverable ganttContainer">
          <GanttTareas />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col l7 m8 s12">
        <div
          class="card-panel z-depth-2 hoverable completacionChart indigo lighten-2"
        >
          <RealPlanChart />
        </div>
      </div>
      <div class="col l5 m4 s12">
        <CostoProyecto />
      </div>
    </div>
  </div>
</template>

<script>
import CartaInformativa from "../CartaInformacion.vue";
import ListaTrabajadores from "../ListaTrabajadores.vue";
import GanttTareas from "../Charts/GanttTareas.vue";
import RealPlanChart from "../Charts/RealVsPlan.vue";
import CostoProyecto from "../CostoProyecto.vue";

export default {
  components: {
    CartaInformativa,
    ListaTrabajadores,
    GanttTareas,
    RealPlanChart,
    CostoProyecto,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    getProject() {
      return this.$store.state.project;
    },
  },
  methods: {},
};
</script>

<style scoped>
.cartaFecha .cardContent {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.cartaFecha .cardIcon i {
  padding: 20px 0 0 0;
  color: white;
  font-size: 74px;
  font-weight: bolder;
}

.cartaFecha .cardInfo {
  display: flex;
  flex-direction: column;
  color: white;
}

.cartaFecha .cardInfo h4 {
  font-size: 36px;
  margin-bottom: 0;
}

.cartaFecha .cardLabel h6 {
  font-size: 14px;
  font-weight: 800;
}

.miembrosEntrada,
.ganttContainer {
  height: auto;
}
</style>

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
              <h4>{{ isValidDate(fechaInicioProyecto)
                && fechaInicioProyecto.getDate() }}</h4>
              <span
                >{{
                  isValidDate(fechaInicioProyecto)
                && fechaInicioProyecto.toLocaleDateString("es-ES", {
                    month: "long",
                  })
                }}
                {{ isValidDate(fechaInicioProyecto)
                && fechaInicioProyecto.getFullYear() }}</span
              >
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
              <h4>{{ isValidDate(fechaFinProyecto)
                && fechaFinProyecto.getDate() }}</h4>
              <span
                >{{
                  isValidDate(fechaFinProyecto)
                && fechaFinProyecto.toLocaleDateString("es-ES", {
                    month: "long",
                  })
                }}
                {{ isValidDate(fechaFinProyecto)
                && fechaFinProyecto.getFullYear() }}</span
              >
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
        <div class="card z-depth-2 hoverable miembrosEntrada">
          <ListaTrabajadores :project="project" />
        </div>
      </div>

      <div class="col l9 m12 s12">
        <div class="card-panel z-depth-2 hoverable ganttContainer">
          <GanttTareas :tasksData="project?.i003f_i013t_tareas" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col l7 m8 s12">
        <div
          class="card-panel z-depth-2 hoverable completacionChart indigo lighten-2"
        >
          <RealPlanChart :seguimiento="project" />
        </div>
      </div>
      <div class="col l5 m4 s12">
        <CostoProyecto :costo="project?.i003f_i016i_costo" />
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
import { getProjects, getProjectById } from "@/Services/Services";

export default {
  components: {
    CartaInformativa,
    ListaTrabajadores,
    GanttTareas,
    RealPlanChart,
    CostoProyecto,
  },
  props: {
    project: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      projectt: {},
    }
  },
    watch: {
    project: {
      handler(newVal) {
        console.log(newVal, this.projectt, 'newVal')
        if (!this.project?.i003f_i013t_tareas || this.project?.i003f_i013t_tareas?.length === 0) {
          this.fechaInicioProyecto = new Date();
          this.fechaFinProyecto = new Date();
        } else {
          const fechasInicio = this.project.i003f_i013t_tareas
            .map(tarea => tarea?.i013f_i014t_seguimiento?.fe_real_inicio 
              ? new Date(tarea.i013f_i014t_seguimiento?.fe_real_inicio) 
              : null
            )
            .filter(fecha => fecha !== null);
          this.fechaInicioProyecto = fechasInicio.length > 0 
            ? new Date(Math.min(...fechasInicio)) 
            : new Date();

          const fechasFin = this.project.i003f_i013t_tareas
            .map(tarea => tarea?.i013f_i014t_seguimiento?.fe_real_fin 
              ? new Date(tarea.i013f_i014t_seguimiento?.fe_real_fin) 
              : null
            )
            .filter(fecha => fecha !== null);
          this.fechaFinProyecto = fechasFin.length > 0 
            ? new Date(Math.max(...fechasFin)) 
            : new Date();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    isValidDate(date) {
      console.log(this.fechaFinProyecto, 'fechaFinProyecto')
      return date instanceof Date && !isNaN(date);
    },
  },
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

<template>
<header>
  <Navigation/>
</header>

<main>

<div class="customContainer">

  <!-- Seccion Charts-->
  <div class="row seccionChart">
    
  <div class="col l8 m8 s12 chartCards proyectosChart">
    <div class="card grey lighten-5 hoverable">
      <div class="card-content">
        <div class="cardTitle">
          <i class="material-icons" style="font-size: 32px;">analytics</i>
          <span>Proyectos Asignados</span>
        </div>
        <div class="divider"></div>
        <ProyectoChart/>
      </div>
    </div>
  </div>

    <div class="col l4 m4 s12">
      <div class="card hoverable z-depth-2 appInfo">
        <div class="card-content appInfo">
          <div class="appTitle">
            <span>
              Sistema de Gestión de Portafolio de Proyectos
            </span>
          </div>
          <div class="divider"></div>
          <div class="appDefinition">
            <span>
              Sistema de información de indicadores diseñado específicamente para optimizar la gestión de proyectos dentro de PDVSA S.A. La herramienta proporcionará un seguimiento de los indicadores clave de rendimiento, facilitando la toma de decisiones estratégicas y mejorando la eficiencia operativa en todos los niveles de la organización.
            </span>
          </div>
        </div>
      </div>
    </div>

</div>

<!-- Seccion Metricas -->
<div class="row seccionMetricas">

  <div class="col l4 m8 offset-m2 s12 chartCards estadosProyectos">
    <div class="card hoverable">
      <div class="card-content">
        <div class="cardTitle">
          <i class="material-icons">data_usage</i>
          <span>Estados de Proyecto</span>
        </div>
        <div class="divider"></div>
        <div class="chartContainer" style="height: auto;">
          <SemiCircle/>
        </div>
        <div class="row chartMetrics">
          <div class="col l6 m6 s6">
            <span class="btn green lighten-2">Completados</span>
          </div>
          <div class="col l6 m6 s6">
            <span class="btn blue lighten-2">Ejecución</span>
          </div>
        </div>
        <div class="row chartMetrics">
          <div class="col l6 m6 s6">
            <span class="btn amber lighten-2">Revisión</span>
          </div>
          <div class="col l6 m6 s6">
            <span class="btn red lighten-1">Cancelados</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col l4 m6 s12 infoCard totalProyectos">
    <div class="card horizontal --border teal lighten-2 hoverable">
      <div class="cardContent">
        <div class="col l12 m12 s12 cardInfo">
            <i class="material-icons white-text cardIcon" style="font-size: 92px;">folder_open</i>
          <div class="center cardMetrics">
            <span class="white-text cardValue">{{proyectos.length}}</span>
            <span class="white-text cardTitle">Proyectos</span>
          </div>
        </div>
        <div class="col l12 m12 s12 cardAction">
          <a @click="movPortafolio()">
            <span class="teal-text">Ver proyectos</span> 
            <i class="material-icons right teal-text">navigate_next</i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="col l4 m6 s12 infoCard totalTareas">
    <div class="card horizontal --border indigo lighten-2 hoverable">
      <div class="cardContent">
        <div class="col l12 m12 s12 cardInfo">
            <i class="material-icons white-text cardIcon" style="font-size: 92px;">task</i>
          <div class="center cardMetrics">
            <span class="white-text cardValue">{{tareas.length}}</span>
            <span class="white-text cardTitle">Tareas</span>
          </div>
        </div>
        <div class="col l12 m12 s12 cardAction">
          <a @click="movPortafolio()">
            <span class="indigo-text">Ver tareas</span> 
            <i class="material-icons indigo-text">navigate_next</i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="col l4 m6 s12 infoCard totalRequerimientos">
    <div class="card horizontal --border deep-orange lighten-2 hoverable">
      <div class="cardContent">
        <div class="col l12 m12 s12 cardInfo">
            <i class="material-icons white-text cardIcon" style="font-size: 92px;">format_list_numbered</i>
          <div class="center cardMetrics">
            <span class="white-text cardValue">{{requerimientos.length}}</span>
            <span class="white-text cardTitle">Requerimientos</span>
          </div>
        </div>
        <div class="col l12 m12 s12 cardAction">
          <a @click="movPortafolio()">
            <span class="deep-orange-text">Ver hojas de requerimientos</span> 
            <i class="material-icons deep-orange-text">navigate_next</i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="col l4 m6 s12 infoCard totalSolicitudes">
    <div class="card horizontal --border  amber lighten-1 hoverable">
      <div class="cardContent">
        <div class="col l12 m12 s12 cardInfo">
            <i class="material-icons white-text cardIcon" style="font-size: 92px;">description</i>
          <div class="center cardMetrics">
            <span class="white-text cardValue">{{solicitudes.length}}</span>
            <span class="white-text cardTitle">Solicitudes</span>
          </div>
        </div>
        <div class="col l12 m12 s12 cardAction">
          <a @click="movPortafolio()">
            <span class="amber-text">Ver solicitudes</span> 
            <i class="material-icons amber-text">navigate_next</i>
          </a>
        </div>
      </div>
    </div>
  </div>

</div>

</div>
</main>


</template>

<script>
import Navigation from '../components/Navigation.vue';
import ProyectoChart from '../components/Charts/proyectosChart.vue';
import SemiCircle from '../components/Charts/semicircleChart.vue';
import { getProjects, getTasks } from '@/Services/Services';

export default {
  components: {
    Navigation,
    ProyectoChart,
    SemiCircle,
  },
  data() {
    return {
      proyectos: [],
      requerimientos: [],
      solicitudes: [],
      tareas: []
    }
  },
  async mounted() {
    try {
      const responseTask = await getTasks();
      const response = await getProjects();
      this.proyectos = response.filter((entrada) => {
        return entrada?.i003f_i005t_fase_entrada?.in_nombre_fase.toLowerCase().includes("proyecto");
      });
      this.requerimientos = response.filter((entrada) => {
        return entrada?.i003f_i005t_fase_entrada?.in_nombre_fase.toLowerCase().includes("requerimiento");
      });
      this.solicitudes = response.filter((entrada) => {
        return entrada?.i003f_i005t_fase_entrada?.in_nombre_fase.toLowerCase().includes("solicitud");
      });
      this.tareas = responseTask;

    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  },
  methods: {
    movPortafolio(){
      this.$router.push('/portafolio');
    },
  }
};
</script>

<style src="../assets/Style/Dashboard.css" scoped></style>
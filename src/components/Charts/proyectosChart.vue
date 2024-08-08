<template>
  <div class="proyectosChart">
    <div ref="proyectosChart" style="max-height: 400px; width: 100%"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts";

export default {
  props: {
    proyectos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartItem: [],
      promedio1: 0,
      promedio2: 0,
    };
  },
  watch: {
    proyectos: {
      handler(newProyectos) {
        if (newProyectos && newProyectos.length !== 0) {
          this.chartItem = newProyectos.map((proyecto) => proyecto.in_titulo);
          this.promedio1 = newProyectos.map((proyecto) =>
            proyecto?.i003f_i013t_tareas.map(
              (tarea) =>
                tarea?.i013f_i014t_seguimiento?.nu_completado_planificado[
                  tarea?.i013f_i014t_seguimiento?.nu_completado_planificado
                    .length - 1
                ]
            )
          );
          this.initChart();
        }
      },
      immediate: true,
    },
  },
  methods: {
    initChart() {
      Highcharts.chart(this.$refs.proyectosChart, {
        chart: {
          type: "bar",
          backgroundColor: "rgba(0,0,0,0)",
        },
        events: {
          load: function () {
            var chart = this;
            window.onresize = function () {
              chart.reflow();
            };
          },
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: this.chartItem,
          title: {
            text: "Proyectos",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Carga total",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
        },
        tooltip: {
          valueSuffix: "%",
        },
        credits: {
          enabled: false,
        },
        legend: {
          align: "high",
        },
        series: [
          {
            name: "Planificado",
            data: [this.proyectos?.promedio_tareas_plan ? this.proyectos?.promedio_tareas_plan : 0 , this.proyectos?.promedio_tareas_real ? this.proyectos?.promedio_tareas_real : 0],
          },
          {
            name: "Real",
            data: [this.proyectos?.promedio_tareas_plan ? this.proyectos?.promedio_tareas_plan : 0 , this.proyectos?.promedio_tareas_real ? this.proyectos?.promedio_tareas_real : 0],
          },
        ],
      });
    },
  },
};
</script>

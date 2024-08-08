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
      console.log([this.proyectos[0]?.in_titulo, this.proyectos[1]?.in_titulo], 'dead')
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
          categories: [this.proyectos[0]?.in_titulo, this.proyectos[1]?.in_titulo],
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
            data: [2, 53],
          },
          {
            name: "Real",
            data: [35, 42],
          },
        ],
      });
    },
  },
};
</script>

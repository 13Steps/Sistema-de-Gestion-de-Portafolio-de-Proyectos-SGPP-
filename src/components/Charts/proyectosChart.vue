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
      promedio1: [],
      promedioReal: [],
    };
  },
  watch: {
    proyectos: {
      handler(newProyectos) {
        if (newProyectos && newProyectos.length !== 0) {
          this.chartItem = newProyectos.map((proyecto) => proyecto.in_titulo);
          this.promedio1 = newProyectos.map((proyecto) => {
            if (proyecto.promedio_tareas_real) {
              return proyecto.promedio_tareas_real[proyecto.promedio_tareas_real.length - 1].promedio;
            } else {
              return 0;
            }
          });

          this.initChart();
        }
      },
      immediate: true,
    },
  },
  methods: {
    initChart() {
      if (!this.$refs.proyectosChart) return;
      console.log(this.chartItem, this.promedio1);
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
            name: "Real",
            data: this.promedio1, // Usar los datos calculados
          },
        ],
      });
    },
  },
};
</script>

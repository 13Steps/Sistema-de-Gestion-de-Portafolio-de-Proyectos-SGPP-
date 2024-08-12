<template>
  <div class="chartCard">
    <span class="white-text">
      <i class="material-icons">stacked_line_chart</i>Grafica Real
    </span>
    <div class="divider"></div>
    <div class="cardsContainer">
      <div class="col l6 m6 s6">
        <div class="card-panel cyan white-text hoverable labelChart">
          <i class="material-icons"> task </i>
          <span> Real </span>
        </div>
      </div>
    </div>
    <div class="chartContainer" ref="realPlanChart"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts";

export default {
  props: {
    seguimiento: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.renderChart();
    window.addEventListener("resize", this.handleResize);
  },
  watch: {
    seguimiento: {
      handler(newSeguimiento) {
        if (newSeguimiento && newSeguimiento.length !== 0) {
          this.renderChart();
        }
      },
      immediate: true,
    },
  },

  methods: {
    renderChart() {
      console.log("Promedio Real", this.seguimiento);
      const chartContainer = this.$refs.realPlanChart;
      if (!chartContainer || !this.seguimiento) return;

      let categories = [];
      let promedioReal = [];

      if (Array.isArray(this.seguimiento.promedio_tareas_real)) {
        categories = this.seguimiento.promedio_tareas_real.map(item => item.fecha);
        promedioReal = this.seguimiento.promedio_tareas_real.map(item => item.promedio);
      }

      if (categories.length === 0) return;

      const allSameMonth = categories.every(date => new Date(date).getMonth() === new Date(categories[0]).getMonth());

      const formattedCategories = categories.map(date => {
        const d = new Date(date);
        const month = d.toLocaleString('es-ES', { month: 'short' });
        return `${month} ${d.getDate()}`;
      });

      console.log(formattedCategories);

      this.chart = Highcharts.chart(chartContainer, {
        chart: {
          type: "line",
          backgroundColor: "rgba(0,0,0,0)",
          spacingBottom: -8,
        },
        title: {
          text: "",
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          lineWidth: 0,
          gridLineWidth: 0,
          categories: formattedCategories,
          labels: {
            style: {
              color: "white",
              fontWeight: 700,
            },
          },
        },
        yAxis: {
          lineWidth: 0,
          gridLineWidth: 1,
          tickInterval: 25,
          title: {
            text: "",
          },
          max: 100,
          min: 0,
          labels: {
            style: {
              color: "white",
              fontWeight: 700,
            },
          },
        },
        series: [
          {
            name: "Real",
            data: promedioReal,
            color: "#00bcd4",
            lineWidth: 5,
            marker: {
              symbol: "square",
              radius: 4,
              fillColor: "#4dd0e1",
            },
          },
        ],
      });
    },
    handleResize() {
      if (this.chart) {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.chart.reflow();
        }, 100);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped>
span {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  letter-spacing: 1.5px;
  font-weight: 700;
}
span i {
  font-size: 32px;
}

.cardsContainer .card-panel {
  padding: 10px;
  border-radius: 10px;
}
.labelChart {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.labelChart i {
  font-size: 32px;
}
.labelChart span {
  margin-top: 5px;
  font-size: 16px;
}
.chartContainer {
  width: 100%;
  height: 30vh;
}
</style>
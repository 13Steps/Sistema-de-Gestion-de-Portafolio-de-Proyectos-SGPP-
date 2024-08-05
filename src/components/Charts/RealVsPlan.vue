<template>
  <div class="chartCard">
    <span class="white-text">
      <i class="material-icons">stacked_line_chart</i>Grafica Real Vs.
      Planificado
    </span>
    <div class="divider"></div>
    <div class="cardsContainer">
      <div class="col l6 m6 s6">
        <div class="card-panel red white-text hoverable labelChart">
          <i class="material-icons"> edit_note </i>
          <span> Planificado </span>
        </div>
      </div>
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
import Highcharts, { color } from "highcharts";

export default {
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.renderChart();
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    renderChart() {
      const chartContainer = this.$refs.realPlanChart;
      if (!chartContainer) return;
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
          categories: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
          ],
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
            data: [
              16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2, 22.0,
              100,
            ],
            color: "#00bcd4",
            lineWidth: 5,
            marker: {
              symbol: "square",
              radius: 4,
              fillColor: "#4dd0e1",
            },
          },
          {
            name: "Planificado",
            data: [
              2.9, 25.2, 0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5, 2.0, 0.9,
            ],
            color: "#e53935",
            lineWidth: 5,
            marker: {
              symbol: "square",
              radius: 4,
              fillColor: "#ef5350",
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

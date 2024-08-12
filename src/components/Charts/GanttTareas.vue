<template>
  <span class="titleCard">
    <i class="material-icons"> analytics </i>Diagrama de Actividades
  </span>
  <div class="divider"></div>

  <div class="ganttContainer">
    <div ref="ganttChart" class="ganttChart"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";

HighchartsGantt(Highcharts);

export default {
  props: {
    tasksData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    tasksData: {
      handler(newTasksData) {
        if (newTasksData && newTasksData.length !== 0) {
          this.renderChart();
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (!this.$refs.ganttChart) {
        console.error("ganttChart element is not available");
        return;
      }

      Highcharts.setOptions({
        lang: {
          months: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          weekdays: [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
          ],
          shortMonths: [
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
        },
        time: {
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b \'%y',
            year: '%Y'
          }
        }
      });

      const ganttData = this.tasksData.map((task) => ({
        name: task?.in_nombre,
        start: new Date(
          task?.i013f_i014t_seguimiento?.fe_plan_inicio
        ).getTime(),
        end: new Date(task?.i013f_i014t_seguimiento?.fe_plan_fin).getTime(),
        completed: {
                amount: task?.i013f_i014t_seguimiento?.nu_completado_real[task?.i013f_i014t_seguimiento?.nu_completado_real.length - 1]/100,
            },
      }));

      Highcharts.ganttChart(this.$refs.ganttChart, {
        events: {
          load: function () {
            var chart = this;
            window.onresize = function () {
              chart.reflow();
            };
          },
        },
        title: {
          text: "Diagrama de Gantt",
        },
        credits: {
          enabled: false,
        },
        xAxis: [
          {
            min:
              ganttData.length > 0 ? ganttData[0].start : Date.UTC(2024, 0, 1),
            max:
              ganttData.length > 0
                ? ganttData[ganttData.length - 1].end
                : Date.UTC(2024, 11, 31),
          },
        ],
        series: [
          {
            name: "Project 1",
            data: ganttData,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.titleCard {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  letter-spacing: 1.5px;
  font-weight: 600;
}
.titleCard i {
  font-size: 32px;
}
.ganttContainer {
  width: 100%;
  max-height: 350px;
  overflow: scroll;
}
.ganttChart {
  width: 100%;
  max-height: auto;
}
</style>
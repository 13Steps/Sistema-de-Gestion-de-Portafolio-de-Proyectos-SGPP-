<template>
  <div id="semicircleChart">
    <div>
      <div ref="semicircleChart" style="height: 200px; width: 200px"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
    props: {
        completados: {
            type: Array,
            default: () => [],
        },
        ejecucion: {
            type: Array,
            default: () => [],
        },
        revision: {
            type: Array,
            default: () => [],
        },
        atrasados: {
            type: Array,
            default: () => [],
        },
    },

    mounted() {
        this.createChart();
    },

    watch: {
        completados() {
            this.createChart();
        },
        ejecucion() {
            this.createChart();
        },
        revision() {
            this.createChart();
        },
        atrasados() {
            this.createChart();
        },
    },

    methods: {
        createChart() {
                Highcharts.chart(this.$refs.semicircleChart, {
                    chart: {
                        type: 'pie',
                    },
                    events: {
                        load: function() {
                            var chart = this;
                            window.onresize = function() {
                                chart.reflow();
                            };
                        },
                    },
                    title: {
                        text: '',
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%',
                        },
                    },
                    credits: {
                        enabled: false,
                    },
                    colors: ['#009688', '#2196f3', '#ffc107', '#f44336'],
                    series: [{
                        type: 'pie',
                        name: 'Estado',
                        innerSize: '50%',
                        data: [
                            ['Completado', this.completados],
                            ['En ejecución', this.ejecucion],
                            ['En revisión', this.revision],
                            ['Atrasado', this.atrasados],
                        ],
                        dataLabels: {
                            enabled: false,
                        },
                    }],
                });
            
        }
    }
};
</script>

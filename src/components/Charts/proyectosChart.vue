<template>
<div class="proyectosChart">
    <div ref="proyectosChart" style="max-height: 400px; width: 100%;"></div>
</div >
</template>

<script>
import Highcharts from 'highcharts';

export default {
    mounted() {
        Highcharts.chart(this.$refs.proyectosChart, {
            chart: {
                type: 'bar',
                backgroundColor: "rgba(0,0,0,0)",
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
            xAxis: {
                categories: ['Sistema de Prueba', 'Sistema Miranda'],
                title: {
                    text: 'Proyectos',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Carga total',
                    align: 'high',
                },
                labels: {
                    overflow: 'justify'
                },
            },
            tooltip: {
                valueSuffix: '%'
            },
            credits: {
                enabled: false,
            },
            legend: {
                align: 'high',
            },
            series: [{
                    name: 'Planificado',
                    data: [80, 75]
                },
                {
                    name: 'Real',
                    data: [42, 72]
                }
            ]
        });
    }
};


</script>
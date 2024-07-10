<template>

    <span class="titleCard">
        <i class="material-icons">
            analytics
        </i>Diagrama de Actividades
    </span>
    <div class="divider"></div>

    <div class="ganttContainer">
        <div ref="ganttChart" class="ganttChart"></div>
    </div>

</template>

<script>
import Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';

HighchartsGantt(Highcharts);

export default {
    mounted() {
        Highcharts.setOptions({
            lang: { 
                months: [
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ],
                weekdays: [
                    'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
                ],
                name: 
                    ['nombre'],
                start: 
                    ['inicio'],
                end: 
                    ['fin'],
            }
        });

        Highcharts.ganttChart(this.$refs.ganttChart, {
            events: {
                load: function() {
                    var chart = this;
                    window.onresize = function() {
                        chart.reflow();
                    };
                },
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false,
            },
            xAxis: [{
                min: Date.UTC(2014, 10, 17),
                max: Date.UTC(2014, 10, 30)
            }],
            series: [{
                name: 'Project 1',
                data: [{
                name: 'Start prototype',
                start: Date.UTC(2014, 10, 18),
                end: Date.UTC(2014, 10, 25)
            }, {
                name: 'Develop',
                start: Date.UTC(2014, 10, 20),
                end: Date.UTC(2014, 10, 25)
            }, {
                name: 'Run acceptance tests',
                start: Date.UTC(2014, 10, 23),
                end: Date.UTC(2014, 10, 26)
            }, {
                name: 'Test prototype',
                start: Date.UTC(2014, 10, 27),
                end: Date.UTC(2014, 10, 29)
            }]
        }]
    });
    
    }
};

</script>

<style scoped>
    .titleCard{
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        letter-spacing: 1.5px;
        font-weight: 600;
    }
    .titleCard i{
        font-size: 32px;
    }
    .ganttContainer{
        width: 100%;
        max-height: 350px;
        overflow: scroll;
    }
    .ganttChart{
        width: 100%;
        max-height: auto;
    }
</style>
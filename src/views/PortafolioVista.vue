<template>
<header>
    <Navigation/>
</header>

<main>
    <div class="tituloVista">
        <h2>Portafolio</h2>
        <p>Sistema de Gestión de Portafolio de Proyectos</p>
    </div>

    <div class="customContainer">

        <div class="row">
            <div class="col l12 m12 s12">
                <div class="card-panel hoverable portafolioContainer">

                    <div class="row selectoresBusqueda">
                        <!-- Datepickers -->
                        <div class="col l3 m5 s8 datePicker input-field">
                            <i class="material-icons prefix">calendar_month</i>
                            <input id="fechaInicio" type="text" class="datepicker">
                            <label for="fechaInicio">Inicio</label>
                        </div>
                        <div class="col l3 m5 s8 datePicker input-field">
                            <i class="material-icons prefix">calendar_month</i>
                            <input id="fechaFin" type="text" class="datepicker">
                            <label for="fechaFin">Finalización</label>
                        </div>
                    </div>


                    <div class="tablaEntradas">
                        <div class="col l12 m12 s12">
                            <div class="card-tabs">
                                    <ul class="tabs">
                                        <li class="tab" :class="{ 'active': showTabla === 'proyectos' }">
                                            <a @click="showTabla = 'proyectos'">Proyectos</a>
                                        </li>
                                        <li class="tab" :class="{ 'active': showTabla === 'requerimientos' }">
                                            <a @click="showTabla = 'requerimientos'">Requerimientos</a>
                                        </li>
                                        <li class="tab" :class="{ 'active': showTabla === 'solicitudes' }">
                                            <a @click="showTabla = 'solicitudes'">Solicitudes</a>
                                        </li>
                                    </ul>
                                </div>
                            <div class="z-depth-2 tablaPrincipal">
                                <div class="tableHeader">
                                    <div class="aitLogo left">
                                        <span>AIT</span>
                                    </div>
                                    <div class="busquedaOpciones">
                                        <span class="busquedaIcon">
                                            <i class="material-icons white-text" style="font-size: 32px;">
                                                search
                                            </i>
                                        </span>
                                        <div class="input-field busquedaForm">
                                            <input id="buscarEntrada" type="text" v-model="searchQuery">
                                            <label for="buscarEntrada">Buscar</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="tableMain">
                                    <TablaEntradas :filter="searchQuery" :tab="showTabla"/>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row actionBtn right-align">
                        <div class="divider"></div>
                        <a class="btn btnNuevo" @click="abrirModalCrearEntrada">
                            <span>
                                <i class="material-icons">note_add</i>
                                Nuevo
                            </span>
                        </a>
                        <a class="btn btnReporte" @click="abrirModalGenerarReporteG">
                            <span>
                                <i class="material-icons">summarize</i>
                                Reporte
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalesPequeños
      ref="modalesPequeñosRef"
      @submitTitulo="handleSubmitTitulo"
      @downloadReporteG="handleDownloadReporteG"
    />

</main>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import TablaEntradas from '../components/Tablas/TablaEntradas.vue'
import ModalesPequeños from '../components/ModalsPequeños.vue'

export default {
    data(){
        return{
            modalInstances: null,
            showTabla: 'proyectos',
            entradaTitle: '',
            titleClass: '',
            titleMessage: '',
            searchQuery: '',
        };
    },
    components:{
        Navigation,
        TablaEntradas,
        ModalesPequeños,
    },
    mounted() {
        // Date pickers
        this.initDatepickers();

    },
    methods: {
        // Date pickers
        initDatepickers(){
            const datepickerElement = document.querySelectorAll('.datepicker');
            const datepickerInstances = M.Datepicker.init(datepickerElement);
        },

        // Modales
        abrirModalCrearEntrada() {
            this.$refs.modalesPequeñosRef.openModal(0);
        },
        abrirModalGenerarReporteG() {
            this.$refs.modalesPequeñosRef.openModal(1);
        },
        handleSubmitTitulo(entradaTitle) {
            // Lógica para manejar el título enviado desde el modal
            console.log('Se ha enviado el título:', entradaTitle);
        },
        handleDownloadReporteG() {
            // Lógica para generar el reporte
            console.log('Descargando el reporte...');
        },
    },
}
</script>

<style src="../assets/Style/Portafolio.css" scoped></style>
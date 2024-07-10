<template>
    <header>
        <Navigation/>
    </header>

    <main>
        <div class="customContainer">
            <div class="row">
                <div class="col l12 m12 s12">
                    <div class="card-panel hoverable fichaEntrada">
                        <div class="card-content fichaTitle">
                            <h4 class="card-title">
                                Registro de Datos de Entrada
                            </h4>
                            <div class="divider"></div>
                        </div>
                        <div class="card-tabs">
                            <ul class="tabs transparent">
                                <li class="tab" :class="{ 'active': tab === 'InfoGeneral' }">
                                    <a @click="cambioTab('InfoGeneral')">Inf. General</a>
                                </li>
                                <li class="tab" :class="{ 'active': tab === 'Requerimientos' }">
                                    <a @click="cambioTab('Requerimientos')">Requerimientos</a>
                                </li>
                                <li class="tab" :class="{ 'active': tab === 'Actividades' }">
                                    <a @click="cambioTab('Actividades')">Actividades</a>
                                </li>
                                <li class="tab" :class="{ 'active': tab === 'Costos' }">
                                    <a @click="cambioTab('Costos')">Estimación de costos</a>
                                </li>
                            </ul>
                        </div>
                        <br>
                        <div v-if="tab === 'Requerimientos'">
                            <Requerimientos/>
                        </div>
                        <div v-else-if="tab === 'Actividades'">
                            <Actividades/>
                        </div>
                        <div v-else-if="tab === 'Costos'">
                            <EstCostos/>
                        </div>
                        <div v-else>
                            <InfGeneral/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import InfGeneral from '../components/TabsLlenadoFicha/TabInfGeneral.vue'
import Requerimientos from '../components/TabsLlenadoFicha/TabRequerimientos.vue'
import Actividades from '../components/TabsLlenadoFicha/TabActividades.vue'
import EstCostos from '../components/TabsLlenadoFicha/TabCostos.vue'

export default {
    data(){
        return{
            tab: 'InfoGeneral',

        }
    },
    components: {
        Navigation,
        InfGeneral,
        Requerimientos,
        Actividades,
        EstCostos,
    },
    mounted() {

    },
    methods: {
        cambioTab(nuevaTab){
            this.tab = nuevaTab;
        },
    }
};
</script>

<style src="../assets/Style/FichaLlenado.css" scoped></style>
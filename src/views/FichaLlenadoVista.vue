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
                            <Requerimientos @changeTab="goToActividades()"/>
                        </div>
                        <div v-else-if="tab === 'Actividades'">
                            <Actividades @changeTab="goToCostos()"/>
                        </div>
                        <div v-else-if="tab === 'Costos'">
                            <EstCostos @changeTab=""/>
                        </div>
                        <div v-else>
                            <InfGeneral @changeTab="goToRequerimientos()"/>
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
import { getProjectById } from '../Services/Services';

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
      async mounted() {
        const url = window.location.href;
        const parts = url.split('/');
        const id = parts[parts.length - 1];
        try {
            this.entrada = await getProjectById(id);
            console.log(this.entrada);
            localStorage.setItem('entradaData', JSON.stringify(this.entrada));
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        cambioTab(nuevaTab){
            this.tab = nuevaTab;
        },
        goToRequerimientos(){
            this.tab = 'Requerimientos';
        },
        goToActividades(){
            this.tab = 'Actividades';
        },
        goToCostos(){
            this.tab = 'Costos';
        }
    }
};
</script>

<style src="../assets/Style/FichaLlenado.css" scoped></style>
<template>
    <div class="tabTitle">
        <span>
            Tareas:
        </span>
    </div>
    <div class="row l12 m12 s12">
        <div class="card hoverable z-depth-2">
                <TablaTareas/>
        </div>
    </div>

    

</template>

<script>
import TablaTareas from '../Tablas/TablaTareas.vue'

export default {
    components: {
        TablaTareas,
    },
    mounted() {

    },
    methods: {

    },
}

</script>

<style scoped>
.tabTitle{
    margin: 0 0 40px 20px;
}
.tabTitle span{
    color: rgb(52, 52, 97);
    font-size: 26px;
    font-weight: 800;
}

.datosCard{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.datosCard .iconContainer i{
    font-size: 72px;
    color: rgb(52, 52, 97);

}
.datosCard .titleContainer, .datosCard .infoContainer{
    margin: 10px 0 0 0;
}
.datosCard .titleContainer h4{
    color: rgb(52, 52, 97);
    font-weight: 800;
}
.datosCard .infoContainer{
    max-width: 280px;
}

.titleContainer{
    margin: 30px 0 30px 0;
    color: rgb(52, 52, 97);
}
.titleContainer span{
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.5px;
}

.collapsibleTitle{
    font-weight: 700;
    display: flex;
    justify-content: center;
}

.datamodel:hover{
    background-color: rgba(214, 214, 214, 0.589);
}
.docName{
    color: rgb(52, 52, 97);
}
.docName:hover{
    cursor: pointer;
}
.descargarBoton{
    background-color: rgb(52, 52, 97);
    color: white;
}

.textContainer{
    max-height: 200px;
    overflow-y: scroll;
}

.cardsContainer .row{
    max-height: 500px;
    overflow-y: scroll;
}


</style>
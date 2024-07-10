<template>
        <div class="fichasContainer">
            <ul class="collection with-header z-depth-2">
                <li class="headerLista">
                    <h6>
                        Información del Proyecto
                    </h6>
                </li>
                <li class="collection-item">
                    <span>
                        <div class="itemIcon"><i class="material-icons">
                                category
                            </i></div>
                        <div class="itemTitle">Tipo de Proyecto:</div>
                        <div class="itemContent">Desarrollo de Software.</div>
                    </span>
                </li>
                <li class="collection-item">
                    <span>
                        <div class="itemIcon"><i class="material-icons">
                                lan
                            </i></div>
                        <div class="itemTitle">Linea de Negocio:</div>
                        <div class="itemContent">Automatización Industrial.</div>
                    </span>
                </li>
                <li class="collection-item">
                    <span>
                        <div class="itemIcon"><i class="material-icons">
                                factory
                            </i></div>
                        <div class="itemTitle">Area Tecnica:</div>
                        <div class="itemContent">Gas.</div>
                    </span>
                </li>
            </ul>
        </div>
</template>

<style scoped>
.headerLista{
    color: rgb(52, 52, 97);
    margin-left: 10px;
}
.headerLista h6{
    font-size: 18px;
    font-weight: 700;
}

.collection-item {
    padding: 3px 0 53px 30px;
    max-height: 40px;
}
.collection-item i{
    font-size: 16px ;
}
li span{
    display: flex;
    align-items: center;
    gap: 10px;
}
.itemContent, .itemTitle{
    font-size: 12px;
}
.itemTitle{
    font-weight: 700;
}

.collection-item:hover{
    background-color: rgba(232, 230, 230, 0.52);
}


</style>
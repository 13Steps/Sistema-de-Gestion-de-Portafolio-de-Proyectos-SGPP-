<template>
    <div class="usariosLista">
        <div class="headerLista white center">
            <span class="titleCard">
                Equipo de Trabajo
            </span>
        </div>
        <div class="listaContainer">
            <div class="listaEntrada">
                <div class="imgContainer">
                    <img src="../assets/Imagenes/user_pic.jpeg" class="responsive-img">
                </div>
                <div class="infoContainer">
                    <div class="userDatos">
                        <h1>Gabriel Marquez</h1>
                        <h3>( MARQUEZGA )</h3>
                    </div>
                    <div class="rolContainer right">
                        <span>Gerente Tecnico</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="downArrow">
            <i class="material-icons">
                arrow_drop_down
            </i>
        </div>
    </div>
</template>


<style scoped>
.usariosLista{
    height: auto;
    max-height: 350px;
    background-color: rgb(224, 224, 224);
    display: flex;
    flex-direction: column;
    scrollbar-width: none;
}

.headerLista{
    border: 1.5px solid rgb(206, 204, 204);
    padding: 5px;
}
.titleCard{
    font-size: 14px;
    font-weight: 700;
}

.listaContainer{
    overflow-y: scroll;
    scrollbar-width: none;
}
.listaEntrada{
    background-color: rgb(255, 255, 255);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin: 1px 0 1px 0;
    align-items: center;
    justify-content: center;
    border: 1.5px solid rgb(206, 204, 204);
}

.imgContainer {
    margin: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgb(52, 52, 97);
}

.imgContainer img {
    width: 100%; 
    height: 100%;
    object-fit: cover;
}

.userDatos h1{
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 5px 0;
}
.userDatos h3{
    font-size: 10px;
    margin: 0 0 10px 0;
    color: rgb(52, 52, 97);
}
.rolContainer{
    align-self: flex-end;
}
.rolContainer span {
    font-size: 12px;
    font-weight: 600;
}

.downArrow{
    width: 100%; 
    height: 25px;
    background-color: rgb(255, 255, 255);
    text-align: center;
    border: 1.5px solid rgb(206, 204, 204);
}

</style>
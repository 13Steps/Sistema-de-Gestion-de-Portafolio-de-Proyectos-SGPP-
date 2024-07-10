<template>
<header>

  <Navigation/>

</header>

<main>

<!-- Titulo Vista -->
<div class="tituloVista">
  <h2>Administrador</h2>
  <p>Sistema de Gestión de Portafolio de Proyectos</p>
</div>

<div class="customContainer">

  <div class="row">
    <div class="col l12">
      <div class="card-panel hoverable adminPanel">
        
        <div class="row">
          <div class="col l4">
            <div class="card-panel newUser">
              <div class="cardTitle">
                <span>
                  <i class="material-icons">person_add</i>
                  Nuevo Usuario
                </span>
              </div>
              <div class="divider"></div>
              <div class="userOption center">
                <div class="input-field col l12">
                  <input id="indicador" type="text" class="validate">
                  <label for="indicador">Ingrese un Indicador</label>
                </div>
                <a class="btn" @click="crearUser">
                  Crear Usuario
                </a>
              </div>
            </div>
          </div>
          <div class="col l5 offset-l3">
            <div class="card databaseCard">
              <div class="card-content">
                <div class="cardTitle">
                  <span>
                    Base de datos:
                  </span>
                </div>
                <div class="databaseOption">
                  <div class="v-line"></div>
                  <div class="cardOption hoverable">
                    	<i class="material-icons">
                        download
                      </i>
                      <span>Exportar</span>
                  </div>
                  <div class="v-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col l12">
            <span class="tableList">
              Lista de Usuarios:
            </span>
            <div class="card hoverable">
                <TablaUsuarios/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</div>
</main>


</template>

<script>
import Navigation from '../components/Navigation.vue';
import TablaUsuarios from '../components/Tablas/TablaUsuarios.vue';

export default {
  components: {
    Navigation,
    TablaUsuarios
  },
  mounted() {
    
  },
  methods: {
    crearUser(){
      alert('Nuevo usuario creado');
    }
  }
};
</script>

<style src="../assets/Style/AdminVista.css" scoped></style>
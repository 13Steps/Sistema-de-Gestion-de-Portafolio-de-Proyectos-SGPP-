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
                <form @submit.prevent="crearUser">
                  <div class="cardTitle">
                      <span>
                        <i class="material-icons">person_add</i>
                        Nuevo Usuario
                      </span>
                  </div>
                  <div class="divider"></div>
                  <div class="userOption center">
                    <div class="input-field col l12">
                      <input v-model="nuevoIndicador" id="indicador" type="text" class="validate" required>
                      <label for="indicador">Ingrese un Indicador</label>
                    </div>
                    <button class="btn">
                      Crear Usuario
                    </button>
                  </div>
                </form>
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
                  <TablaUsuarios :usuarios="usuarios"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
  </div>
  <ModalsForms ref="modalesFormRef" :indicador="nuevoIndicador"/>
  </main>
  
  
  </template>
  
  <script>
  import Navigation from '../components/Navigation.vue';
  import TablaUsuarios from '../components/Tablas/TablaUsuarios.vue';
  import ModalsForms from '../components/ModalsForms.vue';
  
  export default {
    data() {
      return {
        nuevoIndicador: '',
        usuarios: [
          { nombre: 'Gabriel Marquez', indicador: 'MARQUEZGA', rol: 'Admin', fechaCreacion: '24/05/2023' },
          { nombre: 'Beverley Brito', indicador: 'BRITOB', rol: 'Lider de proyecto', fechaCreacion: '11/12/2023' },
        ],
      };
    },
    components: {
      Navigation,
      TablaUsuarios,
      ModalsForms,
    },
    methods: {
      crearUser() {
        if (this.usuarios.some(user => user.indicador === this.nuevoIndicador)) {
          alert('El indicador ya existe.');
          this.nuevoIndicador = '';
        } else {
          this.$refs.modalesFormRef.openModal('modal-nuevo-usuario', this.nuevoIndicador);
          this.nuevoIndicador = '';
        }
      }
    }
  };
  </script>

<style src="../assets/Style/AdminVista.css" scoped></style>
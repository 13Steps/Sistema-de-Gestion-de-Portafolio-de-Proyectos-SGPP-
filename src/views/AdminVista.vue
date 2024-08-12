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
                        <input v-model="nuevoIndicador" @input="convertirAMayusculas" id="indicador" type="text" class="validate" required>
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
                      <a class="cardOption hoverable" :href="documentUrl" download>
                        <i class="material-icons">
                          download
                        </i>
                        <span>Exportar</span>
                      </a>
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
    <ModalsForms ref="modalesFormRef" :in_usuario="nuevoIndicador"/>
  </main>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import TablaUsuarios from '../components/Tablas/TablaUsuarios.vue';
import ModalsForms from '../components/ModalsForms.vue';
import { getUsers } from '@/Services/Services';

export default {
  data() {
    return {
      nuevoIndicador: '',
      usuarios: [],
      documentUrl: require('@/assets/database-08-08-2024.xlsx')
    };
  },
  components: {
    Navigation,
    TablaUsuarios,
    ModalsForms,
  },
  async mounted() {
    try {
      const response = await getUsers(); // Llama a getProjects()
      this.usuarios = response; 
      console.log( this.usuarios)
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  },
  methods: {
    convertirAMayusculas() {
      this.nuevoIndicador = this.nuevoIndicador.toUpperCase();
    },
    crearUser() {
      // Asegurarte de que el indicador esté en mayúsculas
      this.convertirAMayusculas();
      
      if (this.usuarios.some(user => user.in_usuario === this.nuevoIndicador)) {
        alert('El indicador ya existe.');
        this.$store.dispatch("getShowLoader", true);
        this.nuevoIndicador = '';
        this.$store.dispatch("getShowLoader", false);
      } else {
        this.$refs.modalesFormRef.openModal('modal-nuevo-usuario', this.nuevoIndicador);
        this.$store.dispatch("getShowLoader", true);
        this.nuevoIndicador = '';
        this.$store.dispatch("getShowLoader", false);
      }
    }
  }
};
</script>


<style src="../assets/Style/AdminVista.css" scoped></style>
<template>
  <header>
    <Navigation />
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
                        <input
                          v-model="nuevoIndicador"
                          @input="convertirAMayusculas"
                          id="indicador"
                          type="text"
                          class="validate"
                          required
                        />
                        <label for="indicador">Ingrese un Indicador</label>
                      </div>
                      <button class="btn">Crear Usuario</button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col l5 offset-l3">
                <div class="card databaseCard">
                  <div class="card-content">
                    <div class="cardTitle">
                      <span> Base de datos: </span>
                    </div>
                    <div class="databaseOption">
                      <div class="v-line"></div>
                      <button
                        style="background: rgb(52, 52, 97)"
                        class="cardOption hoverable"
                        @click="exporttDatabase"
                      >
                        <i class="material-icons"> download </i>
                        <span>Exportar</span>
                      </button>
                      <div class="v-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col l12">
                <span class="tableList"> Lista de Usuarios: </span>
                <div class="card hoverable">
                  <TablaUsuarios :usuarios="usuarios" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalsForms ref="modalesFormRef" :in_usuario="nuevoIndicador" />
  </main>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import TablaUsuarios from "../components/Tablas/TablaUsuarios.vue";
import ModalsForms from "../components/ModalsForms.vue";
import { getUsers, exportDatabase } from "@/Services/Services";

export default {
  data() {
    return {
      nuevoIndicador: "",
      usuarios: [],
      documentUrl: require("@/assets/database-08-08-2024.xlsx"),
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
      console.log(this.usuarios);
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
      if (
        this.usuarios.some((user) => user.in_usuario === this.nuevoIndicador)
      ) {
        alert("El indicador ya existe.");
        this.nuevoIndicador = "";
      } else {
        this.$refs.modalesFormRef.openModal(
          "modal-nuevo-usuario",
          this.nuevoIndicador
        );
        this.nuevoIndicador = "";
      }
    },
    async exporttDatabase() {
      const response = await exportDatabase();

      // Crear un Blob con el contenido del CSV
      const blob = new Blob([response], { type: "text/csv" });

      // Crear un enlace temporal para la descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "database.csv"; // Nombre del archivo a descargar
      document.body.appendChild(a);
      a.click();

      // Limpiar el DOM
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      console.log(response);
    },
  },
};
</script>

<style src="../assets/Style/AdminVista.css" scoped></style>

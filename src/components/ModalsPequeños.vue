<template>
  <div>
    <!-- Crear Nueva Entrada -->
    <!-- Modal para crear una nueva entrada -->
    <div class="modal modalTarget" ref="mCrearEntrada">
      <div class="modal-content">
        <h4>Nueva Solicitud</h4>
        <div class="divider"></div>
        <div class="modalBody">
          <span class="modalDescription">
            Está por ingresar una nueva solicitud de proyecto. Ingrese el nombre
            de la nueva solicitud:
          </span>
          <div class="input-field col l10 center entradaTitleContainer">
            <input id="entradaTitle" type="text" v-model="entradaTitle" />
            <label for="entradaTitle">Nombre del proyecto</label>
            <span v-if="titleMessage" :class="titleClass" class="left">
              {{ titleMessage }}
            </span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="modal-footer">
        <div class="right actionButtons">
          <a class="btn" @click="closeModal(0)"> cancelar </a>
          <a class="btn" @click="submitTitulo"> aceptar </a>
        </div>
      </div>
    </div>

    <!-- Modal para generar reporte general -->
    <div class="modal modalTarget" ref="mGenerarReporte">
      <div class="modal-content">
        <h4>Generar Reporte</h4>
        <div class="divider"></div>
        <div class="modalBody">
          <span class="modalDescription">
            Se generará un reporte general de la gestión del usuario. ¿Desea
            continuar?
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="modal-footer">
        <div class="right actionButtons">
          <a class="btn" @click="closeModal(1)"> cancelar </a>
          <a class="btn" @click="downloadReporteG"> aceptar </a>
        </div>
      </div>
    </div>

    <!--  Generar Reporte Especifico -->
    <div class="modal modalTarget" ref="mGenerarReporte">
      <div class="modal-content">
        <h4>Generar Reporte</h4>
        <div class="divider"></div>
        <div class="modalBody">
          <span class="modalDescription">
            Se generará un reporte general de la gestión del usuario. ¿Desea
            continuar?
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="modal-footer">
        <div class="right actionButtons">
          <a class="btn" @click="closeModal(2)"> cancelar </a>
          <a class="btn" @click="downloadReporteE"> aceptar </a>
        </div>
      </div>
    </div>

    <!-- Eliminar Entrada -->
    <div class="modal modalTarget" ref="mEliminarEntrada">
      <div class="modal-content">
        <h4>Eliminar Entrada</h4>
        <div class="divider"></div>
        <div class="modalBody">
          <span class="modalDescription">
            ¿Está seguro de que desea <b>eliminar</b> esta entrada?
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="modal-footer">
        <div class="right actionButtons">
          <a class="btn" @click="closeModal(3)"> cancelar </a>
          <a class="btn" @click="confirmarEliminar"> aceptar </a>
        </div>
      </div>
    </div>

    <!-- Ver Ficha Entrada -->
    <div class="modal modalTarget" ref="mVerEntrada">
      <div class="modal-content">
        <h4>Ver Entrada</h4>
        <div class="divider"></div>
        <div class="modalBody">
          <span class="modalDescription">
            ¿Está seguro de que desea <b>visualizar</b> esta entrada?
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="modal-footer">
        <div class="right actionButtons">
          <a class="btn" @click="closeModal(4)"> cancelar </a>
          <a class="btn" @click="confirmVer"> aceptar </a>
        </div>
      </div>
    </div>

    <!-- Editar Ficha Entrada -->
    <div class="modal modalTarget" ref="mEditarEntrada">
      <div class="modal-content">
        <h4>Editar Entrada</h4>
        <div class="divider"></div>
        <div class="modalBody">
          <span class="modalDescription">
            ¿Está seguro de que desea <b>editar</b> esta entrada?
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="modal-footer">
        <div class="right actionButtons">
          <a class="btn" @click="closeModal(5)"> cancelar </a>
          <a class="btn" @click="confirmEdit"> aceptar </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { movToFichaEntrada, movToFichaLlenado } from "@/Tools/NavOptions";
import {
  createProject,
  updateProject,
  deleteProject,
  generateManyReport,
  generateReport,
} from "@/Services/Services";

export default {
  data() {
    return {
      entradaTitle: "",
      titleMessage: "",
      titleClass: "",
      modalInstances: [],
    };
  },
  props: {
    entryId: {
      type: Number,
      required: true,
    },
  },
  watch: {
    entradaTitle(newVal) {
      const projectFound = this.getProjects.find(
        (project) => project.in_titulo === newVal
      );
      if (projectFound) {
        this.titleMessage = "El título en uso";
        this.titleClass = "error-message";
      } else {
        this.titleMessage = "Disponible";
        this.titleClass = "success-message";
      }
    },
  },
  mounted() {
    this.initModals();
  },
  computed: {
    getProjects() {
      console.log(this.$store.state.projects);
      return this.$store.state.projects;
    },
  },
  methods: {
    initModals() {
      const modalElements =
        this.$refs.mCrearEntrada.parentElement.querySelectorAll(".modalTarget");
      this.modalInstances = [];
      modalElements.forEach((element) => {
        this.modalInstances.push(
          M.Modal.init(element, {
            dismissible: false,
          })
        );
      });
    },
    openModal(index) {
      if (this.modalInstances[index]) {
        this.modalInstances[index].open();
      }
    },
    closeModal(index) {
      if (this.modalInstances[index]) {
        this.modalInstances[index].close();
      }
      this.clearFormFields();
    },
    clearFormFields() {
      this.entradaTitle = "";
    },
    validateTitle() {
      if (this.entradaTitle === "No disponible") {
        this.titleMessage = "El título en uso";
        this.titleClass = "error-message";
      } else if (this.entradaTitle) {
        this.titleMessage = "Disponible";
        this.titleClass = "success-message";
      } else {
        this.titleMessage = "";
        this.titleClass = "";
      }
    },
    submitTitulo() {
      this.$store.dispatch("getShowLoader", true);
      if (this.titleMessage === "Disponible") {
        const projectPayload = {
          co_entrada: this.entradaTitle,
          i003f_i011_tipo_proyecto: {},
          i003f_i010t_area_tecnica: {},
          in_titulo: this.entradaTitle,
          tx_descripcion: "",
          tx_alcance: "",
          tx_objetivo: "",
          i0003f_i008t_equipo_trabajo: {},
          i003f_i005t_fase_entrada: {},
          i003f_i006t_estado_entrada: {},
          i003f_i004t_datos_adi: {},
          i003f_i013t_tareas: [],
          i003f_i007i_historia_usuario: [],
          i003f_i016i_costo: [],
        };

        createProject(projectPayload)
          .then((response) => {
            const project = response;
            localStorage.setItem("entradaData", JSON.stringify(project));
            movToFichaLlenado(this.$router);
            this.$store.dispatch("getShowLoader", false);
          })
          .catch((error) => {
            console.log(error);
            this.$store.dispatch("getShowLoader", false);
          });
      }
      console.log("loader");
    },
    async downloadReporteG() {
      this.$store.dispatch("getShowLoader", true);
      this.$emit("downloadReporteG");
      const userId = JSON.parse(localStorage.getItem("user")).id;
      // generar reporte general
      try {
        const response = await generateManyReport(userId);
        this.$store.dispatch("getShowLoader", false);
        const filePath = response.replace(
          "/home/ubuntu/projects/backend-gestion-proyectos",
          ""
        );
        const urlPdf = `http://34.225.211.222:3000${filePath}`;
        window.open(urlPdf, "_blank");
      } catch (error) {
        console.log(error);
        this.$store.dispatch("getShowLoader", false);
      }
      this.closeModal(1);
    },
    async downloadReporteE() {
      console.log('ejecutando downloadReporteE'); 
      
      this.$emit("downloadReporteE");
      
      this.closeModal(2);
    },
     confirmarEliminar() {

      // crear try catch para eliminar la entrada
      try {
        const response = deleteProject(this.entryId);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
      this.$emit("confirmarEliminar");
      this.closeModal(3);
    },
    confirmVer() {
      this.$emit("confirmVer", this.entryId);
      this.closeModal(4);
    },
    confirmEdit() {
      this.$emit("confirmEdit", this.entryId);
      this.closeModal(5);
    },
  },
};
</script>

<style scoped>
.modal {
  scrollbar-width: none;
  max-width: 450px;
}
.modal-content h4 {
  color: rgb(52, 52, 97);
}
.modal-content .modalBody {
  padding-top: 10px;
  text-align: justify;
}
.modal-content .input-field {
  margin-top: 25px;
  margin-bottom: -10px;
}
.modal-content .input-field input {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.modal-content .input-field input[type="text"]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.modal-content .input-field label.active {
  color: rgb(52, 52, 97) !important;
}

.modal-footer .actionButtons {
  display: flex;
  justify-content: right;
  gap: 5px;
}
.actionButtons .btn {
  background-color: rgb(52, 52, 97) !important;
}
.actionButtons .btn {
  background-color: rgb(52, 52, 97) !important;
}
.actionButtons .btn:hover {
  background-color: rgb(98, 98, 155) !important;
}

/* Ingreso de Entradas */
.entradaTitleContainer {
  min-height: 70px;
}
/* Messages */
.error-message {
  color: red;
  font-size: 12px;
  margin: 0px;
}
.success-message {
  color: green;
  font-size: 12px;
  margin: 0px;
}
</style>

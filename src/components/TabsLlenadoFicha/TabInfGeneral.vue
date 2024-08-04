<template>
  <h6>Datos del Proyecto</h6>
  <br />
  <div class="row">
    <div class="col l6">
      <div class="titleContainer">
        <div class="input-field">
          <input
            type="text"
            id="entradaTitulo"
            class="validate"
            v-model="entradaTitulo"
          />
          <label for="entradaTitulo">Titulo entrada</label>
          <span v-if="titleMessage" :class="titleClass">
            {{ titleMessage }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <form class="col l8">
      <div class="row">
        <div class="input-field col l10 textArea">
          <span>Descripción:</span>
          <textarea
            id="entradaDescripcion"
            class="materialize-textarea"
            v-model="entradaDescripcion"
          ></textarea>
          <label for="entradaDescripcion"></label>
        </div>
      </div>
    </form>
    <div class="col l3">
      <div class="row">
        <div class="col s12">
          <label>Área Técnica</label>
          <select v-model="technicalArea" class="browser-default">
            <option disabled selected>Selecciona una opción</option>
            <option v-for="areas in technicalAreas" :value="areas.i010i_area_tecnica">
              {{ areas?.in_nombre }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <form class="col l8">
      <div class="row">
        <div class="input-field col l10 textArea">
          <span>Objetivo General:</span>
          <textarea
            id="entradaObjetivo"
            v-model="entradaObjetivo"
            class="materialize-textarea"
          ></textarea>
          <label for="entradaObjetivo"></label>
        </div>
      </div>
    </form>
    <div class="col l3">
      <div class="row">
        <div class="col s12">
          <label>Línea de Negocios</label>
          <select v-model="managementVal" class="browser-default">
            <option disabled selected>Selecciona una opción</option>
            <option v-for="areas in technicalAreas" :value="areas.i010i_area_tecnica">
              {{ areas?.in_nombre }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <form class="col l8">
      <div class="row">
        <div class="input-field col l10 textArea">
          <span>Alcance:</span>
          <textarea
            id="entradaAlcance"
            v-model="entradaAlcance"
            class="materialize-textarea"
          ></textarea>
          <label for="entradaAlcance"></label>
        </div>
      </div>
    </form>
  </div>
  <div class="divider"></div>
  <div class="row center">
    <button class="btn" @click="setEntradaData()">
      <span> <i class="material-icons"> save </i>Guardar </span>
    </button>
  </div>
  <Loader />
</template>

<script>
import {
  getTechnicalAreas,
  getManagements,
  createProject,
  updateProject
} from "@/Services/Services";
import Loader from "@/components/loader/loader.vue";

export default {
  data() {
    return {
      entradaTitulo: null,
      titleClass: null,
      titleMessage: null,
      technicalAreas: [],
      managements: [],
      titulo: null,
      fechaInicio: null,
      fechaFin: null,
      descripcion: null,
      areaTecnica: null,
      lineaNegocios: null,
      objetivoGeneral: null,
      alcance: null,
      comentario: null,
      technicalArea: null,
      entrada: null
    };
  },
  watch: {
    entradaTitulo: "validateTitle",
  },
  async mounted() {
    this.entrada = JSON.parse(localStorage.getItem("entradaData"));
    this.entradaTitulo = this.entrada.in_titulo;
    this.initDatepickers();
    try {
      this.technicalAreas = await getTechnicalAreas();
      this.managements = await getManagements();
      console.log("Áreas técnicas:", this.technicalAreas);
      console.log("Gestiones:", this.managements);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  },
  methods: {
    // Date pickers
    initDatepickers() {
      const vm = this; // Guarda la referencia a la instancia de Vue
      const elems = document.querySelectorAll(".datepicker");
      elems.forEach((elem) => {
        M.Datepicker.init(elem, {
          format: "yyyy-mm-dd", // Especifica el formato de fecha deseado
          onSelect(date) {
            // Obtiene el ID del input asociado al datepicker
            const id = elem.getAttribute("id");
            // Formatea la fecha seleccionada al formato deseado
            const formattedDate = date.toISOString().substring(0, 10);
            // Actualiza el modelo de datos de Vue basado en el ID
            if (id === "fechaInicio") {
              vm.fechaInicio = formattedDate;
            } else if (id === "fechaFin") {
              vm.fechaFin = formattedDate;
            }
            // Actualiza el valor del input para reflejar el formato correcto
            elem.value = formattedDate;
          },
          // Otras opciones de configuración...
        });
      });
    },
    validateTitle() {
      if (this.entradaTitulo === "No disponible") {
        this.titleMessage = "El título en uso";
        this.titleClass = "error-message";
      } else if (this.entradaTitulo) {
        this.titleMessage = "Disponible";
        this.titleClass = "success-message";
      } else {
        this.titleMessage = "";
        this.titleClass = "";
      }
    },
    async setEntradaData() {
      this.$store.dispatch('getShowLoader', true);
      const entradaData = {
        co_entrada: this.entradaTitulo,
        i003f_i010t_area_tecnica: this.technicalArea,
        in_titulo: this.entradaTitulo,
        tx_descripcion: this.entradaDescripcion,
        tx_objetivo: this.entradaObjetivo,
        tx_alcance: this.entradaAlcance,
      };


      updateProject(this.entrada.i003i_entrada, entradaData)
        .then((response) => {
          console.log(response);
          this.$store.dispatch('getShowLoader', false);
        })
        .catch((error) => {
          this.$store.dispatch('getShowLoader', false);
          console.log(error);
        });
        this.$emit("changeTab", entradaData);
    },
  },
};
</script>

<style scoped>
.titleContainer {
  background-color: rgb(52, 52, 97);
  padding: 10px;
  border-radius: 5px 30px 30px 5px;
  border: 2px solid rgb(230, 226, 226);
  height: 100px;
}
/*Title Container*/
.titleContainer .input-field input {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}
.titleContainer .input-field input[type="text"]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.titleContainer .input-field label.active {
  color: rgba(255, 255, 255, 0.774) !important;
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

/* Text Inputs */
.input-field input {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field input[type="text"]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}

/* Data Pickers */
.datePicker label.active {
  color: rgb(52, 52, 97) !important;
}
.datePicker i {
  color: rgb(52, 52, 97) !important;
}
.datePicker label {
  font-size: 14px !important;
}

.browser-default:focus {
  box-shadow: none !important;
  border: none !important;
}

/* TextArea */
textarea {
  height: 50px !important;
  overflow-y: scroll !important;
  font-size: 14px !important;
  background-color: #e2e2e2 !important;
  border-radius: 10px 10px 0 0 !important;
  border: 1px solid rgb(139, 133, 133) !important;
  padding: 10px !important;
  text-align-last: justify;
  transition: height 0.25s ease-out !important;
  transition: border 0.25s ease-in-out !important;
}
textarea.active,
textarea:focus {
  box-shadow: none !important;
  height: 120px !important;
  border: 2px solid rgb(52, 52, 97) !important;
  transition: height 0.25s ease-in !important;
}
.textArea span {
  font-size: 12px;
  color: #746c6c;
  line-height: 18px;
}

/* Botones */
.btn {
  margin: 20px 10px 0 0;
  background-color: rgb(52, 52, 97) !important;
}
.btn:hover {
  background-color: rgb(98, 98, 155) !important;
}
.btn span {
  display: flex;
  gap: 5px;
}
.btn i {
  font-size: 24px;
}
</style>

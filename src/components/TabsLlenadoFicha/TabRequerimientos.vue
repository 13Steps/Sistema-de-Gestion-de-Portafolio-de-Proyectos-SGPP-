<template>
  <div class="row">
    <h6>Datos Adicionales</h6>
    <form class="col l4 textareaContainer">
      <div class="row">
        <div class="input-field col l10 textArea">
          <span class="center">Interfaz:</span>
          <textarea
            v-model="interfaz"
            id="entradaDescripcion"
            class="materialize-textarea"
          ></textarea>
          <label for="entradaDescripcion"></label>
        </div>
      </div>
    </form>
    <form class="col l4 textareaContainer">
      <div class="row">
        <div class="input-field col l10 textArea">
          <span class="center">Seguridad:</span>
          <textarea
            v-model="seguridad"
            id="entradaDescripcion"
            class="materialize-textarea"
          ></textarea>
          <label for="entradaDescripcion"></label>
        </div>
      </div>
    </form>
    <form class="col l4 textareaContainer">
      <div class="row">
        <div class="input-field col l10 textArea">
          <span class="center">Interconexión:</span>
          <textarea
            v-model="interconexión"
            id="entradaDescripcion"
            class="materialize-textarea"
          ></textarea>
          <label for="entradaDescripcion"></label>
        </div>
      </div>
    </form>
  </div>
  <div class="row">
    <h6>Modelo de Datos</h6>
    <form class="col l6">
      <div class="file-field input-field">
        <div class="btn">
          <span>
            <i class="material-icons"> publish </i>
          </span>
          <input type="file"  @change="archivoSeleccionado"/>
        </div>
        <div class="file-path-wrapper">
          <input
            class="file-path validate"
            type="text"
            id="cargarDataModel"
            placeholder="Subir archivo..."
          />
          <label for="cargarDataModel" class="">Modelo de Datos</label>
        </div>
      </div>
    </form>
    <form class="col l6">
      <div class="row">
        <div class="input-field col l6 offset-l5 textArea">
          <span>Comentario:</span>
          <textarea
            id="entradaComentario"
            v-model="entradaComentario"
            class="materialize-textarea"
          ></textarea>
          <label for="entradaComentario"></label>
        </div>
      </div>
    </form>
  </div>
  <div class="row">
    <h6>Historias de Usuario</h6>
    <CrearHistoriaUsuario />
  </div>
  <div class="row center">
    <div class="divider"></div>
    <button class="btn" @click="guardarDatos">
      <span> <i class="material-icons"> save </i>Guardar </span>
    </button>
  </div>
</template>

<script>
import CrearHistoriaUsuario from "./ComponentesDeCreacion/CrearHistoriaUsuario.vue";
import {
  updateProject
} from "@/Services/Services";

export default {
  components: {
    CrearHistoriaUsuario,
  },
  data() {
    return {
      interfaz: null,
      seguridad: null,
      interconexión: null,
      cargarDataModel: null,
      entradaComentario: null,
      entrada: null,
    };
  },
  mounted() {
    this.entrada = JSON.parse(localStorage.getItem("entradaData"));
  },
  methods: {
    archivoSeleccionado(event) {
            // Verifica si hay archivos seleccionados
            if (event.target.files.length > 0) {
                // Actualiza la propiedad del archivo con el primer archivo seleccionado
                this.cargarDataModel = event.target.files[0];
            }
        },
    guardarDatos() {
      const id_adi = JSON.parse(localStorage.getItem("entradaData")).i003f_i004t_datos_adi.i004i_datos_adi;
      const historias = JSON.parse(localStorage.getItem("historias"));
      this.$store.dispatch('getShowLoader', true);
      const requerimientos = {
        i003f_i004t_datos_adi: {
          i004i_datos_adi: id_adi,
          tx_interfaz: this.interfaz,
          tx_interconexion: this.interconexión,
          tx_seguridad: this.seguridad ,
          tx_datamodelo: this.cargarDataModel,
          tx_comentario: this.entradaComentario
        },
        i003f_i007i_historia_usuario: historias
      }
      
      updateProject(this.entrada.i003i_entrada, requerimientos)
        .then((response) => {
          console.log(response);
          this.$store.dispatch('getShowLoader', false);
        })
        .catch((error) => {
          this.$store.dispatch('getShowLoader', false);
          console.log(error);
        });
        this.$emit("changeTab", requerimientos);
    },
       
  },
};
</script>

<style scoped>
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
.textareaContainer {
  height: 200px;
}
textarea {
  height: 100px !important;
  overflow-y: scroll !important;
  font-size: 14px !important;
  background-color: #e2e2e2 !important;
  border-radius: 10px 10px 0 0 !important;
  border: 1px solid rgb(139, 133, 133) !important;
  padding: 10px !important;
  text-align: justify !important;
  transition: height 0.25s ease-out !important;
  transition: border 0.25s ease-in-out !important;
}
textarea.active,
textarea:focus {
  box-shadow: none !important;
  height: 150px !important;
  border: 2px solid rgb(52, 52, 97) !important;
  transition: height 0.25s ease-in !important;
}
.textArea span {
  text-align: center;
  font-size: 18px;
  color: rgb(52, 52, 97);
  font-weight: 600;
  width: 100%;
}

/* Botones */
.file-field .btn {
  background-color: rgb(52, 52, 97) !important;
  margin: none !important;
}
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

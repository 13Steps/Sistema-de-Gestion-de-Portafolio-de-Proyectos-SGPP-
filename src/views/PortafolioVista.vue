<template>
  <header>
    <Navigation />
  </header>

  <main>
    <div class="tituloVista">
      <h2>Portafolio</h2>
      <p>Sistema de Gestión de Portafolio de Proyectos</p>
    </div>

    <div class="customContainer">
      <div class="row">
        <div class="col l12 m12 s12">
          <div class="card-panel hoverable portafolioContainer">
            <div class="row selectoresBusqueda">
              <!-- Datepickers -->
              <div class="col l3 m5 s8 datePicker input-field">
                <i class="material-icons prefix">calendar_month</i>
                <input
                  v-model="fechaInicio"
                  id="fechaInicio"
                  type="text"
                  class="datepicker"
                />
                <label for="fechaInicio">Inicio</label>
              </div>
              <div class="col l3 m5 s8 datePicker input-field">
                <i class="material-icons prefix">calendar_month</i>
                <input
                  v-model="fechaFin"
                  id="fechaFin"
                  type="text"
                  class="datepicker"
                />
                <label for="fechaFin">Finalización</label>
              </div>
            </div>

            <div class="tablaEntradas">
              <div class="col l12 m12 s12">
                <div class="card-tabs">
                  <ul class="tabs">
                    <li
                      class="tab"
                      :class="{ active: showTabla === 'proyectos' }"
                    >
                      <a @click="showTabla = 'proyectos'">Proyectos</a>
                    </li>
                    <li
                      class="tab"
                      :class="{ active: showTabla === 'requerimientos' }"
                    >
                      <a @click="showTabla = 'requerimientos'"
                        >Requerimientos</a
                      >
                    </li>
                    <li
                      class="tab"
                      :class="{ active: showTabla === 'solicitudes' }"
                    >
                      <a @click="showTabla = 'solicitudes'">Solicitudes</a>
                    </li>
                  </ul>
                </div>
                <div class="z-depth-2 tablaPrincipal">
                  <div class="tableHeader">
                    <div class="aitLogo left">
                      <span>AIT</span>
                    </div>
                    <div class="busquedaOpciones">
                      <span class="busquedaIcon">
                        <i
                          class="material-icons white-text"
                          style="font-size: 32px"
                          >search</i
                        >
                      </span>
                      <div class="input-field busquedaForm">
                        <input
                          id="buscarEntrada"
                          type="text"
                          v-model="searchQuery"
                        />
                        <label for="buscarEntrada">Buscar</label>
                      </div>
                    </div>
                  </div>
                  <div class="tableMain">
                    <TablaEntradas
                      :filter="searchQuery"
                      :tab="showTabla"
                      :entradas="entradasFiltradas"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row actionBtn right-align">
              <div class="divider"></div>
              <a class="btn btnNuevo" @click="abrirModalCrearEntrada">
                <span>
                  <i class="material-icons">note_add</i>
                  Nuevo
                </span>
              </a>
              <a class="btn btnReporte" @click="abrirModalGenerarReporteG">
                <span>
                  <i class="material-icons">summarize</i>
                  Reporte
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalesPequeños
      ref="modalesPequeñosRef"
      @submitTitulo="handleSubmitTitulo"
      @downloadReporteG="handleDownloadReporteG"
    />
  </main>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import TablaEntradas from "../components/Tablas/TablaEntradas.vue";
import ModalesPequeños from "../components/ModalsPequeños.vue";
import { projects } from "../Services/Services";
import { createProject, updateProject } from "@/Services/Services";
import { getProjects } from "@/Services/Services";

export default {
  data() {
    return {
      modalInstances: null,
      showTabla: "proyectos",
      entradaTitle: "",
      titleClass: "",
      titleMessage: "",
      searchQuery: "",
      projects: [],
      fechaInicio: '',
      fechaFin: '',
      entradas: [], 
      entradasFiltradas: []
    };
  },
  components: {
    Navigation,
    TablaEntradas,
    ModalesPequeños,
  },
 async mounted() {
    // Date pickers
    this.initDatepickers();
    this.$store.dispatch("getShowLoader", true);
    try {
      const response = await getProjects(); // Llama a getProjects()
      this.proyectos = response; // Guarda la respuesta en la variable projects
      this.entradas = this.projects; // Ejemplo de inicialización
      this.entradasFiltradas = response; 
      this.$store.dispatch("getProjects", this.proyectos);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
    this.$store.dispatch("getShowLoader", false);
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
        });
      });
    },
    // Modales
    abrirModalCrearEntrada() {
      this.$refs.modalesPequeñosRef.openModal(0);
    },
    abrirModalGenerarReporteG() {
      this.$refs.modalesPequeñosRef.openModal(1);
    },
    handleSubmitTitulo(entradaTitle) {
      // Lógica para manejar el título enviado desde el modal
      console.log("Se ha enviado el título:", entradaTitle);
    },
    handleDownloadReporteG() {
      // Lógica para generar el reporte
      console.log("Descargando el reporte...");
    },
    filtrarEntradasPorFecha() {
      const inicio = new Date(this.fechaInicio);
      const fin = new Date(this.fechaFin);
      const projects1 = this.$store.state.projects;
      console.log(projects1)

      this.entradasFiltradas = projects1.filter(entrada => {
        const fechaEntrada = new Date(entrada.createdAt);
        return fechaEntrada >= inicio && fechaEntrada <= fin;
      });
    }
  },
  watch: {
    fechaInicio(newVal) {
      this.filtrarEntradasPorFecha();
      console.log(this.entradasFiltradas, newVal)
    },
    fechaFin(newVal) {
      this.filtrarEntradasPorFecha();
      console.log(this.entradasFiltradas, newVal)
    }
  }
};
</script>

<style src="../assets/Style/Portafolio.css" scoped></style>

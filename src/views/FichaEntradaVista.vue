<template>
  <header>
    <Navigation />
  </header>

  <main>
    <div class="customContainer">
      <div class="row">
        <div class="col l12 m12 s12">
          <div class="card-panel hoverable fichaEntrada">
            <div class="card-content fichaTitle">
              <h4 class="card-title">
                {{getProject?.in_titulo}}
                <a
                  ref="dropdown"
                  data-target="entradaOpciones"
                  class="btn-flat right"
                >
                  <i class="material-icons" style="font-size: 32px">
                    more_vert
                  </i>
                </a>
              </h4>
              <div class="entradaStatus">
                <div class="faseEntrada">
                  <div class="colorCircle"></div>
                  <span class="statusLabel">Fase:</span>
                  <span class="statusValue">{{ getProject?.i003f_i005t_fase_entrada?.in_nombre}}</span>
                </div>
                <div class="estadoEntrada">
                  <div class="colorCircle"></div>
                  <span class="statusLabel">Estado:</span>
                  <span class="statusValue">{{ getProject?.i003f_i006t_estado_entrada?.in_nombre_estado }}</span>
                </div>
              </div>
              <div class="divider"></div>
            </div>
            <div class="card-tabs">
              <ul class="tabs transparent">
                <li class="tab" :class="{ active: tab === 'resumen' }">
                  <a @click="cambioTab('resumen')">Resumen</a>
                </li>
                <li class="tab" :class="{ active: tab === 'tareas' }">
                  <a @click="cambioTab('tareas')">Tareas</a>
                </li>
                <li class="tab" :class="{ active: tab === 'requerimientos' }">
                  <a @click="cambioTab('requerimientos')">Requerimientos</a>
                </li>
                <li class="tab" :class="{ active: tab === 'foro' }">
                  <a @click="cambioTab('foro')">Discusión</a>
                </li>
              </ul>
            </div>
            <br />
            <div v-if="tab === 'tareas'">
              <TabTareas />
            </div>
            <div v-else-if="tab === 'requerimientos'">
              <TabRequerimientos />
            </div>
            <div v-else-if="tab === 'foro'">
              <TabForo />
            </div>
            <div v-else>
              <TabResumen />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dropdown -->
    <ul id="entradaOpciones" class="dropdown-content">
      <div class="acctionButton dropdown">
        <li>
          <a @click="openModal(0)">
            <i class="material-icons">summarize</i>
            Reporte
          </a>
        </li>
        <li>
          <a @click="openModal(1)">
            <i class="material-icons" style="font-weight: 700">category</i>
            Fase
          </a>
        </li>
        <li>
          <a @click="openModal(2)">
            <i class="material-icons">edit</i>
            Editar
          </a>
        </li>
        <li>
          <a @click="openModal(3)">
            <i class="material-icons">delete</i>
            Eliminar
          </a>
        </li>
      </div>
    </ul>

    <!-- Modal #1 Index === 0 - Reporte -->
    <div class="modal modalTarget" ref="mFiltro0">
      <div class="modal-header">
        <h4>Generar Reporte</h4>
        <div class="divider"></div>
      </div>
      <div class="modalContent">
        <p>
          Se generar un reporte del siguiente entrada:  {{getProject?.in_titulo}}
        </p>
      </div>
      <div class="modal-footer center">
        <div class="divider"></div>
        <div class="actionButtons">
          <a class="btn" @click="closeModal(0)">Cancelar</a>
          <a class="btn" @click="generarReporteEspecifico(getProject.i003i_entrada)">Aceptar</a>
        </div>
      </div>
    </div>

    <!-- Modal #2  Index === 1 - Fase y Estado-->
    <div class="modal modalTarget" ref="mFiltro1">
      <div class="modal-header">
        <h4>Estado de Proyecto</h4>
        <div class="divider"></div>
      </div>
      <div class="modalContent">
        <form @submit.prevent="guardarCambios">
          <div class="row">
            	<div class="col l6">
            	  <div class="input-field col l12 ">
            	    <span>Fase de Entrada</span>
            	    <select class="browser-default" v-model="entrada.fase" required>
            	      <option disabled value="" class="hide">Fase</option>
            	      <option value="Proyecto">Proyecto</option>
            	      <option value="Requerimiento">Requerimiento</option>
            	      <option value="Solicitud">Solicitud</option>
            	    </select>
            	  </div>
            	</div>
              <div class="col l6">
                  <div class="input-field col l12 ">
                    <span>Estado de Entrada</span>
                    <select class="browser-default" v-model="entrada.estado" required>
                      <option disabled value="" class="hide">Estado</option>
                      <option value="Completado">Completado</option>
                      <option value="En Desarrollo">En Desarrollo</option>
                      <option value="En Revisión">En Revisión</option>
                      <option value="Atrasado">Atrasado</option>
                    </select>
                  </div>
              </div>
          	</div>
            <div class="modal-footer center">
              <div class="divider"></div>
              <div class="actionButtons">
                <a class="btn" @click="closeModal(1)">Cancelar</a>
                <a class="btn" @click="guardarCambios">Guardar Cambios</a>
              </div>
            </div>
        </form>
      </div>
    </div>

    <!-- Modal #3 Index === 2 - Editar-->
    <div class="modal modalTarget" ref="mFiltro2">
      <div class="modal-header">
        <h4>Editar Entrada</h4>
        <div class="divider"></div>
      </div>
      <div class="modalContent">
        <p>
          ¿Desea editar la información de esta entrada?
        </p>
      </div>
      <div class="modal-footer center">
        <div class="divider"></div>
        <div class="actionButtons">
          <a class="btn" @click="closeModal(2)">Cancelar</a>
          <a class="btn" @click="movFichaLlenado">Aceptar</a>
        </div>
      </div>
    </div>

    <!-- Modal #4 Index === 3 - Eliminar-->
    <div class="modal modalTarget" ref="mFiltro3">
      <div class="modal-header">
        <h4>Eliminar Entrada</h4>
        <div class="divider"></div>
      </div>
      <div class="modalContent">
        <p>
          ¿Desea eliminar esta entrada?
        </p>
      </div>
      <div class="modal-footer center">
        <div class="divider"></div>
        <div class="actionButtons">
          <a class="btn" @click="closeModal(3)">Cancelar</a>
          <a class="btn" @click="deleteEntrada">Aceptar</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import TabResumen from "../components/TabsFichaEntrada/TabResumen.vue";
import TabRequerimientos from "../components/TabsFichaEntrada/TabRequerimientos.vue";
import TabTareas from "../components/TabsFichaEntrada/TabTareas.vue";
import TabForo from "../components/TabsFichaEntrada/TabForo.vue";
import { generateReport } from "@/Services/Services";

export default {
  props: ["entryId"],
  data() {
    return {
      tab: "resumen",
      entrada: {
        fase: "Proyecto",
        estado: "En Desarrollo",
      },
      modalInstances: [],
    };
  },
  components: {
    Navigation,
    TabResumen,
    TabRequerimientos,
    TabTareas,
    TabForo,
  },
  computed: {
    getProject() {
      return this.$store.state.project;
    },
  },
  mounted() {
    // Dropdown
    this.initDropdown();

    // Modal
    this.initModals();

    //Carga de datos
    this.loadEntryData(this.entryId);
  },
  methods: {
    loadEntryData(entryId) {
      // Lógica para cargar la información de la entrada con entryId
      console.log("Cargando información para la entrada con ID:", entryId);
    },

    cambioTab(nuevaTab) {
      this.tab = nuevaTab;
    },

    //Dropdown
    initDropdown() {
      const dropdownElement = this.$refs.dropdown;
      this.dropdownInstance = M.Dropdown.init(dropdownElement, {
        hover: false,
        coverTrigger: false,
        constrainWidth: false,
        alignment: "right",
      });
    },

    // Modal
    initModals() {
      const modalElements = document.querySelectorAll(".modalTarget");
      this.modalInstances = [];
      modalElements.forEach((element, index) => {
        const instance = M.Modal.init(element);
        this.modalInstances.push(instance);
        this.$refs[`mFiltro${index}`] = element;
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
    },
    setFase(nuevaFase) {
      this.entrada.fase = nuevaFase;
      this.closeModal(1);
    },

    generarReporteEspecifico(id){
      // petición para generar reporte de la entrada con id
      generateReport(id);
      this.closeModal(0);
    },
    guardarCambios() {
      // Lógica para guardar los cambios en la entrada
      console.log("Guardar cambios:", this.entrada);
      this.closeModal(1);
    },
    movFichaLlenado(){
      // Logica de moverse a la ficha de llenado de la entrada seleccionada
      this.closeModal(2);
    },
    deleteEntrada(){
      // logica de borrado de entrada y luego mover al usuario a la VistaPortafolio
      this.closeModal(3);
    }
  },
};
</script>

<style src="../assets/Style/FichaEntrada.css" scoped></style>
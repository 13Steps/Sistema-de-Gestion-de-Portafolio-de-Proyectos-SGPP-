<template>
    <div class="card horizontal z-depth-2 cartaHistoria">
      <div class="cardContainer">
        <div class="cardInfo">
          <div class="cardCode">
            <span>Codigo: {{formattedCodigo}}</span>
          </div>
          <div class="center cardTitle">
            <span><b>{{historia.in_titulo}}</b></span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="cardAction center">
          <div class="btnContainer" @click="openModal">
            <a class="btn-flat"> Ver detalles </a>
          </div>
        </div>
      </div>
    </div>

  <!-- Modal -->
  <div class="modal" ref="modal">
    <div class="modalHeader right">
      <a class="btn-flat" @click="closeModal()">
        <i class="material-icons" style="font-size: 24px"> close </i>
      </a>
    </div>
    <div class="modal-content">
      <h4>{{historia.in_titulo}}</h4>
      <span style="margin: 0px">Codigo: {{formattedCodigo}}</span>
      <div class="divider"></div>
      <div class="modalDesc">
        <span>Descripción:</span>
        <p>{{historia.tx_descripcion}}</p>

        <div v-if="tab === 'funcionalidad'">
          <div class="modalTab">
            <span>Funcionalidad:</span>
            <p>
              {{historia.tx_funcionalidad}}
            </p>
          </div>
        </div>
        <div v-else-if="tab === 'criterio'">
          <div class="modalTab">
            <span>Criterio de Evaluación:</span>
            <p>{{historia.tx_criterio}}</p>
          </div>
        </div>
        <div v-else>
          <div class="modalTab">
            <span>Rol:</span>
            <p>
              {{historia.tx_rol}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer card-tabs">
      <ul class="tabs tabs-fixed-width transparent">
        <li class="tab" :class="{ active: tab === 'rol' }">
          <a @click="cambioTab('rol')">Rol</a>
        </li>
        <li class="tab" :class="{ active: tab === 'funcionalidad' }">
          <a @click="cambioTab('funcionalidad')">Funcionalidad</a>
        </li>
        <li class="tab" :class="{ active: tab === 'criterio' }">
          <a @click="cambioTab('criterio')">Criterio de Evaluación</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      historia: {
        type: Object,
        required: true,
      },
      codigo: {
        type: Number,
        required: true,
      },
    },
    computed: {
    formattedCodigo() {
      return String(this.codigo).padStart(3, '0');
    }
  },
  data() {
    return {
      tab: "rol",
    };
  },
  mounted() {
    this.initModal();
  },
  methods: {
    initModal() {
      const modalElements = this.$refs.modal;
      this.modalInstance = M.Modal.init(modalElements, {
        dismissible: false,
      });
    },
    openModal() {
      if (this.modalInstance) {
        this.modalInstance.open();
      }
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.close();
      }
    },

    cambioTab(nuevaTab) {
      this.tab = nuevaTab;
    },
  },
};
</script>

<style scoped>
.cardContainer {
  border-left: 15px inset rgb(52, 52, 97);
  width: 100%;
}

.cardInfo {
  padding: 5px;
}
.cardInfo .cardCode {
  margin: 3px;
  font-size: 12px;
  color: rgb(80, 79, 79);
}
.cardInfo .cardTitle {
  margin: 10px 0 5px 0;
  font-size: 14px;
}

.btnContainer {
  transition: background-color 0.3s ease;
}
.btnContainer:hover {
  background-color: rgba(171, 171, 171, 0.395);
  cursor: pointer;
}
.btnContainer a {
  color: rgb(52, 52, 97);
  font-size: 1em;
  font-weight: 700;
  transition: color 0.3s ease;
}

.modal {
  max-width: 600px;
}
.modal-content h4 {
  margin: 0px !important;
}
.modalDesc {
  margin-top: 20px;
}
.modalDesc span {
  font-size: 16px;
  font-weight: 700;
  color: rgb(52, 52, 97);
}
.modalDesc p {
  margin: 15px 10px 0 20px;
  max-height: 100px;
  overflow-y: scroll;
  font-size: 14px;
}

.card-tabs ul {
  width: 100%;
  border-top: 1px solid rgb(224, 224, 224);
}
.tabs li a {
  color: rgb(52, 52, 97);
  font-weight: 700;
  transition: all 0.5s ease;
}
.tabs li a:hover {
  color: rgb(95, 95, 167);
  cursor: pointer;
}

.active a {
  color: rgb(95, 95, 167) !important;
  cursor: default !important;
}

.modalTab {
  margin-top: 20px;
}
.modalTab span {
  font-size: 16px;
  font-weight: 700;
  color: rgb(52, 52, 97);
}
.modalTab p {
  max-height: 200px;
  font-size: 14px;
  overflow-y: scroll;
}
</style>

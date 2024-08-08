<template>
  <div>
    <div class="row alignOpciones">
      <div class="col l7 offset-l1 collectionContainer">
        <ul class="collection">
          <li
            class="collection-item"
            v-for="(historia, index) in historias"
            :key="index"
            style="padding: 0 !important"
          >
            <div class="listadoHistorias">
              <div class="listadoHeader">
                <span class="title">{{ historia.in_titulo }}</span>
                <div class="listadoActions">
                  <a class="white-text" @click="eliminarHistoria(index)">
                    <i class="material-icons">delete</i>
                  </a>
                </div>
              </div>

              <div class="listadoBody">
                <p>{{ historia.tx_descripcion }}</p>

                <div class="card-tabs">
                  <ul class="tabs transparent">
                    <li class="tab">
                      <a @click="cambioTab('Rol')">Rol</a>
                    </li>
                    <li class="tab">
                      <a @click="cambioTab('Funcionalidad')">Funcionalidad</a>
                    </li>
                    <li class="tab">
                      <a @click="cambioTab('Criterio')">Criterio</a>
                    </li>
                  </ul>
                </div>
                <div v-if="tab === 'Funcionalidad'">
                  <p>{{ historia.tx_funcionalidad }}</p>
                </div>
                <div v-else-if="tab === 'Criterio'">
                  <p>{{ historia.tx_criterio }}</p>
                </div>
                <div v-else>
                  <p>{{ historia.tx_rol }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col l3 offset-l1 nuevaHistoria">
        <a class="btn" @click="abrirModalCrearHistoria">Nueva Historia</a>
      </div>
    </div>
  </div>
  <ModalsForms ref="modalesFormRef" @submit-historia="handleNuevaHistoria">
  </ModalsForms>
</template>

<script>
import ModalsForms from "../../ModalsForms.vue";

export default {
  components: {
    ModalsForms,
  },
  data() {
    return {
      historias: [],
      tab: "Rol",
    };
  },
  methods: {
    abrirModalCrearHistoria() {
      this.$refs.modalesFormRef.openModal("modal-historia");
    },
    handleNuevaHistoria(historia) {
      this.historias.push(historia);
      localStorage.setItem("historias", JSON.stringify(this.historias));
    },
    eliminarHistoria(index) {
      this.historias.splice(index, 1);
    },
    cambioTab(nuevaTab) {
      this.tab = nuevaTab;
    },
  },
};
</script>

<style scoped>
.alignOpciones {
  display: flex;
  align-items: center;
  justify-content: center;
}

.collectionContainer {
  max-height: 220px;
  overflow-y: auto;
}
.collection-item {
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
  border-bottom: 1px solid #272727;
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

.listadoHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgb(52, 52, 97);
}
.listadoHeader span {
  color: white;
  font-size: 16px;
  font-weight: 700;
}
.listadoActions a {
  margin-left: 10px;
  transition: all 0.3s ease;
}
.listadoActions a:hover {
  color: rgb(94, 94, 119) !important;
  cursor: pointer;
}
.listadoBody {
  padding: 8px;
}
.listadoBody p {
  font-size: 13px;
  font-weight: 500;
  color: rgb(20, 20, 20);
}
.card-tabs {
  margin-top: 10px;
  width: 100%;
  font-weight: 700;
}
.card-tabs a {
  color: rgb(52, 52, 97) !important;
}
.card-tabs a:hover {
  color: rgb(94, 94, 119) !important;
  cursor: pointer;
}
</style>

<template>
  <div class="card teal hoverable z-depth-2">
    <div class="card-content">
      <div class="tituloCarta">
        <span class="card-title white-text">
          <i class="material-icons"> payments </i>Costo Estimado
        </span>
      </div>

      <div class="divider"></div>

      <div class="costoEstimado">
        <span  v-if="costoTotal" class="cardValue white-text">
          {{ costoTotal }}
          <span class="cardCurrency"> $ </span>
        </span>
        <span v-else class="cardValue white-text"> Por definir </span>
      </div>
    </div>

    <div class="white teal-text center cardLabel">
      <a class="btn-flat teal-text" @click="openModal()">
        <i class="material-icons"> search </i>
        Ver detalles
      </a>
    </div>
  </div>

  <!-- Modal -->
  <div ref="modal" class="modal">
    <div class="modal-content">
      <div class="modalTitle">
        <h5>Detalles: Costo de Proyecto</h5>
      </div>
      <div class="divider"></div>
      <div class="tableContainer">
        <TablaCosto :costos='getProject.i003f_i016i_costo' />
      </div>
      <div class="divider"></div>
      <div class="totalContainer right">
        <span class="totalLabel"> Monto total aproximado: </span>
        <span v-if="costoTotal" class="totalValue"> {{ costoTotal }} $ </span>
        <span v-else class="totalValue"> Por definir </span>
      </div>
    </div>
  </div>
</template>

<script>
import TablaCosto from "../components/Tablas/TablaCosto.vue";
export default {
  computed: {
    getProject() {
      return this.$store.state.project;
    },
    costoTotal() {
      return this.getProject?.i003f_i016i_costo?.reduce((total, costo) => {
        return total + parseFloat(costo.nu_monto) || 0;
      }, 0);
    },
  },
  components: {
    TablaCosto,
  },
  methods: {
    openModal() {
      console.log(this.costoTotal)
      const modal = this.$refs.modal;
      if (modal) {
        M.Modal.init(modal).open();
      }
    },
  },
};
</script>

<style scoped>
.tituloCarta {
  display: flex;
  align-items: center;
}

.tituloCarta .card-title {
  display: flex;
  align-items: center;
}

.tituloCarta .card-title i {
  margin-right: 10px;
}

.costoEstimado {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.costoEstimado .cardValue {
  font-size: 36px;
  font-weight: bold;
}

.costoEstimado .cardCurrency {
  font-size: 24px;
  margin-left: 5px;
}

.cardLabel {
  padding: 10px 0;
}

.modalTitle {
  margin-bottom: 20px;
}
</style>

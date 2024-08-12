<template>
  <br />
  <div class="row">
    <ul class="col l8">
      <div v-if="!costos || costos.length === 0">
        <p>No hay costos registrados.</p>
      </div>
      <div class="table-container" v-else>
        <table class="highlight fixedTable">
          <thead>
            <tr class="tableHead">
              <th>Titulo</th>
              <th>Monto</th>
              <th>Fecha de Registro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="tableBody" v-for="(costo, index) in costos" :key="index">
              <td class="tableTitle">{{ costo.in_titulo }}</td>
              <td>{{ formatCurrency(costo.nu_monto) }}</td>
              <td>{{ costo.fechaDeRegistro ? costo.fechaDeRegistro : "-" }}</td>
              <td class="actionButtons">
                <button class="btn-floating" @click="eliminarCosto(index)">
                  <i class="material-icons">delete</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ul>

    <div class="col l4 styleForm">
      <form @submit.prevent="agregarCosto">
        <div class="formTitulo">
          <span>Agregar Costo</span>
        </div>
        <div class="col l11 input-field">
          <input
            v-model="nuevoCosto.in_titulo"
            placeholder="Titulo"
            maxlength="10"
            required
          />
        </div>
        <div class="col l8 input-field">
          <div class="input-wrapper">
            <input
              v-model="nuevoCosto.nu_monto"
              placeholder="0.00 $"
              maxlength="10"
              @input="validateMonto"
              required
            />
          </div>
        </div>
        <div class="col l4 centerButton">
          <button class="btn-floating">
            <i class="material-icons" style="font-size: 36px"> add </i>
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="row">
    <div class="">
      <div class="totalContainer">
        <span class="totalTitle">Total:</span>
        <span class="totalValue">{{ formatCurrency(totalCostos) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      costos: [],
      nuevoCosto: {
        in_titulo: "",
        nu_monto: "",
        fechaDeRegistro: "",
      },
    };
  },
  props: {
    costosEdi: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    costosEdi: {
      handler(newCostos) {
        this.costos = newCostos;
      },
      deep: true,
    },
  },
  computed: {
    totalCostos() {
      return this.costos.reduce(
        (total, costo) => total + parseFloat(costo.nu_monto) || 0,
        0
      );
    },
  },
  methods: {
    agregarCosto() {
      if (
        this.nuevoCosto.in_titulo.trim() !== "" &&
        this.nuevoCosto.nu_monto.trim() !== ""
      ) {
        this.nuevoCosto.fechaDeRegistro = new Date()
          .toISOString()
          .split("T")[0];
        this.costos.push({ ...this.nuevoCosto });
        this.nuevoCosto = {
          in_titulo: "",
          nu_monto: "",
          fechaDeRegistro: "",
        };
      }
      localStorage.setItem("costos", JSON.stringify(this.costos));
    },
    validateMonto(event) {
      let value = event.target.value;
      value = value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) {
        value = parts[0] + "." + parts.slice(1).join("");
      }
      event.target.value = value;
      this.nuevoCosto.monto = value;
    },
    formatCurrency(value) {
      return `$ ${parseFloat(value).toFixed(2)}`;
    },
    eliminarCosto(index) {
      this.costos.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  max-height: 240px;
  overflow-y: scroll;
}
.fixedTable {
  padding: 8px;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
th {
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  background-color: rgb(52, 52, 97);
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
}
td {
  padding: 5px;
  text-align: center;
  border: 1px solid #ddd;
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tableTitle,
.hoverExpandir {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tableTitle:hover,
.hoverExpandir:hover {
  overflow: visible;
  white-space: normal;
}

.totalContainer {
  display: flex;
  align-items: center;
  border-radius: 10px;
}
.totalContainer .totalTitle {
  font-size: 28px;
  font-weight: 700;
  padding: 10px;
  background-color: rgb(52, 52, 97);
  border-radius: 10px 0 0 10px;
  border: 2px solid black;
  color: white;
}
.totalContainer .totalValue {
  font-size: 28px;
  font-weight: 600;
  padding: 10px;
  border: 2px solid black;
  border-radius: 0 10px 10px 0;
}
.styleForm {
  border: 2px solid rgb(212, 210, 210);
  border-radius: 10px;
  background-color: rgb(52, 52, 97);
}
.centerButton {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.centerButton .btn-floating {
  background-color: rgb(255, 248, 248);
  border: none;
  cursor: pointer;
}
.centerButton .btn-floating:hover,
.btn-floating:focus {
  background-color: rgb(202, 202, 228);
}
.centerButton .btn-floating i {
  color: rgb(52, 52, 97);
}
.formTitulo {
  font-size: 24px;
  font-weight: bold;
  display: block;
  text-align: center;
  width: 100%;
  padding: 10px;
  color: rgb(253, 253, 253) !important;
}
.input-field {
  color: rgb(253, 253, 253) !important;
}
.input-field input {
  color: rgb(253, 253, 253) !important;
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field input[type="text"]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field label.active {
  color: rgb(52, 52, 97) !important;
}
.btn-floating i {
  font-size: 16px;
}
.btn-floating {
  background-color: rgb(52, 52, 97);
}
.btn-floating:hover,
.btn-floating:focus {
  background-color: rgb(98, 98, 155);
}
</style>

<template>
    <h6>Estimación de Costo</h6>
    <CrearCosto/>

    <div class="row center">
    <div class="divider"></div>
    <button class="btn">
      <span> <i class="material-icons"> save </i>Guardar </span>
    </button>
  </div>
</template>

<script>
    import CrearCosto from "./ComponentesDeCreacion/CrearCosto.vue";

    export default {
        components: {
            CrearCosto,
        }
    }
</script>

<style scoped>
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
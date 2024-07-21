<template>
    <div class="table-container">
        <table class="highlight fixedTable">
            <thead>
                <tr class="tableHead">
                    <th>Indicador</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Fecha de Creación</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(usuario, index) in usuarios" :key="index" class="tableBody">
                    <td>{{ usuario.indicador }}</td>
                    <td class="hoverExpandir">{{ usuario.nombre }} {{ usuario.apellido }}</td>
                    <td>{{ usuario.rol }}</td>
                    <td>{{ usuario.fechaCreacion }}</td>
                    <td class="actionButtons">
                        <a class="btn-floating">
                            <i class="material-icons">visibility</i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        usuarios: {
          type: Array,
          required: true
        }
    },
    mounted() {
    },
    methods: {

  }
}
</script>

<style scoped>
.table-container {
    overflow-x: auto;
}

.fixedTable {
    padding: 8px;
    border-collapse: collapse;
    width: 100%;
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
.hoverExpandir {
  max-width: 150px; 
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hoverExpandir:hover {
  overflow: visible;
  white-space: normal;
}
.btn-floating i{
    font-size: 16px;
}
.btn-floating{
    background-color: rgb(52, 52, 97);
    margin: 0 2px 0 2px;
}
.btn-floating:hover{
    background-color: rgb(98, 98, 155);
}


/* modal */
.titleContainer{
    margin: 10px 0 10px 20px;
}
.modalTitle{
    color: rgb(52, 52, 97);
    font-size: 28px;
    font-weight: 700;
}

</style>
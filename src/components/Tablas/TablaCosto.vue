<template>
    <div class="table-container">
        <table class="highlight fixedTable">
            <thead>
                <tr class="tableHead">
                    <th>Descripcion</th>
                    <th>Costo</th>
                    <th>Fecha de Registro</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(costo, index) in costos" :key="index" class="tableBody">
                    <td>{{ costo.in_titulo }}</td>
                    <td>{{ costo.nu_monto }} $</td>
                    <td>{{ costo.fechaRegistro }}</td>
                </tr>
            </tbody>
            <br>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        costos: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.table-container {
    overflow-x: auto;
    min-height: 200px;
    max-height: 300px;
}

.fixedTable {
    border-collapse: collapse;
    width: 100%;
    height: 100%;
}

.tableHead th {
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    background-color: rgb(52, 52, 97);
    color: white;
    position: sticky;
    top: 0; 
    z-index: 1;
}

.tableBody td {
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
    max-width: 250px;
}

.totalLabel, .totalValue{
    font-size: 16px;
    border: 1px solid #e4e4e4;
}
</style>
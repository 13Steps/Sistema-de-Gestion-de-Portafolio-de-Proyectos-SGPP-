<template>
    <div class="table-container">
        <table class="highlight fixedTable">
            <thead>
                <tr class="tableHead">
                    <th>Nombre</th>
                    <th>Indicador</th>
                    <th>Rol</th>
                    <th>Fecha de creacion</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr class="tableBody">
                    <td>Gabriel Marquez</td>
                    <td>MARQUEZGA</td>
                    <td>Admin</td>
                    <td>24/05/2023</td>
                    <td class="actionButtons">
                        <a class="btn-floating" @click="openModal"><i class="material-icons">visibility</i></a>
                    </td>
                </tr>
                <tr class="tableBody">
                    <td>Beverley Brito</td>
                    <td>BRITOB</td>
                    <td>Lider de proyecto</td>
                    <td>11/12/2023</td>
                    <td class="actionButtons">
                        <a class="btn-floating" @click="openModal"><i class="material-icons">visibility</i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

<!-- Modal -->
    <div class="modal" ref="modal">
        <div class="modalHeader right">
            <a class="btn-flat" @click="closeModal()">
                <i class="material-icons" style="font-size: 24px;">
                    close
                </i>
            </a>
        </div>
        <div class="titleContainer">
            <span class="modalTitle">Informacion Usuario</span>
        </div>
        <div class="divider"></div>
        <div class="modal-content">
            <div class="modalSection">
                <div class="userInfo">

                </div>
            </div>
            <div class="modalSection">
                
            </div>
        </div>
    </div>


</template>

<script>
export default {
    mounted() {
        this.initModal();
    },    
    methods: {
        initModal(){
            const modalElements = this.$refs.modal;
            this.modalInstance = M.Modal.init(modalElements,{
                dismissible: false,
            });
        },
        openModal(){
                if (this.modalInstance) {
                    this.modalInstance.open();
            }
        },
        closeModal(){
            if (this.modalInstance){
                this.modalInstance.close()
            }
        },
    },
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
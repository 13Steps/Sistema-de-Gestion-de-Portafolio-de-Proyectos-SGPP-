<template>
<div class="card teal hoverable z-depth-2">
    <div class="card-content">
            <div class="tituloCarta">
                <span class="card-title white-text">
                    <i class="material-icons">
                        payments
                    </i>Costo Estimado
                </span>
                
            </div>
            
            <div class="divider"></div>
    
            <div class="costoEstimado">
                <span class="cardValue white-text">
                    800.50
                    <span class="cardCurrency">
                        $
                    </span>
                </span>
            </div>
        </div>

        <div class="white teal-text center cardLabel">
            <a class="btn-flat teal-text" @click="openModal()">
                <i class="material-icons">
                    search
                </i>
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
            <TablaCosto/>
        </div>
        <div class="divider"></div>
        <div class="totalContainer right">
            <span class="totalLabel">
                Monto total aproximado: 
            </span>
            <span class="totalValue">
                800.50 $
            </span>
        </div>
    </div>
</div>


</template>

<script>
import TablaCosto from '../components/Tablas/TablaCosto.vue'

export default {
    data(){
        return{
            modalInstance: null,
        }
    },
    components:{
        TablaCosto,
    },
    mounted(){
        this.initModal();
    },
    methods: {
        initModal(){
            const modalElements = this.$refs.modal;
            this.modalInstance = M.Modal.init(modalElements);
        },
        openModal(){
                if (this.modalInstance) {
                this.modalInstance.open();
            }
        }
    },
}

</script>

<style scoped>
    .card{
        position: relative;
    }
    .card-content{
        padding-bottom: 0px !important;
    }

    .tituloCarta span{
        font-weight: 600;
        display: flex !important;
        align-items: center;
        gap: 10px ;
        font-size: 20px;
    }
    .tituloCarta i{
        font-size: 32px;
        font-weight: 500;
    }
    
    .costoEstimado{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 20px 10px 20px;

    }
    .costoEstimado span{
        font-weight: 600;
        display: flex !important;
        align-items: center;
        justify-content: center;
        align-items: center;
        font-size: 38px;
    }
    .costoEstimado .cardCurrency{
        font-size: 34px;
        font-weight: 700;
        margin-left: 10px;
    }

    .cardLabel a{
        margin-top: 10px;
        display: flex !important;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 14px;
        font-weight: 700;
    }
    .cardLabel i{
        font-size: 20px;
        font-weight: 700;
    }
    .cardLabel a:hover{
        background-color:rgba(246, 246, 246, 0.621);
    }

    .modalTitle h5{
        color: rgb(52, 52, 97);
    }

    .tableContainer{
        min-height: 200px;
        max-height: 300px;
    }

    .totalContainer{
        margin: 15px;
    }
    .totalValue, .totalLabel{
        font-size: 18px;
        color: rgb(52, 52, 97);
    }
    .totalValue{
        font-weight: 700;
    }


</style>
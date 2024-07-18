<template>
    <div>
      <!-- Modal para registrar Historia de Usuario - Index 0 -->
      <div ref="modalHistoria" id="modal-historia" class="modal modalTarget">
        <div class="modal-header center">
            <span>Registrar Historia de Usuario</span>
        </div>  
          <div class="modal-content">
            <form @submit.prevent="submitFormHistoria" class="styleBorder row">
              <div class="input-field col l12">
                <input id="titulo" type="text" v-model="historia.titulo" maxlength="30" required>
                <label for="titulo">Título</label>
              </div>
              <div class="input-field col l7">
                  <span class="textArea">Descripción:</span>
                  <textarea id="descripcion" class="materialize-textarea" v-model="historia.descripcion" required></textarea>
              </div>
              <div class="input-field col l5">
                  <span class="textArea">Rol:</span>
                  <textarea id="rol" class="materialize-textarea" v-model="historia.rol"></textarea>
              </div>
              <div class="input-field col l7">
                  <span class="textArea">Funcionalidad:</span>
                  <textarea id="funcionalidad" class="materialize-textarea" v-model="historia.funcionalidad"></textarea>
              </div>
              <div class="input-field col l5">
                  <span class="textArea">Criterio:</span>
                  <textarea id="criterio" class="materialize-textarea" v-model="historia.criterio"></textarea>
                </div>
              <div class="modal-footer col l12 right">
                <div class="divider"></div>
                <button type="submit" class="btn">Guardar</button>
              </div>
            </form>
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
      historia: {
        titulo: '',
        descripcion: '',
        rol: '',
        funcionalidad: '',
        criterio: '',
      }
    };
  },
  mounted() {
    this.initModals();
  },
  methods: {
    initModals() {
      const modalElements = this.$el.querySelectorAll('.modalTarget');
      this.modalInstances = [];
      modalElements.forEach(element => {
        this.modalInstances.push(M.Modal.init(element, {
          dismissible: false
        }));
      });
    },
    openModal(id) {
      const modal = this.modalInstances.find(modal => modal.el.id === id);
      if (modal) {
        modal.open();
      }
    },
    closeModal(id) {
      const modal = this.modalInstances.find(modal => modal.el.id === id);
      if (modal) {
        modal.close();
      }
      this.clearFormFieldsHistoria();
    },
    submitFormHistoria() {
      this.$emit('submit-historia', { ...this.historia });
      this.closeModal('modal-historia');
    },
    clearFormFieldsHistoria() {
      this.historia = {
        titulo: '',
        descripcion: '',
        rol: '',
        funcionalidad: '',
        criterio: '',
      };
    },
  }
};
</script>

<style scoped>

.modal{
    scrollbar-width: none;
    max-width: 500px;
}
.modal-header span{
  text-align: center;
  font-size: 24px;
  margin: 10px;
  font-weight: 700;
  color: rgb(52, 52, 97) !important;
}
.modal-content .modalBody{
    padding-top: 10px;
    text-align: justify;
}
.modal-content .input-field{
    margin-top: 25px;
    margin-bottom: -10px;
}
.modal-content .input-field input{
    border-bottom: 1px solid #e2e2e2 !important;
    box-shadow: none !important;
}
.modal-content .input-field input[type=text]:focus {
    border-bottom: 1px solid #e2e2e2 !important;
    box-shadow: none !important;
}
.modal-content .input-field label.active {
    color: rgb(52, 52, 97) !important;
}

.modal-footer .actionButtons{
    display: flex;
    justify-content: right;
    gap: 5px;
}
.actionButtons .btn{
    background-color: rgb(52, 52, 97) !important;
}
.actionButtons .btn{
    background-color: rgb(52, 52, 97) !important;
}
.actionButtons .btn:hover{
    background-color: rgb(98, 98, 155) !important;
}
/* Text Inputs */
.input-field input{
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field input[type=text]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}

/* TextArea */
textarea{
    height: 80px !important;
    overflow-y: scroll !important;
    font-size: 14px !important;
    background-color: #e2e2e2 !important;
    border-radius: 5px !important;
    border: 1px solid rgb(139, 133, 133) !important;
    padding: 5px !important;
}
textarea.active, textarea:focus{
      box-shadow: none !important;
      border: 1px solid rgb(52, 52, 97) !important;
}
.textArea span{
    font-size: 12px;
    color: #746c6c;
    line-height: 18px;
}
.btn{
    margin: 20px 10px 0 0;
    background-color: rgb(52, 52, 97) !important;
}
.btn:hover{
    background-color: rgb(98, 98, 155) !important;
}
.btn span{
    display: flex;
    gap: 5px;
}
.btn i {
    font-size: 24px;
}
</style>
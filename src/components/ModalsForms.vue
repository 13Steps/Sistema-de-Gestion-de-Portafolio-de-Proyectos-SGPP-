<template>
  <div>
    <!-- Modal para registrar Historia de Usuario - Index 0 -->
    <div ref="modalHistoria" id="modal-historia" class="modal modalTarget">
      <div class="modal-header center">
          <span>Registrar Historia de Usuario</span>
      </div>  
        <div class="modal-content">
          <form @submit.prevent="submitFormHistoria" class="row">
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
              <br>
              <div class="actionButtons right">
                <button class="btn" @click="closeModal('modal-historia')">Cancelar</button>
                <button type="submit" class="btn">Guardar</button>
              </div>
            </div>
          </form>
      </div>
    </div>

    <!-- Modal para registro de nuevo usuario - Index 1 -->
    <div ref="modalNuevoUsuario" id="modal-nuevo-usuario" class="modal modalTarget">
      <div class="modal-header center">
        <span>Registrar Nuevo Usuario</span>
      </div>  
        <div class="modal-content">
          <form @submit.prevent="submitFormUsuario">
            <div class="formContent row">
              <div class="col l12 center">
                  <span class="indicadorUser">
                    {{ usuario.indicador }}
                  </span>
                  <br><br>
              </div>
              <div class="col l6">
                <div class="input-field col l12">
                  <input id="nombreUsuario" type="text" v-model="usuario.nombre" maxlength="50" required>
                  <label for="nombreUsuario">Nombre</label>
                </div>
                <div class="input-field col l12">
                  <input id="apellidoUsuario" type="text" v-model="usuario.apellido" maxlength="50" required>
                  <label for="apellidoUsuario">Apellido</label>
                </div>
              </div>
              <div class="col l6">
                <div class="input-field col l12">
                  <input id="correoUsuario" type="email" v-model="usuario.email" maxlength="50" required>
                  <label for="correoUsuario">Correo Empresarial</label>
                </div>
                <div class="input-field col l12">
                  <input id="contraseñaUsuario" type="password" v-model="usuario.password" maxlength="50" required>
                  <label for="contraseñaUsuario">Contraseña</label>
                </div>
              </div>
              <div class="col l12">
                <div class="input-field col l12 ">
                  <select v-model="usuario.rol" class="browser-default" required>
                    <option disabled value="" class="hide">Rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Líder de Proyecto">Líder de Proyecto</option>
                    <option value="Trabajador">Trabajador</option>
                  </select>
                </div>
              </div>
              <div class="col l12 center">
                <div class="file-field input-field col l12">
                  <div class="btn">
                    <span>Foto</span>
                    <input type="file" @change="handleFileUpload" required>
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Foto del Usuario">
                  </div>
                </div>
              </div>
            </div>
            <br>
            <div class="modal-footer col l12 center">
              <div class="divider"></div>
              <div class="actionButtons right">
                <button class="btn" @click="closeModal('modal-nuevo-usuario')">Cancelar</button>
                <button type="submit" class="btn">Guardar</button>
              </div>
            </div>

          </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    indicador: String
  },
  data() {
    return {
      modalInstances: [],
      historia: {
        titulo: '',
        descripcion: '',
        rol: '',
        funcionalidad: '',
        criterio: '',
      },
      usuario: {
        indicador: this.indicador,
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: '',
        foto: null,
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
    openModal(id, indicador = '') {
      const modal = this.modalInstances.find(modal => modal.el.id === id);
      if (modal) {
        this.usuario.indicador = indicador;
        modal.open();
      }
    },
    closeModal(id) {
      const modal = this.modalInstances.find(modal => modal.el.id === id);
      if (modal) {
        modal.close();
      }
      if(id==='modal-historia'){
        this.clearFormFieldsHistoria();
      }
      if(id==='modal-nuevo-usuario'){
        this.clearFormFieldsUsuario();
      }

    },
    submitFormHistoria() {
      this.$emit('submit-historia', { ...this.historia });
      this.closeModal('modal-historia');
    },
    submitFormUsuario() {
      this.$emit('submit-usuario', { ...this.usuario });
      this.closeModal('modal-nuevo-usuario');
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
    clearFormFieldsUsuario(){
      this.usuario = {
        indicador: '',
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: '',
        foto: null,
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.usuario.foto = file;
    },
  }
};
</script>

<style scoped>

.modal{
    scrollbar-width: none;
    max-width: 500px;
}
.modal-header{
  background-color: rgb(52, 52, 97);
  padding: 10px;
}
.modal-header span{
  text-align: center;
  font-size: 28px;
  margin: 10px;
  font-weight: 700;
  color: rgb(253, 253, 253) !important;
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
.actionButtons{
  display: flex;
  align-items: center;
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

.indicadorUser{
  padding: 10PX;
  border-radius: 5px;
  border: 1px solid black;
  background-color: rgb(52, 52, 97);
  font-size: 18px;
  font-weight: 700;
  color: white;
}
</style>
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
            <input
              id="titulo"
              type="text"
              v-model="historia.in_titulo"
              maxlength="30"
              required
            />
            <label for="titulo">Título</label>
          </div>
          <div class="input-field col l7">
            <span class="textArea">Descripción:</span>
            <textarea
              id="descripcion"
              class="materialize-textarea"
              v-model="historia.tx_descripcion"
              required
            ></textarea>
          </div>
          <div class="input-field col l5">
            <span class="textArea">Rol:</span>
            <textarea
              id="rol"
              class="materialize-textarea"
              v-model="historia.tx_rol"
            ></textarea>
          </div>
          <div class="input-field col l7">
            <span class="textArea">Funcionalidad:</span>
            <textarea
              id="funcionalidad"
              class="materialize-textarea"
              v-model="historia.tx_funcionalidad"
            ></textarea>
          </div>
          <div class="input-field col l5">
            <span class="textArea">Criterio:</span>
            <textarea
              id="criterio"
              class="materialize-textarea"
              v-model="historia.tx_criterio"
            ></textarea>
          </div>
          <div class="modal-footer col l12 right">
            <div class="divider"></div>
            <br />
            <div class="actionButtons right">
              <button class="btn" @click="closeModal('modal-historia')">
                Cancelar
              </button>
              <button type="submit" class="btn">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para registro de nuevo usuario - Index 1 -->
    <div
      ref="modalNuevoUsuario"
      id="modal-nuevo-usuario"
      class="modal modalTarget"
    >
      <div class="modal-header center">
        <span>Registrar Nuevo Usuario</span>
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitFormUsuario">
          <div class="formContent row">
            <div class="col l12 center indicadorContainer">
              <span class="indicadorUser">
                {{ usuario.in_usuario }}
              </span>
              <br /><br />
            </div>
            <div class="col l6">
              <div class="input-field col l12">
                <input
                  id="nombreUsuario"
                  type="text"
                  v-model="usuario.in_nombre"
                  maxlength="50"
                  required
                />
                <label for="nombreUsuario">Nombre</label>
              </div>
              <div class="input-field col l12">
                <input
                  id="apellidoUsuario"
                  type="text"
                  v-model="usuario.in_apellido"
                  maxlength="50"
                  required
                />
                <label for="apellidoUsuario">Apellido</label>
              </div>
            </div>
            <div class="col l6">
              <div class="input-field col l12">
                <input
                  id="correoUsuario"
                  type="email"
                  v-model="usuario.in_correo"
                  @blur="checkEmailDomain"
                  maxlength="50"
                  required
                />
                <label for="correoUsuario">Correo Empresarial</label>
              </div>
              <div class="input-field col l12">
                <input
                  id="contraseñaUsuario"
                  type="password"
                  v-model="usuario.password"
                  maxlength="50"
                  required
                />
                <label for="contraseñaUsuario">Contraseña</label>
              </div>
            </div>
            <div class="col l12">
              <div class="input-field col l12">
                <select v-model="usuario.in_role" class="browser-default" required>
                  <option disabled value="" class="hide">Rol</option>
                  <option value="rolAdministrador">Administrador</option>
                  <option value="rolGerente">Gerente</option>
                  <option value="rolLiderProyecto">Líder de Proyecto</option>
                  <option value="rolTrabajador">Trabajador</option>
                </select>
              </div>
            </div>
            <div class="col l12 center">
              <div class="file-field input-field col l12">
                <div class="btn">
                  <span>Foto</span>
                  <input type="file" @change="handleFileUpload" required />
                </div>
                <div class="file-path-wrapper">
                  <input
                    class="file-path validate"
                    type="text"
                    placeholder="Foto del Usuario"
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="modal-footer col l12 center">
            <div class="divider"></div>
            <div class="actionButtons right">
              <button class="btn" @click="closeModal('modal-nuevo-usuario')">
                Cancelar
              </button>
              <button type="submit" class="btn">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from "@/Services/Services";
export default {
  props: {
    in_usuario: String,
  },
  data() {
    return {
      modalInstances: [],
      historia: {
        co_historia: "",
        in_titulo: "",
        tx_descripcion: "",
        tx_rol: "",
        tx_funcionalidad: "",
        tx_criterio: "",
      },
      usuario: {
        in_usuario: this.in_usuario,
        in_nombre: "",
        in_apellido: "",
        in_correo: "",
        password: "",
        in_role: "",
        foto: null,
      },
    };
  },
  mounted() {
    this.initModals();
  },
  methods: {
    initModals() {
      const modalElements = this.$el.querySelectorAll(".modalTarget");
      this.modalInstances = [];
      modalElements.forEach((element) => {
        this.modalInstances.push(
          M.Modal.init(element, {
            dismissible: false,
          })
        );
      });
    },
    openModal(id, in_usuario = "") {
      const modal = this.modalInstances.find((modal) => modal.el.id === id);
      if (modal) {
        this.usuario.in_usuario = in_usuario;
        modal.open();
      }
    },
    closeModal(id) {
      const modal = this.modalInstances.find((modal) => modal.el.id === id);
      if (modal) {
        modal.close();
      }
      if (id === "modal-historia") {
        this.clearFormFieldsHistoria();
      }
      if (id === "modal-nuevo-usuario") {
        this.clearFormFieldsUsuario();
      }
    },
    submitFormHistoria() {
      this.$emit("submit-historia", {
        ...this.historia,
        co_historia: this.historia.in_titulo,
      });
      this.closeModal("modal-historia");
    },
    checkEmailDomain() {
      const domain = "@pdvsa.com";
      if (!this.usuario.in_correo.endsWith(domain)) {
        alert(`El dominio del correo debe ser ${domain}`);
        this.usuario.in_correo = ""; // Limpiar el campo de correo
      }
    },
    async submitFormUsuario() {
      this.$store.dispatch('getShowLoader', true);
      try {
        // Crear una instancia de FormData
        const formData = new FormData();

        // Añadir cada campo del objeto usuario a FormData
        for (const key in this.usuario) {
          formData.append(key, this.usuario[key]);
        }

        // Enviar la solicitud usando FormData
        const response = await registerUser(formData);
        console.log(response);
        this.$store.dispatch('getShowLoader', false);
      } catch (error) {
        console.error("Error al crear el usuario:", error);
        alert("Error al crear el usuario");
        this.$store.dispatch('getShowLoader', falso);
      }
      this.$emit("submit-usuario", { ...this.usuario });
      location.reload();
      this.closeModal("modal-nuevo-usuario");
    },
    clearFormFieldsHistoria() {
      this.historia = {
        co_historia: "",
        in_titulo: "",
        tx_descripcion: "",
        tx_rol: "",
        tx_funcionalidad: "",
        tx_criterio: "",
      };
    },
    clearFormFieldsUsuario() {
      this.usuario = {
        in_usuario: "",
        in_nombre: "",
        in_apellido: "",
        in_correo: "",
        password: "",
        in_role: "",
        foto: null,
      };
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.usuario.foto = file;
    },
  },
};
</script>

<style scoped>
.modal {
  scrollbar-width: none;
  max-width: 500px;
}
.modal-header {
  background-color: rgb(52, 52, 97);
  padding: 10px;
}
.modal-header span {
  text-align: center;
  font-size: 28px;
  margin: 10px;
  font-weight: 700;
  color: rgb(253, 253, 253) !important;
}
.modal-content .modalBody {
  padding-top: 10px;
  text-align: justify;
}
.modal-content .input-field {
  margin-top: 25px;
  margin-bottom: -10px;
}
.modal-content .input-field input {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.modal-content .input-field input[type="text"]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.modal-content .input-field label.active {
  color: rgb(52, 52, 97) !important;
}
.modal-footer .actionButtons {
  display: flex;
  justify-content: right;
  gap: 5px;
}
.actionButtons .btn {
  background-color: rgb(52, 52, 97) !important;
}
.actionButtons .btn {
  background-color: rgb(52, 52, 97) !important;
}
.actionButtons .btn:hover {
  background-color: rgb(98, 98, 155) !important;
}
/* Text Inputs */
.input-field input {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field input[type="text"]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}

/* TextArea */
textarea {
  height: 80px !important;
  overflow-y: scroll !important;
  font-size: 14px !important;
  background-color: #e2e2e2 !important;
  border-radius: 5px !important;
  border: 1px solid rgb(139, 133, 133) !important;
  padding: 5px !important;
}
textarea.active,
textarea:focus {
  box-shadow: none !important;
  border: 1px solid rgb(52, 52, 97) !important;
}
.textArea span {
  font-size: 12px;
  color: #746c6c;
  line-height: 18px;
}
.actionButtons {
  display: flex;
  align-items: center;
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

.indicadorContainer {
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;

  background-color: rgb(52, 52, 97);
  color: rgb(253, 253, 253);

  display: flex;
  align-items: center;
  justify-content: center;
}
.indicadorContainer .indicadorUser {
  margin: 10px;
  font-size: 24px;
  font-weight: 700;
}
</style>

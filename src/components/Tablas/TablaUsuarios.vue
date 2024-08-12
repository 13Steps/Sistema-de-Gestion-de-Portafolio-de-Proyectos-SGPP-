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
          <td>{{ usuario.in_usuario }}</td>
          <td class="hoverExpandir">
            {{ usuario.in_nombre }} {{ usuario.in_apellido }}
          </td>
          <td>{{ usuario.in_role.replace("rol", "") }}</td>
          <td>{{ formatLocalDate(usuario.createdAt)}}</td>
          <td class="actionButtons">
            <a class="btn-floating">
              <i class="material-icons" @click="openModal(usuario)"
                >visibility</i
              >
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal editar/eliminar usuario -->
  <div class="modal" ref="modal">
    <div class="modal-header center">
      <span class="white-text">Editar Datos de Usuario</span>
    </div>
    <div class="modal-content">
        <div class="row">
          <div class="col l12 center indicadorContainer">
            <span class="indicadorUser">
              {{ usuarioSeleccionado.in_usuario }}
            </span>
            <br /><br />
          </div>
          <div class="col l6">
            <div class="input-field col l12">
              <input
                id="nombreUsuario"
                type="text"
                v-model="usuarioSeleccionado.in_nombre"
                maxlength="50"
                required
              />
              <label for="nombreUsuario" class="active">Nombre</label>
            </div>
            <div class="input-field col l12">
              <input
                id="apellidoUsuario"
                type="text"
                v-model="usuarioSeleccionado.in_apellido"
                maxlength="50"
                required
              />
              <label for="apellidoUsuario" class="active">Apellido</label>
            </div>
          </div>
          <div class="col l6">
            <div class="input-field col l12">
              <input
                id="correoUsuario"
                type="email"
                v-model="usuarioSeleccionado.in_correo"
                @blur="checkEmailDomain"
                maxlength="50"
                required
              />
              <label for="correoUsuario" class="active"
                >Correo Empresarial</label
              >
            </div>
            <div class="input-field col l12">
              <input
                id="contraseñaUsuario"
                type="password"
                v-model="password"
                maxlength="50"
                required
              />
              <label for="contraseñaUsuario" class="active">Contraseña</label>
            </div>
          </div>
          <div class="col l12">
            <div class="input-field col l12">
              <select
                v-model="usuarioSeleccionado.in_role"
                class="browser-default"
                required
              >
                <option disabled value="" class="hide">Rol</option>
                <option value="rolAdministrador">Administrador</option>
                <option value="rolGerente">Gerente</option>
                <option value="rolLíder de Proyecto">Líder de Proyecto</option>
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
                  :value="usuarioSeleccionado.foto"
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="modal-footer col l12 center">
          <div class="divider"></div>
          <div class="actionButtons right">
            <button class="btn" @click="closeModal">Cancelar</button>
            <button class="btn" @click="eliminarUsuario">
              Eliminar Usuario
            </button>
            <button class="btn" @click="editarUsuario()">Guardar Cambios</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getUsers, updateUser, deleteUser } from "@/Services/Services";

export default {
  data() {
    return {  
      usuarioSeleccionado: {
        in_usuario: "",
        in_nombre: "",
        in_apellido: "",
        in_correo: "",
        password: "",
        in_role: "",
        i001i_usuario: "",
        foto: null,
      },
      usuarios: [],
    };
  },
  async mounted() {
    this.initModal();
    this.$store.dispatch("getShowLoader", true);
    try {
      const response = await getUsers(); // Llama a getProjects()
      this.usuarios = response;
      console.log(this.usuarios);
      this.$store.dispatch("getShowLoader", false);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      this.$store.dispatch("getShowLoader", false);
    }
  },
  methods: {
    initModal() {
      const modalElements = this.$refs.modal;
      this.modalInstance = M.Modal.init(modalElements, {
        dismissible: false,
      });
    },
    openModal(usuario) {
      this.usuarioSeleccionado = { ...usuario };
      if (this.modalInstance) {
        this.modalInstance.open();
      }
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.close();
      }
    },
    formatLocalDate(date) {
      if (!date) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    checkEmailDomain() {
      const domain = "@pdvsa.com";
      if (!this.usuarioSeleccionado.in_correo.endsWith(domain)) {
        alert(`El dominio del correo debe ser ${domain}`);
        this.usuarioSeleccionado.in_correo = ""; // Limpiar el campo de correo
      }
    },
    async editarUsuario() {
      //Lofica de actualizar usuario
      this.$store.dispatch("getShowLoader", true);
      this.usuarioSeleccionado.password = this.password;
      console.log(this.usuarioSeleccionado)
      try {
        // Crear una instancia de FormData
        const formData = new FormData();

        // Añadir cada campo del objeto usuario a FormData
        formData.append("in_nombre", this.usuarioSeleccionado.in_nombre);
        formData.append("in_apellido", this.usuarioSeleccionado.in_apellido);
        formData.append("in_correo", this.usuarioSeleccionado.in_correo);
        formData.append("password", this.usuarioSeleccionado.password);
        formData.append("in_role", this.usuarioSeleccionado.in_role);
        formData.append("in_usuario", this.usuarioSeleccionado.in_usuario);
        formData.append("foto", this.usuarioSeleccionado.foto);

        this.usuarios = await getUsers();

        // Enviar la solicitud usando FormData
        const response = await updateUser(this.usuarioSeleccionado.i001i_usuario, formData);
        console.log(response);
        this.$store.dispatch("getShowLoader", false);
      } catch (error) {
        console.error("Error al crear el usuario fasecwececwe:", error);
        alert("Error al crear el usuario");
        this.$store.dispatch("getShowLoader", false);
      }

      this.closeModal();
      location.reload();
    },
    async eliminarUsuario() {
      const confirmed = confirm(
        `¿Estás seguro de que deseas eliminar al usuario ${this.usuarioSeleccionado.in_nombre} ${this.usuarioSeleccionado.in_apellido}?`
      );

      if (confirmed) {
        this.$store.dispatch("getShowLoader", true);
        try {
          // Llamada al servicio para eliminar el usuario
          await deleteUser(this.usuarioSeleccionado.i001i_usuario);

          // Eliminar el usuario de la lista local de usuarios
          this.usuarios = this.usuarios.filter(
            (usuario) => usuario.i001i_usuario !== this.usuarioSeleccionado.i001i_usuario
          );

          console.log("Usuario eliminado correctamente");
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          alert("Error al eliminar el usuario");
        } finally {
          this.$store.dispatch("getShowLoader", false);
          this.closeModal();
        }
      } else {
        this.closeModal();
      }
    },
    handleFileUpload(event) {
    this.usuarioSeleccionado.foto = event.target.files[0];
      if (this.usuarioSeleccionado.foto) {
        console.log("Archivo seleccionado:", this.usuarioSeleccionado.foto);
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  scrollbar-width: none;
  max-height: 350px;
  overflow-y: scroll;
  scrollbar-width: thin;
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
.btn-floating i {
  font-size: 16px;
}
.btn-floating {
  background-color: rgb(52, 52, 97);
  margin: 0 2px 0 2px;
}
.btn-floating:hover {
  background-color: rgb(98, 98, 155);
}

/* Modal */
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

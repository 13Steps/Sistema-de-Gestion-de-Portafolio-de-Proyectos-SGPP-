<template>
  <br>
  <div class="col l4 styleForm">
    <form @submit.prevent="agregarMiembro">
      <div class="formTitulo">
        <span>Agregar Miembro</span>
      </div>
      <div class="col l12 input-field">
        <!-- <input class="mayusCase" v-model="indicador" placeholder="Indicador" maxlength="30" required /> -->
        <select v-model="nuevoMiembro.indicador" class="browser-default" required>
            <option disabled value="" class="hide">Seleccione un Tipo Líder</option>
            <option v-for="user in users" :value="user">{{user.in_nombre}}</option>
          </select>
      </div>

      <div class="card-tabs">
        <ul class="tabs transparent">
          <li class="tab">
            <a @click="cambioTab('Lider')">Líder</a>
          </li>
          <li class="tab">
            <a @click="cambioTab('Trabajador')">Trabajador</a>
          </li>
        </ul>
      </div>

      <div v-if="tab === 'Trabajador'">
        <div class="col l12 input-field">
          <input v-model="nuevoMiembro.cargo" placeholder="Cargo" maxlength="50" required />
        </div>
      </div>
      <div v-else>
        <div class="col l12 input-field">
          <select v-model="nuevoMiembro.cargo" class="browser-default" required>
            <option disabled value="" class="hide">Seleccione un Tipo Líder</option>
            <option value="Líder Técnico">Líder Técnico</option>
            <option value="Líder Funcional">Líder Funcional</option>
            <option value="Líder GALBA">Líder GALBA</option>
          </select>
        </div>
      </div>

      <div class="col l12 centerButton">
        <button class="btn-floating">
            <i class="material-icons" style="font-size: 36px;">
              add
            </i>
          </button>
      </div>
    </form>
  </div>

  <ul class="col l8">
    <div class="table-container">
      <table class="highlight fixedTable">
        <thead>
          <tr class="tableHead">
            <th>Indicador</th>
            <th>Nombre</th>
            <th>Cargo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- //Resto de Miembros -->
          <tr class="tableBody" v-for="(miembro, index) in miembros" :key="index" :class="{
            'lider': ['Líder Técnico', 'Líder Funcional', 'Líder GALBA'].includes(miembro?.cargo)}
            ">
            <td class="hoverExpandir mayusCase">{{ miembro?.indicador?.in_nombre }}</td>
            <td class="hoverExpandir">{{ miembro?.indicador?.in_nombre || 'Nombre desde base de datos' }}</td>
            <td class="hoverExpandir">{{ miembro?.cargo }}</td>
            <td class="actionButtons">
              <button class="btn-floating" @click="eliminarMiembro(index)">
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </ul>
</template>

<script>
import { getUsers } from '@/Services/Services';
export default {
  data() {
    return {
      tab: "Lider",
      miembros: [],
      nuevoMiembro: {
        indicador: {},
        nombre: '',
        cargo: '',
        tipo: '',
      },
      users: [],
      //Valida Usuarios desde la base de datos
      usuariosBaseDatos: ['USUARIO1', 'USUARIO2', 'USUARIO3'],
      cargosReservados: ['Líder Técnico', 'Líder Funcional', 'Líder GALBA'],
    };
  },
  props: {
    equipo: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    equipo: {
      handler() {
        this.miembros = [
          ...(this.equipo?.c008f_i001t_lider_funcional
            ? [
                {
                  indicador: this.equipo.c008f_i001t_lider_funcional,
                  nombre: "",
                  cargo: "Líder Funcional",
                  tipo: "Lider",
                },
              ]
            : []),
         ...(this.equipo?.c008f_i001t_lider_negocio
            ? [
                {
                  indicador: this.equipo.c008f_i001t_lider_negocio,
                  nombre: "",
                  cargo: "Líder GALBA",
                  tipo: "Lider",
                },
              ]
            : []),
          ...(this.equipo?.c008f_i001t_lider_tecnico
            ? [
                {
                  indicador: this.equipo.c008f_i001t_lider_tecnico,
                  nombre: "",
                  cargo: "Líder Técnico",
                  tipo: "Lider",
                },
              ]
            : []),
          ...(this.equipo?.c008f_i001t_trabajador
            ? this.equipo.c008f_i001t_trabajador.map((trabajador) => ({
                indicador: trabajador,
                nombre: "",
                cargo: "Trabajador",
                tipo: "Trabajador",
              }))
            : []),
        ];
      },
      deep: true,
    },
  },
  async mounted() {
    this.users = await getUsers();
    this.miembros = [
  {
    indicador: this.equipo.c008f_i001t_lider_funcional,
    nombre: "",
    cargo: "Líder Funcional",
    tipo: "Lider"
  },
  {
    indicador: this.equipo.c008f_i001t_lider_negocio,
    nombre: "",
    cargo: "Líder Negocio",
    tipo: "Lider"
  },
  {
    indicador: this.equipo.c008f_i001t_lider_tecnico,
    nombre: "",
    cargo: "Líder Técnico",
    tipo: "Lider"
  },
  ...(this.equipo?.c008f_i001t_trabajador
        ? this.equipo.c008f_i001t_trabajador.map((trabajador) => ({
            indicador: trabajador,
            nombre: "",
            cargo: "Trabajador",
            tipo: "Trabajador",
          }))
        : []),
];
console.log( this.miembros)
  },
  computed: {
  indicador: {
      get() {
        return this.nuevoMiembro.indicador;
      },
      set(value) {
        this.nuevoMiembro.indicador = value.toUpperCase();
      },
    },
  },
  methods: {
    agregarMiembro() {
      this.nuevoMiembro.tipo = this.tab;
      const indicador = this.nuevoMiembro.indicador
      const cargo = this.nuevoMiembro.cargo.trim();
      // Verificar si el usuario ya existe en el grupo
      const miembroExistente = this.miembros.find(miembro => miembro.indicador === indicador);
      if (miembroExistente) {
        alert('El usuario ya está en el grupo.');
        return;
      }

      // Simulación de verificación en la base de datos
      // const usuarioEnBaseDatos = this.usuariosBaseDatos.includes(indicador);
      // if (!usuarioEnBaseDatos) {
      //   alert('El usuario no existe.');
      //   return;
      // }

      if (this.tab === 'Lider') {
        const liderExistente = this.miembros.find(miembro => miembro.cargo === cargo);
        if (liderExistente) {
          alert(`El cargo de ${cargo} ya está ocupado.`);
          return;
        }
      }

      if (this.tab === 'Trabajador' && this.cargosReservados.includes(this.nuevoMiembro.cargo)) {
        alert(`El cargo ${this.nuevoMiembro.cargo} está reservado y no puede ser asignado a un Trabajador.`);
        return;
      }

      this.miembros.push({ ...this.nuevoMiembro });
      this.nuevoMiembro = {
        indicador: '',
        nombre: '',
        cargo: '',
        tipo: '',
      };

      const lideres = {
        c008f_i001t_lider_funcional: this.miembros.find(miembro => miembro.cargo === 'Líder Funcional')?.indicador,
        c008f_i001t_lider_negocio: this.miembros.find(miembro => miembro.cargo === 'Líder GALBA')?.indicador,
        c008f_i001t_lider_tecnico: this.miembros.find(miembro => miembro.cargo === 'Líder Técnico')?.indicador,
      }
      
      if (this.tab === 'Lider') {
          localStorage.setItem('miembros', JSON.stringify(lideres));
      } 
      if (this.tab === 'Trabajador') {
        const trabajadores = this.miembros.filter(miembro => miembro.tipo === 'Trabajador');
          localStorage.setItem('trabajadores', JSON.stringify(trabajadores));
      }
      console.log(this.miembros, 'miembros');
      
    },
    eliminarMiembro(index) {
      this.miembros.splice(index, 1);
    },
    cambioTab(nuevaTab) {
      this.tab = nuevaTab;
      this.nuevoMiembro.cargo = '';
    },
  }
};
</script>

<style scoped>
.table-container {
  width: 100%;
  max-height: 420px;
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
.liderInput input[type=text]{
  color: black !important;
}
.styleForm {
  border: 2px solid rgb(212, 210, 210);
  border-radius: 10px;
  background-color: rgb(52, 52, 97);
}
.centerButton {
  display: flex;
  justify-content: center;
  margin: 10px;
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
.mayusCase{
  text-transform: uppercase;
}
.input-field input {
  color: rgb(253, 253, 253) !important;
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field input[type=text]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.input-field label.active {
  color: rgb(52, 52, 97) !important;
}
textarea {
  height: 80px !important;
  overflow-y: scroll !important;
  font-size: 14px !important;
  background-color: #e2e2e2 !important;
  border-radius: 5px !important;
  border: 1px solid rgb(0, 0, 0) !important;
  padding: 5px !important;
}
textarea.active,
textarea:focus {
  box-shadow: none !important;
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
.btn {
  margin: 20px 10px 0 0;
  background-color: rgb(52, 52, 97) !important;
}
.btn:hover,
.btn:focus {
  background-color: rgb(98, 98, 155) !important;
}
.btn span {
  display: flex;
  gap: 5px;
}
.btn i {
  font-size: 24px;
}
.card-tabs {
  margin-top: 10px;
  width: 100%;
  font-weight: 700;
}
.card-tabs a{
  color: rgb(253, 253, 253) !important;
}
.card-tabs a:hover{
  color: rgb(173, 173, 173)  !important;
  cursor: pointer;
}
.lider td{
  color: rgb(52, 52, 97);
  font-weight: 600;
}
</style>

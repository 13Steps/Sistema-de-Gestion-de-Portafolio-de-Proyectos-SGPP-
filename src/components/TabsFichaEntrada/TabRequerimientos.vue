<template>
  <div class="tabTitle">
    <span> Requerimientos: </span>
  </div>

  <ul class="collapsible" ref="collapsible">
    <li>
      <div class="collapsible-header">
        <span class="collapsibleTitle">
          <i class="material-icons"> book </i>
          Descripcion
        </span>
      </div>
      <div class="collapsible-body textContainer">
        <p>
          {{project.tx_descripcion}}
        </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">
        <span class="collapsibleTitle">
          <i class="material-icons"> flag </i>
          Objetivo
        </span>
      </div>
      <div class="collapsible-body textContainer">
        <p>
         {{project?.tx_objetivo}}
        </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">
        <span class="collapsibleTitle">
          <i class="material-icons"> verified </i>
          Alcance
        </span>
      </div>
      <div class="collapsible-body textContainer">
        <p>
          {{project?.tx_alcance}}
        </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">
        <span class="collapsibleTitle">
          <i class="material-icons"> account_tree </i>
          Modelo de Datos
        </span>
      </div>
      <div class="collapsible-body">
        <div class="datamodel">
          <span class="docName">
            <div class="colorCircle"></div>
            <!-- {{typeof project?.i003f_i004t_datos_adi?.tx_datamodelo !== 'string' ? 'Modelo' : project?.i003f_i004t_datos_adi?.tx_datamodelo }} -->
            Modelo de datos
          </span>
          <a class="btn-flat right descargarBoton" :href="`http://34.225.211.222:3000/${project.i003f_i004t_datos_adi?.tx_datamodelo}`" target="_blank" download> Descargar </a>
        </div>
      </div>
    </li>
    <li>
      <div class="collapsible-header">
        <span class="collapsibleTitle">
          <i class="material-icons"> comment </i>
          Comentarios
        </span>
      </div>
      <div class="collapsible-body textContainer">
        <p>
          {{project.i003f_i004t_datos_adi?.tx_comentario}}
        </p>
      </div>
    </li>
  </ul>

  <br />

  <div class="row center">
    <div class="col l4 m4 hide-on-small-only">
      <div class="datosCard">
        <div class="iconContainer">
          <i class="material-icons"> settings_overscan </i>
        </div>
        <div class="titleContainer">
          <h4>Interfaz</h4>
        </div>
        <div class="center infoContainer">
          <p>
            {{project.i003f_i004t_datos_adi?.tx_interfaz}}
          </p>
        </div>
      </div>
    </div>
    <div class="col l4 m4 hide-on-small-only">
      <div class="datosCard">
        <div class="iconContainer">
          <i class="material-icons"> lock </i>
        </div>
        <div class="titleContainer">
          <h4>Seguridad</h4>
        </div>
        <div class="center infoContainer">
          <p>{{project.i003f_i004t_datos_adi?.tx_seguridad}}</p>
        </div>
      </div>
    </div>
    <div class="col l4 m4 hide-on-small-only">
      <div class="datosCard">
        <div class="iconContainer">
          <i class="material-icons"> wifi </i>
        </div>
        <div class="titleContainer">
          <h4>Interconexión</h4>
        </div>
        <div class="center infoContainer">
          <p>{{project.i003f_i004t_datos_adi?.tx_interconexion}}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="center titleContainer">
    <span> Lista de Historias de Usuarios </span>
  </div>
  <div class="cardsContainer">
    <div class="row">
      <div class="col l3 m6 s12" v-for="(historias, index) in project.i003f_i007i_historia_usuario" :key="historias">
        <HistoriaUsuario :historia="historias" :codigo="formatIndex(index, project.i003f_i007i_historia_usuario.length)" />
      </div>
    </div>
  </div>
</template>

<script>
import HistoriaUsuario from "../HistoriaUsuario.vue";

export default {
  props: {
    project: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      documentUrl: require('@/assets/modelo.jpg')
    }
  },
  components: {
    HistoriaUsuario,
  },
  mounted() {
    // Collapsible
    this.initCollapsible();
  },
  methods: {
    // Collapsible
    initCollapsible() {
      const collapsibleElement = this.$refs.collapsible;
      this.collapsibleInstance = M.Collapsible.init(collapsibleElement);
    },
    formatIndex(index, total) {
      return String(index + 1).padStart(3, '0');
    }
  },
};
</script>

<style scoped>
.tabTitle {
  margin: 0 0 40px 20px;
}
.tabTitle span {
  color: rgb(52, 52, 97);
  font-size: 26px;
  font-weight: 800;
}
.historiasContainer{
  scrollbar-width: thin;
  overflow-y: scroll
}

.datosCard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.datosCard .iconContainer i {
  font-size: 72px;
  color: rgb(52, 52, 97);
}
.datosCard .titleContainer,
.datosCard .infoContainer {
  margin: 10px 0 0 0;
}
.datosCard .titleContainer h4 {
  color: rgb(52, 52, 97);
  font-weight: 800;
}
.datosCard .infoContainer {
  max-width: 280px;
  max-height: 400px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.titleContainer {
  margin: 30px 0 30px 0;
  color: rgb(52, 52, 97);
}
.titleContainer span {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.collapsibleTitle {
  font-weight: 700;
  display: flex;
  justify-content: center;
}
.datamodel {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
}
.colorCircle {
  height: 8px;
  width: 8px;
  background-color: rgb(52, 52, 97);
  border-radius: 100%;
}
.docName {
  color: rgb(52, 52, 97);
  display: flex;
  align-items: center;
  gap: 5px;
}
.descargarBoton {
  background-color: rgb(52, 52, 97);
  color: white;
}
.descargarBoton:hover {
  background-color: rgb(83, 83, 143);
}

.textContainer {
  max-height: 200px;
  overflow-y: scroll;
  padding: 5px;
}
.textContainer p {
  margin: 0;
  padding: 10px;
}

.cardsContainer .row {
  max-height: 500px;
  overflow-y: scroll;
}
</style>

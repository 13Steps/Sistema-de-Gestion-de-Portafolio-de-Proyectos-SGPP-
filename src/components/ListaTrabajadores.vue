<template>
  <div class="usariosLista">
    <div class="headerLista white center">
      <span class="titleCard"> Equipo de Trabajo </span>
    </div>
    <div class="listaContainer">
      <div
        v-for="(miembro, nombrePropiedad) in getProject"
        :key="miembro.in_id"
        class="listaEntrada"
      >
        <div
          v-if="
            !nombrePropiedad.includes('gerencia') &&
            !nombrePropiedad.includes('trabajador')
          "
          class="imgContainer"
        >
          <img
            v-if="typeof miembro.foto === 'string' && miembro.foto !== null"
            :src="`http://34.225.211.222:3000/${miembro.foto}`"
            alt="#"
            class="responsive-img"
          />
          <img
            v-else
            src="../assets/Imagenes/perfil.jpg"
            class="responsive-img"
          />
        </div>
        <div
          v-if="!nombrePropiedad.includes('trabajador')"
          class="infoContainer"
        >
          <div class="userDatos">
            <h1>{{ miembro.in_nombre }} {{ miembro.in_apellido }}</h1>
            <h3 v-if="miembro.in_usuario">( {{ miembro.in_usuario }} )</h3>
          </div>
          <div class="rolContainer">
            <span>{{
              nombrePropiedad
                .replace("c008f_i009t_", "")
                .replace("c008f_i001t_", "")
                .replace("_", " ")
                .toUpperCase()
            }}</span>
          </div>
        </div>
        <div
          v-if="
            nombrePropiedad.includes('trabajador') &&
            miembros?.c008f_i001t_trabajador.length !== 0
          "
        >
          <div
            v-for="trabajador in miembros?.c008f_i001t_trabajador"
            class="imgContainer"
          >
            <img
              v-if="typeof trabajador?.foto === 'string' && miembro?.foto !== null"
              :src="`http://34.225.211.222:3000/${trabajador?.foto}`"
              alt="#"
              class="responsive-img"
            />
            <img
              v-else
              src="../assets/Imagenes/perfil.jpg"
              class="responsive-img"
            />
          </div>
          <div
            v-if="nombrePropiedad.includes('trabajador')"
            class="infoContainer"
          >
            <div class="userDatos">
              <h1>{{ trabajador?.in_nombre }} {{ trabajador?.in_apellido }}</h1>
              <h3 v-if="trabajador?.in_usuario">( {{ trabajador?.in_usuario }} )</h3>
            </div>
            <div class="rolContainer">
              <span>{{
                nombrePropiedad
                  .replace("c008f_i009t_", "")
                  .replace("c008f_i001t_", "")
                  .replace("_", " ")
                  .toUpperCase()
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="downArrow">
      <i class="material-icons"> arrow_drop_down </i>
    </div>
  </div>
</template>
<script>
export default {
  name: "ListaTrabajadores",
  data() {
    return {
      equipo: [],
    };
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getProject() {
      const project = this.project?.i0003f_i008t_equipo_trabajo;
      if (!project) {
        return null;
      }
      // Objeto para almacenar los miembros del equipo validados
      const equipoValidado = {};
      Object.entries(project).forEach(([key, value]) => {
        // Verifica si el valor es un objeto y no es null
        if (typeof value === "object" && value !== null) {
          equipoValidado[key] = value;
        }
      });
      console.log(equipoValidado);
      return equipoValidado;
    },
  },
};
</script>
<style scoped>
.usariosLista {
  height: auto;
  max-height: 350px;
  background-color: rgb(224, 224, 224);
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
}

.headerLista {
  border: 1.5px solid rgb(206, 204, 204);
  padding: 5px;
}
.titleCard {
  font-size: 14px;
  font-weight: 700;
}

.listaContainer {
  overflow-y: scroll;
  scrollbar-width: none;
}
.listaEntrada {
  background-color: rgb(255, 255, 255);
  width: 100%;
  display: flex;
  padding: 5px;
  margin: 1px 0 1px 0;
  align-items: center;
  justify-content: start;
  border: 1.5px solid rgb(206, 204, 204);
  text-align: left;
}

.imgContainer {
  margin: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgb(52, 52, 97);
}

.imgContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.userDatos h1 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 5px 0;
}
.userDatos h3 {
  font-size: 10px;
  margin: 0 0 10px 0;
  color: rgb(52, 52, 97);
}
.rolContainer {
  align-self: flex-end;
}
.rolContainer span {
  font-size: 12px;
  font-weight: 600;
}

.downArrow {
  width: 100%;
  height: 25px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border: 1.5px solid rgb(206, 204, 204);
}
</style>

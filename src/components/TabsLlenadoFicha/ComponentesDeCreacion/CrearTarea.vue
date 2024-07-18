<template>
    <ul class="col l8">
      <li v-for="(tarea, index) in tareas" :key="index">
        <div v-if="!tarea.editando">
          <p>Descripción: {{ tarea.descripcion }}</p>
          <p>Fecha de Inicio: {{ tarea.fechaInicio }}</p>
          <p>Fecha de Finalización: {{ tarea.fechaFinalizacion }}</p>
          <p>Unidad de Meta: {{ tarea.unidadMeta }}</p>
          <p>Estado: {{ tarea.estado }}</p>
        </div>
        <div v-else>
          <input v-model="tarea.descripcion" placeholder="Descripción" />
          <input type="date" v-model="tarea.fechaInicio" placeholder="Fecha de Inicio" />
          <input type="date" v-model="tarea.fechaFinalizacion" placeholder="Fecha de Finalización" />
          <input v-model="tarea.unidadMeta" placeholder="Unidad de Meta" />
          <select v-model="tarea.estado">
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>
        <button @click="editarTarea(index)">{{ tarea.editando ? 'Guardar' : 'Editar' }}</button>
        <button @click="eliminarTarea(index)">Eliminar</button>
      </li>
    </ul>
    <div class="col l4">
            <input v-model="nuevaTarea.descripcion" placeholder="Titulo" />
            <input type="date" v-model="nuevaTarea.fechaInicio" placeholder="Fecha de Inicio" />
            <input type="date" v-model="nuevaTarea.fechaFinalizacion" placeholder="Fecha de Finalización" />
            <input v-model="nuevaTarea.unidadMeta" placeholder="Unidad de Meta" />
            <button @click="agregarTarea">Agregar Tarea</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tareas: [],
      nuevaTarea: {
        descripcion: '',
        fechaInicio: '',
        fechaFinalizacion: '',
        unidadMeta: '',
        estado: 'pendiente'
      }
    };
  },
  methods: {
    agregarTarea() {
      if (this.nuevaTarea.descripcion.trim() !== '') {
        this.tareas.push({ ...this.nuevaTarea, editando: false });
        this.nuevaTarea = {
          descripcion: '',
          fechaInicio: '',
          fechaFinalizacion: '',
          unidadMeta: '',
        };
      }
    },
    editarTarea(index) {
      this.tareas[index].editando = !this.tareas[index].editando;
    },
    eliminarTarea(index) {
      this.tareas.splice(index, 1);
    }
  }
};
</script>

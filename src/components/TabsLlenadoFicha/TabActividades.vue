<template>
    <div class="row">
        <h6>Gerencias</h6>
        <div class="col l12">
            <br>
            <div class="col l3 right">
                <label>Gerencia GALBA</label>
                <select class="browser-default">
                  <option disabled selected class="hide"></option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
            </div>
            <div class="col l3 right">
                <label>Gerencia Técnica</label>
                <select class="browser-default">
                  <option disabled selected class="hide"></option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
            </div>
            <div class="col l3 right">
                <label>Gerencia Funcional</label>
                <select class="browser-default">
                  <option disabled selected class="hide"></option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
            </div>
        </div>
    </div>
    <div class="row">
        <h6>Definición de Tareas</h6>
        <div class="col l12">
            <div class="col l4">
                <label>Tipo de Proyecto</label>
                <select class="browser-default">
                  <option disabled selected class="hide"></option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
            </div>
        </div>
        <div class="col l12">
            <CrearTarea/>
        </div>
    </div>
    <div class="row">
        <h6>Equipo de Trabajo</h6>
        <CrearEquipo/>
    </div>

    <div class="row center">
        <div class="divider"></div>
        <a class="btn">
            <span>
                <i class="material-icons">
                    save
                </i>Guardar
            </span>
        </a>
    </div>
</template>

<script>
    import CrearTarea from './ComponentesDeCreacion/CrearTarea.vue'
    import CrearEquipo from './ComponentesDeCreacion/CrearEquipo.vue'

    export default{
        components:{
            CrearTarea,
            CrearEquipo,
        }
    }
</script>

<style scoped>
/* Text Inputs */
.input-field input{
    border-bottom: 1px solid #e2e2e2 !important;
    box-shadow: none !important;
  }
  .input-field input[type=text]:focus {
    border-bottom: 1px solid #e2e2e2 !important;
    box-shadow: none !important;
  }
  
  .browser-default:focus{
      box-shadow: none !important;
      border: none !important;
  }
  
  /* TextArea */
  textarea{
      height: 50px !important;
      overflow-y: scroll !important;
      font-size: 14px !important;
      background-color: #e2e2e2 !important;
      border-radius: 10px 10px 0 0 !important;
      border: 1px solid rgb(139, 133, 133) !important;
      padding: 10px !important;
      transition: height 0.25s ease-out !important;
      transition: border 0.25s ease-in-out !important;
  }
  textarea.active, textarea:focus{
      box-shadow: none !important;
      height: 120px !important;
      border: 2px solid rgb(52, 52, 97) !important;
      transition: height 0.25s ease-in !important;
  }
  .textArea span{
      font-size: 12px;
      color: #746c6c;
      line-height: 18px;
  }
  
  /* Botones */
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
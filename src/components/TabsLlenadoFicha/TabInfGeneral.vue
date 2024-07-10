<template>
        <h6 class="tabTitle">Datos del Proyecto</h6>
        <br>
        <div class="row">
            <div class="col l6">
                <div class="titleContainer">
                    <div class="input-field">
                        <input type="text" id="entradaTitulo" class="validate" v-model="entradaTitulo">
                        <label for="entradaTitulo">Titulo entrada</label>
                        <span v-if="titleMessage" :class="titleClass">
                            {{ titleMessage }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="col l3 datePicker input-field">
                <i class="material-icons prefix">calendar_month</i>
                <input id="fechaInicio" type="text" class="datepicker">
                <label for="fechaInicio">Inicio (Planificado)</label>
            </div>
            <div class="col l3 datePicker input-field">
                <i class="material-icons prefix">calendar_month</i>
                <input id="fechaFin" type="text" class="datepicker">
                <label for="fechaFin">Finalización (Planificado)</label>
            </div>
        </div>
        <div class="row">
            <form class="col l8">
                <div class="row">
                    <div class="input-field col l10 textArea">
                      <span>Descripción:</span>
                      <textarea id="entradaDescripcion" class="materialize-textarea"></textarea>
                      <label for="entradaDescripcion"></label>
                    </div>
                </div>
            </form>
            <div class="col l3">
                <div class="row">
                    <div class="col s12">
                        <label>Área Técnica</label>
                        <select class="browser-default">
                          <option disabled selected class="hide"></option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <form class="col l8">
                <div class="row">
                    <div class="input-field col l10 textArea">
                        <span>Objetivo General:</span>
                        <textarea id="entradaObjetivo" class="materialize-textarea"></textarea>
                        <label for="entradaObjetivo"></label>
                    </div>
                </div>
            </form>
            <div class="col l3">
                <div class="row">
                    <div class="col s12">
                        <label>Línea de Negocios</label>
                        <select class="browser-default">
                          <option disabled selected class="hide"></option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <form class="col l8">
                <div class="row">
                    <div class="input-field col l10 textArea">
                        <span>Alcance:</span>
                        <textarea id="entradaAlcance" class="materialize-textarea"></textarea>
                        <label for="entradaAlcance"></label>
                    </div>
                </div>
            </form>
            <form class="col l4">
                <div class="row">
                    <div class="input-field col l10 textArea">
                        <span>Comentario:</span>
                        <textarea id="entradaComentario" class="materialize-textarea"></textarea>
                        <label for="entradaComentario"></label>
                    </div>
                </div>
            </form>
        </div>
    <div class="divider"></div>
    <div class="row center">
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
export default{
    data(){
        return{
            entradaTitulo: '',
            titleClass: '',
            titleMessage: '',
        }
    },
    watch:{
        entradaTitulo: 'validateTitle',
    },
    mounted() {
        // Date pickers
        this.initDatepickers();
    },
    methods:{
        // Date pickers
        initDatepickers(){
            const datepickerElement = document.querySelectorAll('.datepicker');
            const datepickerInstances = M.Datepicker.init(datepickerElement);
        },
        validateTitle() {
            if (this.entradaTitulo === 'No disponible') {
                this.titleMessage = 'El título en uso';
                this.titleClass = 'error-message';
            } else if (this.entradaTitulo) {
                this.titleMessage = 'Disponible';
                this.titleClass = 'success-message';
            } else {
                this.titleMessage = '';
                this.titleClass = '';
            }
        },
    },
}
</script>

<style scoped>
.titleContainer{
    background-color: rgb(52, 52, 97);
    padding: 10px;
    border-radius: 5px 30px 30px 5px;
    border: 2px solid rgb(230, 226, 226);
    height: 100px;
}
/*Title Container*/
.titleContainer .input-field input{
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}
.titleContainer .input-field input[type=text]:focus {
  border-bottom: 1px solid #e2e2e2 !important;
  box-shadow: none !important;
}
.titleContainer .input-field label.active{
    color: rgba(255, 255, 255, 0.774) !important;
}
/* Messages */
.error-message {
    color: red;
    font-size: 12px;
    margin: 0px;
}
.success-message {
    color: green;
    font-size: 12px;
    margin: 0px;
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
  
  /* Data Pickers */
  .datePicker label.active{
      color: rgb(52, 52, 97) !important;
  }
  .datePicker i{
      color: rgb(52, 52, 97) !important;
  }
  .datePicker label {
      font-size: 14px !important;
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
      text-align-last: justify;
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
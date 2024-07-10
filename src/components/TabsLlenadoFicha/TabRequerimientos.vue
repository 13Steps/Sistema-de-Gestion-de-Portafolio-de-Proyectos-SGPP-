<template>
    <div class="row">
        <h6>Datos Adicionales</h6>
        <form class="col l4 textareaContainer">
            <div class="row">
                <div class="input-field col l10 textArea">
                  <span class="center">Interfaz:</span>
                  <textarea id="entradaDescripcion" class="materialize-textarea"></textarea>
                  <label for="entradaDescripcion"></label>
                </div>
            </div>
        </form>
        <form class="col l4 textareaContainer">
            <div class="row">
                <div class="input-field col l10 textArea">
                  <span class="center">Seguridad:</span>
                  <textarea id="entradaDescripcion" class="materialize-textarea"></textarea>
                  <label for="entradaDescripcion"></label>
                </div>
            </div>
        </form>
        <form class="col l4 textareaContainer">
            <div class="row">
                <div class="input-field col l10 textArea">
                  <span class="center">Interconexión:</span>
                  <textarea id="entradaDescripcion" class="materialize-textarea"></textarea>
                  <label for="entradaDescripcion"></label>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <h6>Modelo de Datos</h6>
        <form class="col l8 offset-l2">
            <div class="file-field input-field">
              <div class="btn">
                <span>
                    <i class="material-icons">
                        publish
                    </i>
                </span>
                <input type="file">
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text" id="cargarDataModel" placeholder="Subir archivo...">
                <label for="cargarDataModel" class="">Modelo de Datos</label>
              </div>
            </div>
        </form>
    </div>
    <div class="row">

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

x

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
.textareaContainer{
    height: 200px;
}
textarea{
    height: 100px !important;
    overflow-y: scroll !important;
    font-size: 14px !important;
    background-color: #e2e2e2 !important;
    border-radius: 10px 10px 0 0 !important;
    border: 1px solid rgb(139, 133, 133) !important;
    padding: 10px !important;
    text-align: justify !important;
    transition: height 0.25s ease-out !important;
    transition: border 0.25s ease-in-out !important;
}
textarea.active, textarea:focus{
    box-shadow: none !important;
    height: 150px !important;
    border: 2px solid rgb(52, 52, 97) !important;
    transition: height 0.25s ease-in !important;
}
.textArea span{
    text-align: center;
    font-size: 18px;
    color: rgb(52, 52, 97);
    font-weight: 600;    
    width: 100%;
}

/* Botones */
.file-field .btn{
    background-color: rgb(52, 52, 97) !important;
    margin: none !important;
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
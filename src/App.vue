<template>
  <div id="app" class="backgroundImg">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('restoreSession');
  }
}
</script>
<style>
  *{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .backgroundImg{
    background-image: url('../src/assets/Fondos/sampleBackground.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
  }
  body.modal-open {
    overflow: auto !important;
  }

  main{
    overflow-y: scroll;
    max-height: 100%;
    min-height: 100vh;
    scrollbar-width: none;
  }
  .ganttContainer, .row, .collapsible-body, textarea, p{
    scrollbar-width: none;
  }
  .table-container, .modal{
    overflow-y: scroll;
    scrollbar-width: thin;
  }
  

/* MaterializeCSS */
  .datepicker-date-display{
    background-color: rgb(52, 52, 97) !important;
  }
  .datepicker-cancel, .datepicker-clear, .datepicker-today, .datepicker-done{
    color: rgb(52, 52, 97) !important;
  }
  .is-today{
    color: rgb(52, 52, 97) !important;
  }
  .is-selected{
    background-color: rgb(52, 52, 97) !important;
    color: white !important;
    font-size: 16px !important;
  }
  .dropdown-content span{
    color: rgb(52, 52, 97) !important;
  }
  input .select-dropdown{
    border-bottom: rgb(52, 52, 97) !important;
  }
  /* Clases personalizadas */
.customContainer{
    margin: 20px 30px 0 30px;
}

/*Configuracion General*/
  header, main, footer {
    padding-left: 300px;
  }
  @media only screen and (max-width : 992px) {
    header, main, footer {
      padding-left: 0;
    }
  }
  .tituloVista{
    margin: 0px 0px 20px 0px;
    padding: 30px 0 0 20px;
  }
  .tituloVista h2{
    letter-spacing: 2px;
    font-weight: 550;
    margin: 0px;
    padding: 0px;
  }
  .tituloVista p {
    margin-top: 10px;
    margin-left: 2px;
    font-size: 18px;
    letter-spacing: 2px;
  }
  
</style>



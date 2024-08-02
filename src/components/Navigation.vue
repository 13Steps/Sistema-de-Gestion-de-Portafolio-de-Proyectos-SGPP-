<template>
  <div id="navigationComponente">

<!-- Navbar -->
    <div class="navBanner">
      <div class="logo1">
        <img src="../assets/Logos/topleft.png" class="brand-logo responsive-img left leftLogo">
      </div>
      <div class="logo2">
        <img src="../assets//Logos/topright.png" class="brand-logo responsive-img right rightLogo">
      </div>
    </div>
    <div class="containerDos">
      <nav>
        <div class="left">
          <button @click="toggleSidenav" class="hide-on-large-only navToggle">
            <i class="material-icons" style="font-size: 32px; margin-top: 5px">menu</i>
          </button>
        </div>
        <div class="center">
          <img src="../assets/Logos/pdvsa_logo_negro.png" class="hide-on-large-only smallNavLogo">
        </div>
        <div class="navContent">
          <ul>
            <div class="hide-on-med-and-down wideNav">
              <li><a ref="dropdown" data-target="logoutMenu"><i class="material-icons">more_vert</i></a></li>
              <li @click="movDashboard($router)">
                <a>
                  <span>Inicio</span>
                </a>
              </li>
              <li @click="movPortafolio($router)">
                <a>
                  <span>Portafolio</span>
                </a>
              </li>
              <li v-if="user.role === 'rolAdministrador'" @click="movAdmin($router)">
                <a>
                  <span>Administrador</span>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>

<!-- sidenav -->
<ul class="sidenav sidenav-fixed" ref="sidenav">
<!-- Top -->
<div class="topSidenav">
      <li>
        <div class="bannerContainer">
          <img src="../assets/Logos/pdvsa_logo_rojo.png" class="pdvsaLogo">
        </div>
      </li>
      <li>
        <div class="userContainer">
          <div class="picContainer">
            <img src="../assets/Imagenes/user_pic.jpeg" class="circle z-depth-4 userPic" style="width: 84px; height: 84px;">
          </div>
          <div class="userName">
            <span><h5>{{user.nombre}} {{user.apellido}}</h5></span>
          </div>
          <div class="userId">
            <span><h5>( {{ user.role.replace("rol", "") }} )</h5></span>
          </div>
        </div>
      </li>
</div>

<!-- Middle -->
<div class="breadcrumbs hide-on-med-and-down">
  <span v-for="(crumb, index) in breadcrumbs" :key="index">
    <i class="material-icons">
        person
      </i>
    <span v-if="index !== breadcrumbs.length - 1">{{ crumb }} / </span>
    <span v-else>{{ crumb }}</span>
  </span>
</div>


<!-- Botton -->
    <div class="middleSidenav hide-on-large-only">
      <li>
        <ul class="row">
          <li  class="subheader"><span>NAVEGACIÓN:</span></li>
          <div class="smallNav">
            <li>
              <button @click="movDashboard($router)" class="btn col s12 m12 sidenav-close">
                <i class="material-icons">dashboard</i>
                <span>Inicio</span>
              </button>
            </li>
            <li>
              <button @click="movPortafolio($router)" class="btn col s12 m12 sidenav-close">
                <i class="material-icons">article</i>
                <span>Portafolio</span>
              </button>
            </li>
            <li>
              <button @click="movAdmin($router)" class="btn col s12 m12 sidenav-close">
                <i class="material-icons">account_circle</i>
                <span>Administrador</span>
              </button>
            </li>
            <li>
              <button @click="cerrarSesion" class="btn col s12 m12 sidenav-close">
                <i class="material-icons">logout</i>
                <span>Salir</span>
              </button>
            </li>
          </div>
        </ul>
      </li>
    </div>

    <div class="hide-on-med-and-down appLogo">
      <img src="../assets/Imagenes/SGPP.png" >
    </div>

</ul>

<!-- Logout Menu -->
    <ul id="logoutMenu" class="dropdown-content">
      <li class="divider"></li>
      <li><a @click="cerrarSesion" class="logout"><i class="material-icons">logout</i>Salir</a></li>
    </ul>

  </div>
  <Loader v-if="showLoader"/>
</template>

<script>
import { movDashboard, movPortafolio, movAdmin } from '../Tools/NavOptions'
import { mapState } from 'vuex';
import Loader from './Loader.vue';

export default {
  data() {
    return{
      indicador: "",
      breadcrumbs: [],
    }
  },
    components: {
    Loader,
  },
  //Sticky Navbar
  mounted() {
    const nav = document.querySelector('nav');
    const navOffset = nav.offsetTop;
    console.log('Usuario:', this.user);

    window.addEventListener('scroll', () => {
      if(window.pageYOffset >= navOffset){
        nav.classList.add('sticky', 'pdvsaColor');
      }else{
        nav.classList.remove('sticky', 'pdvsaColor');
      }
    });
  //BreadCrumps
  this.updateBreadcrumbs();

  //Dropdown Menu
  this.initDropdown();

  // Sidenav
  this.initSidenav();

   // Datos de Usuario  
  this.obtenerDatosUsuarioAutenticado();

  },
  computed: {
    ...mapState(['user']), // Asume que 'userData' es una propiedad en tu estado de Vuex
    showLoader() {
      return this.$store.state.showLoader;
    },
  },
  watch: {
    '$route'() {
      this.updateBreadcrumbs();
    }
  },
  methods: {
    movDashboard,
    movPortafolio,
    movAdmin,

    initDropdown(){
      const dropdownElement = this.$refs.dropdown;
      this.dropdownInstance = M.Dropdown.init(dropdownElement, {
        hover: true,
        coverTrigger: false,
        constrainWidth: false,
      });
    },

    updateBreadcrumbs() {
      // Obtener la ruta actual
      const matchedRoutes = this.$route.matched;
      // Crear las migas de pan
      this.breadcrumbs = matchedRoutes.map(route => route.meta.breadcrumb || route.name || '').filter(crumb => crumb !== '');
    },

    // Sidenav
    initSidenav(){
      const sidenavElement = this.$refs.sidenav;
      this.sidenavInstance = M.Sidenav.init(sidenavElement);
    },

    toggleSidenav(){
      if(this.sidenavInstance.isOpen === true){
        this.sidenavInstance.close();
      }else{
        this.sidenavInstance.open();
      }
    },

    // Datos de Usuario
    obtenerDatosUsuarioAutenticado() {
      this.indicador = localStorage.getItem("payload") || false;
    },

    // Botones
    cerrarSesion() {
      localStorage.clear();
      this.$router.push("/");
    },
  }
};
</script>

<style scoped>
/* Banner */
  .navBanner{
    display: flex;
    justify-content: space-between;
    max-height: 55px;
  }
  .leftLogo{
    margin: 5px 0 0 10px;
    max-height: 40px;
  }
  .rightLogo{
    margin-right: 10px;
    max-height: 55px;
  }

  /* Navbar */
  .sticky{
    position: fixed;
    top: 0;
    z-index: 1000;
  }
  .navBanner{
    background-color: rgb(52, 52, 97);
  }
  nav {
    background-color: rgba(252, 248, 248);
    border-bottom: 1px solid rgba(0, 0, 0, 0.406);
    max-width: auto;
    max-height: 64px;
  }
  .navToggle{
    border: none;
    padding : 0;
    background: none;
    cursor: pointer;
    outline: none;
    margin-left: 20px;
  }
  .smallNavLogo{
    max-height: 40px;
    height: auto;
    margin-top: 10px;
    margin-left: -40px;
  }
  .navContent{
    margin-left: 20px;
  }
  .navContent span{
    font-weight: 700;
    color: rgb(0, 0, 0);
  }
  li a i{
    color: black;
    height: 64px;
    font-size: 28px;
    padding-top: 5px;
  }

/* Logout */
  .dropdown-content{
    background-color: rgba(252, 248, 248);
  }
  .dropdown-content .userInfo{
    font-size: 12px;
  }
  .dropdown-content .logout{
    font-size: 14px;
    color: black;
  }
  .dropdown-content i{
    font-size: 20px;
    margin: 0px;
    padding: 0px;
  }
  /* Sidenav CSS */
  .sidenav{
    background-color: rgb(52, 52, 97);
    border: 0 1px 0 0 solid rgba(0, 0, 0, 0.404);
    z-index: 1000;
  }


/* Top sidenav */
  .bannerContainer{
    height: 114px;
    display: flex;
    align-items: center;
    background-color: rgb(252, 248, 248);
    border-bottom: 2px inset rgb(133, 133, 219);
  }
  .pdvsaLogo{
    margin-left: 45px;
  }
  .userContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -5px;
  }
  .picContainer{
    margin-top: -25px;
  }
  .userPic{
    border: 2px inset rgb(133, 133, 219);
  }
  .userName{
    margin-top: -30px;
  }
  .userId{
    margin-top: -25px;
  }
  .userName h5 {
    color: rgb(252, 248, 248);
    font-weight: 1000;
    letter-spacing: 1px;
  }
  .userId h5{
    font-size: 18px;
    color: rgb(252, 248, 248);
    font-weight: 1000;
    letter-spacing: 1px;
  }
  .topSidenav  button{
    background: none;
    color: white;
    border: none;
    padding-left: 20px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  .bottonSidenav ul .dropdown-content{
    background-color: blueviolet;
  }

  /* Midle Sidenav */
  .breadcrumbs{
      margin-top: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  .breadcrumbs span{
    font-size: 18px;
    font-weight: 700;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }


/* bottom sidenav */
  .middleSidenav{
    margin-top: 20px;
  }
  .subheader span{
    margin-left: 10px;
    font-size: 14px;
    color: rgba(252, 248, 248, 0.748);
    letter-spacing: 1px;
  }
  .smallNav .btn {
    background-color: rgb(128, 128, 230);
    border-radius: 0px;
  }
  .smallNav .btn:hover{
    background-color: rgb(97, 97, 165);
  }
  .smallNav button{
    display: flex;
    align-items: center;
  }
  .smallNav button i {
    font-size: 25px;
    margin-right: 10px;
  }

  /* App Logo */
.appLogo {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 20px 0;
}
.appLogo img {
  max-width: 90%;
  height: auto;
  margin-bottom: 50px;
}

/*Small screens */
  @media only screen and (max-width: 430px){
    .leftLogo, .rightLogo{
      height: 30px;
      margin: 0px;
    }
    .pdvsaLogo{
      height: 30px;
    }
  }
</style>


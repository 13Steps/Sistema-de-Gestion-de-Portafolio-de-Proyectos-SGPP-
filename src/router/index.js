import { createRouter, createWebHashHistory } from 'vue-router'

  // Vistas
import DashboardVista from '../views/DashboardVista.vue'
import LoginVista from '../views/LoginVista.vue'
import PortafolioVista from '../views/PortafolioVista.vue'
import FichaEntrada from '../views/FichaEntradaVista.vue'
import AdminVista from '../views/AdminVista.vue'
import fichaLlenado from '../views/FichaLlenadoVista.vue'

  // Funciones
import { estaAutenticado } from './guard';

  // Rutas
const routes = [
  {
    path: '/', name: 'LoginVista', component: LoginVista, 
  },
  { beforeEnter: [estaAutenticado],
    path: '/dashboard', name: 'DashBoard', meta: {breadcrumb: ' / Inicio'},
    children: [
      {
        path: '',
        name: '',
        component: DashboardVista
      },
    ]},
  { beforeEnter: [estaAutenticado],
    path: '/portafolio', name: 'Portafolio', meta: {breadcrumb: ' / Portafolio'},
    children : [
      {
        name : '',
        path : '',
        component : PortafolioVista
      },
    ]},
  { beforeEnter: [estaAutenticado],
    path: '/fichaEntrada/:entryId', name: 'FichaEntrada', meta: {breadcrumb: ' / ProyectoPrueba'},
    children: [
      {
        path: '',
        name: '',
        component: FichaEntrada
      },
    ]}, 
    { beforeEnter: [estaAutenticado],
      path: '/fichaLlenado/:entryId', name: 'fichaLlenadoId', meta: {breadcrumb: ' / fichaLlenado id'},
      children: [
        {
          path: '',
          name: '',
          component: fichaLlenado
        },
      ]},
      { beforeEnter: [estaAutenticado],
        path: '/fichaLlenado/', name: 'fichaLlenado', meta: {breadcrumb: ' / fichaLlenado'},
        children: [
          {
            path: '',
            name: '',
            component: fichaLlenado
          },
        ]},
    { beforeEnter: [estaAutenticado],
      path: '/administrador', name: 'administrador', meta: {breadcrumb: ' / Administrador'},
      children: [
        {
          path: '',
          name: '',
          component: AdminVista
        },
    ]},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

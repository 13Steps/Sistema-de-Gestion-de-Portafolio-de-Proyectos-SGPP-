export function movDashboard(router) {
    const userRole = localStorage.getItem('userRole');

    if (userRole === 'Admin'){
      console.log("el pepe")
    }else{
      console.log("epe")
    }

    router.push('/dashboard');
  }
  
  export function movPortafolio(router) {
    router.push('/portafolio');
  }
  
  export function movAdmin(router) {
    router.push('/administrador');
  }
  
  export function movToFichaEntrada(router, entryId) {
    router.push(`/fichaEntrada/${entryId}`);
  }
  export function movToFichaLlenado(router, entryId) {
    router.push(`/fichallenado/${entryId}`);
  }
//Validacion de login
export const estaAutenticado = (to, from, next) => {

    const indicador = localStorage.getItem('indicador') || false;

    if (!indicador) {
        alert('No esta autenticado para ingresar')
        next('/');
    } else {
        next();
    }

}
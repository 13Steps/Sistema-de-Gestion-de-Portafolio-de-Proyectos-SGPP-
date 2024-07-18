<template>
    <div id="loginVista">
<!-- Bannner -->
            <div class="row">
                <div class="bannerPagina">
                    <img src="../assets/Logos/topleft.png" class="brand-logo responsive-img left leftLogo">
                    <img src="../assets//Logos/topright.png" class="brand-logo responsive-img right rightLogo">
                </div>
            </div>
        
        
<!-- Login -->
        <div class="container">
            <div class="row login">
                <div class="col l8 offset-l2 m8 offset-m2 s8 offset-s2">
                    <div class="row z-depth-3 card">
                        <div class="col l5 m5 s12 imgLogin">
                        
                        </div>
                        <div class="col l7 m7 s12 card-content">
                            <div class="formLogin">
                                <span class="card-title center">
                                    <h4>
                                        Iniciar Sesion
                                    </h4>
                                    <div class="divider"></div>
                                </span>
                                <form class="formLogin">
                                    <div class="input-field userLogin">
                                        <i class="material-icons prefix">account_circle</i>
                                        <input v-model="indicador" id="username" type="text" class="validate" autocomplete="on" required>
                                        <label for="username">Usuario</label>
                                    </div>
                                    <div class="input-field passwordLogin">
                                        <i class="material-icons prefix">lock</i>
                                        <input v-model="password" id="password" type="password" class="validate" autocomplete="off" required>
                                        <label for="password">Contraseña</label>
                                    </div> 
                                    <button @click="iniciarSesion" class="btn-flat white-text loginButton" type="submit" name="action">
                                        Iniciar Sesión
                                    </button>
                                </form>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginVista',
    data : () => ({
        indicador : '',
        password : ''
    }),
    methods: {
        async iniciarSesion() {

            const formData = {
                indicador : this.indicador,
                password : this.password
            }

            localStorage.setItem('indicador', formData.indicador);
            localStorage.setItem('userRole', 'Admin');
            this.$router.push('/dashboard')

            // la api para autenticarme
            // const resp = await fetch('localhos:3000/api/autenticacion', formData);
            // const dataResp = await resp.json();

            // if(dataResp.status == 200) {
                // localStorage.setItem('indicador'     , formData.indicador);
                // this.$router.push('/proyectos')
            // }


            // si pasa le das acceso

            // sino una alerta

        }
    }
}
</script>

<style src="../assets/Style/Login.css" scoped></style>    
<template>
  <div id="loginVista">
    <div class="row">
      <div class="bannerPagina">
        <img
          src="../assets/Logos/topleft.png"
          class="brand-logo responsive-img left leftLogo"
        />
        <img
          src="../assets//Logos/topright.png"
          class="brand-logo responsive-img right rightLogo"
        />
      </div>
    </div>

    <div class="container">
      <div class="row login">
        <div class="col l8 offset-l2 m8 offset-m2 s8 offset-s2">
          <div class="row z-depth-3 card">
            <div class="col l5 m5 s12 imgLogin"></div>
            <div class="col l7 m7 s12 card-content">
              <div class="formLogin">
                <span class="card-title center">
                  <h4>Iniciar Sesión</h4>
                  <div class="divider"></div>
                </span>
                <form class="formLogin">
                  <div class="input-field userLogin">
                    <i class="material-icons prefix">account_circle</i>
                    <input
                      @input="convertirAMayusculas"
                      v-model="indicador"
                      id="username"
                      type="text"
                      class="validate"
                      autocomplete="off"
                      required
                    />
                    <label for="username">Usuario</label>
                  </div>
                  <div class="input-field passwordLogin">
                    <i class="material-icons prefix">lock</i>
                    <input
                      v-model="password"
                      id="password"
                      type="password"
                      class="validate"
                      autocomplete="off"
                      required
                    />
                    <label for="password">Contraseña</label>
                  </div>
                  <button
                    @click="login"
                    class="btn-flat white-text loginButton"
                    type="submit"
                    name="action"
                  >
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
import { loginUser } from '../Services/Services';
import { mapActions } from 'vuex'; // Asegúrate de usarlo si lo necesitas, de lo contrario, elimina esta línea

export default {
  name: "LoginVista",
  data: () => ({
    indicador: "",
    password: "",
  }),
  methods: {
    ...mapActions(['setUserData', 'setToken']), // Asegúrate de definir estas acciones en tu store de Vuex si planeas usarlas
    convertirAMayusculas() {
      this.indicador = this.indicador.toUpperCase();
    },
    async login() {
      this.convertirAMayusculas();

      const formData = {
        in_usuario: this.indicador,
        password: this.password,
      };
      
      try {
        const response = await loginUser(formData);
        localStorage.setItem('token', response.token);
        this.$store.commit('setUserData', response.payload);
        this.$store.commit('setToken', response.token);

        console.log('Login successful:', response);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        alert('Error al iniciar sesión. Verifique sus credenciales.');
      }
    },
  }
}
</script>


<style src="../assets/Style/Login.css" scoped></style>

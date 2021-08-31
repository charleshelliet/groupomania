<template>
    <div id="login">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <router-link to="/login">Connexion</router-link> |
    <router-link to="/register">Créer un compte</router-link>
      <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-login">
                    <div class="panel-heading">
                        <img alt="Corporama logo" src="../assets/icon-left-font-monochrome-black.png">
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <form @submit.prevent="loginSubmit"
                                id="login-form" action="/" method="post" role="form" style="display: block;">
                                    <div class="form-group">
                                        <input type="email" name="email" v-model="email" id="email" tabindex="1" class="form-control" placeholder="Adresse email">
                                    </div>
                                    <div class="form-group">
                                            <input type="password" name="password" v-model="password" id="password" tabindex="2" class="form-control" placeholder="Mot de passe">
                                        </div>
                                        <div class="form-group text-center">
                                            <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
                                            <label for="remember">Rester connecté</label>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Se connecter">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="text-center">
                                                        <a href="https://phpoll.com/recover" tabindex="5" class="forgot-password">Mot de passe oublié ?</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
					return {
						username: '',
						email: '',
					}
				},
        methods: {
            async loginSubmit() {
						const response = await axios.post('http://localhost:3000/api/user/login/', {
							email: this.email,
							password: this.password
						});
						console.log(response);
						sessionStorage.setItem('token', response.data.token);
                        sessionStorage.setItem('id', response.data.userId);
                        //this.$store.commit('setAuthentication', true);
                        this.$router.push('/');
					}
        }
    }
</script>

<style lang="scss">

#login {
  padding: 30px;

  a {
    font-weight: normal;
    color: #566777;

    &.router-link-exact-active {
      color: rgb(9,31,67);
      font-weight: bold;
    }
  }
  .row {
      margin-top: 2%;
  }
  .btn {
    background-color: rgb(9,31,67);
    color: white;
  }
  .panel {
	border-color: black;
  }
}
</style>

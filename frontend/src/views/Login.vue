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
                                        <label hidden class="sr-only" for="email">Adresse email</label>
                                        <input type="email" name="email" v-model="email" id="email" class="form-control" placeholder="Adresse email">
                                        <div v-if="errors.email" class="text-danger">
                                        <strong v-text="errors.email"></strong>
                                    </div>
                                    </div>
                                    <div class="form-group">
                                            <label hidden class="sr-only" for="password">Mot de passe</label>
                                            <input type="password" name="password" v-model="password" id="password" class="form-control" placeholder="Mot de passe">
                                            <div v-if="errors.password" class="text-danger">
                                            <strong v-text="errors.password"></strong>
                                     </div>
                                    </div>
                                        <div class="form-group text-center">
                                            <input type="checkbox" class="" name="remember" id="remember">
                                            <label for="remember">Rester connecté</label>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" name="login-submit" id="login-submit" class="form-control btn btn-login" value="Se connecter">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="text-center">
                                                        <a href="https://phpoll.com/recover" class="forgot-password">Mot de passe oublié ?</a>
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
                        errors: {
                            email: '',
                            password: '',
                        }
					}
				},
        methods: {
            loginSubmit() {
				axios
                    .post('http://localhost:3000/api/user/login/', {
							email: this.email,
							password: this.password
						})
                    .then(response => {
                        sessionStorage.setItem('token', response.data.token);
                        sessionStorage.setItem('id', response.data.userId);
                        sessionStorage.setItem('isAdmin', response.data.isAdmin);
                        console.log(response.data);
                        //this.$store.commit('setAuthentication', true);
                        this.$router.push('/');
                    })
                    .catch(err => {
                        console.log(err.response.data);
                        this.errors.email = err.response.data.email_error;
                        this.errors.password = err.response.data.password_error;
                    })  
				}
        }
    }
</script>

<style lang="scss">

#login {
  padding: 30px;

  a {
    font-weight: bold;
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

@media (max-width: 768px) { 
    img {
        max-width: 100%;
        height: auto;
    }
}
</style>

<template>
    <div id="register">
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
                                <form @submit.prevent="registerSubmit"
									id="register-form" action="/" method="post" role="form" style="display: block;">
										<div class="form-group">
											<input type="text" name="username" v-model="username" id="username" tabindex="1" class="form-control" placeholder="Nom d'utilisateur">
                      <div v-if="errors.username" class="text-danger">
                          <strong v-text="errors.username"></strong>
                      </div>
										</div>
										<div class="form-group">
											<input type="email" name="email" v-model="email" id="email" tabindex="1" class="form-control" placeholder="Adresse email">
                      <div v-if="errors.email" class="text-danger">
                          <strong v-text="errors.email"></strong>
                      </div>
										</div>
										<div class="form-group">
											<input type="password" name="password" v-model="password" id="password" tabindex="2" class="form-control" placeholder="Mot de passe">
                      <div v-if="errors.password" class="text-danger">
                          <strong v-text="errors.password"></strong>
                      </div>
										</div>
										<div class="form-group">
											<textarea type="text" name="bio" v-model="bio" id="bio" tabindex="2" class="form-control" placeholder="Décrivez-vous en quelques mots"></textarea>
										</div>
										<div class="form-group">
											<div class="row">
												<div class="col-sm-6 col-sm-offset-3">
													<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="S'inscrire !">
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
        name: 'Register',
        data() {
					return {
						username: '',
						email: '',
						password: '',
						bio: '',
            errors: {
              username: '',
              email: '',
              password: '',
            },
					}
				},
        methods: {
          registerSubmit() {
                axios
                    .post('http://localhost:3000/api/user/signup/', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        bio: this.bio
                    })
                    .then(response => {
                        console.log(response);
                        this.$router.push('/login');
                      })
                    .catch(err => {
                        console.log(err.response.data);
                        this.errors.username = err.response.data.username_error;
                        this.errors.email = err.response.data.email_error;
                        this.errors.password = err.response.data.password_error;
                    } );
          }
        }
    }
</script>


<style lang="scss">

#register {
  padding: 30px;

  a {
    font-weight: normal;
    color: #566777;

    &.router-link-exact-active {
      color: rgb(209,81,90);
      font-weight: bold;
    }
  }
  .row {
      margin-top: 2%;
  }
  .btn {
    background-color: rgb(209,81,90);
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
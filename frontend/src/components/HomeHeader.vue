<template>
    <nav v-bind:key="user.id" class="navbar navbar-light bg-white">
        <a href="#" class="navbar-brand">
          <h1>
          <img class="header_logo" alt="Corporama logo" src="../assets/icon-left-font-monochrome-black.png">
          </h1>
        </a>
        <form class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button aria-label="search" class="btn btn-outline-primary" type="button" id="button-addon2">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>
        <div v-if="user.isAdmin === true">
          <button type="button" class="btn btn-info" @click="adminPage">
            VUE ADMIN
          </button>
        </div>
        <a href="#" class="navbar-link" @click.prevent="logOut">
          <p>Se déconnecter</p>
        </a>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeHeader',
  data() {
		return {
			messages: [],
      user: '',
			}
		},
  methods: {
    logOut() {
      this.$router.push('/login');
      sessionStorage.clear();
    },
    adminPage() {
      this.$router.push('/admin');
    }
  },
    async created() {
        const response = await axios.get('http://localhost:3000/api/user/profile/' + sessionStorage.getItem('id'), {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token') 
                }
            });
            console.log(response);
            this.user = response.data;
      }
}
</script>

<style scoped>
.header_logo {
    height: 60px;
    width: 130px;
  }

@media (max-width: 768px) {
  button {
    visibility: hidden;
  }
}

:hover.btn-info {
    background-color: rgb(209,81,90);
    border-color: rgb(9,31,67);
    color: white;
}

:hover.btn-outline-primary{
    background-color: rgb(209,81,90);
    border-color: rgb(9,31,67);
    color: white;
}

a:hover {
  text-decoration: none;
}

</style>
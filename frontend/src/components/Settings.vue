<template>
    <div class="card gedf-card">
        <div class="card-body">
            <h5 class="card-title">Paramètres</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="h7">
                        <a href="#" class="card-link" @click.prevent="updateProfile">Modifier bio</a>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="h7">
                        <a href="#" id="delete" class="card-link" @click.prevent="deleteAccount">Supprimer compte</a>
                    </div>
                </li>
                <li class="list-group-item">
                    <p class="card-text"><em>En cas de questions, contactez-nous sur <a href="mailto:help@grouporama.com">help@grouporama.com</a></em></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Settings',
  methods: {
      deleteAccount() {
          axios.delete('http://localhost:3000/api/user/profile/' + localStorage.getItem('id'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') 
                }
            });
            this.$router.push('/login');
            localStorage.clear();
      }
  }
}
</script>

<style scoped>
    .card {
        text-align: left;
    }
    #delete {
        color: rgb(209,81,90);
    }

</style>
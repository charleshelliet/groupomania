<template>
    <div class="card gedf-card">
        <div class="card-body">
            <h5 class="card-title">Paramètres</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="h7">
                        <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modale>
                        <a @click.prevent="toggleModale" href="#" class="card-link">Modifier profil</a>
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

import BioModale from './BioModale'

export default {
  name: 'Settings',
  data() {
      return {
          revele: false
      }
  },
  components: {
      'modale': BioModale
  },
  methods: {
      toggleModale() {
          this.revele = !this.revele
      },
      deleteAccount() {
          axios.delete('http://localhost:3000/api/user/profile/' + sessionStorage.getItem('id'), {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token') 
                }
            });
            this.$router.push('/login');
            sessionStorage.clear();
      }
  }
}
</script>

<style scoped>
    .card {
        text-align: left;
    }
    #delete {
        color: rgb(9,31,67);
    }

    #delete:hover {
        color: rgb(209,81,90);
        font-weight: bold;
    }

    a:hover {
        color: rgb(9,31,67);
        font-weight: bold;
    }

</style>
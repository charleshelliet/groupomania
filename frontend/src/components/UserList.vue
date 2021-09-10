<template>
    <div class="container">
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title text-uppercase mb-0">Panneau d'administration</h2>
            </div>
            <div class="table-responsive">
                <table class="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col" class="border-0 text-uppercase font-medium pl-4">#</th>
                      <th scope="col" class="border-0 text-uppercase font-medium">Nom</th>
                      <th scope="col" class="border-0 text-uppercase font-medium admin-hidden-xs admin-hidden-sm">Métier</th>
                      <th scope="col" class="border-0 text-uppercase font-medium admin-hidden-xs admin-hidden-sm">Email</th>
                      <th scope="col" class="border-0 text-uppercase font-medium admin-hidden-xs">Date de création</th>
                      <th scope="col" class="border-0 text-uppercase font-medium admin-hidden-xs">Admin ?</th>
                      <th scope="col" class="border-0 text-uppercase font-medium">Gérer</th>
                    </tr>
                  </thead>
                  <tbody id="input">
                    <tr v-bind:key="profile.id" v-for="profile in profiles">
                      <td class="pl-4"><div class="text">{{profile.id}}</div></td>
                      <td>
                          <h5 class="font-medium mb-0">{{profile.username}}</h5>
                      </td>
                      <td class="admin-hidden-xs admin-hidden-sm">
                          <span class="text-muted">Tennisman</span><br>
                      </td>
                      <td class="admin-hidden-xs admin-hidden-sm">
                          <span class="text-muted">{{profile.email}}</span><br>
                      </td>
                      <td class="admin-hidden-xs">
                          <span class="text-muted">{{profile.createdAt}}</span><br>
                      </td>
                      <td class="admin-hidden-xs">
                        <div class="form-control category-select" id="exampleFormControlSelect1">
                          <option>{{profile.isAdmin}}</option>
                        </div>
                      </td>
                      <td>
                        <button @click.prevent="deleteAccount(profile.id)" type="button" aria-label="delete" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i class="fa fa-trash"></i> </button>
                        <button type="button" aria-label="modify" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2 admin-hidden-xs"><i class="fa fa-edit"></i> </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostWall',
    data() {
		return {
			profiles: [],
			}
		},
    mounted () {
        axios
        .get('http://localhost:3000/api/user/profile/', {
          headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token') 
                }
        })
        .then(response => (this.profiles = response.data))
        .catch(error => console.log(error));
        },
    methods: {
        deleteAccount(profileId) {
            console.log(profileId);
            axios.delete('http://localhost:3000/api/user/profile/' + profileId);
            document.location.reload();
      }
    }
    
}   

</script>

<style scoped>
  @media (max-width: 768px) { 
    .admin-hidden-sm {
    visibility: hidden;
    display: none;
  } 
}

@media (max-width: 426px) { 
    .admin-hidden-xs {
    visibility: hidden;
    display: none;
  } 
  h2 {
    font-size: 1.4rem;
  }
}
</style>

<template>
    
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="h5" v-if="user">@{{ user.username }}</div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                <div class="h7 text-muted"><em>{{ user.email }}</em></div>
                </li>
                <li class="list-group-item bio">{{ user.bio }}</li>
            </ul>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'UserCard',
  data() {
		return {
			user: '',
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
        },
}
</script>

<style scoped>
    .bio {
        text-align: left;
    }

    @media (max-width: 1250px) {
    .col-md-3 {
        padding-bottom: 15px;
    }
}
</style>

<template>

    <div id="postwall">
        <ul>
            <li v-bind:key="message.id" v-for="message in messages">
                <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modale>
                <div class="card gedf-card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-2">
                                <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                            </div>
                            <div class="ml-2">
                                <div class="h5 m-0">{{message.User.username}}</div>
                                <div class="h7 text-muted">{{message.User.email}}</div>
                            </div>
                            <div>
                                <div v-if="user.isAdmin === true" class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                    <div class="h6 dropdown-header">Options</div>
                                        <a @click.prevent="deleteMessage(message.id)" class="dropdown-item" href="#">Supprimer</a>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{message.updatedAt}}</div>
                            <a class="card-link" href="#">
                                <h5 class="card-title">{{message.title}}</h5>  
                            </a>
                            <p class="card-text">{{message.content}}</p>
                            <iframe v-if="message.attachment" width="560" height="315" :src="'https://www.youtube.com/embed/' + message.attachment" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="card-link"><i class="fa fa-gittip"></i> J'aime</a>
                            <a href="#" class="card-link"><i class="fa fa-comment"></i> Commenter</a>
                            <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Partager</a>
                            <a v-if="user.isAdmin === true" @click.prevent="toggleModale(message.id)" href="#" class="card-link"><i class="fa fa-edit"></i> Modifier</a>
                        </div>
                    
                </div>
                </div>
            </li>   
        </ul> 
    </div>
</template>

<script>
import axios from 'axios'

import PostModale from './PostModale'

export default {
  name: 'PostWall',
    data() {
		return {
			messages: [],
            user: '',
            revele: false,
			}
		},
    components: {
      'modale': PostModale
    },
    mounted () {
        axios
        .get('http://localhost:3000/api/message/', {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token') 
                }
        })
        .then(response => (this.messages = response.data))
        .catch(error => console.log(error));
        },
    methods: {
        toggleModale(messageId) {
            this.revele = !this.revele;
            console.log(messageId);
            sessionStorage.setItem('messageId', messageId);
        },
        deleteMessage(messageId) {
            console.log(messageId);
            axios.delete('http://localhost:3000/api/message/' + messageId);
            document.location.reload();
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

<style scoped lang="scss">
#postwall {
    .card {
        margin-top: 5%;
    }
    .card-header {
        padding: inherit;
    }
    .card-body {
        background-color: white;
        text-align: left;
    }
    ul {
        padding: inherit;
    }
    .d-flex {
        padding: 2%;
    }
}
</style>
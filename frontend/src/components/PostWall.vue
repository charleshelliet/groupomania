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
                                    <button class="btn btn-link dropdown-toggle" aria-label="delete" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Modifié le {{dateFormat(message.updatedAt)}}</div>
                            <a class="card-link" href="#">
                                <h5 class="card-title">{{message.title}}</h5>  
                            </a>
                            <p class="card-text">{{message.content}}</p>
                            <iframe v-if="message.attachment" width="560" height="315" :src="'https://www.youtube.com/embed/' + message.attachment" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="card-link"><i class="fa fa-gittip"></i> J'aime</a>
                            <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Partager</a>
                            <a v-if="user.isAdmin === true" @click.prevent="toggleModale(message.id)" href="#" class="card-link"><i class="fa fa-edit"></i> Modifier</a>
                        </div>
                   
                    <div class="container mt-5 mb-5">
                        <div class="d-flex flex-row add-comment-section mt-4 mb-4"><img class="img-fluid img-responsive rounded-circle mr-2" src="https://picsum.photos/50/50" width="38"><input type="text" class="form-control mr-3" placeholder="Add comment" v-model="comment.content"><button class="btn btn-primary" type="button" @click.prevent="sendComment(message.id)">Comment</button></div>
                            <button @click="getComments(message.id, user.id)" class="btn btn-link">Afficher commentaires</button>
                            <div v-bind:key="comment.id" v-for="comment in comments" class="commented-section mt-2">
                                <div v-if="message.id === idMessageActif" class="d-flex flex-row align-items-center commented-user">
                                    <h5 class="mr-2">{{comment.User.username}}</h5><span class="dot mb-1"></span><span class="mb-1 ml-2">Posté le {{dateFormat(comment.createdAt)}}</span>
                                </div>
                                <div class="d-flex flex-row add-comment-section mt-4 mb-4" v-if="message.id === idMessageActif" id="text-comment"><strong>"{{comment.content}}"</strong></div>
                            </div>
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
            comments : [],
            comment: {
                content:"",
                messageId: sessionStorage.getItem('messageId'),
                userId: sessionStorage.getItem('id')
                },
            idMessageActif: 0
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
            axios.delete('http://localhost:3000/api/message/' + messageId, {
                headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token') 
                }
            });
            document.location.reload();
      },
      dateFormat(date) {
        const event = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return event.toLocaleDateString(undefined, options);
      },
      sendComment(messageId) {
        console.log(messageId);
        sessionStorage.setItem('messageId', messageId);
        axios
        .post('http://localhost:3000/api/message/' + messageId + '/comments', this.comment, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token') 
                }
        })
        .then(response => {
            this.comment = response.data;
            this.$router.push('/');
            document.location.reload();
            })
        .catch(error => console.log(error));
        },
      getComments(messageId, userId) {
        console.log(messageId);
        console.log(userId);
        axios
        .get('http://localhost:3000/api/message/' + messageId + '/comments/', {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token') 
                },
        })
        .then(response => {
            this.comments = response.data;
            this.idMessageActif = messageId;
            })
        .catch(error => console.log(error));
        },  
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
    iframe {
    max-width: 100%;
	max-height: 100%;
    }
}

#text-comment {
        font-size: large;
        text-align: left;
    }

:hover.btn-link {
    background-color: rgb(209,81,90);
    border-color: rgb(9,31,67);
    color: white;
}

:hover.btn {
    background-color: rgb(209,81,90);
    border-color: rgb(9,31,67);
    color: white;
}
</style>
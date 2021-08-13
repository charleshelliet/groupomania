<template>
    <div id="postwall">
        <ul>
            <li v-bind:key="message.id" v-for="message in messages"> 
                <div class="card gedf-card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-2">
                                <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                            </div>
                            <div class="ml-2">
                                <div class="h5 m-0">@KIKOU {{message.userId}}</div>
                                <div class="h7 text-muted">Miracles Lee Cross</div>
                            </div>
                            <div>
                                <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                    <div class="h6 dropdown-header">Options</div>
                                        <a class="dropdown-item" href="#">Sauvegarder</a>
                                        <a class="dropdown-item" href="#">Cacher</a>
                                        <a class="dropdown-item" href="#">Signaler</a>
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
                        </div>
                        <div class="card-footer">
                            <a href="#" class="card-link"><i class="fa fa-gittip"></i> J'aime</a>
                            <a href="#" class="card-link"><i class="fa fa-comment"></i> Commenter</a>
                            <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Partager</a>
                        </div>
                    
                </div>
                </div>
            </li>   
        </ul> 
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostWall',
    data() {
		return {
			messages: [],
			}
		},
    mounted () {
        axios
        .get('http://localhost:3000/api/message/')
        .then(response => (this.messages = response.data))
        .catch(error => console.log(error));
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
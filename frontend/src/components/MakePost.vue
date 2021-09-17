<template>
    <div class="card gedf-card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Publier une vidéo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Publier une image</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <form class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                <div class="form-group">
                    <label class="sr-only" for="userId">post</label>
                    <textarea hidden class="form-control" id="userId" rows="1" placeholder="Titre" v-model="message.userId"></textarea>
                </div>
                <div class="form-group">
                    <label class="sr-only" for="title">post</label>
                    <textarea class="form-control" id="title" rows="1" placeholder="Titre" v-model="message.title"></textarea>
                </div>
                <div class="form-group">
                    <label class="sr-only" for="content">post</label>
                    <textarea class="form-control" id="content" rows="3" placeholder="Quoi de neuf ?" v-model="message.content"></textarea>
                </div>
                <div class="form-group">
                    <label class="sr-only" for="attachment">post</label>
                    <textarea class="form-control" id="attachment" rows="1" placeholder="Lien Youtube" v-model="message.attachment"></textarea>
                </div>
            </div>
            <div class="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                <div class="form-group">
                    <textarea hidden class="form-control" id="userId" rows="1" placeholder="Titre" v-model="message.userId"></textarea>
                </div>
                <div class="form-group">
                    <textarea class="form-control" id="title" rows="1" placeholder="Titre" v-model="message.title"></textarea>
                </div>
                <div class="form-group">
                    <textarea class="form-control" id="content" rows="3" placeholder="Quoi de neuf ?" v-model="message.content"></textarea>
                </div>
                <div class="form-group">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile">
                        <label class="custom-file-label" for="customFile">Télécharger image</label>
                    </div>
                </div>
                <div class="py-4"></div>
            </div>
        </form>
        <div class="btn-toolbar justify-content-between">
            <div class="btn-group">
                <button type="submit" class="btn btn-primary" @click="sendPost">partager</button>
            </div>
            <div class="btn-group">
                <button id="btnGroupDrop1" aria-label="visibility" type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i class="fa fa-globe"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" href="#"><i class="fa fa-globe"></i> Public</a>
                    <a class="dropdown-item" href="#"><i class="fa fa-users"></i> Amis</a>
                    <a class="dropdown-item" href="#"><i class="fa fa-user"></i> Juste moi</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MakePost',
  data() {
		return {
			message: {
                title: "",
                content:"",
                attachment:"",
                userId: sessionStorage.getItem('id')
                },
			}
		},
    methods: {
        sendPost() {
        axios
        .post('http://localhost:3000/api/message/', this.message, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token') 
                }
        })
        .then(response => {
            this.message = response.data;
            this.$router.push('/');
            document.location.reload();
            })
        .catch(error => console.log(error));
        }
    }   
}   
</script>

<style scoped>

:hover.btn-primary {
    background-color: rgb(209,81,90);
    border-color: rgb(9,31,67);
    color: white;
}

:hover.btn-link {
    background-color: rgb(209,81,90);
    border-color: rgb(9,31,67);
    color: white;
}
</style>
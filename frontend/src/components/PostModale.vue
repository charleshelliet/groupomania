<template>
    
    <div class="bloc-modale" v-if="revele">
        <div class="overlay">
            <div class="modale card">
                <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
                <h3>Modifiez votre publication :)</h3>
                <div>
                    <textarea type="text" name="title" v-model="title" placeholder="Titre" rows="1"></textarea>
                </div>
                <div>
                    <textarea type="text" name="content" v-model="content" placeholder="Quoi de neuf ?" rows="3"></textarea>
                </div>
                <div v-on:click="toggleModale"><button @click.prevent="updateMessage()" class="btn btn-success">Valider</button></div>
            </div>
        </div>
    </div>


</template>


<script>
    import axios from 'axios'

    export default {
        name: 'PostModale',
        props: ['revele', 'toggleModale'],
        data() {
            return {
                userId: sessionStorage.userId,
                title: '',
                content: '',
            }
        },
        methods: {
            updateMessage() {
                axios.put('http://localhost:3000/api/message/' + sessionStorage.getItem('messageId'), {
                    title: this.title,
                    content: this.content
                });
                document.location.reload();  
        }
        }
    }

</script>



<style scoped>

    .bloc-modale {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .modale {
        background: #F1F1F1;
        color: #333;
        padding: 50px;
        position: fixed;
        top: 30%;
        left: 30%;
    }

    .btn-modale {
        position: absolute;
        top: 10px;
        right: 10px;
    }

</style>
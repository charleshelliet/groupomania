<template>
    
    <div class="bloc-modale" v-if="revele">
        <div class="overlay">
            <div class="modale card">
                <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
                <h3>Modifiez votre bio :)</h3>
                <textarea type="text" name="bio" v-model="bio"></textarea>
                <div v-on:click="toggleModale"><button @click="updateProfile" class="btn btn-success">Valider</button></div>
            </div>
        </div>
    </div>


</template>


<script>
    import axios from 'axios'

    export default {
        name: 'BioModale',
        props: ['revele', 'toggleModale'],
        data() {
            return {
                userId: sessionStorage.userId,
                bio: '',
            }
        },
        methods: {
            updateProfile() {
                axios
                    .put('http://localhost:3000/api/user/profile/' + sessionStorage.getItem('id'), {
                        bio: this.bio
                    })
                    .then(response => {
                        this.bio = response.data;
                        this.$router.push('/');
                        document.location.reload();
                        })
                    .catch(error => console.log(error));
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
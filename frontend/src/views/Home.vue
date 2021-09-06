<template>
  <div id="home">
    <div>
      <HomeHeader/>
    </div>
    <div class="container-fluid gedf-wrapper">
      <div class="row">
        
        <UserCard/>
        
        <div class="col-md-6 gedf-main">
          <div><MakePost/></div>
          <div><PostWall/></div>  
        </div>
        <div class="col-md-3">
            <Settings/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import HomeHeader from '@/components/HomeHeader.vue'
import UserCard from '@/components/UserCard.vue'
import MakePost from '@/components/MakePost.vue'
import PostWall from '@/components/PostWall.vue'
import Settings from '@/components/Settings.vue'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    UserCard,
    MakePost,
    PostWall,
    Settings
  }
}
</script>


<style lang="scss">

#home {
  ul {
    list-style-type: none;
  } 
}

.btn {
    background-color: rgb(9,31,67);
    border-color: black;
    color: white;

}

a {
  color: rgb(9,31,67);
}

a:hover {
  color: rgb(209,81,90);
}


@media (max-width: 1250px) {
  .row {
    padding: 1%;
  }
}

</style>


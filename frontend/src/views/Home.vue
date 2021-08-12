<template>
  <div id="home">
    <nav class="navbar navbar-light bg-white">
        <a href="#" class="navbar-brand">
          <img class="header_logo" alt="Corporama logo" src="../assets/icon-left-font-monochrome-black.png">
        </a>
        <form class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" id="button-addon2">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>
        <a href="#" class="navbar-link">
          <p>Se déconnecter</p>
        </a>
    </nav>
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
import UserCard from '@/components/UserCard.vue'
import MakePost from '@/components/MakePost.vue'
import PostWall from '@/components/PostWall.vue'
import Settings from '@/components/Settings.vue'

export default {
  name: 'Home',
  components: {
    UserCard,
    MakePost,
    PostWall,
    Settings
  }
}
</script>


<style scoped lang="scss">

#home {
  .header_logo {
    height: 60px;
    width: 130px;
  }

}
</style>


<template>

  <div class="container-fluid gedf-wrapper">
    <div class="row">
      <UserCard/>
      <div class="col-md-6 gedf-main">
      <MakePost/>
      <PostWall/>
    </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import UserCard from '@/components/UserCard.vue'
import MakePost from '@/components/MakePost.vue'
import PostWall from '@/components/PostWall.vue'

export default {
  name: 'Home',
  components: {
    UserCard,
    MakePost,
    PostWall
  }
}
</script>



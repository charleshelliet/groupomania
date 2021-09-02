<template>
  <div id="home">
    <div>
      <HomeHeader/>
    </div>
    <div class="container-fluid gedf-wrapper">
      <UserList/>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import HomeHeader from '@/components/HomeHeader.vue'
import UserList from '@/components/UserList.vue'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    UserList
  }
}
</script>


<style lang="scss">

#home {
  ul {
    list-style-type: none;
  } 
}
</style>
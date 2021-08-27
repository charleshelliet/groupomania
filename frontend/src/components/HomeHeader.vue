<template>
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
        <a href="#" class="navbar-link" @click.prevent="logOut">
          <p>Se déconnecter</p>
        </a>
    </nav>
</template>

<script>
export default {
  name: 'HomeHeader',
  methods: {
    logOut() {
      this.$router.push('/login');
      localStorage.clear();
    }
  }
}
</script>

<style scoped>
.header_logo {
    height: 60px;
    width: 130px;
  }
</style>
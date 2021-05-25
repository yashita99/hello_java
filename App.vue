<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Experian</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/posts-manager">Posts Manager</b-nav-item>
          <b-nav-item to="/f">Filter</b-nav-item>
          <b-nav-item href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
          <!--<b-nav-item>
            <select class="form-control" @change="changeJobTitle($event)">
              <option value="" selected disabled>Choose</option>
              <option v-for="jobTitle in jobTitles" :value="jobTitle.id" :key="jobTitle.id">{{ jobTitle.name }}</option>
            </select>
            
            
          </b-nav-item>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--<p><span>Selected job title: {{ selectedJobTitle  }}</span></p>-->
    <!-- routes will be rendered here -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      activeUser: null
      // jobTitles: [
      //  { name: 'Product designer', id: 1 },
      //  { name: 'Full-stack developer', id: 2 },
      //  { name: 'Product manager', id: 3 },
      //  { name: 'Senior front-end developer', id: 4 }
      // ],
      // selectedJobTitle: null
    }
  },
  async created () {
    await this.refreshActiveUser()
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    '$route': 'refreshActiveUser'
  },
  methods: {
    async login () {
      this.$auth.signInWithRedirect()
    },
    async refreshActiveUser () {
      if (this.authState.isAuthenticated) {
        this.activeUser = await this.$auth.getUser()
      }
    },
    async logout () {
      await this.$auth.signOut()
      await this.refreshActiveUser()
      this.$router.push('/')
    }
    // changeJobTitle (event) {
    //  this.selectedJobTitle = event.target.options[event.target.options.selectedIndex].text
    // }
  }
}
</script>
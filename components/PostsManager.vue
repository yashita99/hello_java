<template>
  <div class="container-fluid mt-4">
    
    <p>Only authenticated users should see this page</p>
      <div>
        
          <select class="form-control" v-model="search.id">
                <option value="" selected disabled>Choose</option>
                <option v-for="item in list" :value="item.id" :key="item.id">{{ item.id }}</option>
          </select><br>
        <form v-if="s">
          <!--<div class="form-group" >
          <label for="id">Id</label>
          <input type="text" id="id" v-model="search.id"
		            name="id" class="form-control">
          </div>-->
	        <b-btn type="submit" @click="searchUser()" variant="success">Search</b-btn>
        </form>
      </div><br><br><br>
      <div>
       <b-row>
         <b-col>
          <table class="table table-striped table-borderes='1px'" v-if="status">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Document</th>
                <th>Info</th>
                <th>&nbsp; &nbsp; &nbsp; Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in filteredList" v-bind:key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.email}}</td>
                <td>{{item.doc}}</td>
                <td>{{item.info}}</td>
                <td><b-btn v-on:click="userDetails(item.id, item.name, item.email, item.doc, item.info)">Edit</b-btn>
                <b-btn v-on:click="deleteUser(item.id)">Delete</b-btn>
                </td>
            </tr>
            </tbody>


          </table>
         </b-col>

           <b-col lg="3">

            <b-card :title="(post.id ? 'Edit Post ID#' + post.id : 'New User')">
              <form @submit="submitData" method="post">
                <label>Name:</label>
                <input type="text" name="name" placeholder="name" v-model="post.name" /><br><br>
                <label>Email:</label>
                <input type="text" name="email" placeholder="email" v-model="post.email" /><br><br>
                <label>Doc:</label>
                <input type="text" name="doc" placeholder="doc" v-model="post.doc" /><br><br>
                <label>Info:</label>
                <input type="text" name="info" placeholder="info" v-model="post.info" /><br><br>
                <b-btn type="submit" variant="success">Add</b-btn>
              </form>
            </b-card>
           </b-col>
       </b-row>

    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { json } from 'express'
Vue.use(VueAxios, axios)
export default {
  name: 'PostsManager',
  data () {
    return {
      status: false,
      s: true,
      search: {
        id: ''
      },
      list: null,
      filteredList: null,
      post: {
        id: null,
        name: null,
        email: null,
        doc: null,
        info: null
      }
    }
  },
  methods: {
    // updateUser (id) {
    //  this.axios.put('http://localhost:4000/users/' + id).then((result) => {
    //    console.warn(result)
    //    this.getUsers()
    //  })
    // },
    searchUser () {
      this.s = false
      this.axios.get('http://localhost:4000/users/' + this.search.id).then((resp) => {
        console.warn(resp.data)
        console.log('success')
        this.filteredList = resp.data
        this.status = true
        // this.filteredList = resp.data
      })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteUser (id) {
      this.axios.delete('http://localhost:4000/users/' + id).then((result) => {
        console.warn(result)
        this.getUsers()
      })
    },
    userDetails (id, name, email, doc, info) {
      this.$router.push({name: 'Edit', params: { id, name, email, doc, info }})
    },
    submitData (e) {
      this.axios.post('http://localhost:4000/users', this.post).then((result) => {
        console.warn('result', result)
      })
      console.warn(this.post)
      e.preventDefault()
    }
  },
  mounted () {
    axios.get('http://localhost:4000/users').then((resp) => {
      console.warn(resp.data)
      this.list = resp.data
      // this.filteredList = resp.data
    })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
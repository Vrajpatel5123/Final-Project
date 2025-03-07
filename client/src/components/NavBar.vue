<script setup>
import {ref} from 'vue'

const isActive = ref(false)

</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
        <div class="navbar-brand">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" />
      
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
          :class="{'is-active': isActive}" @click="isActive = !isActive">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <RouterLink to="/" class="navbar-item" href="home.html">
                <i class="fa-solid fa-house"></i> Home
            </RouterLink>
      
            <RouterLink to="/" class="navbar-item" href="myactivity.html" >
                <i class="fa-solid fa-person-walking"></i>My Activity
            </RouterLink>

            <RouterLink to="/" class="navbar-item" href="friendsactivity.html">
                <i class="fa-solid fa-users-rectangle"></i>Friends Activity
            </RouterLink>

            <RouterLink to="/" class="navbar-item" href="peoplesearch.html">
                <i class="fa-solid fa-magnifying-glass"></i>People Search
            </RouterLink>
            
            
      
            <div class="navbar-item has-dropdown is-hoverable">
              <RouterLink to="/" class="navbar-link" href="admin.html">
                Admin
              </RouterLink>
      
              <div class="navbar-dropdown">
                <RouterLink to="/" class="navbar-item" href="user.html">
                  User
                </RouterLink>
              </div>
            </div>
          </div>
      
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <RouterLink to="/" class="navbar-item" href="signup.html">
                  Sign up
                </RouterLink>
                <div class="navbar-item has-dropdown is-hoverable">
                    <RouterLink to="/" class="button is-primary" href="login.html">
                        <strong>Log in</strong>
                    </RouterLink>
            
                    <div class="navbar-dropdown">
                      <RouterLink to="/" class="navbar-item" href="user.html">
                        User
                      </RouterLink>
                    </div>
                  </div>
                <RouterLink to="/" class="button is-primary" href="https://x.com/" target="_blank">
                    Tweet X
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
    </div>
      </nav>
      <h1>Home Page example</h1>
</template>

<style lang="scss" scoped>

</style>
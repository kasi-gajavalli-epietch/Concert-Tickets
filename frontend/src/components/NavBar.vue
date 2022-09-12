<template>

    <!-- =================== START NAVBAR ========================== -->
  <section class="hero is-light is-fullheight">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="../">
              <img
                src="../assets/logo_noir.png"
                alt="Logo"
              />
            </a>
            <!-- <span class="navbar-burger burger" data-target="navbarMenu">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </span> -->
          </div>
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-start">
              <span class="navbar-item">
                <router-link to="/">
                  <a class="button is-light is-outlined" href="">
                    <span class="icon">
                      <i class="fa fa-home"></i>
                    </span>
                    <span>Home</span>
                  </a>
                </router-link>
              </span>
              <span class="navbar-item">
                <a class="button is-light is-outlined" href="#concert_list">
                  <span class="icon">
                    <i class="fa fa-music" />
                  </span>
                  <span>Concerts</span>
                </a>
              </span>

              <span class="navbar-item">
                <a class="button is-light is-outlined" href="#group_list">
                  <span class="icon">
                    <i class="fa fa-users"></i>
                  </span>
                  <span>Groups</span>
                </a>
              </span>
              <div v-if="isAdmin">
              <span class="navbar-item">
                <router-link to="/crud">
                <a class="button is-danger is-outlined" href="#">
                  <span class="icon">
                    <i class="fa fa-users"></i>
                  </span>
                  <span>ADMIN</span>
                </a>
              </router-link>
              </span>
            </div>
            <div v-else></div>
            </div>
            
            <div class="navbar-end">
              <div v-if="isloggedin">
                <span class="navbar-item">
                  <router-link to="/about">
                    <a class="button is-primary" href="#">
                      <span class="icon">
                        <i class="fa fa-sign-in"></i>
                      </span>
                      <span>Your Tickets</span>
                    </a>
                  </router-link>
              </span>
              </div>
              <div v-else>
                <span class="navbar-item">
                  <router-link to="/login">
                    <a class="button is-primary" href="#">
                      <span class="icon">
                        <i class="fa fa-sign-in"></i>
                      </span>
                      <span>Signin</span>
                    </a>
                  </router-link>
                </span>
              </div>
              <div v-if="isloggedin">
                <div class="loggedInBtns">
                  <div class="ProfilePage">
                    <span class="navbar-item">
                      <router-link :to="{
                          name: 'profile',
                          params: { id: this.user_id },
                        }">
                          <a class="button is-light is-outlined" href="">
                            <span class="icon">
                              <i class="fa fa-user"></i>
                            </span>
                            <span>Profile</span>
                          </a>
                        </router-link>
                    </span>
                  </div>
                  <div class="logour-btn">
                    <span class="navbar-item">
                      <a v-on:click="logout()" class="button is-danger" href="#">
                        <span class="icon">
                          <i class="fa fa-sign-in"></i>
                        </span>
                        <span>Logout</span>
                      </a>
                    </span>
                  </div>
                </div>
            </div>
            <div v-else>
              <span class="navbar-item">
                <router-link to="/register">
                  <a class="button is-primary" href="#">
                    <span class="icon">
                      <i class="fa fa-user-plus"></i>
                    </span>
                    <span>Signup</span>
                  </a>
                </router-link>
              </span>
            </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <!-- =================== END NAVBAR ========================== -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <h1 class="title">Show Time</h1>
          <h2 class="subtitle">
            <!-- This is the best platform for you to find concerts and events. -->
            Concerts and Events Platform
          </h2>
          <div class="box">
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter what you looking for"
                />
              </p>
              <p class="control">
                <a class="button is-info"> Search </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// script pour burger responsive
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

// fin script burger responsive

export default {
  data() {
    return {
      isloggedin: JSON.parse(localStorage.getItem("auth")),

      isAdmin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" : null,
      user_id: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user._id : null

    };
  },
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/login");
    },
  },
  created(){
  }
};
</script>

<style>

.hero {
  background-image: url("https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.hero.is-light .title {
  color: white;
}

.hero.is-light .subtitle {
  color: white;
}

.box {
  background-color: transparent;
}
.navbar-item img {
    max-height: 30.75rem;
}
img{
  width: 100px;
  height: 100px;
}
.loggedInBtns{
  display:flex;
  justify-content: space-evenly;
}
</style>
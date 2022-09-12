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
            <span class="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
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
                <a class="button is-light is-outlined" href="#">
                  <span class="icon">
                    <i class="fa fa-music" />
                  </span>
                  <span>Concerts</span>
                </a>
              </span>
              <span class="navbar-item">
                <a class="button is-light is-outlined" href="#">
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
                      <!-- <router-link :to="{
                          name: 'profile',
                          params: { id: this.user_id },
                        }">
                          <a class="button is-light is-outlined" href="">
                            <span class="icon">
                              <i class="fa fa-user"></i>
                            </span>
                            <span>Profile</span>
                          </a>
                        </router-link> -->
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
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" class="box">
              <div class="field">
                <label class="label">Firstname</label>
                <div class="control has-icons-left">
                  <input
                    v-model="this.firstname"
                    class="input"
                    type="text"
                    name="firstname"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Lastname</label>
                <div class="control has-icons-left">
                  <input v-model="this.lastname" class="input" type="text" />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input v-model="this.email" class="input" type="text" />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Avatar Url</label>
                <div class="control has-icons-left">
                  <input v-model="this.avatar" class="input" type="text" />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Address</label>
                <div class="control has-icons-left">
                  <input v-model="this.address" class="input" type="text" />
                  <span class="icon is-small is-left">
                    <i class="fa fa-home"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    v-model="this.password"
                    class="input"
                    type="password"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>

              <div class="has-text-centered">
                <button
                  type="submit"
                  v-on:click="this.register()"
                  class="button is-vcentered is-primary is-outlined"
                >
                  Sign Up!
                </button>
              </div>
              <div class="has-text-centered">
                <router-link to="/login"
                  >Already have an account? Log in now !</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  mounted() {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      password: "",
      avatar: ""
      // isloggedin: JSON.parse(localStorage.getItem("auth")) || "",
      // isAdmin: JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" || "",
      // user_id: JSON.parse(localStorage.getItem("auth")).user._id || ""
      
    };
  },

  methods: {
    register() {
      axios.post("http://localhost:3000/auth/register", {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        address: this.address,
        password: this.password,
        avatar_url: this.avatar
      });
      this.$router.push({ path: "/login" });
    },
    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>
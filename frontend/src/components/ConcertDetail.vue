<template>
  <div>
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="../">
              <img src="../assets/logo_noir.png" alt="Logo" />
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
                      <div>
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
                      </div>

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
    <!-- <div v-for="concert in this.concerts" :key="concert._id">
      <div v-if="concert._id == this.$route.params.id"> -->
    <section>
      <div class="tile is-6 is-parent" id="left">
        <img v-bind:src="concert.affiche"/>
      </div>
      <div class="tile is-6 is-parent" id="right">
        <div class="tile is-child pink post">
          <p class="title is-2 name">{{ concert.name }}</p>
          <p class="title is-3 name">{{ concert.description }}</p>
          <p class="subtitle has-text-grey job">
            {{ concert.price }} € / Adulte
          </p>
          <hr class="hr" />
          <div class="content has-text-grey description">
            <p>
              {{ concert.localisation }}
            </p>
            <p>
              In facilisis mi id est gravida congue. Sed sed placerat massa,
              ac iaculis urna. Sed pharetra quam odio, ut lacinia nisi
              pellentesque sit amet. Interdum et malesuada fames ac ante
              ipsum primis in faucibus. Vivamus ultrices nulla et maximus
              ultricies.
            </p>
            <p>
              Ut pellentesque ligula in dapibus interdum. Donec viverra ac
              tellus ac mollis. Curabitur venenatis justo vitae quam
              condimentum, ac ultricies magna sodales.
            </p>
          </div>
          <h3><p>{{ concert.show_date }} à 20h00</p></h3>
          <p>{{ concert.price }} € la place</p>
          <div class="field">
            <router-link :to="{ name: 'bookticket', params: { id: this.$route.params.id } }">
              <button class="btn btn-success">Buy Tickets</button>
            </router-link>

          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- </div>
  </div> -->
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      concert: {},
      isAdmin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" : null,
      user_id: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user._id : null,
      isloggedin: JSON.parse(localStorage.getItem("auth")),
    };
  },
  mounted() {
    this.getConcertById();
  },
  methods: {
    getConcertById() {
      axios
        .get("http://localhost:3000/concert/" + this.$route.params.id)
        .then((response) => {
          this.concert = response.data.existingConcert;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.navbar {
  background-image: url("https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
}
#left img {
  height: 200px;
  width: 200px;
  margin-left: 250px;
}
</style>
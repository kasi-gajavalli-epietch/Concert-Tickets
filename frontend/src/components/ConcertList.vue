<template>
  <section class="section">
    <div class="container has-text-centered" id="concert_list">
      <!-- <h2 class="title">Tour Dates</h2> -->

      <!-- AFFICHAGE DYNAMIQUE -->


      <div v-for="concert in this.concerts" v-bind:key="concert._id" class="tile is-parent" id="concerts">
        <div class="tile is-vertical">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image">
                  <img v-bind:src="concert.affiche" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <h1><strong>{{ concert.name }}</strong><br></h1>
                  <p>{{ concert.localisation }}</p>
                  <br />
                  {{ concert.description }}
                  <br>
                  <h3>{{ concert.show_date }}</h3>
                  </p>
                </div>
                <nav class="">
                  <div class="">
                    <router-link :to="{
                      name: 'concertdetail',
                      params: { id: concert._id },
                    }"><a class="button" onClick="">Buy Tickets</a></router-link>
                  </div>
                </nav>
              </div>
            </article>
          </div>
          <!-- <article class="tile is-child box">
            <figure class="image">
              <img v-bind:src="concert.affiche" />
              
            </figure>
            <p class="title">{{ concert.name }}</p>
            <p class="subtitle">{{ concert.localisation }}</p>
            <router-link
              :to="{ name: 'concertdetail', params: { id: concert._id } }"
              ><a class="button" onClick="">Buy Tickets</a></router-link
            >
          </article> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "ConcertList",

  data() {
    return {
      concerts: {},
      isAdmin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" : null,
      user_id: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user._id : null,
      isloggedin: JSON.parse(localStorage.getItem("auth")),
    };
  },

  methods: {
    async getConcert() {
      await axios
        .get("http://localhost:3000/concert")
        .then((response) => {
          this.concerts = response.data.concertData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getConcert();
  },
};
</script>

<style scoped>
.media-left img {
  height: 35vh;
  width: 20vw;
}
</style>


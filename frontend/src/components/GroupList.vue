<template>
  <section class="section">
    <div class="container has-text-centered" id="group_list">
      <h2 class="title">The Bands</h2>
      <p>
        We have created a fictional band website. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <div class="columns is-centered" style="padding: 2rem">
        <div v-for="concert in this.concerts" :key="concert._id" class="column">
          <div class="card">
            <div class="card-image">
              <figure class="image is-2by1">
                <img
                  :src="concert.group_url_img"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ concert.group }}</p>
                  <p class="subtitle is-6">@{{ concert.group }}</p>
                </div>
              </div>

              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                <a>@bulmaio</a>.
                <a href="#">#css.</a>
                <a href="#">#responsive.</a>
              </div>
            </div>
          </div>
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
    };
  },

  methods: {
    async getConcert() {
      await axios
        .get("http://localhost:3000/concert")
        .then((response) => {
          // console.log(response.data.concertData);
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

<style>
</style>
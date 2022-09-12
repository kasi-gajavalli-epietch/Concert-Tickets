<template>
  <section>
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" class="box">
                <label for="" class="label">Crée Un concert</label>

                <div class="field">
                  <label for="" class="label">Name</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="name"
                      type="text"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-info"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Price</label>
                  <div class="control has-icons-left">
                    <input v-model="price" type="text" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-euro"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Localisation</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="localisation"
                      type="text"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-map-marker"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Date</label>
                  <input type="date" v-model="date">
                </div>

                <div class="field">
                  <label for="" class="label">Affiche Url</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="affiche"
                      type="text"
                      id="textarea-field"
                      cols="45"
                      rows="4"
                    />
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Groupe</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="group"
                      type="text"
                      id="textarea-field"
                      cols="45"
                      rows="4"
                    />
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Groupe Affiche Url</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="group_url_img"
                      type="text"
                      id="textarea-field"
                      cols="45"
                      rows="4"
                    />
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Description</label>
                  <div class="control has-icons-left">
                    <textarea
                      v-model="description"
                      type="text"
                      id="textarea-field"
                      cols="45"
                      rows="4"
                    ></textarea>
                    <span class="icon is-small is-left">
                      <i class="fa fa-info"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <button
                    type="submit"
                    v-on:click="this.createConcert()"
                    class="button is-success"
                  >
                    Crée
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      price: "",
      localisation: "",
      description: "",
      affiche: "",
      group: "",
      group_url_img: "",
      token: JSON.parse(localStorage.getItem("auth")).token
        ? JSON.parse(localStorage.getItem("auth")).token
        : null,
      date: "",
      isAdmin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" : null,
      user_id: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user._id : null,
      isloggedin: JSON.parse(localStorage.getItem("auth")),
    };
  },
  methods: {
    createConcert() {
      var data = JSON.stringify({
        name: this.name,
        description: this.description,
        localisation: this.localisation,
        price: this.price,
        affiche: this.affiche,
        group: this.group,
        group_url_img: this.group_url_img,
        show_date: this.date
      });
      var config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      };
      axios
        .post("http://localhost:3000/concert", data, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push({ path: "/crud" });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.column.is-5-tablet.is-4-desktop.is-3-widescreen {
  width: 45%;
}

.box {
  background-color: #000000f0;
}

.label {
  color: #e5e5e5;
}
</style>
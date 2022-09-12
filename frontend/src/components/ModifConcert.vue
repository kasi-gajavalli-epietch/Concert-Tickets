<template>
  <section>
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form @submit.prevent="updateConcert(id)" action="" class="box">
                <label for="" class="label">Modifier Un concert</label>

                <div class="field">
                  <label for="" class="label">Name</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="this.name"
                      type="text"
                      name="name"
                      :placeholder="concert.name"
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
                    <input
                      v-model="this.price"
                      type="text"
                      class="input"
                      :placeholder="concert.price"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-euro"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Localisation</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="this.localisation"
                      type="text"
                      :placeholder="concert.localisation"
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

                <!-- A MODIFIER VMODEL -->
                <div class="field">
                  <label for="" class="label">Affiche Url</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="affiche"
                      type="text"
                      id="textarea-field"
                      cols="45"
                      rows="4"
                      :placeholder="concert.affiche"
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
                      :placeholder="concert.group"
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
                      :placeholder="concert.group_url_img"
                    />
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Description</label>
                  <div class="control has-icons-left">
                    <textarea
                      v-model="this.description"
                      type="text"
                      id="textarea-field"
                      cols="45"
                      rows="4"
                      :placeholder="concert.description"
                    ></textarea>
                    <span class="icon is-small is-left">
                      <i class="fa fa-info"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <button type="submit" class="button is-success">
                    Update
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
      concert: {},
      name: "",
      price: "",
      localisation: "",
      description: "",
      affiche: "",
      token: JSON.parse(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth")).token
        : null,
        date: ""
    };
  },
  methods: {
    updateConcert() {
      var data = JSON.stringify({
        name: this.name,
        price: this.price,
        localisation: this.localisation,
        description: this.description,
        affiche: this.affiche,
        show_date: this.date
      });
      var config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      };
      axios
        .put(
          "http://localhost:3000/concert/" + this.$route.params.id,
          data,
          config
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push({ path: "/crud" });
    },
    async getConcertById() {
      await axios
        .get("http://localhost:3000/concert/" + this.$route.params.id)
        .then((response) => {
          console.log(response.data.existingConcert);
          this.concert = response.data.existingConcert;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getConcertById();
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
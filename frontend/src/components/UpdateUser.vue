<template>
  <section>
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form @submit.prevent="updateUser(id)" action="" class="box">
                <label for="" class="label">Modifier Un Utilisateur</label>

                <div class="field">
                  <label for="" class="label">Firstname</label>
                  <div class="control has-icons-left">
                    <input v-model="this.firstname" type="text" :placeholder="user.firstname" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-info"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Lastname</label>
                  <div class="control has-icons-left">
                    <input v-model="this.lastname" type="text" :placeholder="user.lastname" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-info"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Email</label>
                  <div class="control has-icons-left">
                    <input v-model="this.email" :placeholder="user.email" type="text" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Address</label>
                  <div class="control has-icons-left">
                    <input v-model="this.address" type="text" :placeholder="user.address" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-map-marker"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Password</label>
                  <div class="control has-icons-left">
                    <input v-model="this.password" type="text" :placeholder="user.password" class="input" required />
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Roles</label>
                  <div class="control has-icons-left">
                    <input v-model="this.roles" type="text" :placeholder="user.roles" class="input" />
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
      user: {},
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      password: "",
      roles: "",
      token: JSON.parse(localStorage.getItem("auth")).token
        ? JSON.parse(localStorage.getItem("auth")).token
        : null,
    };
  },
  methods: {
    updateUser() {
      var data = JSON.stringify({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        address: this.address,
        password: this.password,
        roles: this.roles,
      });

      axios
        .put(
          "http://localhost:3000/users/" + this.$route.params.id,
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
    
    async getUserById() {
      var config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      };
      await axios
        .get("http://localhost:3000/users/" + this.$route.params.id, config)
        .then((response) => {
          this.user = response.data.existingUsers;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getUserById();
    console.log(this.$route.params.id);
  },
};
</script>

<style>
</style>
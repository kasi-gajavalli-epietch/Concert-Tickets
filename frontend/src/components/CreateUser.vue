<template>
  <section>
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" class="box">
                <label for="" class="label">Crée Un Utilisateur</label>

                <div class="field">
                  <label for="" class="label">Firstname</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="firstname"
                      type="text"
                      placeholder="firstname"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-info"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Lastname</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="lastname"
                      type="text"
                      placeholder="lastname"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-info"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Email</label>
                  <div class="control has-icons-left">
                    <input v-model="email" type="text" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Address</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="address"
                      type="text"
                      placeholder="address"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-map-marker"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Avatar Url</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="avatar_url"
                      type="text"
                      placeholder="avatar url"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-map-marker"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Password</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="password"
                      type="text"
                      placeholder="password"
                      class="input"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Roles</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="roles"
                      type="text"
                      placeholder="roles"
                      class="input"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-info"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <button
                    type="submit"
                    v-on:click="this.createUser()"
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
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      password: "",
      roles: "",
      avatar_url: "",
      token: JSON.parse(localStorage.getItem("auth")).token
        ? JSON.parse(localStorage.getItem("auth")).token
        : null,
      isAdmin: JSON.parse(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin"
        : null,
      user_id: JSON.parse(localStorage.getItem("auth"))
        ? JSON.parse(localStorage.getItem("auth")).user._id
        : null,
      isloggedin: JSON.parse(localStorage.getItem("auth")),
      avatar_url: "",
    };
  },
  methods: {
    createUser() {
      var data = JSON.stringify({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        address: this.address,
        password: this.password,
        roles: this.roles,
        avatar_url: this.avatar_url,
      });
      var config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      };
      axios
        .post("http://localhost:3000/users", data, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push({ path: "/crud" });
    },
  },
  mounted() {},
};
</script>

<style></style>

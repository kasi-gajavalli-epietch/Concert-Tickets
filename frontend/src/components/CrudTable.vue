<template>
  <section>
    <div v-if="isAdmin">
      <div class="st_wrap_table" data-table_id="0">
        <header class="st_table_header">
          <h2>Table Concert</h2>
          <router-link to="/createconcert"><button class="btn btn-success">Create Concert<i
                class="fa fa-plus"></i></button></router-link>
          <div class="st_row">
            <div class="st_column _id">ID <i class="fa fa-spin fa-gear"></i></div>
            <div class="st_column _section">Name <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _section">Groupe <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _section">Affiche <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _section">Description <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _section">Date <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _section">Localisation <i class="fa-sharp fa-solid fa-house"></i></div>
            <div class="st_column _section">Price <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _action">Action <i class="fa fa-spin fa-lock"></i></div>
          </div>
        </header>

        <div class="st_table">
          <div class="st_row" v-for="concert in this.concerts" v-bind:key="concert._id">
            <div class="st_column _id">
              {{ concert._id.substring(0, 5) + "..." }}
            </div>
            <div class="st_column _section">{{ concert.name }}</div>
            <div class="st_column _section">{{ concert.group }}</div>
            <div class="st_column _section">{{ concert.affiche.substring(0, 20) + ".." }}</div>
            <div class="st_column _section">{{ concert.description.substring(0, 20) + ".." }}</div>
            <div class="st_column _section">{{ concert.show_date }}</div>
            <div class="st_column _section">{{ concert.localisation }}</div>
            <div class="st_column _section">{{ concert.price }}€</div>
            <div class="st_column _action">
              <router-link :to="{ name: 'modifconcert', params: { id: concert._id } }"><button
                  class="btn btn-primary">Update</button></router-link>
              <button class="btn btn-danger" @click="deleteConcert(concert._id)">Delete</button>
            </div>


          </div>
        </div>
      </div>
      <div class="st_wrap_table" data-table_id="1">
        <header class="st_table_header">
          <h2>Table User</h2>
          <router-link to="/createuser"><button class="btn btn-success">Create User<i
                class="fa fa-user-plus"></i></button></router-link>
          <div class="st_row">
            <div class="st_column _id">ID <i class="fa fa-spin fa-gear"></i></div>
            <div class="st_column _section">Firstname <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _section">Lastname <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _section">Email <i class="fa fa-spin fa-envelope"></i></div>
            <div class="st_column _section">Roles <i class="fa fa-spin fa-info"></i></div>
            <div class="st_column _section">Password <i class="fa fa-spin fa-lock"></i></div>
            <!-- <div class="st_column _action">Address</div> -->
            <div class="st_column _action">Action</div>
          </div>
        </header>
        <div class="st_table">
          <div class="st_row" v-for="user in this.users" v-bind:key="user._id">
            <div class="st_column _id">
              {{ user._id.substring(0, 5) + "..." }}
            </div>
            <div class="st_column _section">{{ user.firstname }}</div>
            <div class="st_column _section">{{ user.lastname }}</div>
            <div class="st_column _section">{{ user.email }}</div>
            <div class="st_column _section">{{ user.roles }}</div>
            <div class="st_column _section">
              {{ user.password.substring(0, 5) + "..." }}
            </div>
            <!-- <div class="st_column _section">{{ user.address }}</div> -->
            <div class="st_column _action">
              <router-link :to="{ name: 'updateuser', params: { id: user._id } }"><button
                  class="btn btn-primary">Update</button></router-link>
              <button class="btn btn-danger" @click="deleteUser(user._id)">Delete</button>
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
  name: "ConcertCrud",
  data() {
    return {
      concerts: {},
      users: {},
      token: JSON.parse(localStorage.getItem("auth")).token
        ? JSON.parse(localStorage.getItem("auth")).token
        : null,
      isAdmin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" : null
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
    async getUser() {
      await axios
        .get("http://localhost:3000/users", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.users = response.data.usersData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteConcert(id) {
      axios
        .delete("http://localhost:3000/concert/" + id, {
          headers: {
            Authorization: "Bearer " + this.token
          },
        })
        .then((response) => {
          console.log(response);
          this.getConcert();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser(id) {
      axios
        .delete("http://localhost:3000/users/" + id, {
          headers: {

            Authorization: "Bearer " + this.token
          },
        })
        .then((response) => {
          console.log(response);
          this.getUser();
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
  mounted() {
    this.getConcert();
    this.getUser();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgb(63, 72, 83);
  font-family: sans-serif;
  color: rgb(220, 220, 220);
  padding: 50px;
  width: 100vw;
  overflow-x: hidden;
}

h1 {
  font-weight: 400;
}

a {
  color: inherit;
}

p {
  margin-top: 0.7em;
}

[data-table_id="0"] {
  background-color: rgb(150, 150, 150);
  color: black;
}

[data-table_id="1"] {
  background-color: rgb(150, 150, 150);
  color: black;
}

._id {
  width: 80px;
}


._section {
  width: 220px;
}

._action {
  width: 220px;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  right: 20px;
}

pre {
  overflow: auto;
}

.st_table_header {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: rgb(25, 25, 25);
  color: rgb(250, 250, 250);
}

.st_table_header h2 {
  font-weight: 400;
  margin: 0 20px;
  padding: 20px 0 0;
}

.st_table_header .st_row {
  color: rgb(250, 250, 250);
}

.st_table {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.st_row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin: 0;
}

.st_table .st_row:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.1);
}

.st_column {
  padding: 5px 10px;
}

.btn.btn-success {
  padding: 5px;
}

.btn-primary {
  padding-left: 2px;
  padding-right: 2px;
}

.btn-danger {
  padding-left: 2px;
  padding-right: 2px;
}
</style>
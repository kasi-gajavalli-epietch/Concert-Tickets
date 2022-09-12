<template>

  <body class="bg-default">
    <div class="main-content">
      <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
        <div class="container-fluid">
          <router-link to="/">
            <a class="button is-light" href="">
              <span class="icon">
                <i class="fa fa-home"></i>
              </span>
              <span>Home</span>
            </a>
          </router-link>
          <div class="header-body">
            <div class="row">
              <div class="col-xl-3 col-lg-6">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          N° Concerts
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                            this.concerts.length
                        }}</span>
                      </div>
                      <div class="col-auto">
                        <div class="
                            icon icon-shape
                            bg-danger
                            text-white
                            rounded-circle
                            shadow
                          ">
                          <i class="fas fa-chart-bar"></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-success mr-2"><i class="fa"></i></span>
                      <span class="text-nowrap"></span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-6" v-if="isAdmin">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Reservations Tickets
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{ this.bookings.length }}</span>
                        <p></p>
                      </div>
                      <div class="col-auto">
                        <div class="
                            icon icon-shape
                            bg-warning
                            text-white
                            rounded-circle
                            shadow
                          ">
                          <i class="fas fa-chart-pie"></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-danger mr-2"><i class="fas"></i> </span>
                      <span class="text-nowrap"></span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-6">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Number of Users
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                            this.users.length
                        }}</span>
                      </div>
                      <div class="col-auto">
                        <div class="
                            icon icon-shape
                            bg-yellow
                            text-white
                            rounded-circle
                            shadow
                          ">
                          <i class="fas fa-users"></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-warning mr-2"><i class="fas"></i></span>
                      <span class="text-nowrap"></span>
                    </p>
                  </div>
                </div>
              </div>
              <!-- <div class="col-xl-3 col-lg-6">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Performance
                        </h5>
                        <span class="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <div class="col-auto">
                        <div
                          class="
                            icon icon-shape
                            bg-info
                            text-white
                            rounded-circle
                            shadow
                          "
                        >
                          <i class="fas fa-percent"></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-success mr-2"
                        ><i class="fas fa-arrow-up"></i> 12%</span
                      >
                      <span class="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- Page content -->
    </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  name: "ConcertCrud",
  data() {
    return {
      concerts: {},
      users: {},
      bookings: {},
      token: JSON.parse(localStorage.getItem("auth")).token
        ? JSON.parse(localStorage.getItem("auth")).token
        : null,
      isAdmin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" : null,
      totalResa: ""
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
            Authorization: "Bearer " + this.token,
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
            Authorization: "Bearer " + this.token,
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
    getBookings() {
      axios
        .get("http://localhost:3000/booking/", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data.bookingData);
          this.bookings = response.data.bookingData
          console.log(this.bookings);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getConcert();
    this.getUser();
    this.getBookings();
  },
};
</script>

<style>
</style>
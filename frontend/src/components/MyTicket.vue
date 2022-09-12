<template>
  <qrcode-vue :value="'http://localhost:8080/profile/' + this.user_id" :size="size" level="H" />
  <div>
    <div class="container">
      <h1 class="upcoming">upcoming gigs</h1>
      <div class="item" v-for="ticket in this.tickets" v-bind:key="ticket._id">
        <div class="item-right">
          <h2 class="num">{{ new Date(ticket.concert_show_date).getDay() }}</h2>
          <p class="day">{{ new Date(ticket.concert_show_date).toLocaleString('default', {
              month: 'long'
            }).toUpperCase().substring(0, 4)
          }}</p>
          <p class="hour">{{ new Date(ticket.concert_show_date).toLocaleString('default', {
              hours: 'long'
            }).toUpperCase().substring(10, 20)
          }}</p>
          <span class="up-border"></span>
          <span class="down-border"></span>
        </div> <!-- end item-right -->

        <div class="item-left">
          <p class="event">Music Event</p>
          <h2 class="title">{{ ticket.concert_title }}</h2>

          <div class="sce">
            <div class="icon">
              <i class="fa fa-table"></i>
            </div>
            <!-- <p>Monday 15th 2016 <br /> 15:20Pm & 11:00Am</p> -->
            <p>Acheté le :</p>
            <strong>{{ ticket.createdAt.substring(0, 10) }}</strong>
          </div>
          <div class="fix"></div>
          <div class="loc">
            <div class="icon">
              <i class="fa fa-map-marker"></i>
            </div>
            <p>{{ ticket.concert_localisation }}<br /></p>
            <h3>{{ ticket.total_price }} €</h3>
          </div>
          <div>
            <p>{{ ticket.adults }} Adultes {{ ticket.children }} Enfants</p>
            <strong>
              <p>{{ ticket.reservation_name }}</p>
            </strong>
          </div>
          <div class="fix"></div>
          <button class="tickets">Tickets</button>
        </div> <!-- end item-right -->
      </div> <!-- end item -->
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import axios from "axios";
export default {
  name: "MyTicket",
  data() {
    return {
      tickets: {},
      concerts: {},
      user_id: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user._id : null,
      value: 'http://localhost:3000/profile/',
      size: 300,
    };
  },
  methods: {
    getTicket() {
      var config = {
        method: "get",
        url: "http://localhost:3000/booking",
        headers: {},
      };
      axios(config)
        .then((response) => {
          this.tickets = response.data.bookingData;
          const results = this.tickets.filter(obj => {
            return obj.user_id === this.user_id
          })
          this.tickets = results
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    QrcodeVue,
  },
  mounted() {
    this.getTicket();
    console.log(this.user_id);
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inknut Antiqua', serif;
  font-family: 'Ravi Prakash', cursive;
  font-family: 'Lora', serif;
  font-family: 'Indie Flower', cursive;
  font-family: 'Cabin', sans-serif;
}

div.container {
  max-width: 1350px;
  margin: 0 auto;
  overflow: hidden
}

.upcoming {
  font-size: 45px;
  text-transform: uppercase;
  border-left: 14px solid rgba(255, 235, 59, 0.78);
  padding-left: 12px;
  margin: 18px 8px;
}

.container .item {
  width: 48%;
  float: left;
  padding: 0 20px;
  background: #DDD;
  overflow: hidden;
  margin: 10px
}

.container .item-right,
.container .item-left {
  float: left;
  padding: 20px
}

.container .item-right {
  padding: 79px 50px;
  margin-right: 20px;
  width: 25%;
  position: relative;
  height: 286px
}

.container .item-right .up-border,
.container .item-right .down-border {
  padding: 14px 15px;
  background-color: #ddd;
  border-radius: 50%;
  position: absolute
}

.container .item-right .up-border {
  top: -8px;
  right: -35px;
}

.container .item-right .down-border {
  bottom: -13px;
  right: -35px;
}

.container .item-right .num {
  font-size: 60px;
  text-align: center;
  color: #111
}

.container .item-right .day,
.container .item-left .event {
  color: #555;
  font-size: 20px;
  margin-bottom: 9px;
}

.container .item-right .day {
  text-align: center;
  font-size: 25px;
}

.container .item-left {
  width: 71%;
  padding: 34px 0px 19px 46px;
  border-left: 3px dotted #999;
}

.container .item-left .title {
  color: #111;
  font-size: 34px;
  margin-bottom: 12px
}

.container .item-left .sce {
  margin-top: 5px;
  display: block
}

.container .item-left .sce .icon,
.container .item-left .sce p,
.container .item-left .loc .icon,
.container .item-left .loc p {
  float: left;
  word-spacing: 5px;
  letter-spacing: 1px;
  color: #888;
  margin-bottom: 10px;
}

.container .item-left .sce .icon,
.container .item-left .loc .icon {
  margin-right: 10px;
  font-size: 20px;
  color: #666
}

.container .item-left .loc {
  display: block
}

.fix {
  clear: both
}

.container .item .tickets,
.booked,
.cancel {
  color: #fff;
  padding: 6px 14px;
  float: right;
  margin-top: 10px;
  font-size: 18px;
  border: none;
  cursor: pointer
}

.container .item .tickets {
  background: #777
}

.container .item .booked {
  background: #3D71E9
}

.container .item .cancel {
  background: #DF5454
}

.linethrough {
  text-decoration: line-through
}

@media only screen and (max-width: 1150px) {
  .container .item {
    width: 100%;
    margin-right: 20px
  }

  div.container {
    margin: 0 20px auto
  }
}
</style>
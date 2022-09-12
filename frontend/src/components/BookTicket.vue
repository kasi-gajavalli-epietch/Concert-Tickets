
<template>

	<body>
		<div id="booking" class="section">
			<div class="section-center">
				<div class="container">
					<div class="row">
						<div class="col-md-7 col-md-push-5">
							<div class="booking-cta">
								<h4>Make your reservation</h4>
							</div>
						</div>
						<div class="col-md-4 col-md-pull-7">
							<div class="booking-form">
								<form>
									<div class="form-group">
										<span class="form-label">Your Name</span>
										<input class="form-control" type="text" placeholder="Enter Your Name"
											v-model="reservation_name">
									</div>
									<div class="form-group">
										<span class="form-label">{{ concert.name }}</span>
										<p>{{ concert.localisation }}</p>
									</div>
									<div class="row">
										<div class="col-sm-6">
											<div class="form-group">
												<span class="form-label">Show Date</span>
												<p>{{ concert.show_date }}</p>
											</div>
										</div>

										<div class="col-sm-6">
											<div class="form-group">
												<span class="form-label">Price /person</span>
												<p>{{ concert.price }}</p>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-6">
											<div class="form-group">
												<div class="form-group">
													<span class="form-label">Adults</span>
													<input class="form-control" type="number" placeholder="No of Adults"
														v-model="adults">
												</div>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="form-group">
												<span class="form-label">Children</span>
												<input class="form-control" type="number" placeholder="No of Children"
													v-model="children">
											</div>
										</div>
										<div class="col-sm-12">
											<div class="form-group">
												<span class="form-label">Total Price</span>
												<input class="form-control" type="integer" :placeholder="total"
													v-model="total_price">
											</div>
										</div>
									</div>
									<div class="form-btn">
										<button @click="createBooking()" class="submit-btn">Payment</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			booking: {},
			concert: {},
			isAdmin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" : null,
			user_id: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user._id : null,
			isloggedin: JSON.parse(localStorage.getItem("auth")),
			users: {},
			token: JSON.parse(localStorage.getItem("auth")).token
				? JSON.parse(localStorage.getItem("auth")).token
				: null,
			adults: 0,
			children: 0,
			price: 0,
			total_price: 0
		};
	},
	computed: {
		total: function () {
			var total = (parseInt(this.adults, 10) + parseInt(this.children, 10)) * this.concert.price;
			this.total_price = total
			return total;
		}
	},
	mounted() {
		this.getConcertById();
	},
	methods: {
		async getConcertById() {
			await axios
				.get("http://localhost:3000/concert/" + this.$route.params.id)
				.then((response) => {
					this.concert = response.data.existingConcert;
				})
				.catch((error) => {
					console.log(error);
				});
		},

		createBooking() {
			var data = JSON.stringify({
				user_id: this.user_id,
				concert_id: this.$route.params.id,
				reservation_name: this.reservation_name,
				adults: this.adults,
				children: this.children,
				total_price: this.total_price,
				concert_title: this.concert.name,
				concert_localisation: this.concert.localisation,
				concert_show_date: this.concert.show_date
			});
			var config = {
				headers: {
					Authorization: `Bearer ${this.token}`,
					"Content-Type": "application/json",
				},
			};
			axios
				.post("http://localhost:3000/booking", data, config)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
			this.$router.push({ path: "/about" });
		},
	},
	mounted() {
		this.getConcertById();
	},
};
</script>
<style scoped>
.section {
	position: relative;
	height: 100vh;
}

.section .section-center {
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}

#booking {
	font-family: 'Montserrat', sans-serif;
	background: url(https://images.lindependant.fr/api/v1/images/view/62eaa49df54c3c72b021c5c6/large/image.jpg?v=1);
	background-size: cover;
	background-position: center;
}

#booking::before {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: rgba(47, 103, 177, 0.4);
}

.booking-form {
	background-color: #fff;
	padding: 50px 20px;
	-webkit-box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.3);
	box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.3);
	border-radius: 4px;
}

.booking-form .form-group {
	position: relative;
	margin-bottom: 30px;
}

.booking-form .form-control {
	background-color: #ebecee;
	border-radius: 4px;
	border: none;
	height: 40px;
	-webkit-box-shadow: none;
	box-shadow: none;
	color: #3e485c;
	font-size: 14px;
}

.booking-form .form-control::-webkit-input-placeholder {
	color: rgba(62, 72, 92, 0.3);
}

.booking-form .form-control:-ms-input-placeholder {
	color: rgba(62, 72, 92, 0.3);
}

.booking-form .form-control::placeholder {
	color: rgba(62, 72, 92, 0.3);
}

.booking-form input[type="date"].form-control:invalid {
	color: rgba(62, 72, 92, 0.3);
}

.booking-form select.form-control {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}

.booking-form select.form-control+.select-arrow {
	position: absolute;
	right: 0px;
	bottom: 4px;
	width: 32px;
	line-height: 32px;
	height: 32px;
	text-align: center;
	pointer-events: none;
	color: rgba(62, 72, 92, 0.3);
	font-size: 14px;
}

.booking-form select.form-control+.select-arrow:after {
	content: '\279C';
	display: block;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.booking-form .form-label {
	display: inline-block;
	color: #3e485c;
	font-weight: 700;
	margin-bottom: 6px;
	margin-left: 7px;
}

.booking-form .submit-btn {
	display: inline-block;
	color: #fff;
	background-color: #1e62d8;
	font-weight: 700;
	padding: 14px 30px;
	border-radius: 4px;
	border: none;
	-webkit-transition: 0.2s all;
	transition: 0.2s all;
}

.booking-form .submit-btn:hover,
.booking-form .submit-btn:focus {
	opacity: 0.9;
}

.booking-cta {
	margin-top: 80px;
	margin-bottom: 30px;
}

.booking-cta h4 {
	font-size: 22px;
	text-transform: uppercase;
	color: #fff;
	font-weight: 700;
}

.booking-cta p {
	font-size: 16px;
	color: rgba(255, 255, 255, 0.8);
}
</style>
<template>
    <div>
        <h1>Profile Page</h1>
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="../">
                            <img src="../assets/logo_noir.png" alt="Logo" />
                        </a>
                        <span class="navbar-burger burger" data-target="navbarMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="navbarMenu" class="navbar-menu">
                        <div class="navbar-start">
                            <span class="navbar-item">
                                <router-link to="/">
                                    <a class="button is-dark is-outlined" href="">
                                        <span class="icon">
                                            <i class="fa fa-home"></i>
                                        </span>
                                        <span>Home</span>
                                    </a>
                                </router-link>
                            </span>
                            <span class="navbar-item">
                                <a class="button is-dark is-outlined" href="http://localhost:8080/#concert_list">
                                    <span class="icon">
                                        <i class="fa fa-music" />
                                    </span>
                                    <span>Concerts</span>
                                </a>
                            </span>
                            <span class="navbar-item">
                                <a class="button is-dark is-outlined" href="http://localhost:8080/#group_list">
                                    <span class="icon">
                                        <i class="fa fa-users"></i>
                                    </span>
                                    <span>Groups</span>
                                </a>
                            </span>
                        </div>
                        <div class="navbar-end">
                            <div v-if="isloggedin">
                                <span class="navbar-item">
                                    <router-link to="/about">
                                        <a class="button is-primary" href="#">
                                            <span class="icon">
                                                <i class="fa fa-sign-in"></i>
                                            </span>
                                            <span>Your Tickets</span>
                                        </a>
                                    </router-link>
                                </span>
                            </div>
                            <div v-else>
                                <span class="navbar-item">
                                    <router-link to="/login">
                                        <a class="button is-primary" href="#">
                                            <span class="icon">
                                                <i class="fa fa-sign-in"></i>
                                            </span>
                                            <span>Signin</span>
                                        </a>
                                    </router-link>
                                </span>
                            </div>
                            <div v-if="isloggedin">
                                <div class="loggedInBtns">
                                    <div class="ProfilePage">
                                        <span class="navbar-item">
                                            <router-link :to="{
                                                name: 'profile',
                                                params: { id: this.user_id },
                                            }">
                                                <a class="button is-dark is-outlined" href="">
                                                    <span class="icon">
                                                        <i class="fa fa-user"></i>
                                                    </span>
                                                    <span>Profile</span>
                                                </a>
                                            </router-link>
                                        </span>
                                    </div>
                                    <div class="logour-btn">
                                        <span class="navbar-item">
                                            <a v-on:click="logout()" class="button is-danger" href="#">
                                                <span class="icon">
                                                    <i class="fa fa-sign-in"></i>
                                                </span>
                                                <span>Logout</span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <span class="navbar-item">
                                    <router-link to="/register">
                                        <a class="button is-primary" href="#">
                                            <span class="icon">
                                                <i class="fa fa-user-plus"></i>
                                            </span>
                                            <span>Signup</span>
                                        </a>
                                    </router-link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <!-- <div class="profilePage">

            <div class="user-form"> -->
                <div class="profile-image">
                    <img :src="this.avatar" alt="#">
                    <!-- <input type="file" accept="image/*" v-on:change="uploadImage($event)" id="file-input"> -->
                </div>
                <!-- <div style="display:block; text-align:center;margin-left:35%; margin-top: 3rem;">
                    <div class="col-6 mb-2" style="padding:0.5rem;">
                        <div class="form-group" style="display:flex; justify-content: space-evenly; gap:2rem;">
                            <label>First Name</label>
                            <input type="text" class="form-control" v-model="this.firstname"
                                @input="listeners('newFirstName')" />
                        </div>
                    </div>
                    <div class="col-6 mb-2" style="padding:0.5rem;">
                        <div class="form-group" style="display:flex; justify-content: space-evenly; gap:2rem;">
                            <label>Last Name</label>
                            <input type="text" class="form-control" v-model="this.lastname"
                                @input="listeners('newLastName')" />
                        </div>
                    </div>
                    <div class="col-6 mb-2" style="padding:0.5rem;">
                        <div class="form-group" style="display:flex; justify-content: space-evenly; gap:2rem;">
                            <label>Address</label>
                            <input type="text" class="form-control" v-model="this.lastname"
                                @input="listeners('newAddress')" />
                        </div>
                    </div>
                    <div class="col-6 mb-2" style="padding:0.5rem;">
                        <div class="form-group" style="display:flex; justify-content: space-evenly; gap:2rem;">
                            <label>Email</label>
                            <input type="text" class="form-control" v-model="this.email"
                                @input="listeners('newEmail')" />
                        </div>
                    </div>
                </div> -->

            </div>
        <!-- </div>
    </div> -->
    <!-- <qrcode-vue :value="value" :size="size" level="H" /> -->
    <MyTicketVue />
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import MyTicketVue from './MyTicket.vue';

export default {
    data() {
        return {
            isloggedin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")) : null,
            isAdmin: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.roles == "Admin" : null,
            user_id: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user._id : null,
            avatar: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.avatar_url : "https://www.blexar.com/avatar.png",
            firstname: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.firstname : null,
            lastname: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.lastname : null,
            address: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.address : null,
            email: JSON.parse(localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth")).user.email : null,
            value: 'https://example.com',
            size: 300,
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("auth");
            this.$router.push("/login");
        },
        listeners(change) {
            if (change == 'newFirstName')
                var data = JSON.stringify({
                    firstname: this.firstname,
                });
            var config = {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
            };
            axios.put("http://localhost:3000/users/" + this.$route.params.id + "?force=true",
                data,
                config).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
        }
    },
    components: {
        QrcodeVue,
        MyTicketVue
    },
};
</script>

<style scoped>
.profile-image {
    margin-left: 40%;
}

.profile-image img {
    position: relative;
    margin: 2rem;
    display: block;
    border-radius: 50%;
    width: 15rem;
    height: 15rem;
    border: 5px solid lightblue;
}

p {
    text-transform: capitalize;
}

.user-form {
    height: 80rem;
    width: 60rem;
    background: lightcyan;
    margin-left: 25%;
    align-items: center;
}

input {
    border: none;
    border-bottom: 1px solid gray;
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    outline: none;
}

.profile-image input {
    border: none;
    margin-bottom: 10px;
    padding-right: 35%;
    outline: none;
}

label {
    border: none;
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    outline: none;

}
</style>
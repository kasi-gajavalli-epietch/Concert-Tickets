import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ConcertDetailView from '../views/ConcertDetailView.vue'
import CrudView from '../views/CrudView.vue'
import CreateConcertView from '../views/CreateConcertView.vue'
import ModifConcertView from '../views/ModifConcertView.vue'
import ModifGroupeView from '../views/ModifGroupeView.vue'
import BookTicketView from '../views/BookTicketView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import UpdateUserView from '../views/UpdateUserView.vue'
import ReceiptBookingView from '../views/ReceiptBookingView'
import ProfilePageView from '../views/ProfilePageView'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/crud',
    name: 'crud',
    component: CrudView
  },
  {
    path: '/createconcert',
    name: 'createconcert',
    component: CreateConcertView
  },
  
  {
    path: '/modifgroupe/:id',
    name: 'modifgroupe',
    component: ModifGroupeView
  },
  {
    path: '/modifconcert/:id',
    name: 'modifconcert',
    component: ModifConcertView
  },
  {
    path: '/updateuser/:id',
    name: 'updateuser',
    component: UpdateUserView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RegisterView
  },
  {
    path: '/concert/:id',
    name: 'concertdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ConcertDetailView
  },
  {
    path: '/createuser',
    name: 'createuser',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CreateUserView
  },
   {
     path: '/reservation/:id',
     name: 'bookticket',
     component: BookTicketView
   },

   {
    path: '/receipt',
    name:'receipt',
    component: ReceiptBookingView
   },

   {
    path: '/profile/:id',
    name:'profile',
    component: ProfilePageView
   },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

<template>
  <div>
    <NavBar />
    <ConcertList />
    <GroupList />

  </div>



</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/NavBar.vue'
import ConcertList from '../components/ConcertList.vue'
import GroupList from '../components/GroupList.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    ConcertList,
    GroupList
  }
}
</script>

<template>
  <div>
    <CrudStats />
    <CrudTable />
  </div>
</template>
  
<script>
import CrudTable from "../components/CrudTable.vue";
import CrudStats from "../components/CrudStats.vue"
import NavBar from "@/components/NavBar.vue";
export default {
  name: "CrudTableView",
  components: {
    CrudTable,
    CrudStats,
    NavBar
},
};
</script>
  
<style>
</style>
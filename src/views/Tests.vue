<template>
  <div class="tests">
    <div id = "available-heading">
      <h1>Tests Available:</h1>
    </div>
    <div id= "test-container">
      <router-link class= "test-display" v-for= "test in tests" :key="test.id" :to ="'/tester/' + test.id">
        <h4 class = "test-title">{{test.name}}</h4>
        <div class = "est-time-container">
          <p class = "est-time">{{test.estTime}}  min.</p>
        </div>
      </router-link>
    </div>
  </div>

</template>
<script>
  import axios from 'axios';
  export default {
    name: 'tests',
    data() {
      return{
        tests: [],
      }
    },
    created(){
      this.getTests();
    },
    methods: {
      async getTests() {
        try{
          let response = await axios.get("/api/tests");
          this.tests = response.data.tests;
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }


</script>
<style>
.test-display{
  border: 2px solid black;
  cursor: pointer;
  border-radius:5px;
  margin: 20px;
  width:20%
}
.test-display:focus{
  border: 4px solid black;
}
.dontdisplay{
  display: none;

}
.display{
  display: flex;

}
.tests{
display: flex;
flex-direction:column;
align-items: center;
}
#test-container{
  width:100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction:  row;
  justify-content:center;
  align-items: center;
}
</style>

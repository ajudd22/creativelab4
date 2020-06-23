<template>
  <div id= "tester">
    <h1>{{this.headingMessage}}</h1>
  <form>
    <div class = "question-container" v-for= "item in items" :key="item.id" >
      <h5 class = "question-head">{{item.head}}</h5>
        <div class = "option"  v-for= "option in item.options" :key= "option">
          <input class = "button" type= "radio"  :id= "option" :name = "item.id + '-op'" :ref="item.id">
          <label class= "option-label" :for = "option" >{{option}}</label>
        </div>
    </div>
    <input type="button" @click=gradeTest value = "Submit test">
    </form>
    </div>

</template>

<script>
import axios from 'axios';

export default{
  name: 'Tester',
  data (){
    return{
      headingMessage: "",
      testID: this.$route.params.id,
      items: [],
      answers:[],
    }
  },
  created(){
    this.getItems();
  },
  methods: {
    async gradeTest(){
      let checked = new Map();
      let unchecked = [];
      for(var ref in this.$refs){
        var myref = this.$refs[ref];
        var checkedOption = myref.filter(option => option.checked == true);

        if(checkedOption.length != 0){
          console.log(checkedOption[0].labels[0].innerText);
          checked.set(ref, checkedOption[0].labels[0].innerText);
        }
        else{
          unchecked.push(myref[0].name);
        }
      }
      console.log(checked);
      if(checked.size == this.items.length){
        this.headingMessage = "";
        console.log(checked);
        let bodyinfo = {body:checked};
        let grade = await axios.post("/api/grade/", bodyinfo);
        this.headingMessage = grade.res;

      }
      else if (unchecked.length != 0){
        console.log(unchecked);
        this.headingMessage = "You have left " + unchecked.length + " questions unanswered. Please select an answer for all questions before proceeding.";
        window.scrollTo(0,0);

      }

    },
  async getItems(){
    try{
      let items = await axios.get("/api/tests/" + this.testID);
      this.items = items.data;
      this.items.sort(() => Math.random() -0.5);
      console.log(this.items);



      return items;
    }catch(error){
      console.log(error);
    }
  },

  }
}
</script>
<style scoped>
#tester{
  height: 200px;
}
h1{
  color: indianred;
}
#app{
  overflow:scroll;
}
.question-container{
  width:40%;
  margin-left: 30%;
  display:block;
}
.question-head{
  text-align:left;
  padding-left:5%;
}
.option{
  width:100%;
  display:flex;
  flex-direction:row;
}
.item-shuffle{
  display:flex;
  flex-direction:column;
  margin-left:10%;
}
.button{
  float:right;

}
.option-label{
  text-align: left;
  float:left;
  width:80%;
}

</style>

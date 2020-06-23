<template>
  <div id= "tester">
    <h1>{{this.headingMessage}}</h1>
  <form>
    <div :class = "{wrong: item.v} " v-for= "item in items" :key="item.id" >
      <h5 class = "question-head">{{item.head}}</h5>
        <div class = "option"  v-for= "option in item.options" :key= "option">
          <input class = "button" type= "radio"  :id= "option" :name = "item.id + '-op'" :ref="item.id">
          <label class= "option-label" :for = "option" >{{option}}</label>
        </div>
    </div>
    <input v-if=!graded type="button" @click=gradeTest value = "Submit test">
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
      incorrect:[],
      graded: false,
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
      if(checked.size == this.items.length){
        this.headingMessage = "";
        let objMap= Array.from(checked).reduce((objMap,[key,value]) => (
            Object.assign(objMap, {[key]: value})
          ), {});
        let grade = await axios.post("/api/grade/", {map:objMap});
        console.log(grade.data);
        this.incorrect = grade.data;
        this.displayGrade(grade.data);

      }
      else if (unchecked.length != 0){
        this.headingMessage = "You have left " + unchecked.length + " questions unanswered. Please select an answer for all questions before proceeding.";
        window.scrollTo(0,0);
      }

    },
    displayGrade (){
      let total = (this.items.length - this.incorrect.length);
      total = total /this.items.length;
      total = total *100;
      console.log(total);
      console.log(this.items);
      for (const val in this.incorrect){
        console.log(this.incorrect[val]);
        this.items.find(item => item.id == this.incorrect[val]).v = true;
      }
      this.headingMessage = "You scored a " + total + "%";
      window.scrollTo(0,0);
      console.log(this.items);
      this.graded = true;
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
.wrong{
  border: 1px solid red;
  border-radius: 5px;
  margin: 10px;
}
.option-label{
  text-align: left;
  float:left;
  width:80%;
}

</style>

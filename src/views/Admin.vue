<template>
  <div class="admin">
    <div class = "fileUpload">

      <label id = "fileLabel" for= "fileInput">Upload tests here:</label>
        <h6>This site currently only accepts .csv files</h6>

      <input type="file" id = "fileInput" name = "fileInput" accept = ".csv" @change = "fileChanged">

      <label id = "testTitleLabel" for= "titleInput">Title of test:</label>
      <input type= "text" id = "title" name = "title" v-model = "title">
      <input type= "submit" id = "submitButton" @click= 'upload'>

    </div>

    <div class = "fileDisplay" v-if="addTest">
      <h1>{{uploadTest.title}}</h1>
      <textarea id = "filecontents"></textarea>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

  export default{
  name: 'admin',
  data(){
    return{
      title:"",
      addTest: null,
      file: null,
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },

    async upload() {
    try{
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('file', this.file, this.file.name);
      await axios.post("/api/tests", formData);
    } catch(error) {
        console.log(error);
      }
    }
  }

  }
</script>
<style>
.admin{
  display: flex;
  align-items: center;
  justify-content: center;

}
#fileLabel{
  font-size: 24px;
}
.fileUpload{
  display: flex;
  width: 30%;
  flex-direction: column;
  align-items:center
}
#fileInput{
padding-left:20%;
}
#submitButton{
margin-top: 2%;
background-color: indianred;
border:none;
padding: 5px 15px;
width: 80%;
}

</style>

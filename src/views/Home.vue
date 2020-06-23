<template>
  <div class="home">
    <div id = "button-container">
      <router-link tag="p" class="link" to="/tests">Tests</router-link>
      <router-link tag="p" class="link" to="/admin">Admin</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
<style>
.link{
  background-color: indianred;
  padding-left:50px;
  padding-right:50px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 10px;
  width: 30%;
  font-color: black;
  font-size: 26px;
}
.link:hover{
  background-color:#f6de72;
  cursor:pointer;
}
#button-container{
padding-top: 40px;
padding-bottom: 40px;
display:flex;
flex-wrap: no-wrap;
flex-direction: row;
justify-content: space-around;


}
.home{
height: 100%;
}
</style>

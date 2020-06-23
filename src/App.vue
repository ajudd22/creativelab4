<template>
  <div id="app">
    <div id = "heading">
      <img id = "img-left" src = "./assets/sidepencils.jpg">
      <router-link class = "link-heading" to="/">
        <h1 id = "title">Book of Mormon Practice Testing</h1>
     </router-link>
      <img id = "img-right" src = "./assets/sidepencilsreverse.jpg">
    </div>
    <router-view/>
  </div>
</template>

<style>
html{
background-size: cover;
background-color: #add8e6;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #add8e6;
  background-size:cover;
  width:100%;
}
.link-heading{
  text-decoration:none;
  display: flex;
  align-items: center;
}

#heading {
  height: 175px;
  background-color:#e2e2e4;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#title{
  font-size: 36px;
  color:#2b2d2f;
}
#img-left{
  height: 175px;
  float: left;
}
#img-right{
  height: 175px;
  float: right;
}

</style>

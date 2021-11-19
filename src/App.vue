<template>
  <div class="flex justify-center items-center relative">
    <div class="w-4/5 fixed top-4/5 left-1/2 flex items-center justify-center
     z-1- transform -translate-x-2/4 translate-y-35" style="top: 35%">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3/5">
        <text x="0" y="100">TODO LIST</text>
      </svg>
    </div>
    <div class="absolute bg-transparent rounded-sm content mx-0 my-7 w-4/5 z-10">
      <Todo/>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Todo from "./components/Todo.vue";


export default defineComponent({
  name: 'App',
  components: {
    Todo
  }
});
</script>

<style>
#app {
  font-family: Roboto,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #e0e0e0;
  position: relative;
  transition: all 0.3s;
}

@media screen and (min-width: 800px){
   svg text{
    font-size: 9vw;
    font-weight: bold;
    fill: none;
    stroke: black;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-dasharray: 20;
    animation: anime 8s alternate infinite linear;
  }
  @keyframes anime{
    50%{
      stroke-dasharray: 444;
    }
    100%{
      stroke-dasharray: 20;
    }
  }
}
.content{
  top: 15%;
  left: 5%;
  box-shadow:  20px 20px 40px #bebebe,
  -20px -20px 40px #bebebe;
}
@media screen and (max-width: 790px){
  .parent .bg{
    display: none;
  }
}
h2{
  color: #3f7676;
}
.todo{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px 0px 0px;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow:  20px 20px 40px #bebebe,
  -20px -20px 40px #ffffff;
  border-radius: 3px;
  padding: 10px;
  transition: all 0.3s;
}
.todo .check{
  padding: 10px;
}
.todo .description-task{
  color: black;
  font-size: 17px;
  font-family: Roboto;
}
.todo .description-task .date{
  color: gray;
  font-size: 13px;
  display: block;
  float: right;
  padding: 3px 10px;
}
.todo .actions{
  display: flex;
  justify-content: center;
  align-items: center;
}
.todo .actions span{
  cursor: pointer;
  margin: 0 5px;
}
</style>
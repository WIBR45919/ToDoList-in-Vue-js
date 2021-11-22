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

@media screen and (min-width: 768px){
   svg text{
    font-size: 9vw;
    fill: none;
    font-weight: bold;
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
  left: 10%;
  box-shadow:  20px 20px 40px #bebebe,
  -20px -20px 40px #bebebe;
}

.todo{
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow:  20px 20px 40px #bebebe,
  -20px -20px 40px #ffffff;
}
</style>
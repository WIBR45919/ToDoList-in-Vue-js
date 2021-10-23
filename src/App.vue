<template>
  <div class="parent">
    <div class="bg">
     <svg xmlns="http://www.w3.org/2000/svg">
       <text x="0" y="100">TODO LIST</text>
     </svg>
    </div>
    <div class="content">
      <Todo/>
    </div>
  </div>
</template>

<script>
import Todo from "./components/Todo";
export default {
  name: 'App',
  components: {
    Todo
  }
}
//todo: Regrouper toutes les fonctionnalités dupliquées et réutilisables dans un seul fichier
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
#app {
  font-family: Roboto,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #e0e0e0;
  position: relative;
  transition: all 0.3s;
}
  .parent{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .parent .bg{
    width: 80%;
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%,35%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
  }
  @media screen and (min-width: 800px){

  .parent .bg svg{
    width: 60%;
  }
  .parent .bg svg text{
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
      position: absolute;
      width: 80vw;
      margin: 25px 0;
      border-radius: 7px;
      top: 15%;
      left: 5%;
      background: transparent;
      box-shadow:  20px 20px 40px #bebebe,
      -20px -20px 40px #bebebe;
      z-index: 2;
  }
  @media screen and (max-width: 790px){
      .parent .bg{
          display: none;
      }
  }
  h2{
      color: #3f7676;
      font-family: Roboto;
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

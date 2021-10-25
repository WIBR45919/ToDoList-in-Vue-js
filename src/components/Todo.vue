<template>
    <div class="content">
        <div class="input" :class="choiseBg">
            <InputTask  @addTask="addTask" />
            <div class="theme">
                <span title="theme aqua" @click="changeBg('Aqua')"></span>
                <span title="theme purple" @click="changeBg('Purple')"></span>
                <span title="theme black" @click="changeBg('Black')"></span>
                <span title="theme white" @click="changeBg('Normal')"></span>
            </div>
        </div>
        <div class="task" :class="choiseBg">
            <h2 :class="choiseBg" v-show="taskDone.length !== 0">Task List</h2>
            <p :class="choiseBg" class="placeholder" v-show="taskDone.length === 0">Veuillez entrer une tache !</p>

              <template v-for="(task) in taskDone" :key="task.id">
                  <TaskDone :id="task.id" :description="task.description" :date="task.date" :isDone="task.isDone"
                            @check="taskAlreadyDo" @delete="deleteTask" @edit="detectEdit"/>
              </template>

            <h2 :class="choiseBg" v-show="taskNotDone.length !== 0">Already Doing</h2>

                <template v-for="(task) in taskNotDone" :key="task.id">
                    <TaskNotDo :id="task.id" :description="task.description" :date="task.date" :isDone="task.isDone"
                               @check="taskAlreadyDo"  @delete="deleteTask"/>
                </template>

        </div>
    </div>
</template>

<script>
import TaskDone from "./TaskDone";
import InputTask from "./InputTask";
import TaskNotDo from "./TaskNotDo";

import {ref, computed, reactive } from 'vue';

export default {
    name: "Todo",
    components:{
            TaskDone,InputTask,TaskNotDo
    },
    setup(){
        //TODO: add an Edit task function later
        // TODO: Group every same functionalities to this Application in a other file
        const tabList = ref([])
        const bgObject = reactive({
            Black: [
              'bg-black',
              'text-black'
            ],
            Purple:  [
              'bg-purple',
              'text-purple'
            ],
            Aqua:  [
              'bg-aqua',
              'text-aqua'
            ],
            Normal: ''
        })
        let choiseBg = ref([]);

        const addTask = (task) =>{
            const index = tabList.value.length
            if(task.length !== ""){
              tabList.value.push({
                id: (index+1),
                description: task,
                date: getTaskDate(),
                isDone: false
              })
              return tabList
            }
            return false
        }
        const deleteTask = (id) =>{
          const index = tabList.value.findIndex(elt => elt.id === id);
          tabList.value.splice(index, 1);
        }
        const detectEdit = (addtask) =>{
          console.log(`task: ${ addtask }`);
        }

        const changeStateToCheck = (id) => {
            tabList.value = tabList.value.map(elt => {
              if(elt.id === id){
                return ref({
                  ...elt,
                  isDone: true
                }).value
              }
              return elt
            })
        }
        const changeStateToUncheck = (id) =>{
          tabList.value = tabList.value.map(elt => {
            if(elt.id === id){
              return ref({
                ...elt,
                isDone: false
              }).value
            }
            return elt
          })
        }

        const taskDone = computed(function () {
            return tabList.value.filter(elt => elt.isDone === false)
        })
        const taskNotDone = computed(function () {
            return tabList.value.filter(elt => elt.isDone === true)
        })
        const getTaskDate = () => {
            return `${ new Date().toDateString() } - ${ new Date().getHours() }h:${ new Date().getMinutes() }min:${ new Date().getSeconds() }s`
        }
        const changeBg = (color)=>{
          choiseBg.value = bgObject[color]
        }
        const taskAlreadyDo = (id,eventType) => {
          if(eventType === "checked") changeStateToCheck(id)
          else changeStateToUncheck(id)
        }

        return{
            taskDone, taskNotDone, deleteTask,addTask,detectEdit,
            taskAlreadyDo, changeBg,choiseBg
        }
    }
}
</script>

<style scoped>

.input{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 20%;
}
.theme{
    width: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
    .theme span{
        display: inline-block;
        width: 20px;height: 20px;border-radius: 50%;
        cursor: pointer;
    }
    .theme span:nth-child(1){
        background-color: aqua;
    }
    .theme span:nth-child(2){
        background-color: purple;
    }
    .theme span:nth-child(3){
        background-color: black;
    }
    .theme span:nth-child(4){
      background-color: whitesmoke;
    }
    .task{
        padding: 10px 15px;
    }
    .task h2{
        color: #3f7676;
    }
    .placeholder{
      text-align: center;
      color: gray;
      font-size: 15px;
    }
    .bg-black{
      background-color: #131313;
    }
    .bg-purple{
      background-color: #6724f1;
    }
    .bg-aqua{
      background-color: #9ae7cc;
    }
    .text-black{
      color: white!important;
    }
    .text-purple{
      color: white!important;
    }
    .text-aqua{
      color: #282626!important;
    }
</style>
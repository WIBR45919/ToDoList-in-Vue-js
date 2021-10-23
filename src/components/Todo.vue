<template>
    <div class="content">
        <div class="input" :class="{ 'bg-black': isBlack, 'bg-aqua':isAqua, 'bg-purple':isPurple }">
            <InputTask @addTask="addTask"/>
            <div class="theme">
                <span title="theme aqua" @click="changeBg('Aqua')"></span>
                <span title="theme purple" @click="changeBg('Purple')"></span>
                <span title="theme black" @click="changeBg('Black')"></span>
                <span title="theme white" @click="changeBg('white')"></span>
            </div>
        </div>
        <div class="task" :class="{ 'bg-black': isBlack, 'bg-aqua':isAqua, 'bg-purple':isPurple }">
            <h2 :class="{ 'text-black': isBlack, 'text-aqua':isAqua, 'text-purple':isPurple }" v-show="taskDone.length !== 0">Task List</h2>
            <p  :class="{ 'text-black': isBlack, 'text-aqua':isAqua, 'text-purple':isPurple }" class="placeholder" v-show="taskDone.length === 0">Veuillez entrer une tache !</p>

              <template v-for="(task) in taskDone" :key="task.id">
                  <TaskDone :id="task.id" :description="task.description" :date="task.date" :isDone="task.isDone"
                            @check="taskAlreadyDo" @delete="deleteTask" @edit="editTask"/>
              </template>

            <h2  :class="{ 'text-black': isBlack, 'text-aqua':isAqua, 'text-purple':isPurple }" v-show="taskNotDone.length !== 0">Already Doing</h2>

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

import { ref,computed } from 'vue';

export default {
    name: "Todo",
    components:{
            TaskDone,InputTask,TaskNotDo
    },
    setup(){
        const task = ref('')
        const tabList = ref([])
        const isBlack = ref(false)
        const isPurple = ref(false)
        const isAqua = ref(false)
        const isNormal = ref(false)

        function addTask(addtask){
            const index = tabList.value.length
            if(addtask.length !== ""){
                tabList.value.push({
                    id: (index+1),
                    description: addtask,
                    date: getTaskDate(),
                    isDone: false
                })
                return tabList
            }
            return false

        }
        function deleteTask(id){
          const index = tabList.value.findIndex(elt => elt.id === id);
          tabList.value.splice(index, 1);
        }
        function editTask(id){
        const Taskedit = tabList.value.map(elt=> {
            if(elt.id === id){
              return{
                ...elt,
                type: 'edit'
              }
            }
          })
          console.log(Taskedit)
          console.log('Edit : ' + id)
        }
        function changeStateToCheck(id) {
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
        function changeStateToUncheck(id){
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
        function getTaskDate() {
            return `${ new Date().toDateString() } - ${ new Date().getHours() }h:${ new Date().getMinutes() }min:${ new Date().getSeconds() }s`
        }
        function changeBg(color){
          if (color === "Black") {
            isBlack.value = true
            isAqua.value = false
            isPurple.value = false
          }
          if (color === "Purple") {
            isBlack.value = false
            isAqua.value = false
            isPurple.value = true
          }
          if (color === "Aqua") {
            isBlack.value = false
            isAqua.value = true
            isPurple.value = false
          }
          if (color === "white") {
            isBlack.value = false
            isAqua.value = false
            isPurple.value = false
          }
        }

        function taskAlreadyDo(id,eventType) {
          if(eventType === "checked") changeStateToCheck(id)
          else changeStateToUncheck(id)
        }

        return{
            task, taskDone, taskNotDone, addTask, deleteTask, editTask,
            taskAlreadyDo, isBlack, isPurple, isAqua, isNormal, changeBg
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
        font-family: Roboto;
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
<template>
    <div class="content">
        <div class="input" :class="chooseBg">
            <InputTask  @addTask="addTask" />
            <div class="theme">
                <span title="theme aqua" @click="changeBg('Aqua')"></span>
                <span title="theme purple" @click="changeBg('Purple')"></span>
                <span title="theme black" @click="changeBg('Black')"></span>
                <span title="theme white" @click="changeBg('Normal')"></span>
            </div>
        </div>
        <div class="task" :class="chooseBg">
            <h2 :class="chooseBg" v-show="taskNotDone.length !== 0">Task List</h2>
            <p :class="chooseBg" class="placeholder" v-show="taskNotDone.length === 0">Veuillez entrer une tache !</p>

              <template v-for="task in taskNotDone" :key="task.id">
                  <TaskNotDone :task="task" @check="toggleTaskStatus" @delete="deleteTask" @edit="detectEdit"/>
              </template>

            <h2 :class="chooseBg" v-show="taskDone.length !== 0">Already Doing</h2>

                <template v-for="task in taskDone" :key="task.id">
                    <TaskDone :task="task" @check="toggleTaskStatus"  @delete="deleteTask"/>
                </template>

        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, onMounted, onUnmounted} from "vue";
import { computed, reactive } from 'vue';

import TaskDone from "@/components/TaskDone.vue";
import InputTask from "@/components/InputTask.vue";
import TaskNotDone from "@/components/TaskNotDone.vue";

import {TaskModel} from "@/components/types/TaskModel";

export default defineComponent({
    name: 'Todo',
    components:{
            TaskDone,InputTask,TaskNotDone
    },
    setup(){
        const tabList = reactive<TaskModel[]>([]);
        const bgObject = {
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
            Normal: ['']
        }
        const persistTasks:string = 'ARRAY_OF_TASKS';
        let chooseBg = reactive<string[]>(['']);

        onMounted(()=>{
          initializeTaskList()
        })
        const addTask = (task: string): void =>{
            if(task.length !== 0) {
              tabList.push({
                id: Date.now(),
                description: task,
                date: getTaskDate(),
                isDone: false
              })
            }
            addTaskToLocalStorage()
        }
        const deleteTask = (id: number) =>{
          const index = tabList.findIndex((elt: TaskModel) => elt.id === id);
          tabList.splice(index, 1);
          addTaskToLocalStorage()
        }
        const detectEdit = (addTask: string) =>{
          console.log(`task: ${ addTask }`);
        }

        const taskNotDone = computed( (): TaskModel[] => {
            return tabList.filter((elt: TaskModel) => !elt.isDone)
        })
        const taskDone = computed((): TaskModel[] => {
            return tabList.filter((elt: TaskModel) => elt.isDone)
        })
        const getTaskDate = (): string => {
            return `${ new Date().toDateString() } - ${ new Date().getHours() }h:${ new Date().getMinutes() }min:${ new Date().getSeconds() }s`
        }
        const addTaskToLocalStorage = (): void => {
          localStorage.setItem(persistTasks, JSON.stringify(tabList))
        }
        const checkIfLocalStorageEmpty = (): boolean =>{
          return localStorage.getItem(persistTasks) === null
        }
        const initializeTaskList = (): void =>{
          if(checkIfLocalStorageEmpty()) localStorage.setItem(persistTasks, '');
          else Object.assign(tabList, JSON.parse(localStorage.getItem(persistTasks) || '[]'));
        }
        const changeBg = (color:string = "Black"): void =>{
          chooseBg = bgObject.Aqua
          console.log(color)
        }
        const toggleTaskStatus = (id: number): void => {
          const toggledTask = tabList.find((elt: TaskModel) => elt.id === id);
          toggledTask!.isDone = !toggledTask!.isDone;
          addTaskToLocalStorage()
        }
        onUnmounted(()=>{
          localStorage.setItem(persistTasks, '')
        })

        return{
            taskDone, taskNotDone, deleteTask,addTask,detectEdit,
            toggleTaskStatus, changeBg,chooseBg
        }
    }
});
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
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
            <h2 :class="choiseBg" v-show="taskNotDone.length !== 0">Task List</h2>
            <p :class="choiseBg" class="placeholder" v-show="taskNotDone.length === 0">Veuillez entrer une tache !</p>

              <template v-for="task in taskNotDone" :key="task.id">
                  <TaskNotDone :id="task.id" :description="task.description" :date="task.date" :isDone="task.isDone"
                            @check="toggleTaskStatus" @delete="deleteTask" @edit="detectEdit"/>
              </template>

            <h2 :class="choiseBg" v-show="taskDone.length !== 0">Already Doing</h2>

                <template v-for="task in taskDone" :key="task.id">
                    <TaskDone :id="task.id" :description="task.description" :date="task.date" :isDone="task.isDone"
                               @check="toggleTaskStatus"  @delete="deleteTask"/>
                </template>

        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import TaskDone from "@/components/TaskDone.vue";
import InputTask from "@/components/InputTask.vue";
import TaskNotDone from "@/components/TaskNotDone.vue";
import {TaskModel} from "@/TaskModel";

import { computed, reactive } from 'vue';

export default defineComponent({
    name: 'Todo',
    components:{
            TaskDone,InputTask,TaskNotDone
    },
    setup(){
        let tabList = reactive<TaskModel[]>([]);
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
        let choiseBg = reactive<string[]>([]);

        const addTask = (task: string): void =>{
            if(task.length !== 0) {
              tabList.push({
                id: Date.now(),
                description: task,
                date: getTaskDate(),
                isDone: false
              })
            }
        }
        const deleteTask = (id: number) =>{
          const index = tabList.findIndex(elt => elt.id === id);
          tabList.splice(index, 1);
        }
        const detectEdit = (addtask: string) =>{
          console.log(`task: ${ addtask }`);
        }

        const changeStateToCheck = (id: number): void => {
            tabList.find(elt => elt.id === id)!.isDone = true
        }
        const changeStateToUncheck = (id: number): void =>{
          tabList.find(elt => elt.id === id)!.isDone = false
        }

        const taskNotDone = computed( (): TaskModel[] => {
            return tabList.filter(elt => !elt.isDone)
        })
        const taskDone = computed((): TaskModel[] => {
          console.log(tabList)
            return tabList.filter(elt => elt.isDone)
        })
        const getTaskDate = (): string => {
            return `${ new Date().toDateString() } - ${ new Date().getHours() }h:${ new Date().getMinutes() }min:${ new Date().getSeconds() }s`
        }
        const changeBg = (color:string = "Normal"): void =>{
          choiseBg = bgObject['Normal']
          console.log(color)
        }
        const toggleTaskStatus = (id: number,eventType: string): void => {
          if(eventType === "checked") changeStateToCheck(id)
          else changeStateToUncheck(id)
        }

        return{
            taskDone, taskNotDone, deleteTask,addTask,detectEdit,
            toggleTaskStatus, changeBg,choiseBg
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
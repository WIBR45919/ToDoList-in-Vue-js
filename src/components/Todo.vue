<template>
    <div class="content">
        <div class="flex justify-center items-center p-3.5 h-1/5" :class="chooseBg">
            <InputTask  @addTask="addTask" />
            <div class="theme">
                <span class="bg-blue-400" title="theme Aqua" @click="changeBg('Aqua')"></span>
                <span class="bg-purple-600" title="theme purple" @click="changeBg('Purple')"></span>
                <span class="bg-black" title="theme black" @click="changeBg('Black')"></span>
                <span class="bg-gray-200" title="theme white" @click="changeBg('Normal')"></span>
            </div>
        </div>
        <div class="px-3.5 py-2" :class="chooseBg">
            <h2 :class="chooseBg" class="text-green-500 text-2xl" v-show="taskNotDone.length !== 0">Task List</h2>
            <p :class="chooseBg" class="text-center text-gray-600 text-lg" v-show="taskNotDone.length === 0">Veuillez entrer une tache !</p>

              <template v-for="task in taskNotDone" :key="task.id">
                  <TaskNotDone :task="task" @check="toggleTaskStatus" @delete="deleteTask" @edit="detectEdit"/>
              </template>

            <h2 :class="chooseBg" class="text-green-500 pt-10 text-2xl" v-show="taskDone.length !== 0">Already Doing</h2>

                <template v-for="task in taskDone" :key="task.id">
                    <TaskDone :task="task" @check="toggleTaskStatus"  @delete="deleteTask"/>
                </template>

        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, onMounted} from "vue";
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
              'bg-purple-600',
              'text-purple-600'
            ],
            Aqua:  [
              'bg-blue-400',
              'text-aqua-400'
            ],
            Normal: ['']
        }
        const persistTasks:string = 'ARRAY_OF_TASKS';
        let chooseBg = reactive<string[]>([]);

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
          chooseBg[0] = bgObject[color as keyof {}]
        }
        const toggleTaskStatus = (id: number): void => {
          const toggledTask = tabList.find((elt: TaskModel) => elt.id === id);
          toggledTask!.isDone = !toggledTask!.isDone;
          addTaskToLocalStorage()
        }

        return{
            taskDone, taskNotDone, deleteTask,addTask,detectEdit,
            toggleTaskStatus, changeBg,chooseBg
        }
    }
});
</script>

<style scoped>

</style>
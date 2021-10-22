<template>
    <div class="content">
        <div class="input">
            <InputTask @addTask="addTask"/>
            <div class="theme">
                <span title="theme aqua"></span>
                <span title="theme purple"></span>
                <span title="theme black"></span>
            </div>
        </div>
        <div class="task">
            <h2>Task List</h2>
            <template v-for="(task, index) in newList" :key="task.id">
                <Task :id="index+1" :description="task.description" :date="task.date" :isDone="false" @check="taskAlreadyDo"/>
            </template>
        </div>
    </div>
</template>

<script>
import Task from "./Task";
import InputTask from "./InputTask";

import { ref, computed } from 'vue';

export default {
    name: "Todo",
    components:{
            Task,InputTask
    },

    setup(){
        const task = ref('')
        const tabList = ref([])
        const tabListDo = ref([])
        const takeDate = new Date()

        function addTask(addtask){
            const index = tabList.value.length
            console.log(addtask.value)
            if(tabList.value.length !== 0){
                tabList.value.push({
                    id: (index+1),
                    description: addtask.value,
                    date: getTaskDate(),
                    isDone: false
                })
                console.log(tabList)
                return tabList
            }
            return false
        }
        function changeState(id) {
            const index = tabList.value.findIndex(one => one.id === id);
            console.log(index)
            const elt = tabList.value.splice(index, 1);
            console.log(tabList.value);
            console.log(elt)
            //ADD in a corresponding tab
            tabListDo.value.push(...elt)
        }

        function getTaskDate() {
            return `${ takeDate.toDateString() } - ${ takeDate.getHours() }h:${ takeDate.getMinutes() }min:${ takeDate.getSeconds() }s`
        }
        const newList = computed(function () {
             return addTask(tabList,task).value?.filter(fil => fil.isDone !== true)
         })
        function taskAlreadyDo(id) {
            changeState(id)
            console.log(tabListDo.value);
        }

        return{
            task,
            newList,
            tabListDo,
            addTask,
            taskAlreadyDo
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
    .task{
        padding: 10px 15px;
    }
    .task h2{
        color: #3f7676;
        font-family: Roboto;
    }
</style>
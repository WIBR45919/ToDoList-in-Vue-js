<template>
<div class="todo td-shadow opacity-50 bg-gray-100">
    <div class="check">
        <input type="checkbox" @change="taskDo" :checked="task.isDone">
    </div>
    <div class="description-task">
        <p class="line-through"> {{ task.description }}  <span class="date">{{ task.date }}</span></p>
    </div>
    <div class="actions">
        <span title="Delete" @click="deleteTask" id="delete">
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="darkred"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
        </span>
    </div>
</div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {TaskModel} from "@/components/types/TaskModel";

export default defineComponent({
    name: "TaskDone",
    props:{
        task:{
          type:  Object as PropType<TaskModel>,
          required: true
        }
    },
    emits:['check','delete'],
  setup(props, { emit }){
    const taskDo = (): void => {
      emit('check', props.task.id);
    }
    const deleteTask = (): void => {
      emit('delete', props.task.id);
    }

    return{
      taskDo,
      deleteTask
    }
  }
});
</script>

<style scoped>
</style>
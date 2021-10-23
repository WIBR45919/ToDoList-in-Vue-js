<template>
<div class="todo do">
    <div class="check">
        <input type="checkbox" @change="taskDo" :checked="isDone">
    </div>
    <div class="description-task">
        <p class="overline"> {{ description }}  <span class="date">{{ date }}</span></p>
    </div>
    <div class="actions">
        <span title="Delete" @click="deleteTask">
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="darkred"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
        </span>
    </div>
</div>
</template>

<script>
    export default {
        name: "TaskNotDo",
        props:{
            id:{
                type: Number,
                required: true
            },
            description:{
                type: String,
                required: true
            },
            date:{
                type: String,
                required: true
            },
            isDone:{
                type: Boolean,
                required: true,
                defaultValue: false
            }
        },
      emits:['check','delete'],
      setup(props, { emit }){
        function taskDo() {
          emit('check', props.id, "unchecked");
        }
        function deleteTask() {
          emit('delete', props.id);
        }

        return{
          taskDo,
          deleteTask
        }
      }
    }
</script>

<style scoped>

.overline {
    text-decoration: line-through;
}
.do{
    opacity: 0.5;
    background: #e0e0e0;
    box-shadow: inset 20px 20px 40px #bebebe,
    inset -20px -20px 40px #ffffff;
}
</style>
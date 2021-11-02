<template>
  <div class="task">
      <div class="todo">
          <div class="check">
              <input type="checkbox" :checked="isDone" @change="taskDo">
          </div>
          <div class="description-task">
              <p> {{ description }}  <span class="date">{{ date }}</span></p>
          </div>
          <div class="actions">
          <span title="Time">
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="orange"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.2,16.2L11,13V7h1.5v5.2l4.5,2.7L16.2,16.2z"/></g></g></g></svg>
          </span>
              <span title="Edit" @click="editTask">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="aqua"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </span>
              <span title="Delete" @click="deleteTask">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="darkred"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
          </span>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "Task",
        props:{
            id:{
                type: Number,
                required: true,
                defaultValue: 0,
            },
            description:{
                type: String,
                required: true,
                defaultValue: ''
            },
            date:{
                type: String,
                required: true,
                defaultValue: ''
            },
            isDone:{
                type: Boolean,
                required: true,
                defaultValue: false
            }
        },
        emits:['check','delete','edit'],
        setup(props, { emit }){

          const taskDo = () => {
            emit('check', props.id, "checked");
          }
          const deleteTask = () => {
            emit('delete', props.id);
          }
          const editTask = () => {
            emit('edit',props.description);
          }

            return{
                taskDo,
              deleteTask,
              editTask,
            }
        }
    }
</script>

<style scoped>

</style>
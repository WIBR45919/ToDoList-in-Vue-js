<template>
   <div class="flex p-2.5 w-full relative md:w-3/4">
       <input class="b-b" type="text" required placeholder="entrez une tache" v-model="enter" @keyup.enter="sendTask">
          <button type="button" @click="sendTask" title="Ajouter a la liste des taches">
           <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#3f7676"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
           </span>
        </button>
   </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import {defineComponent} from "vue";

export default defineComponent({
    name: "InputTask",
    emits:['addTask'],
    setup(props,{ emit }){
        const enter = ref<String>('')

        const sendTask = (): void => {
            if (enter.value.trim().length !== 0) {
                emit('addTask', enter.value);
                enter.value = ""
            }
        }
        return{
            enter,
            sendTask,
        }
    }
});
</script>

<style scoped>

.b-b{
  border-bottom: 2px solid aquamarine;
}
 button{
     position: absolute;
     display: flex;
     align-items: center;
     justify-content: center;
     right: 15px;
     top: 23%;
     border: none;
     background-color: transparent;
     border-radius: 50px;
     cursor: pointer;
 }
</style>
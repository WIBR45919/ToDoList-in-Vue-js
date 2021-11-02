import {mount} from "@vue/test-utils";
import TaskDone from "@/components/TaskDone.vue";

describe('Task Done component', ()=>{
    const wrapper = mount(TaskDone, {
        props: { id: 0, description: '', date: '', isDone: false }
    })
    // it('should emit when task has done',  async () => {
    //     const emitTaskDone = wrapper.find('input[type="checkbox"]').setChecked()
    //     // wrapper.vm.$emit('check', 0, 'checked')
    //     await emitTaskDone.trigger('change')
    //     expect(wrapper.props('isDone')).toBe(true)
    // });
})
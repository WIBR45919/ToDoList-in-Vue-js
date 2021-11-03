import {mount} from "@vue/test-utils";
import TaskNotDo from "@/components/TaskNotDo.vue";

describe('Task Done component', ()=>{
    const wrapper = mount(TaskNotDo, {
        props: { id: 0, description: 'description', date: '12/09/2001', isDone: true }
    })
    const emitCheck = wrapper.find('input[type="checkbox"]')

    it('should emit when task has done and if checkbox is unchecked',  async () => {
        expect(emitCheck.exists()).toBe(true)
        await emitCheck.trigger('change')
        expect(wrapper.emitted('check')[0]).toEqual([wrapper.props('id'),'unchecked'])
    });

    it('should emit when task has deleted but already Done',  async () => {
        const emitDeleted = wrapper.find('#delete')
        expect(emitDeleted.exists()).toBe(true)
        await emitDeleted.trigger('click')
        expect(wrapper.emitted('delete')[0]).toEqual([wrapper.props('id')])
    });

    it('should have a corresponding description and date',  () => {
        const divShow = wrapper.find('.description-task')
        expect(divShow.exists()).toBe(true)
        expect(divShow.find('p').html()).toBe(`<p class="line-through">${ wrapper.props('description') } <span class="date">${ wrapper.props('date') }</span></p>`)
    });

})
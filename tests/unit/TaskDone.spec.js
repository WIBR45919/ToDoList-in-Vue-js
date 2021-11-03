import {mount} from "@vue/test-utils";
import TaskDone from "@/components/TaskDone.vue";

describe('Task Done component', ()=>{
    const wrapper = mount(TaskDone, {
        props: { id: 0, description: 'description', date: '12/09/2001', isDone: false }
    })
    const emitCheck = wrapper.find('input[type="checkbox"]')

    it('should emit when task has done and if checkbox is checked',  async () => {
        expect(emitCheck.exists()).toBe(true)
        await emitCheck.trigger('change')
        expect(wrapper.emitted('check')[0]).toEqual([wrapper.props('id'),'checked'])
    });

     it('should emit when task has deleted',  async () => {
        const emitDeleted = wrapper.find('#delete')
        expect(emitDeleted.exists()).toBe(true)
        await emitDeleted.trigger('click')
        expect(wrapper.emitted('delete')[0]).toEqual([wrapper.props('id')])
    });

    it('should emit when task want to be edit',  async () => {
        const emitEdit = wrapper.find('#edit')
        expect(emitEdit.exists()).toBe(true)
        await emitEdit.trigger('click')
        expect(wrapper.emitted('edit')[0]).toEqual([`${ wrapper.props('description') }`])
    });

    it('should have a corresponding description and date',  () => {
        const divShow = wrapper.find('.description-task')
        expect(divShow.exists()).toBe(true)
        expect(divShow.find('p').html()).toBe(`<p>${ wrapper.props('description') } <span class="date">${ wrapper.props('date') }</span></p>`)
    });

})
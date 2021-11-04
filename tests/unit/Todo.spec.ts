import {mount} from "@vue/test-utils";
import Todo from "@/components/Todo.vue";

describe('Todo component tests', ()=>{

    it('If Todo component has always InputTask component', ()=>{
        const wrapper = mount(Todo)
        expect(wrapper.findComponent({ name: 'InputTask' }).exists()).toBe(true)
    })

    it('if this should display the tasks not yet done', async ()=>{
        const wrapper = mount(Todo)
        expect(wrapper.findComponent({ name: 'TaskDone' }).exists()).toBe(false)
       expect(wrapper.findComponent({ name: 'TaskNotDone' }).exists()).toBe(false)
       await wrapper.vm.addTask('Task 1')
       expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('id')).toBe(1)
       expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('description')).toMatch('Task 1')
       expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('isDone')).toBeFalsy()
       expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(0)
       expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)

    })

    it('if this should display the tasks already done', async ()=>{
        const wrapper = mount(Todo)
        expect(wrapper.findComponent({ name: 'TaskDone' }).exists()).toBe(false)
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).exists()).toBe(false)
        await wrapper.vm.addTask('Task 4')
        await wrapper.vm.addTask('Task 3')
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('id')).toBe(1)
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('description')).toMatch('Task 4')
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('isDone')).toBeFalsy()
        await wrapper.vm.taskAlreadyDo(1, 'checked')
        await wrapper.vm.taskAlreadyDo(2, 'checked')
        expect(wrapper.findComponent({ name: 'TaskDone' }).props('id')).toBe(1)
        expect(wrapper.findComponent({ name: 'TaskDone' }).props('description')).toMatch('Task 4')
        expect(wrapper.findComponent({ name: 'TaskDone' }).props('isDone')).toBeTruthy()
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(2)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(0)
    })

    it('if this should display the tasks not yet done and those already done', async ()=>{
        const wrapper = mount(Todo)
        expect(wrapper.findComponent({ name: 'TaskDone' }).exists()).toBe(false)
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).exists()).toBe(false)
        await wrapper.vm.addTask('Task 5')
        await wrapper.vm.addTask('Task 6')
        await wrapper.vm.taskAlreadyDo(1, 'checked')
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(1)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)
    })

    it('if one of the tasks not yet done has been deleted', async ()=>{
        const wrapper = mount(Todo)
        await wrapper.vm.addTask('Task 1')
        await wrapper.vm.addTask('Task 2')
        await wrapper.vm.addTask('Task 3')
        await wrapper.vm.deleteTask(2)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(0)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(2)
    })

    it('if a done task is deleted', async ()=>{
        const wrapper = mount(Todo)
        await wrapper.vm.addTask('Task 1')
        await wrapper.vm.addTask('Task 2')
        await wrapper.vm.taskAlreadyDo(2, 'checked')
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(1)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)
        await wrapper.vm.deleteTask(2)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(0)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)
    })

    it('if a task changes state',async () =>{
        const wrapper = mount(Todo)
        await wrapper.vm.addTask('Task 1')
        await wrapper.vm.addTask('Task 3')
        await wrapper.vm.taskAlreadyDo(2, 'checked')
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(1)
        await wrapper.vm.taskAlreadyDo(2, 'unchecked')
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(2)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(0)
    })
})
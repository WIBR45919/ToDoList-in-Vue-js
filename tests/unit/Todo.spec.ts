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
        Date.now = jest.fn(()=> 12092001)
        await wrapper.vm.addTask('Task 1')
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('task').id).toBe(12092001)
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('task').description).toMatch('Task 1')
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('task').isDone).toBeFalsy()
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(0)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)

    })

    it('if this should display the tasks already done', async ()=>{
        const wrapper = mount(Todo)
        expect(wrapper.findComponent({ name: 'TaskDone' }).exists()).toBe(false)
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).exists()).toBe(false)
        Date.now = jest.fn(()=> 12092001)
        await wrapper.vm.addTask('Task 4')
        Date.now = jest.fn(()=> 12092002)
        await wrapper.vm.addTask('Task 3')
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('task').id).toBe(12092001)
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('task').description).toMatch('Task 4')
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).props('task').isDone).toBeFalsy()
        await wrapper.vm.toggleTaskStatus(12092001)
        await wrapper.vm.toggleTaskStatus(12092002)
        expect(wrapper.findComponent({ name: 'TaskDone' }).props('task').id).toBe(12092001)
        expect(wrapper.findComponent({ name: 'TaskDone' }).props('task').description).toMatch('Task 4')
        expect(wrapper.findComponent({ name: 'TaskDone' }).props('task').isDone).toBeTruthy()
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(2)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(0)
    })

    it('if this should display the tasks not yet done and those already done', async ()=>{
        const wrapper = mount(Todo)
        expect(wrapper.findComponent({ name: 'TaskDone' }).exists()).toBe(false)
        expect(wrapper.findComponent({ name: 'TaskNotDone' }).exists()).toBe(false)
        Date.now = jest.fn(()=> 12092001)
        await wrapper.vm.addTask('Task 5')
        Date.now = jest.fn(()=> 12092002)
        await wrapper.vm.addTask('Task 6')
        await wrapper.vm.toggleTaskStatus(12092001)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(1)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)
    })

    it('if one of the tasks not yet done has been deleted', async ()=>{
        const wrapper = mount(Todo)
        await wrapper.vm.addTask('Task 1')
        await wrapper.vm.addTask('Task 2')
        Date.now = jest.fn(()=> 12092001)
        await wrapper.vm.addTask('Task 3')
        await wrapper.vm.deleteTask(12092001)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(0)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(2)
    })

    it('if a done task is deleted', async ()=>{
        const wrapper = mount(Todo)
        await wrapper.vm.addTask('Task 1')
        Date.now = jest.fn(()=> 12092001)
        await wrapper.vm.addTask('Task 2')
        await wrapper.vm.toggleTaskStatus(12092001)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(1)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)
        await wrapper.vm.deleteTask(12092001)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(0)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)
    })

    it('if a task changes state',async () =>{
        const wrapper = mount(Todo)
        await wrapper.vm.addTask('Task 1')
        Date.now = jest.fn(()=> 12092001)
        await wrapper.vm.addTask('Task 3')
        await wrapper.vm.toggleTaskStatus(12092001)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(1)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(1)
        await wrapper.vm.toggleTaskStatus(12092001)
        expect(wrapper.findAllComponents({ name: 'TaskNotDone' }).length).toBe(2)
        expect(wrapper.findAllComponents({ name: 'TaskDone' }).length).toBe(0)
    })
})
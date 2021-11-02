import { mount } from '@vue/test-utils'
import InputTask from "@/components/InputTask.vue";

describe('InputTask.vue',() => {

  it('enter should be undefined',  () => {
    const wrapper = mount(InputTask)
    expect(wrapper.vm.enter.value).toBe(undefined)
  })

  it('if should emitted and emitted with value enter send with keyup.enter', async () => {
    const wrapper = mount(InputTask)
    wrapper.vm.enter = 'task one'
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.emitted('addTask')).toBeTruthy()
    expect(wrapper.emitted('addTask')[0]).toEqual(['task one'])
    expect(wrapper.vm.enter).toBe('')
  });

   it('if should emitted and emitted with value enter send with button click', async () => {
    const wrapper = mount(InputTask)
    wrapper.vm.enter = 'task two'
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('addTask')).toBeTruthy()
    expect(wrapper.emitted('addTask')[0]).toEqual(['task two'])
    expect(wrapper.vm.enter).toBe('')
  });

 it('if should emitted and emitted with value in input send with keyup.enter', async () => {
    const wrapper = mount(InputTask)
    await wrapper.find('input').setValue('task input one')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('addTask')).toBeTruthy()
    expect(wrapper.emitted('addTask')[0]).toEqual(['task input one'])
    expect(wrapper.vm.enter).toBe('')
  });

 it('if should emitted and emitted with value in input send with button click', async () => {
    const wrapper = mount(InputTask)
    await wrapper.find('input').setValue('task input two')
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.emitted('addTask')).toBeTruthy()
    expect(wrapper.emitted('addTask')[0]).toEqual(['task input two'])
    expect(wrapper.vm.enter).toBe('')
  });


})

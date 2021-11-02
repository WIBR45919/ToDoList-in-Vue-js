import { mount } from '@vue/test-utils'
import InputTask from "@/components/InputTask.vue";

describe('InputTask.vue',() => {

  const wrapper = mount(InputTask)

  it('enter should be undefined',  () => {
    expect(wrapper.vm.enter.value).toBe(undefined)
  })

  it('if should emitted and emitted with value with keyup', async () => {
    wrapper.vm.$emit('addTask', 'Task keyup')
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.emitted('addTask')).toBeTruthy()
    expect(wrapper.emitted('addTask')[0]).toEqual(['Task keyup'])
    expect(wrapper.vm.enter).toBe('')
  });

   it('if should emitted and emitted with value with button click', async () => {
    wrapper.vm.$emit('addTask', 'Task button')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('addTask')).toBeTruthy()
    expect(wrapper.emitted('addTask')[1]).toEqual(['Task button'])
    expect(wrapper.vm.enter).toBe('')
  });


})

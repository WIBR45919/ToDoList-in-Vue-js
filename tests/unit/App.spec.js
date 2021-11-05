import {mount} from "@vue/test-utils";
import App from "@/App.vue";

describe('App component',()=>{
    const wrapper = mount(App).findComponent({ name: 'Todo' })

    test('If Todo component exist in App',()=>{
        expect(wrapper.exists()).toBe(true)
    })
})
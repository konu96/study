import YesNo from './Sample.vue';
import { mount } from '@vue/test-utils';

describe('Clickevent', () => {
  it('click on yes button calls our method with argument "yes', () => {
    const wrapper = mount(YesNo, {
      propsData: {
        callMe: jest.fn(),
      },
    });

    wrapper.find('button.yes').trigger('click');
    expect(wrapper.vm.callMe).toHaveBeenCalledWith('yes');
  });
});

import axios from 'axios';
import { shallowMount } from '@vue/test-utils';
import Sample2 from './Sample2.vue';
jest.mock('axios')

describe('Sample2', () => {
  it('fetches async when a button is clicked', done => {
    axios.get.mockImplementation(() => Promise.resolve({ data: 'value' }))
    const wrapper = shallowMount(Sample2);
    wrapper.find('button').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.value).toBe('value');
      done();
    });
    expect(axios.get).toHaveBeenCalledWith('mock/service');
  });
});

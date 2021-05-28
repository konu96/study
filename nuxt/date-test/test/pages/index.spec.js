import { shallowMount } from '@vue/test-utils';
import IndexPage from '~/pages/index.vue'
import mockDate from 'mockdate';
import dayjs from 'dayjs';

describe('index', () => {
  describe('isToday', () => {
    mockDate.set('2021-05-20');
    test('YYYY-MM-DD の形式で当日の日付を渡すと true を返す', () => {
      const wrapper = shallowMount(IndexPage, {
        mocks: {
          $nuxt: {
            context: {
              $dayjs: dayjs
              },
            },
          },
        })
      expect(wrapper.vm.isToday('2021-05-20')).toBe(true)
    })

    test('YYYY-MM-DD の形式で当日以外の日付を渡すと false を返す', () => {
      const wrapper = shallowMount(IndexPage, {
        mocks: {
          $nuxt: {
            context: {
              $dayjs: dayjs
            },
          },
        },
      })
      expect(wrapper.vm.isToday('2021-05-24')).toBe(false)
    })
  })
})

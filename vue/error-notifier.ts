/*
 * notify warning and error to user by displaying message
 */
import Vue from 'vue';

import MessageContainer from '@/plugins/error-notifier/MessageContainer.vue';

export default (): void => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const vueContainer = document.createElement('div');
  const component = document.body.appendChild(vueContainer);

  /* eslint-disable no-new */
  new Vue({
    el: component,
    render(createElement) {
      return createElement(MessageContainer);
    },
  });
};


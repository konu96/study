import React from 'react';
import ReactDOM from 'react-dom';
import ActionCreator from './ActionCreator';
import Store from './Store';
import EventEmitter from './EventEmitter';

const dispacher = new EventEmitter();
const action = new ActionCreator(dispacher);
const store = new Store(dispacher);

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getCount(),
    };
    store.on('CHANGE', () => {
      this.onChange();
    });
  }
  onChange() {
    console.trace();
    this.setState({ count: store.getCount() });
  }

  tick() {
    action.countUp(this.state.count + 1);
  }

  render() {
    return (
      <div>
        <button onClick={this.tick.bind(this)}> Count Up </button>
        <p> Count: {this.state.count} </p>
      </div>
    );
  }
}
ReactDOM.render(
  React.createElement(Component),
  document.getElementById('app')
)

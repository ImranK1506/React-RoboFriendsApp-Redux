import React, { PureComponent } from 'react';

class CounterButton extends PureComponent {
   constructor() {
      super();
      this.state = {
         count: 0
      }
   }
   // React Lifecycle hook
   shouldComponentUpdate(nextProps, nextState) {
      if (this.state.count !== nextState.count) {
         return true
      }
      return false
   }

   updateCount = () => {
      this.setState(state => {
         return { count: this.state.count + 1 }
      })
   };

   render() {
      console.log('CounterButton here');
      return (
          <button className='f6 link dim ph3 pv2 mb2 dib white bg-black' onClick={this.updateCount}>
             Count: {this.state.count}
          </button>
      );
   }
}

export default CounterButton;

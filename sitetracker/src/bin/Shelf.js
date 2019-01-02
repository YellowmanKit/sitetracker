import React, { Component } from 'react';

class Shelf extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: ['egg','milk','bacon']
    }
  }
  render() {
    const shelfItems = this.state.items.map((item,index)=>{
      return <li key={index}><button onClick={()=>this.props.addItem(item)}>[+]</button>{item}</li>;
    });
    return (
      <div>
        <h2>Shelf</h2>
          <ul>
          {shelfItems}
          </ul>
      </div>
    );
  }
}

export default Shelf;

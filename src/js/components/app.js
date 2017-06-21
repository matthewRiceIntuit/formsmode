import React from 'react';
import Cell from './cell.js';
import configureStore from './../store/configure-store';
import { Provider } from 'react-redux';







export class App extends React.Component {

  constructor(props) {
    super(props);

    const initialState = {
      model: {}
    };


  }
  

  render() {
    const cells = this.props.frf.rows.map((row) => {
      return row.row.map((data) => {
        return (
          <Cell data={data.cell} fieldList={this.props.fieldList}/>
        );
      });
    });

    return (
      <Provider store={this.props.store}>
        <div className="container">
          {cells}
        </div>
      </Provider>
    );
  }
}

export default App;




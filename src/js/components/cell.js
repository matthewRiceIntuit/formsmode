import React, { Component, PropTypes } from 'react';
import Field from './field.js';


class Cell extends Component {


  renderText(cell) {
    return (
      <div
        style={{width: `${cell.width}px`}}
        className={`${cell.justification || ''} ${cell.leader || ''}`}
      >
        {cell.spans.map((span) => <span className={span.class}>{span.text}</span>) }
      </div>
    )
  }

  renderLine(cell) {
    return (
      <div style={{width: `${cell.width}px`}} className={cell.style}/>
    )
  }

  renderQuickZoom(cell) {
    return (
      <div style={{width: `${cell.width}px`}}>
        <button id={cell.binding} className='qzbutton'>QuickZoom</button>
      </div>
    )
  }

  renderField(cell) {
    return (
      <div style={{width: `${cell.width}px`}}>
        <Field data={cell}/>
      </div>
    )
  }


  renderGridline(cell) {
    return (
      <div style={{width: `${cell.width}px`}}>
        <div className={cell.style}/>
      </div>
    )
  }

  renderGridfield(cell) {
    return (
      <div style={{width: `${cell.width}px`}}>
        <div className={cell.style}>
          <Field data={cell.field}/>
        </div>
      </div>
    )
  }


  renderNone(cell) {
    return (<div style={{width: `${cell.width}px`}}/>)
  }


  render() {
    const cell = this.props.data;
    switch(cell.type){
      case 'line':
        return this.renderLine(cell);
      case 'text':
        return  this.renderText(cell);
      case 'field':
        if (cell.field_type == 'quickzoom')
          return this.renderQuickZoom(cell);
        return  this.renderField(cell);
      case 'gridline':
        return this.renderGridline(cell);
      case 'gridfield':
        return this.renderGridfield(cell);

      default:
        return this.renderNone(cell);

    }
  }
}

Cell.propTypes = {
  data: React.PropTypes.object
};



export default Cell;
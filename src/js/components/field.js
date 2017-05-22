import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { updateModel, updateModelSuccess } from './../actions/model-actions';

class Field extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value:  _.get(this.props.model,this.props.data.binding,"")

    };
    this.animate = this.animate.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.model  !== nextProps.model) {
      const val = _.get(nextProps.model,this.props.data.binding);
      if(val !== undefined && this.state.value !== val) {
        if(isNaN(val))
          this.setState({value:val});
        else{
          if (this.state.value=="") this.setState({value:0});
          let increment = Math.floor((val - this.state.value)/14) || 1;
          console.log(increment)
          setTimeout(()=> this.animate(increment,val),10)
        }
      }
    }
  }

  animate(increment,target){
    let val = this.state.value + increment;
    if((increment > 0 && val>target) || (increment < 0 && val < target)){
      this.setState({value:target});
    }
    else{
      this.setState({value:val});
      setTimeout(()=> this.animate(increment,target),30)
    }
  }


  onKeyPress(e){
    if(!this.props.data.enterable){
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    if(e.keyCode == 13){
      alert('Adding....');
    }
    const val = e.target.value

  }
  onBlur(e){
    const val = e.target.value

  }

  render() {
    const data = this.props.data;
    return (
      <input type={data.field_type == 'box'?'checkbox':'text'}
             id={data.binding}
             className={`${data.style}${(data.enterable)?' enterable':''}`}
             defaultValue={this.state.value}
             onKeyDown={this.onKeyPress}
             onBlur={this.onBlur}
      />
    );
  }
}

Field.propTypes = {
  data: PropTypes.object
};

function mapStateToProps(store) {
  return {
    model: store.model,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateModel: (frf) => dispatch(updateModel(frf)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);





import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { fire_external_event} from './../actions/external-event-actions';
import { setDataVal } from './../actions/model-actions';

class Field extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: _.get(this.props.model,this.props.data.binding,""),
      formatted_value: this.numberWithCommas( _.get(this.props.model,this.props.data.binding,""))

    };
    this.animate = this.animate.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.data.enterable && this.props.model !== nextProps.model) {
      let val = _.get(nextProps.model, this.props.data.binding);
      if (val !== undefined && this.state.value !== val) {
        if (this.props.data.field_type === 'dollar'){
          val = parseInt(val)
          if (this.state.value == "") this.setState({value: 0});
          let increment = Math.floor((val - this.state.value) / 14) || 1;
          setTimeout(() => this.animate(increment, val), 10)

        }
        else {
          this.setState({formatted_value:this.numberWithCommas(val)});
          this.setState({value:val});
        }
      }
    }
  }

  animate(increment,target){
    let val = parseInt(this.state.value) + increment;
    if((increment > 0 && val > target) || (increment < 0 && val < target)){
      this.setState({formatted_value:this.numberWithCommas(target)});
      this.setState({value:target});
    }
    else{
      this.setState({formatted_value:this.numberWithCommas(val)});
      this.setState({value:val});
      setTimeout(()=> this.animate(increment,target),30)
    }
  }

  numberWithCommas(x) {
    if(x=='') return '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'.';
  }


  onKeyPress(e){
    if(!this.props.data.enterable){
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    if(e.keyCode == 13){
      this.props.setDataVal(this.props.data.binding, e.target.value);
      e.target.blur()
      e.target.value = this.numberWithCommas(e.target.value)

    }
    if(this.props.data.field_type==='dollar' && e.keyCode != 8 && e.keyCode != 46
      && e.keyCode != 37 && e.keyCode != 39 && (e.keyCode < 48 || e.keyCode > 57)){
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  onFocus(e){
    if(this.props.data.field_type==='dollar'){
      e.target.value = e.target.value.replace(/\D/g,'');
    }
  }

  onBlur(e){
    const val = e.target.value

  }

  render() {

    const data = this.props.data;
    console.log(this.state.value)

    const props = {
      type:(data.field_type == 'box')?'checkbox':'text',
      id:data.binding,
      className:`${data.style}${(data.enterable)?' enterable':''}`,
      [data.enterable ? 'defaultValue' : 'value']:this.state.formatted_value,
      onKeyDown:this.onKeyPress,
      onBlur:this.onBlur,
      onFocus: this.onFocus
    };

    return (
      <input  {...props} />
    );
  }
}

Field.propTypes = {
  data: PropTypes.object
};

function mapStateToProps(store) {
  return {
    model: store.model,
    external_event: store.external_event
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDataVal: (binding, value) => dispatch( setDataVal(binding, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);





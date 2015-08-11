import React, {PropTypes, Component} from 'react/addons';

import {greatPlaceStyle} from './MyGreatPlaceStyles';

export default class MyGreatPlace extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}
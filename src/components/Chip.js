import React, {PropTypes} from 'react';
import MUIChip from 'material-ui/Chip';
import * as Constants from '../constants/ComponentTypes'

const chipStyle = {
  [ Constants.CHIP_TYPE_FLOATING ]: {
    float: 'left',
    margin: '24px 0 0 10px',
    height: '20px'
  },
  [ Constants.CHIP_TYPE_LIST ]: {
    margin: '4px'
  }
}

const chipLabelStyle = {
  [ Constants.CHIP_TYPE_FLOATING ]: {
    fontSize: '13px',
    lineHeight: '20px'
  }
}

export const Chip = (props) => (
  <MUIChip backgroundColor={props.backgroundColor} style={chipStyle[props.type]} labelStyle={chipLabelStyle[props.type]}
           onRequestDelete={props.onRequestDelete}>
    {props.children}
  </MUIChip>
)

Chip.propTypes = {
  type: PropTypes.string,
  backgroundColor: PropTypes.string,
  onRequestDelete: PropTypes.func,
  children: PropTypes.node
}
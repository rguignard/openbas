import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import * as Constants from '../../../../constants/ComponentTypes'
import {selectAudience} from '../../../../actions/Audience'
import {Drawer} from '../../../../components/Drawer'
import {List} from '../../../../components/List'
import {ListItemLink} from '../../../../components/list/ListItem';
import {Icon} from '../../../../components/Icon'
import Theme from '../../../../components/Theme'
import CreateAudience from './CreateAudience'

class AudienceNav extends Component {

  handleChangeAudience(audienceId) {
    this.props.selectAudience(this.props.exerciseId, audienceId)
  }

  switchColor(disabled) {
    if (disabled) {
      return Theme.palette.disabledColor
    } else {
      return Theme.palette.textColor
    }
  }

  render() {
    return (
      <Drawer width={300} docked={true} open={true} openSecondary={true} zindex={50}>
        <CreateAudience exerciseId={this.props.exerciseId}/>
        <List>
          {this.props.audiences.map(audience => {
            return (
              <ListItemLink
                grey={!audience.audience_enabled}
                type={Constants.LIST_ITEM_NOSPACE}
                key={audience.audience_id}
                active={this.props.selectedAudience === audience.audience_id}
                onClick={this.handleChangeAudience.bind(this, audience.audience_id)}
                label={audience.audience_name}
                leftIcon={<Icon name={Constants.ICON_NAME_SOCIAL_GROUP} color={this.switchColor(!audience.audience_enabled)}/>}
              />
            )
          })}
        </List>
      </Drawer>
    );
  }
}

AudienceNav.propTypes = {
  exerciseId: PropTypes.string,
  selectedAudience: PropTypes.string,
  audiences: PropTypes.array,
  selectAudience: PropTypes.func
}

export default connect(null, {selectAudience})(AudienceNav);

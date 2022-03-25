import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import {
  EmailOutlined,
  SmsOutlined,
  NotificationsActiveOutlined,
  HelpOutlined,
  SpeakerNotesOutlined,
  ApiOutlined,
} from '@mui/icons-material';
import { Mastodon, LockPattern, Twitter } from 'mdi-material-ui';

const iconSelector = (type, variant, fontSize, done) => {
  let style = {};
  switch (variant) {
    case 'inline':
      style = {
        width: 20,
        height: 20,
        margin: '0 7px 0 0',
        float: 'left',
      };
      break;
    default:
      style = {
        margin: 0,
      };
  }

  switch (type) {
    case 'openex_email':
      return (
        <EmailOutlined
          style={style}
          fontSize={fontSize}
          sx={{ color: done ? '#4caf50' : '#cddc39' }}
        />
      );
    case 'openex_ovh_sms':
      return (
        <SmsOutlined
          style={style}
          fontSize={fontSize}
          sx={{ color: done ? '#4caf50' : '#9c27b0' }}
        />
      );
    case 'openex_manual':
      return (
        <NotificationsActiveOutlined
          style={style}
          fontSize={fontSize}
          sx={{ color: done ? '#4caf50' : '#009688' }}
        />
      );
    case 'openex_mastodon':
      return (
        <Mastodon
          style={style}
          fontSize={fontSize}
          sx={{ color: done ? '#4caf50' : '#e91e63' }}
        />
      );
    case 'openex_lade':
      return (
        <LockPattern
          style={style}
          fontSize={fontSize}
          sx={{ color: done ? '#4caf50' : '#673ab7' }}
        />
      );
    case 'openex_gnu_social':
      return (
        <SpeakerNotesOutlined
          style={style}
          fontSize={fontSize}
          sx={{ color: done ? '#4caf50' : '#f44336' }}
        />
      );
    case 'openex_twitter':
      return (
        <Twitter
          style={style}
          fontSize={fontSize}
          sx={{ color: done ? '#4caf50' : '#2196f3' }}
        />
      );
    case 'openex_rest_api':
      return (
        <ApiOutlined
          style={style}
          fontSize={fontSize}
          sx={{ color: done ? '#4caf50' : '#00bcd4' }}
        />
      );
    default:
      return <HelpOutlined style={style} fontSize={fontSize} />;
  }
};

class InjectIcon extends Component {
  render() {
    const { type, size, variant, tooltip, done } = this.props;
    const fontSize = size || 'medium';
    if (tooltip) {
      return (
        <Tooltip title={tooltip}>
          {iconSelector(type, variant, fontSize, done)}
        </Tooltip>
      );
    }
    return iconSelector(type, variant, fontSize, done);
  }
}

InjectIcon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  tooltip: PropTypes.string,
  variant: PropTypes.string,
  done: PropTypes.bool,
};

export default InjectIcon;

import React from 'react';
import { HorizontalRule, SensorOccupied, Shield, TrackChanges } from '@mui/icons-material';
import { makeStyles, useTheme } from '@mui/styles';
import type { ExpectationResultsByType } from '../../../../utils/api-types';
import type { Theme } from '../../../../components/Theme';

const useStyles = makeStyles(() => ({
  inline: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
}));

interface Props {
  expectations: ExpectationResultsByType[] | undefined;
}

const AtomicTestingResult: React.FC<Props> = ({ expectations }) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const getColor = (result: string | undefined): string => {
    const colorMap: Record<string, string> = {
      VALIDATED: 'rgb(107, 235, 112)',
      FAILED: 'rgb(220, 81, 72)',
      UNKNOWN: theme.palette.mode === 'dark' ? 'rgb(202,203,206)' : 'rgba(53,52,49,0.62)',
    };

    return colorMap[result ?? ''] ?? 'rgb(245, 166, 35)';
  };

  if (!expectations || expectations.length === 0) {
    return <HorizontalRule/>;
  }

  return (
    <div className={classes.inline}>
      {expectations.map((expectation, index) => {
        const color = getColor(expectation.avgResult);
        let IconComponent;
        switch (expectation.type) {
          case 'PREVENTION':
            IconComponent = Shield;
            break;
          case 'DETECTION':
            IconComponent = TrackChanges;
            break;
          default:
            IconComponent = SensorOccupied;
        }
        return (
          <span key={index}>
            <IconComponent style={{ color, marginRight: 10 }}/>
          </span>
        );
      })}
    </div>
  );
};

export default AtomicTestingResult;
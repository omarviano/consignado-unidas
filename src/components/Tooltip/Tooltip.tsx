import { FC } from 'react';

import { useStyles } from './muiTooltipStyles';

import { TooltipProps } from './props';
import * as Styled from './styles';

const Tooltip: FC<TooltipProps> = props => {
  const { title, ...rest } = props;

  const classes = useStyles();

  return (
    <Styled.Tooltip
      title={title}
      {...rest}
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
        tooltipPlacementTop: classes.tooltipPlacementTop,
      }}
    >
      <Styled.TooltipText>{title}</Styled.TooltipText>
    </Styled.Tooltip>
  );
};

export { Tooltip };

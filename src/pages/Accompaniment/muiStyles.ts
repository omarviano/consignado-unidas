import { styled } from '@material-ui/core/styles';
import StepConnector, {
  stepConnectorClasses,
} from '@material-ui/core/StepConnector';

export const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 2px)',
    right: 'calc(50% + 2px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#0B9BD0',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#0B9BD0',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#C4C4C4',
    borderTopWidth: 3,
  },
}));

export const QontoStepIconRoot = styled('div')<{
  ownerState: { active?: boolean };
}>(({ ownerState }) => ({
  color: '#C4C4C4',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#0B9BD0',
  }),
  '& .QontoStepIcon-circle': {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#C4C4C4',
  },
  '& .QontoStepIcon-circle-colored': {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#0B9BD0',
    zIndex: 1,
  },
}));

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepIcon from '@mui/material/StepIcon';
import StepConnector from '@mui/material/StepConnector';
import { Button } from '@mui/material';
import { Check, Settings, GroupAdd, VideoLabel } from '@mui/icons-material';

// Define custom icons for each step
const customStepIcons = {
  1: <Settings />,
  2: <GroupAdd />,
  3: <VideoLabel />,
  4: <Check />,
};

function CustomStepIcon(props) {
  const { icon, active, completed } = props;

  return (
    <div>
      {/* Conditionally render the icon based on the step's state */}
      {completed ? (
        <Check style={{ color: 'green' }} />
      ) : (
        <div>{customStepIcons[String(icon)]}</div>
      )}
    </div>
  );
}

const steps = ['Choose your tools', 'Invite your Friends', 'Create an ad', 'Finish'];

export default function StepIconExample() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} connector={<StepConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

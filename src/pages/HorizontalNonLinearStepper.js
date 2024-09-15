import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import StepIcon from '@mui/material/StepIcon';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddchartIcon from '@mui/icons-material/Addchart';
import LineCard from  './LineCard'
import MiniLineChart from './MiniLineChart';

// Helper function to format the timestamp into "hh:mm am/pm" format
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format, replacing 0 with 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero to minutes
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export default function HorizontalNonLinearStepper({ timelineData, dataset, labels, villageIds }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return timelineData.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? timelineData.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {timelineData.map((data, index) => {
          const populationChange = data.population_increase >= 0 
            ? `+${data.population_increase}` 
            : `${data.population_increase}`;
          
          return (

            <Step key={index} sx={{p:1 }}completed={completed[index]} >
              
                
              <StepButton color="inherit"  onClick={handleStep(index)}>
              <StepLabel
                StepIconComponent={() => (
                  <Badge
                  sx={{ p: 0 }}
                  badgeContent={populationChange}
                  color={data.population_increase >= 0 ? 'success' : 'error'}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  
                <IconButton sx={{ color: (theme) => theme.palette.success.main }} >
                  <AddchartIcon />
                </IconButton>
                </Badge>
                
                  // <AddReactionIcon sx={{ color: (theme) => theme.palette.primary.main }} /> // Change the color and size here
                )}
              >
                
                {/* <Badge
                  sx={{ p: 0 }}
                  badgeContent={populationChange}
                  color={data.population_increase >= 0 ? 'success' : 'error'}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                <IconButton sx={{ color: (theme) => theme.palette.success.main }} >
                <AddReactionIcon sx={{ color: (theme) => theme.palette.primary.main }} /> 
                </IconButton>
                </Badge> */}
                {/* <StepContent TransitionProps={{ unmountOnExit: true }} >
                  <AddReactionIcon sx={{ color: (theme) => theme.palette.primary.main }} />
                  
                  <Typography variant="caption" sx={{ mt: 2, mb: 1, py: 1 }}>
                  {`${data.player.replace(/'/g, "")} ${formatTime(data.timestamp)} `} 
                    {timelineData[activeStep].region.replace(/'/g, "")}
                  </Typography>
                  
                  </StepContent> */}
                  {/* <AddReactionIcon sx={{ color: (theme) => theme.palette.primary.main }} /> */}
                  
                  <Typography variant="caption" sx={{ mt: 2, mb: 1, py: 1 }}>
                  {`${data.player.replace(/'/g, "")} ${formatTime(data.timestamp)} `} 
                    {timelineData[activeStep].region.replace(/'/g, "")}
                  </Typography>
                  <StepContent TransitionProps={{ unmountOnExit: true }} >
                  
                  <LineCard dataset={dataset } labels={labels} villageIds={villageIds} />
                  </StepContent>
                  
              </StepLabel>
                  
                  
              </StepButton>
              
            </Step>
            
            
          );
        })}
        
      </Stepper>
      
      {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - timeline finished.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== timelineData.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Mark as Seen'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      
    </Box>
  );
}

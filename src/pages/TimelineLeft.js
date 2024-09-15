import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import WelcomeCard from './WelcomeCard'
import { Typography } from '@mui/material';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

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

export default function TimelineLeft({ timelineData }) {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    > 

      {timelineData.map((data, index) => (
        <TimelineItem key={index} >                
          {/* Left side: formatted time */}
          <TimelineOppositeContent color="textSecondary">
          <Badge sx={{p:1}}
              badgeContent={data.population_increase>= 0 ? `+${data.population_increase}`:`-${data.population_increase}`}
              color="secondary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }} >
                  {formatTime(data.timestamp)}
            </Badge>
            
          </TimelineOppositeContent>

          {/* Middle separator with dot */}
          <TimelineSeparator>

            <TimelineDot color={data.population_increase>= 0 ? 'success':'error'} />
            {index < timelineData.length - 1 && <TimelineConnector />}
          </TimelineSeparator >

          {/* Right side: player information */}
          
          <TimelineContent >
            {`${data.player.replace(/'/g, "")} \n in ${data.region.replace(/'/g, "")}`}
            
          </TimelineContent>
          
          
        </TimelineItem>
      ))}
    </Timeline>
  );
}
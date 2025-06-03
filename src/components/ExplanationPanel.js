import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const ExplanationPanel = ({ explanation, output }) => {
  const parseExplanation = (text) => {
    if (!text) return [];
    return text.split('\n').map((line, index) => (
      <ListItem key={index}>
        <ListItemText primary={line} />
      </ListItem>
    ));
  };

  const getImpactLevel = (outputValue) => {
    if (outputValue < 0.2) return 'Low';
    if (outputValue < 0.5) return 'Moderate';
    return 'High';
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Model Explanation
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Impact Analysis
        </Typography>
        <List>
          {parseExplanation(explanation)}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Impact Level
        </Typography>
        <Typography variant="body1">
          The predicted biodiversity impact level is {getImpactLevel(output)}.
          This indicates that the current climate conditions have {getImpactLevel(output).toLowerCase()} potential to affect biodiversity.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="textSecondary">
          Note: The impact score is normalized between 0 and 1, where:
          <ul>
            <li>0-0.2: Low impact - Conditions are generally favorable for biodiversity</li>
            <li>0.2-0.5: Moderate impact - Some stress factors present</li>
            <li>0.5-1.0: High impact - Significant stress factors that could harm biodiversity</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ExplanationPanel;

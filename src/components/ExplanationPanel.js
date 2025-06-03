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
    if (outputValue < 0.2) return { level: 'Low', color: '#4CAF50' };
    if (outputValue < 0.5) return { level: 'Moderate', color: '#FFC107' };
    return { level: 'High', color: '#F44336' };
  };

  const getDetailedExplanation = (outputValue) => {
    const scenarios = {
      low: {
        title: 'Favorable Conditions',
        details: [
          'Environmental conditions are within optimal ranges',
          'Ecosystem stability is maintained',
          'Biodiversity is likely to be preserved',
          'Natural habitats remain largely intact'
        ]
      },
      moderate: {
        title: 'Concerning Trends',
        details: [
          'Some environmental stressors are present',
          'Ecosystem functions may be partially compromised',
          'Certain species might face adaptation challenges',
          'Habitat modifications are becoming noticeable'
        ]
      },
      high: {
        title: 'Critical Situation',
        details: [
          'Multiple severe environmental stressors detected',
          'Ecosystem functions are significantly threatened',
          'High risk of biodiversity loss',
          'Immediate conservation measures recommended'
        ]
      }
    };

    if (outputValue < 0.2) return scenarios.low;
    if (outputValue < 0.5) return scenarios.moderate;
    return scenarios.high;
  };

  const impactInfo = getImpactLevel(output);
  const detailedExplanation = getDetailedExplanation(output);

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mb: 2, border: `2px solid ${impactInfo.color}` }}>
        <Typography variant="h6" gutterBottom sx={{ color: impactInfo.color }}>
          Impact Level: {impactInfo.level}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {detailedExplanation.title}
        </Typography>
        <List>
          {detailedExplanation.details.map((detail, index) => (
            <ListItem key={index}>
              <ListItemText primary={detail} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Neural Network Analysis
        </Typography>
        <List>
          {parseExplanation(explanation)}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="textSecondary">
          Impact Score: {(output * 100).toFixed(1)}%
          <br />
          <br />
          Score Interpretation:
          <ul style={{ marginTop: 8 }}>
            <li>0-20%: Low impact - Favorable conditions for biodiversity</li>
            <li>20-50%: Moderate impact - Some concerning environmental trends</li>
            <li>50-100%: High impact - Critical situation requiring attention</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ExplanationPanel;
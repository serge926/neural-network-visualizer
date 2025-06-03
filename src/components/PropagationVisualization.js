import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Grid
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer } from 'recharts';

const PropagationVisualization = ({ inputs, weights, activations, showDetails, prediction }) => {
  const inputVariables = Object.keys(inputs);
  const inputValues = Object.values(inputs);

  // Calculate contribution of each input to final prediction
  const calculateInputContribution = (inputIndex) => {
    // Get weights from input layer to hidden layer 1
    const inputWeights = weights[0][inputIndex];
    const inputActivation = inputs[inputVariables[inputIndex]] / 100;
    
    // Calculate total contribution by summing absolute values of weighted inputs
    const contribution = inputWeights.reduce((sum, weight) => {
      // Get corresponding hidden layer activation
      const hiddenActivation = activations[1][inputWeights.indexOf(weight)];
      return sum + Math.abs(weight * inputActivation * hiddenActivation);
    }, 0);
    
    // Normalize contribution to 0-100 range
    return Math.min(100, contribution * 100);
  };

  // Create data for bar chart
  const chartData = inputVariables.map((variable, index) => ({
    name: variable,
    contribution: calculateInputContribution(index)
  }));

  const calculateActivation = (input, weights) => {
    return input * weights.reduce((sum, weight) => sum + Math.abs(weight), 0);
  };

  const calculateWeightedSum = (inputs, weights) => {
    return inputs.reduce((sum, input, i) => sum + input * weights[i], 0);
  };

  const getEcologicalImpact = (variable, value) => {
    switch (variable) {
      case 'temperature':
        return `Affects animal metabolism and breeding cycles. Current value: ${value}%`;
      case 'precipitation':
        return `Influences water availability and habitat conditions. Current value: ${value}%`;
      case 'vegetation':
        return `Provides food and shelter for herbivores. Current value: ${value}%`;
      case 'pollution':
        return `Reduces habitat quality and affects animal health. Current value: ${value}%`;
      default:
        return '';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Propagation Visualization
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Input Layer
        </Typography>
        <List>
          {Object.entries(inputs).map(([field, value]) => (
            <ListItem key={field}>
              <ListItemText
                primary={field}
                secondary={`${value}%`}
              />
              <Tooltip title={`Input value for ${field}`}>
                <IconButton size="small">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Hidden Layer 1
        </Typography>
        <List>
          {weights[0][0].map((weight, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`Node ${i + 1}`}
                secondary={`Activation: ${activations[0][i].toFixed(2)}`}
              />
              <ListItemSecondaryAction>
                <Typography variant="body2" color="textSecondary">
                  Weighted Sum: {calculateWeightedSum(Object.values(inputs), weights[0][i]).toFixed(2)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Output Layer
        </Typography>
        <List>
          {weights[2][0].map((weight, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`Final Prediction`}
                secondary={`Confidence: ${activations[2][0].toFixed(2)}%`}
              />
              <ListItemSecondaryAction>
                <Typography variant="body2" color="textSecondary">
                  Weighted Sum: {calculateWeightedSum(activations[1], weights[2][0]).toFixed(2)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {prediction && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Population Prediction
            </Typography>
            <Typography variant="subtitle1" color={prediction.status === 'Decline' ? 'error' : 
              prediction.status === 'Stable' ? 'warning' : 
              prediction.status === 'Growth' ? 'success' : 'primary'}>
              {prediction.status}
            </Typography>
            <Typography paragraph>
              {prediction.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Confidence: {prediction.confidence.toFixed(1)}%
            </Typography>

            {/* Input Contribution Chart */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Input Variable Contributions
              </Typography>
              <Paper sx={{ p: 2 }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="contribution" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Box>

            {/* Ecological Impact Explanation */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ecological Impact Analysis
              </Typography>
              <Grid container spacing={2}>
                {inputVariables.map((variable, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1">
                        {variable}
                      </Typography>
                      <Typography paragraph>
                        {getEcologicalImpact(variable, inputs[variable])}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
      </Paper>

      {showDetails && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Ecological Impact Analysis
          </Typography>
          <Typography paragraph>
            <strong>Temperature:</strong> {inputs.temperature}% - Affects animal metabolism and breeding cycles.
          </Typography>
          <Typography paragraph>
            <strong>Precipitation:</strong> {inputs.precipitation}% - Influences water availability and habitat conditions.
          </Typography>
          <Typography paragraph>
            <strong>Vegetation:</strong> {inputs.vegetation}% - Provides food and shelter for herbivores.
          </Typography>
          <Typography paragraph>
            <strong>Pollution:</strong> {inputs.pollution}% - Reduces habitat quality and affects animal health.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default PropagationVisualization;

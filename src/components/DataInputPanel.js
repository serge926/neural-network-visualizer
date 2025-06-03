import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const DataInputPanel = ({ inputs, onChange, onPreset, onRun, presets }) => {
  const inputRanges = {
    temperatureChange: { 
      min: -2, 
      max: 4, 
      unit: '°C',
      description: 'Change in average temperature relative to baseline'
    },
    precipitationChange: { 
      min: -30, 
      max: 30, 
      unit: '%',
      description: 'Percentage change in annual precipitation'
    },
    co2Levels: { 
      min: 400, 
      max: 800, 
      unit: 'ppm',
      description: 'Atmospheric CO2 concentration'
    },
    oceanAcidification: { 
      min: -0.5, 
      max: 1.0, 
      unit: 'pH units',
      description: 'Change in ocean pH levels'
    },
    seaLevelRise: { 
      min: -0.5, 
      max: 1.0, 
      unit: 'm',
      description: 'Change in sea level relative to baseline'
    },
    forestCover: { 
      min: 0, 
      max: 100, 
      unit: '%',
      description: 'Percentage of forest cover'
    },
    agriculturalLand: { 
      min: 0, 
      max: 100, 
      unit: '%',
      description: 'Percentage of agricultural land use'
    },
    urbanExpansion: { 
      min: 0, 
      max: 100, 
      unit: '%',
      description: 'Percentage of urban expansion'
    },
    pollutionIndex: { 
      min: -0.5, 
      max: 1.0, 
      unit: 'index',
      description: 'Environmental pollution index'
    },
    habitatFragmentation: { 
      min: -0.5, 
      max: 1.0, 
      unit: 'index',
      description: 'Habitat fragmentation index'
    },
    invasiveSpecies: { 
      min: 0, 
      max: 1.0, 
      unit: 'index',
      description: 'Invasive species pressure index'
    }
  };

  const formatLabel = (field, value) => {
    const range = inputRanges[field];
    return `${field} (${range.min}${range.unit} to ${range.max}${range.unit})`;
  };

  const formatDescription = (field) => {
    const range = inputRanges[field];
    return range.description;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Climate Variables
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: '#1976d2' }}>Preset Scenarios</InputLabel>
        <Select
          label="Preset Scenarios"
          onChange={(e) => onPreset(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#1976d2'
              },
              '&:hover fieldset': {
                borderColor: '#1976d2'
              }
            }
          }}
        >
          <MenuItem value="" sx={{ color: '#666' }}>None</MenuItem>
          {Object.keys(presets).map(scenario => (
            <MenuItem 
              key={scenario} 
              value={scenario}
              sx={{
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              {scenario}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {Object.entries(inputs).map(([field, value]) => {
          const range = inputRanges[field];
          return (
            <Grid item xs={12} key={field}>
              <TextField
                fullWidth
                label={formatLabel(field, value)}
                type="number"
                value={value}
                onChange={(e) => onChange(field, Number(e.target.value))}
                InputProps={{
                  inputProps: { min: range.min, max: range.max }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#1976d2'
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2'
                    }
                  }
                }}
              />
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                {formatDescription(field)}
              </Typography>
            </Grid>
          );
        })}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onRun}
        sx={{ 
          mt: 3,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 'bold',
          backgroundColor: '#2196f3',
          '&:hover': {
            backgroundColor: '#1976d2'
          }
        }}
      >
        Run Simulation
      </Button>

      <Typography variant="body2" color="textSecondary" sx={{ mt: 3, textAlign: 'center' }}>
        <strong>Model Predictions:</strong>
        <br />
        - Lower impact scores (0-0.2): Conditions favorable for biodiversity
        <br />
        - Moderate impact (0.2-0.5): Some stress factors present
        <br />
        - High impact (0.5-1.0): Significant environmental stress
      </Typography>
    </Box>
  );
};

export default DataInputPanel;

import * as tf from '@tensorflow/tfjs';
import React, { useState, useEffect } from 'react';
import NetworkVisualization from './components/NetworkVisualization';
import DataInputPanel from './components/DataInputPanel';
import ExplanationPanel from './components/ExplanationPanel';

// Predefined weights
const WEIGHTS = {
  // 10 inputs to first hidden layer (6 nodes)
  inputToHidden1: tf.tensor2d([
    [0.1, -0.2, 0.3, -0.4, 0.5, -0.6],
    [-0.1, 0.2, -0.3, 0.4, -0.5, 0.6],
    [0.2, -0.3, 0.4, -0.5, 0.6, -0.7],
    [-0.2, 0.3, -0.4, 0.5, -0.6, 0.7],
    [0.3, -0.4, 0.5, -0.6, 0.7, -0.8],
    [-0.3, 0.4, -0.5, 0.6, -0.7, 0.8],
    [0.4, -0.5, 0.6, -0.7, 0.8, -0.9],
    [-0.4, 0.5, -0.6, 0.7, -0.8, 0.9],
    [0.5, -0.6, 0.7, -0.8, 0.9, -1.0],
    [-0.5, 0.6, -0.7, 0.8, -0.9, 1.0]
  ], [10, 6]),

  // First hidden to second hidden (6 nodes)
  hidden1ToHidden2: tf.tensor2d([
    [0.2, -0.3, 0.4, -0.5, 0.6, -0.7],
    [-0.2, 0.3, -0.4, 0.5, -0.6, 0.7],
    [0.3, -0.4, 0.5, -0.6, 0.7, -0.8],
    [-0.3, 0.4, -0.5, 0.6, -0.7, 0.8],
    [0.4, -0.5, 0.6, -0.7, 0.8, -0.9],
    [-0.4, 0.5, -0.6, 0.7, -0.8, 0.9]
  ], [6, 6]),

  // Second hidden to third hidden (6 nodes)
  hidden2ToHidden3: tf.tensor2d([
    [0.3, -0.4, 0.5, -0.6, 0.7, -0.8],
    [-0.3, 0.4, -0.5, 0.6, -0.7, 0.8],
    [0.4, -0.5, 0.6, -0.7, 0.8, -0.9],
    [-0.4, 0.5, -0.6, 0.7, -0.8, 0.9],
    [0.5, -0.6, 0.7, -0.8, 0.9, -1.0],
    [-0.5, 0.6, -0.7, 0.8, -0.9, 1.0]
  ], [6, 6]),

  // Third hidden to fourth hidden (6 nodes)
  hidden3ToHidden4: tf.tensor2d([
    [0.4, -0.5, 0.6, -0.7, 0.8, -0.9],
    [-0.4, 0.5, -0.6, 0.7, -0.8, 0.9],
    [0.5, -0.6, 0.7, -0.8, 0.9, -1.0],
    [-0.5, 0.6, -0.7, 0.8, -0.9, 1.0],
    [0.6, -0.7, 0.8, -0.9, 1.0, -1.1],
    [-0.6, 0.7, -0.8, 0.9, -1.0, 1.1]
  ], [6, 6]),

  // Fourth hidden to output
  hidden4ToOutput: tf.tensor2d([
    [0.5],
    [-0.6],
    [0.7],
    [-0.8],
    [0.9],
    [-1.0]
  ], [6, 1])
};

function App() {
  const [inputs, setInputs] = useState({
    temperatureChange: 0,
    precipitationChange: 0,
    co2Levels: 400,
    oceanAcidification: 0,
    seaLevelRise: 0,
    forestCover: 100,
    agriculturalLand: 50,
    urbanExpansion: 0,
    pollutionIndex: 0,
    habitatFragmentation: 0,
    invasiveSpecies: 0
  });
  const [hiddenActivations, setHiddenActivations] = useState({
    hidden1: Array(6).fill(0),
    hidden2: Array(6).fill(0),
    hidden3: Array(6).fill(0),
    hidden4: Array(6).fill(0)
  });
  const [output, setOutput] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [explanation, setExplanation] = useState('');

  // Preset scenarios
  const presets = {
    'Current Trend': {
      temperatureChange: 1.5,
      precipitationChange: 0,
      co2Levels: 450
    },
    'Mitigation Scenario': {
      temperatureChange: 0.5,
      precipitationChange: 5,
      co2Levels: 420
    },
    'Worst Case': {
      temperatureChange: 4,
      precipitationChange: -20,
      co2Levels: 800
    }
  };

  // Forward propagation with improved architecture
  const forwardPropagation = async (inputs) => {
    try {
      // Normalize inputs
      const normalizedInputs = tf.tensor2d([
        [(inputs.temperatureChange + 2) / 6], // -2 to 4
        [(inputs.precipitationChange + 30) / 60], // -30 to 30
        [(inputs.co2Levels - 400) / 400], // 400 to 800
        [(inputs.oceanAcidification + 0.5) / 1.5], // -0.5 to 1.0
        [(inputs.seaLevelRise + 0.5) / 1.5], // -0.5 to 1.0
        [(inputs.forestCover - 50) / 50], // 0 to 100
        [(inputs.agriculturalLand - 25) / 75], // 0 to 100
        [(inputs.urbanExpansion - 25) / 75], // 0 to 100
        [(inputs.pollutionIndex + 0.5) / 1.5], // -0.5 to 1.0
        [(inputs.habitatFragmentation + 0.5) / 1.5] // -0.5 to 1.0
      ], [10, 1]); // Explicitly set shape

      // Input to first hidden layer with LeakyReLU
      const hidden1Input = normalizedInputs.transpose().matMul(WEIGHTS.inputToHidden1);
      const hidden1Activation = hidden1Input.leakyRelu(0.1);
      
      // First hidden to second hidden with ELU
      const hidden2Input = hidden1Activation.matMul(WEIGHTS.hidden1ToHidden2);
      const hidden2Activation = hidden2Input.elu();
      
      // Second hidden to third hidden with Tanh
      const hidden3Input = hidden2Activation.matMul(WEIGHTS.hidden2ToHidden3);
      const hidden3Activation = hidden3Input.tanh();
      
      // Third hidden to fourth hidden with ReLU
      const hidden4Input = hidden3Activation.matMul(WEIGHTS.hidden3ToHidden4);
      const hidden4Activation = hidden4Input.relu();
      
      // Fourth hidden to output with sigmoid activation
      const outputTensor = hidden4Activation.matMul(WEIGHTS.hidden4ToOutput);
      const outputValue = outputTensor.sigmoid().dataSync()[0];

      // Update hidden layer activations
      setHiddenActivations({
        hidden1: hidden1Activation.dataSync(),
        hidden2: hidden2Activation.dataSync(),
        hidden3: hidden3Activation.dataSync(),
        hidden4: hidden4Activation.dataSync()
      });

      // Update output
      setOutput(outputValue);

      // Generate explanation
      const explanation = generateExplanation(
      inputs,
      hidden1Activation.dataSync(),
      hidden2Activation.dataSync(),
      hidden3Activation.dataSync(),
      hidden4Activation.dataSync(),
      outputValue
    );
      setExplanation(explanation);

      // Trigger animation
      setShowAnimation(true);

      // Clean up tensors
      normalizedInputs.dispose();
      hidden1Input.dispose();
      hidden1Activation.dispose();
      hidden2Input.dispose();
      hidden2Activation.dispose();
      hidden3Input.dispose();
      hidden3Activation.dispose();
      hidden4Input.dispose();
      hidden4Activation.dispose();
      outputTensor.dispose();

      // Reset animation after completion
      setTimeout(() => setShowAnimation(false), 1000);
    } catch (error) {
      console.error('Error in forward propagation:', error);
      // Set default values on error
      setHiddenActivations({ hidden: Array(6).fill(0) });
      setHiddenActivations({ hidden: Array(5).fill(0) });
      setOutput(0);
      setExplanation('Error occurred during calculation');
    }
  };

  const generateExplanation = (inputs, hidden1Values, hidden2Values, hidden3Values, hidden4Values, output) => {
    const explanations = [];
    
    // Analyze hidden layer activations
    hidden1Values.forEach((value, index) => {
      if (Math.abs(value) > 0.1) {
        explanations.push(`Hidden node ${index + 1} has strong activation (${value.toFixed(2)})`);
      }
    });
    hidden2Values.forEach((value, index) => {
      if (Math.abs(value) > 0.1) {
        explanations.push(`Hidden node ${index + 1} has strong activation (${value.toFixed(2)})`);
      }
    });

    // Analyze input patterns
    if (inputs.temperatureChange > 0 && inputs.precipitationChange < 0) {
      explanations.push('Increased temperature with decreased precipitation creates stress conditions');
    }
    if (inputs.co2Levels > 600) {
      explanations.push('High CO2 levels contribute to ocean acidification');
    }

    return explanations.join('\n');
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    const newValue = {
      temperatureChange: Math.min(4, Math.max(-2, value)),
      precipitationChange: Math.min(30, Math.max(-30, value)),
      co2Levels: Math.min(800, Math.max(400, value))
    }[field];
    
    setInputs(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  // Handle preset scenarios
  const handlePreset = (scenario) => {
    setInputs(presets[scenario]);
  };

  // Run simulation
  const runSimulation = () => {
    forwardPropagation(inputs);
  };

  // Run simulation when inputs change
  useEffect(() => {
    forwardPropagation(inputs);
  }, [inputs]);

  return (
    <div className="container" style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#2196f3',
        textAlign: 'center',
        marginBottom: '30px'
      }}>Biodiversity Impact Neural Network</h1>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '30px',
        marginTop: '20px'
      }}>
        <div className="panel" style={{
          background: '#f5f5f5',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#1976d2',
            marginBottom: '20px'
          }}>Network Visualization</h2>
          <div className="visualization" style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <NetworkVisualization 
              inputs={inputs}
              hiddenActivations={hiddenActivations}
              output={output}
              weights={WEIGHTS}
              showAnimation={showAnimation}
              onAnimationEnd={() => setShowAnimation(false)}
            />
          </div>
        </div>

        <div className="panel" style={{
          background: '#f5f5f5',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#1976d2',
            marginBottom: '20px'
          }}>Climate Variables</h2>
          <DataInputPanel
            inputs={inputs}
            onChange={handleInputChange}
            onPreset={handlePreset}
            onRun={runSimulation}
            presets={presets}
          />
        </div>

        <div className="panel" style={{
          background: '#f5f5f5',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#1976d2',
            marginBottom: '20px'
          }}>Impact Analysis</h2>
          <ExplanationPanel explanation={explanation} output={output} />
        </div>
      </div>
    </div>
  );
}

export default App;

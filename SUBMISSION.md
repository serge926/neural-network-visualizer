# Neural Network Visualization Application

## Project Overview

This application is an interactive neural network visualizer that demonstrates forward propagation through a neural network designed to predict biodiversity impact based on environmental factors. The application uses TensorFlow.js for tensor operations and provides a user-friendly interface built with Material-UI.

## Key Features

1. **Interactive Neural Network Visualization**
   - 10 input nodes representing various environmental factors
   - 4 hidden layers with different activation functions
   - Real-time forward propagation calculations
   - Visual representation of weights and activations

2. **Data Input Interface**
   - 10 environmental variables with appropriate ranges
   - Preset scenarios for common environmental conditions
   - Real-time validation and normalization

3. **Prediction Explanation**
   - Detailed breakdown of how inputs affect predictions
   - Visual representation of activation values
   - Impact analysis of each environmental factor

## Technical Implementation

### Neural Network Architecture

1. **Input Layer** (10 nodes)
   - Temperature Change (°C)
   - Precipitation Change (%)
   - CO2 Levels (ppm)
   - Ocean Acidification (pH units)
   - Sea Level Rise (m)
   - Forest Cover (%)
   - Agricultural Land Use (%)
   - Urban Expansion (%)
   - Pollution Index
   - Habitat Fragmentation
   - Invasive Species Pressure

2. **Hidden Layers** (4 layers with 6 nodes each)
   - Hidden Layer 1: LeakyReLU activation
   - Hidden Layer 2: ELU activation
   - Hidden Layer 3: Tanh activation
   - Hidden Layer 4: ReLU activation

3. **Output Layer** (1 node)
   - Sigmoid activation for predicting biodiversity impact
   - Output range: 0-1

### Technical Stack

- **Frontend**: React 18 with TypeScript
- **Machine Learning**: TensorFlow.js
- **UI Framework**: Material-UI
- **Data Visualization**: Recharts
- **Animations**: Framer Motion, React Spring
- **State Management**: React Context
- **Development Tools**: Create React App

## Running the Application

1. Prerequisites:
   - Node.js (v14 or higher)
   - npm (comes with Node.js)

2. Installation:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Access the application at http://localhost:3000

## Project Structure

```
src/
├── components/
│   ├── DataInputPanel.js
│   ├── NetworkVisualization.js
│   └── ExplanationPanel.js
├── App.js
└── index.css
```

## Development Process

### What Worked Well

1. **Architecture Expansion**: The application successfully expanded from a basic neural network to a more complex architecture with multiple hidden layers and activation functions.

2. **Code Generation**: The development process effectively utilized modern development tools to generate complex tensor operations and ensure proper weight matrix dimensions.

3. **UI Implementation**: The Material-UI components were implemented efficiently, creating a responsive and user-friendly interface.

### Challenges

1. **State Management**: Managing complex state across multiple components required careful attention to ensure proper data flow and synchronization.

2. **Tensor Operations**: Ensuring proper tensor shapes and handling memory management with TensorFlow.js operations was challenging and required multiple iterations.

3. **Visualization**: Creating an interactive visualization that accurately represented the neural network architecture while maintaining performance was complex.

## Future Improvements

1. **Enhanced Visualization**: Add more interactive features to the neural network visualization
2. **Additional Features**: Implement backward propagation visualization
3. **Performance Optimization**: Further optimize tensor operations for better performance
4. **Testing**: Add comprehensive unit and integration tests
5. **Documentation**: Expand documentation for better user understanding

2. **Performance Optimization**: Fine-tuning performance and memory management required human expertise.

3. **Integration**: Ensuring all components worked together seamlessly required careful planning and testing.

Overall, the combination of AI-assisted development and traditional coding produced a robust application that demonstrates forward propagation in a neural network effectively.

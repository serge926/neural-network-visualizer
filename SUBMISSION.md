# Neural Network Visualization Application

## Prompt Log

1. Initial Setup:
- Created React app with TensorFlow.js integration
- Implemented basic neural network visualization
- Added input panel for climate variables

2. Architecture Expansion:
- Expanded network to 10 inputs and 4 hidden layers
- Updated weights and forward propagation
- Enhanced visualization with multiple hidden layers

3. UI Improvements:
- Added Material-UI components
- Implemented responsive grid layout
- Added preset scenarios and explanations

## Application Code

The complete codebase is available in this repository. Key components include:

1. `src/App.js`: Main application component with neural network architecture and forward propagation
2. `src/components/DataInputPanel.js`: User interface for input variables
3. `src/components/NetworkVisualization.js`: Interactive neural network visualization
4. `src/components/ExplanationPanel.js`: Detailed explanations of predictions

## Documentation

### How the Application Works

This application demonstrates forward propagation in a neural network with:

1. **Input Layer** (10 nodes):
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

2. **Hidden Layers** (4 layers with 6 nodes each):
   - Hidden Layer 1: LeakyReLU activation
   - Hidden Layer 2: ELU activation
   - Hidden Layer 3: Tanh activation
   - Hidden Layer 4: ReLU activation

3. **Output Layer** (1 node):
   - Sigmoid activation for predicting biodiversity impact

The forward propagation process:
1. Normalizes input values to appropriate ranges
2. Performs matrix multiplication through each layer
3. Applies activation functions at each layer
4. Produces a final output between 0 and 1

## Demo

The application can be run locally by:
1. Cloning the repository
2. Running `npm install`
3. Running `npm start`
4. Accessing http://localhost:3000

## Reflection

### What Worked Well

1. **Architecture Expansion**: Using AI tools made it straightforward to expand the neural network architecture from a basic model to a more complex one with multiple hidden layers and different activation functions.

2. **Code Generation**: The AI was particularly helpful in generating complex tensor operations and ensuring proper weight matrix dimensions for the expanded architecture.

3. **UI Components**: The AI effectively created responsive Material-UI components and handled the layout for multiple input fields efficiently.

### Challenges

1. **State Management**: Managing complex state across multiple components required careful attention to ensure proper data flow and synchronization.

2. **Tensor Operations**: Ensuring proper tensor shapes and handling memory management with TensorFlow.js operations was challenging and required multiple iterations.

3. **Visualization**: Creating an interactive visualization that accurately represented the expanded neural network architecture while maintaining performance was complex.

### Comparison to Traditional Coding

Using AI tools significantly accelerated the development process by:

1. **Reducing Boilerplate**: Automatically generating component structures and common patterns saved time.

2. **Error Reduction**: The AI helped catch potential issues early in the development process.

3. **Learning Curve**: The AI provided explanations and examples that helped bridge gaps in understanding complex concepts like tensor operations.

However, traditional coding was still necessary for:

1. **Debugging**: Identifying and fixing specific issues required manual intervention.

2. **Performance Optimization**: Fine-tuning performance and memory management required human expertise.

3. **Integration**: Ensuring all components worked together seamlessly required careful planning and testing.

Overall, the combination of AI-assisted development and traditional coding produced a robust application that demonstrates forward propagation in a neural network effectively.

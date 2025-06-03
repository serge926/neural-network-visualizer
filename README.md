# Neural Network Visualizer

An interactive web application that visualizes the forward propagation of a neural network designed to predict biodiversity impact based on environmental factors.

## Features

- Interactive neural network visualization with 10 input nodes and 4 hidden layers
- Real-time forward propagation calculations
- Material-UI based responsive interface
- Preset scenarios for different environmental conditions
- Detailed explanations of predictions
- TensorFlow.js integration for tensor operations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) to view the application

## Technologies Used

- React 18
- TensorFlow.js
- Material-UI
- Recharts for data visualization
- Framer Motion for animations
- React Spring for smooth transitions

## Project Structure

- `src/`: Source code directory
  - `components/`: React components
    - `DataInputPanel.js`: User interface for input variables
    - `NetworkVisualization.js`: Neural network visualization
    - `ExplanationPanel.js`: Prediction explanations
  - `App.js`: Main application component
  - `index.css`: Global styles

## License

This project is for educational purposes only.

## Acknowledgments

- React and React Native
- TensorFlow.js
- Material-UI team
- Recharts contributors

import React from 'react';
import { motion } from 'framer-motion';

const NetworkVisualization = ({ inputs = {}, hiddenActivations = {}, output = 0, showAnimation = false, onAnimationEnd, weights = {} }) => {
  // Enhanced neural network structure
  const layers = [
    { id: 'input', nodes: 10, label: 'Input Layer', color: '#4CAF50' },
    { id: 'hidden1', nodes: 6, label: 'Hidden Layer 1', color: '#2196F3' },
    { id: 'hidden2', nodes: 6, label: 'Hidden Layer 2', color: '#9C27B0' },
    { id: 'hidden3', nodes: 6, label: 'Hidden Layer 3', color: '#FFC107' },
    { id: 'hidden4', nodes: 6, label: 'Hidden Layer 4', color: '#00BCD4' },
    { id: 'output', nodes: 1, label: 'Output Layer', color: '#FF9800' }
  ];

  // Node positions
  const nodePositions = layers.map((layer, layerIndex) => {
    const ySpacing = 100;
    const x = layerIndex * 200 + 100;
    return Array.from({ length: layer.nodes }, (_, i) => ({
      id: `${layer.id}-${i}`,
      x,
      y: i * ySpacing + 50,
      layer: layer.id
    }));
  }).flat();

  // Get weights from props with default values
  const weightMatrices = {
    inputToHidden1: weights?.inputToHidden1?.arraySync() || Array(10).fill(Array(6).fill(0)),
    hidden1ToHidden2: weights?.hidden1ToHidden2?.arraySync() || Array(6).fill(Array(6).fill(0)),
    hidden2ToHidden3: weights?.hidden2ToHidden3?.arraySync() || Array(6).fill(Array(6).fill(0)),
    hidden3ToHidden4: weights?.hidden3ToHidden4?.arraySync() || Array(6).fill(Array(6).fill(0)),
    hidden4ToOutput: weights?.hidden4ToOutput?.arraySync() || Array(6).fill([0])
  };

  // Calculate connections and their weights
  const connections = [];

  // Get input values with default values
  const inputValues = Object.values(inputs || {});
  
  // Get hidden activations with default values
  const hiddenActivationsArrays = {
    hidden1: hiddenActivations?.hidden1 || Array(6).fill(0),
    hidden2: hiddenActivations?.hidden2 || Array(6).fill(0),
    hidden3: hiddenActivations?.hidden3 || Array(6).fill(0),
    hidden4: hiddenActivations?.hidden4 || Array(6).fill(0)
  };

  for (let i = 0; i < layers.length - 1; i++) {
    const fromLayer = layers[i];
    const toLayer = layers[i + 1];
    const weightMatrix = i === 0 ? weightMatrices.inputToHidden1 :
                        i === 1 ? weightMatrices.hidden1ToHidden2 :
                        i === 2 ? weightMatrices.hidden2ToHidden3 :
                        i === 3 ? weightMatrices.hidden3ToHidden4 :
                        weightMatrices.hidden4ToOutput;
    
    for (let j = 0; j < fromLayer.nodes; j++) {
      for (let k = 0; k < toLayer.nodes; k++) {
        const weight = weightMatrix[j]?.[k] || 0;
        const value = i === 0 ? (inputValues[j] || 0) * weight :
                      i === 1 ? (hiddenActivationsArrays.hidden1[j] || 0) * weight :
                      i === 2 ? (hiddenActivationsArrays.hidden2[j] || 0) * weight :
                      i === 3 ? (hiddenActivationsArrays.hidden3[j] || 0) * weight :
                      (hiddenActivationsArrays.hidden4[j] || 0) * weight;
        
        connections.push({
          from: `${fromLayer.id}-${j}`,
          to: `${toLayer.id}-${k}`,
          weight,
          value: value || 0,
          layer: fromLayer.id
        });
      }
    }
  }

  // Node activation values with default values
  const nodeValues = {
    input: Object.values(inputs || {}),
    hidden1: hiddenActivations?.hidden1 || Array(6).fill(0),
    hidden2: hiddenActivations?.hidden2 || Array(6).fill(0),
    hidden3: hiddenActivations?.hidden3 || Array(6).fill(0),
    hidden4: hiddenActivations?.hidden4 || Array(6).fill(0),
    output: [output]
  };

  // Enhanced animation variants
  const lineVariants = {
    hidden: { 
      opacity: 0, 
      strokeWidth: 1,
      pathLength: 0
    },
    visible: { 
      opacity: 1, 
      strokeWidth: 2,
      pathLength: 1
    }
  };

  const nodeVariants = {
    hidden: { 
      scale: 0.8, 
      fill: '#ddd',
      opacity: 0.5
    },
    visible: { 
      scale: 1, 
      fill: '#fff',
      opacity: 1
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '700px', 
      position: 'relative', 
      background: '#f5f5f5',
      borderRadius: '10px',
      padding: '20px'
    }}>
      <svg width="100%" height="700" viewBox="0 0 1200 700">
        {/* Connections */}
        {connections.map((conn) => {
          const fromNode = nodePositions.find(n => n.id === conn.from);
          const toNode = nodePositions.find(n => n.id === conn.to);
          const layerColor = layers.find(l => l.id === conn.layer).color;
          
          return (
            <motion.path
              key={conn.from + '-' + conn.to}
              d={`M${fromNode.x},${fromNode.y}Q${(fromNode.x + toNode.x) / 2},${(fromNode.y + toNode.y) / 2} ${toNode.x},${toNode.y}`}
              stroke={`hsl(${Math.abs(conn.weight) * 120}, 100%, 50%)`}
              strokeWidth={Math.abs(conn.value) * 2 + 1}
              fill="none"
              initial={showAnimation ? 'hidden' : 'visible'}
              animate="visible"
              variants={lineVariants}
              transition={{ 
                duration: 0.5,
                delay: Math.random() * 0.2
              }}
              onAnimationComplete={() => {
                if (onAnimationEnd && !showAnimation) {
                  onAnimationEnd();
                }
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodePositions.map((node) => {
          const layer = layers.find(l => l.id === node.layer);
          const value = nodeValues[node.layer]?.[node.id.split('-')[1]] || 0;
          const fill = `hsl(${Math.abs(value) * 120}, 100%, 50%)`;
          const stroke = layer.color;
          
          return (
            <motion.g
              key={node.id}
              initial={showAnimation ? 'hidden' : 'visible'}
              animate="visible"
              variants={nodeVariants}
              transition={{ 
                duration: 0.5,
                delay: Math.random() * 0.2
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={fill}
                stroke={stroke}
                strokeWidth="3"
              >
                <title>
                  {node.layer === 'input' && Object.keys(inputs || {})[node.id.split('-')[1]]}
                </title>
              </circle>
              {node.layer === 'input' && (
                <text
                  x={node.x}
                  y={node.y + 40}
                  fill={stroke}
                  fontSize="12"
                  textAnchor="middle"
                >
                  {Object.keys(inputs || {})[node.id.split('-')[1]]}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Layer labels */}
        {layers.map((layer, index) => (
          <motion.text
            key={layer.id}
            x={index * 300 + 150}
            y="20"
            fill={layer.color}
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            initial={showAnimation ? 'hidden' : 'visible'}
            animate="visible"
            variants={nodeVariants}
            transition={{ duration: 0.5 }}
          >
            {layer.label}
          </motion.text>
        ))}
      </svg>
    </div>
  );
};

export default NetworkVisualization;
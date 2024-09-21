import React from 'react';

const SeverityIndicator = ({ value }) => {
  const severityLevel = Math.min(Math.max(value, 0), 10);
  const red = Math.floor(255 * (severityLevel / 10));
  const green = Math.floor(255 * (1 - severityLevel / 10));
  const blue = 0; // You can adjust this value based on your requirements

  const color = `rgb(${red}, ${green}, ${blue})`;

  return (
    <div
      style={{
        backgroundColor: color,
        width: '10%',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
    >
      {severityLevel}
    </div>
  );
};

export default SeverityIndicator;
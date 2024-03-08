import { useEffect } from 'react';
import './matrixBackground.css';

const MatrixBackground = () => {
  useEffect(() => {
    const createMatrixEffect = () => {
      const matrixContainer = document.getElementById('matrix-container');
      const columns = Math.floor(window.innerWidth / 60); // Adjust the width of each column as needed
      const chars = ['0', '1'];
      const windowHeight = window.innerHeight;

      // Create columns with varying numbers of characters
      for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.height = windowHeight + 'px'; // Set height of column
        matrixContainer.appendChild(column);

        // Determine the number of characters for this column (between 5 and 15)
        const numChars = Math.floor(Math.random() * 2) + 5;
        
        // Fill columns with random characters
        for (let j = 0; j < numChars; j++) {
          const char = document.createElement('span');
          char.textContent = chars[Math.floor(Math.random() * chars.length)];
          column.appendChild(char);
        }
      }

      // Animate falling characters
      setInterval(() => {
        const columns = matrixContainer.children;
        for (let i = 0; i < columns.length; i++) {
          const column = columns[i];
          const firstChar = column.children[0];
          const newChar = document.createElement('span');
          newChar.textContent = chars[Math.floor(Math.random() * chars.length)];
          column.removeChild(firstChar);
          column.appendChild(newChar);
        }
      }, 300); // Increase the interval for slower fall
    };

    createMatrixEffect();

    // Cleanup
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <div id="matrix-container" className="matrix-container"></div>
  );
};

export default MatrixBackground;

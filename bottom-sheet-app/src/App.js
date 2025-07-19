import React, { useState } from 'react';
import BottomSheet from './components/BottomSheet';
import DemoContent from './components/DemoContent';
import './App.css';

function App() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
    // Prevent body scroll when bottom sheet is open
    document.body.classList.add('bottom-sheet-open');
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    // Re-enable body scroll when bottom sheet is closed
    document.body.classList.remove('bottom-sheet-open');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero-section">
          <h1>React Bottom Sheet Demo</h1>
          <p>
            A custom bottom sheet component with multiple snap points and spring motion animations.
            Built without external animation libraries for optimal performance.
          </p>
          
          <button 
            className="open-button"
            onClick={openBottomSheet}
            aria-describedby="bottom-sheet-description"
          >
            Open Bottom Sheet
          </button>
          
          <p id="bottom-sheet-description" className="description">
            Click to open a bottom sheet with three snap points: closed, half-open, and fully open.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Multiple Snap Points</h3>
            <p>Three distinct positions: closed, half-open, and fully open with smooth transitions between them.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌊</div>
            <h3>Spring Motion</h3>
            <p>Custom spring animations provide natural, physics-based movement without external libraries.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👆</div>
            <h3>Gesture Support</h3>
            <p>Drag and release with velocity detection for intuitive touch and mouse interactions.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Optimized for both desktop and mobile devices with adaptive layouts and touch handling.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">♿</div>
            <h3>Accessibility</h3>
            <p>Full keyboard navigation, ARIA labels, and screen reader support for inclusive design.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Performance</h3>
            <p>Optimized animations using requestAnimationFrame and CSS transforms for 60fps performance.</p>
          </div>
        </div>

        <div className="demo-instructions">
          <h2>How to Use</h2>
          <div className="instructions-grid">
            <div className="instruction">
              <strong>Drag & Drop:</strong> Click and drag the handle or any part of the sheet
            </div>
            <div className="instruction">
              <strong>Buttons:</strong> Use the control buttons at the bottom of the sheet
            </div>
            <div className="instruction">
              <strong>Keyboard:</strong> Press Escape to close, Arrow keys to navigate
            </div>
            <div className="instruction">
              <strong>Backdrop:</strong> Click the dark area behind the sheet to close
            </div>
          </div>
        </div>
      </header>

      <BottomSheet 
        isOpen={isBottomSheetOpen} 
        onClose={closeBottomSheet}
      >
        <DemoContent />
      </BottomSheet>
    </div>
  );
}

export default App;

import React from 'react';
import './BottomSheet.css';

const DemoContent = () => {
  return (
    <div className="demo-content">
      <h3>Welcome to the Bottom Sheet Demo!</h3>
      <p>
        This is a fully functional bottom sheet component with three snap points:
        closed, half-open, and fully open. You can interact with it using:
      </p>
      
      <ul className="demo-list">
        <li><strong>Drag and Drop:</strong> Grab the handle or any part of the sheet and drag up/down</li>
        <li><strong>Buttons:</strong> Use the control buttons at the bottom</li>
        <li><strong>Keyboard:</strong> Press Escape to close, Arrow Up/Down to navigate</li>
        <li><strong>Backdrop:</strong> Click the dark area behind to close</li>
      </ul>

      <div className="demo-card">
        <h4>🚀 Features</h4>
        <p>Custom spring animations, velocity-based snapping, and responsive design</p>
      </div>

      <div className="demo-card">
        <h4>📱 Mobile Friendly</h4>
        <p>Optimized for touch interactions with proper gesture handling</p>
      </div>

      <div className="demo-card">
        <h4>♿ Accessible</h4>
        <p>Full keyboard navigation, ARIA labels, and screen reader support</p>
      </div>

      <div className="demo-card">
        <h4>🎨 Customizable</h4>
        <p>Easy to theme and modify snap points for your specific needs</p>
      </div>

      <h3>Try Different Interactions</h3>
      <p>
        Experiment with different gestures and speeds. The bottom sheet uses 
        velocity-based snapping to provide a natural feel when you release 
        your drag gesture.
      </p>

      <div className="demo-card">
        <h4>💡 Pro Tip</h4>
        <p>
          Try flicking the sheet quickly up or down - the velocity detection 
          will snap it to the appropriate position even if you don't drag it 
          all the way!
        </p>
      </div>

      <p>
        This implementation doesn't rely on external animation libraries like 
        Framer Motion or React Spring, instead using custom requestAnimationFrame-based 
        animations for optimal performance.
      </p>

      <div className="demo-card">
        <h4>🔧 Technical Details</h4>
        <p>
          Built with React Hooks, custom spring animations, and CSS transforms. 
          Supports both touch and mouse events for cross-platform compatibility.
        </p>
      </div>

      <h3>More Content</h3>
      <p>
        This content area is scrollable when there's overflow. The bottom sheet 
        maintains its snap behavior even when content is being scrolled.
      </p>

      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="demo-card">
          <h4>Sample Card {i + 1}</h4>
          <p>
            This is additional content to demonstrate scrolling behavior within 
            the bottom sheet. The sheet maintains its functionality regardless 
            of content length.
          </p>
        </div>
      ))}
    </div>
  );
};

export default DemoContent;
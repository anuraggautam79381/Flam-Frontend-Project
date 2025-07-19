import React, { useState, useRef, useEffect, useCallback } from 'react';
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, children }) => {
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0); // 0: closed, 1: half-open, 2: fully open
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [initialTransform, setInitialTransform] = useState(0);
  const bottomSheetRef = useRef(null);
  const animationRef = useRef(null);

  // Snap points as percentages of viewport height
  const snapPoints = [
    100, // closed (100% from top = fully hidden)
    50,  // half-open (50% from top)
    10   // fully open (10% from top)
  ];

  // Spring animation configuration
  const springConfig = {
    tension: 300,
    friction: 30,
    mass: 1
  };

  // Custom spring animation function
  const animateToSnapPoint = useCallback((targetSnapPoint) => {
    if (!bottomSheetRef.current) return;

    const startTransform = currentY;
    const targetTransform = snapPoints[targetSnapPoint];
    const startTime = performance.now();
    const duration = 300;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Spring easing function
      const springProgress = 1 - Math.pow(1 - progress, 3) * Math.cos(progress * Math.PI * 2);
      
      const currentTransform = startTransform + (targetTransform - startTransform) * springProgress;
      
      setCurrentY(currentTransform);
      bottomSheetRef.current.style.transform = `translateY(${currentTransform}%)`;

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentSnapPoint(targetSnapPoint);
        if (targetSnapPoint === 0) {
          onClose();
        }
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [currentY, snapPoints, onClose]);

  // Find nearest snap point based on current position and velocity
  const findNearestSnapPoint = useCallback((currentPos, velocity = 0) => {
    let nearestIndex = 0;
    let minDistance = Math.abs(currentPos - snapPoints[0]);

    for (let i = 1; i < snapPoints.length; i++) {
      const distance = Math.abs(currentPos - snapPoints[i]);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }

    // Consider velocity for better UX
    if (Math.abs(velocity) > 0.5) {
      if (velocity > 0 && nearestIndex > 0) {
        nearestIndex = Math.max(0, nearestIndex - 1);
      } else if (velocity < 0 && nearestIndex < snapPoints.length - 1) {
        nearestIndex = Math.min(snapPoints.length - 1, nearestIndex + 1);
      }
    }

    return nearestIndex;
  }, [snapPoints]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setInitialTransform(currentY);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [currentY]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;

    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const newTransform = Math.max(snapPoints[2], Math.min(snapPoints[0], initialTransform + deltaPercent));

    setCurrentY(newTransform);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.style.transform = `translateY(${newTransform}%)`;
    }
  }, [isDragging, startY, initialTransform, snapPoints]);

  const handleTouchEnd = useCallback((e) => {
    if (!isDragging) return;

    setIsDragging(false);
    
    const touchY = e.changedTouches[0].clientY;
    const deltaY = touchY - startY;
    const velocity = deltaY / 100; // Simple velocity calculation
    
    const nearestSnapPoint = findNearestSnapPoint(currentY, velocity);
    animateToSnapPoint(nearestSnapPoint);
  }, [isDragging, startY, currentY, findNearestSnapPoint, animateToSnapPoint]);

  // Mouse event handlers for desktop
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setInitialTransform(currentY);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [currentY]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const mouseY = e.clientY;
    const deltaY = mouseY - startY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const newTransform = Math.max(snapPoints[2], Math.min(snapPoints[0], initialTransform + deltaPercent));

    setCurrentY(newTransform);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.style.transform = `translateY(${newTransform}%)`;
    }
  }, [isDragging, startY, initialTransform, snapPoints]);

  const handleMouseUp = useCallback((e) => {
    if (!isDragging) return;

    setIsDragging(false);
    
    const mouseY = e.clientY;
    const deltaY = mouseY - startY;
    const velocity = deltaY / 100;
    
    const nearestSnapPoint = findNearestSnapPoint(currentY, velocity);
    animateToSnapPoint(nearestSnapPoint);
  }, [isDragging, startY, currentY, findNearestSnapPoint, animateToSnapPoint]);

  // Initialize position based on isOpen prop
  useEffect(() => {
    if (isOpen) {
      setCurrentSnapPoint(1); // Start at half-open
      animateToSnapPoint(1);
    } else {
      setCurrentSnapPoint(0); // Closed
      animateToSnapPoint(0);
    }
  }, [isOpen, animateToSnapPoint]);

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Public methods for controlling the bottom sheet
  const goToSnapPoint = useCallback((snapPointIndex) => {
    if (snapPointIndex >= 0 && snapPointIndex < snapPoints.length) {
      animateToSnapPoint(snapPointIndex);
    }
  }, [animateToSnapPoint, snapPoints.length]);

  // Keyboard accessibility
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      animateToSnapPoint(0);
    } else if (e.key === 'ArrowUp' && currentSnapPoint < snapPoints.length - 1) {
      animateToSnapPoint(currentSnapPoint + 1);
    } else if (e.key === 'ArrowDown' && currentSnapPoint > 0) {
      animateToSnapPoint(currentSnapPoint - 1);
    }
  }, [animateToSnapPoint, currentSnapPoint, snapPoints.length]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`bottom-sheet-backdrop ${isOpen ? 'open' : ''}`}
        onClick={() => animateToSnapPoint(0)}
      />
      
      {/* Bottom Sheet */}
      <div
        ref={bottomSheetRef}
        className={`bottom-sheet ${isOpen ? 'open' : ''}`}
        style={{ transform: `translateY(${currentY}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        aria-label="Bottom sheet"
      >
        {/* Handle */}
        <div className="bottom-sheet-handle" />
        
        {/* Header */}
        <div className="bottom-sheet-header">
          <h2>Bottom Sheet</h2>
          <button
            className="close-button"
            onClick={() => animateToSnapPoint(0)}
            aria-label="Close bottom sheet"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="bottom-sheet-content">
          {children}
        </div>
        
        {/* Control Buttons */}
        <div className="bottom-sheet-controls">
          <button onClick={() => goToSnapPoint(0)} disabled={currentSnapPoint === 0}>
            Close
          </button>
          <button onClick={() => goToSnapPoint(1)} disabled={currentSnapPoint === 1}>
            Half Open
          </button>
          <button onClick={() => goToSnapPoint(2)} disabled={currentSnapPoint === 2}>
            Full Open
          </button>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BottomSheet from '../BottomSheet';

describe('BottomSheet', () => {
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <BottomSheet isOpen={false} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
  });

  it('renders children content when open', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div data-testid="test-content">Test Content</div>
      </BottomSheet>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('shows backdrop when open', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const backdrop = document.querySelector('.bottom-sheet-backdrop');
    expect(backdrop).toHaveClass('open');
  });

  it('hides backdrop when closed', () => {
    render(
      <BottomSheet isOpen={false} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const backdrop = document.querySelector('.bottom-sheet-backdrop');
    expect(backdrop).not.toHaveClass('open');
  });

  it('has correct ARIA attributes', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const bottomSheet = document.querySelector('.bottom-sheet');
    expect(bottomSheet).toHaveAttribute('role', 'dialog');
    expect(bottomSheet).toHaveAttribute('aria-modal', 'true');
    expect(bottomSheet).toHaveAttribute('aria-label', 'Bottom sheet');
  });

  it('has control buttons with correct states', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const closeBtn = screen.getByText('Close');
    const halfOpenBtn = screen.getByText('Half Open');
    const fullOpenBtn = screen.getByText('Full Open');
    
    expect(closeBtn).toBeInTheDocument();
    expect(halfOpenBtn).toBeInTheDocument();
    expect(fullOpenBtn).toBeInTheDocument();
  });

  it('handles touch events without crashing', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const bottomSheet = document.querySelector('.bottom-sheet');
    
    // Simulate touch start
    fireEvent.touchStart(bottomSheet, {
      touches: [{ clientY: 100 }]
    });
    
    // Simulate touch move
    fireEvent.touchMove(bottomSheet, {
      touches: [{ clientY: 200 }]
    });
    
    // Simulate touch end
    fireEvent.touchEnd(bottomSheet, {
      changedTouches: [{ clientY: 200 }]
    });
    
    // Should not crash and should handle the touch events
    expect(bottomSheet).toBeInTheDocument();
  });

  it('handles mouse events without crashing', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const bottomSheet = document.querySelector('.bottom-sheet');
    
    // Simulate mouse down
    fireEvent.mouseDown(bottomSheet, { clientY: 100 });
    
    // Should not crash and should handle the mouse events
    expect(bottomSheet).toBeInTheDocument();
  });

  it('renders handle element', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const handle = document.querySelector('.bottom-sheet-handle');
    expect(handle).toBeInTheDocument();
  });

  it('renders header with title', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const header = screen.getByText('Bottom Sheet');
    expect(header).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const closeButton = screen.getByLabelText('Close bottom sheet');
    expect(closeButton).toBeInTheDocument();
  });
});
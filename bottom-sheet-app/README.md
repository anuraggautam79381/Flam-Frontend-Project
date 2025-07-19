# React Bottom Sheet with Multiple Snap Points and Spring Motion

A custom React bottom sheet component featuring multiple snap points, spring motion animations, and comprehensive gesture support. Built without external animation libraries for optimal performance and full control over the animation behavior.

![Bottom Sheet Demo](https://img.shields.io/badge/React-18.2.0-blue) ![Spring Animation](https://img.shields.io/badge/Animation-Custom%20Spring-green) ![Responsive](https://img.shields.io/badge/Design-Responsive-orange) ![Accessible](https://img.shields.io/badge/A11y-Compliant-purple)

## 🚀 Features

- **Multiple Snap Points**: Three distinct positions - closed, half-open, and fully open
- **Custom Spring Animation**: Smooth, physics-based transitions without external dependencies  
- **Gesture Support**: Drag-and-drop with velocity-based snapping
- **Touch & Mouse Events**: Cross-platform compatibility for desktop and mobile
- **Keyboard Accessible**: Full keyboard navigation with ARIA support
- **Responsive Design**: Optimized layouts for all screen sizes
- **Performance Optimized**: Uses requestAnimationFrame for 60fps animations
- **Customizable**: Easy to modify snap points and styling

## 📱 Demo

The application includes a comprehensive demo showcasing all features:

- **Interactive Gestures**: Drag the handle or any part of the sheet
- **Control Buttons**: Programmatic navigation between snap points
- **Keyboard Navigation**: Arrow keys and Escape key support
- **Backdrop Interaction**: Click outside to close
- **Velocity Detection**: Smart snapping based on gesture speed

## 🛠 Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone or download the project**
   ```bash
   # If cloning from a repository
   git clone <repository-url>
   cd bottom-sheet-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🏗 Component Architecture

### BottomSheet Component

The main component that provides the bottom sheet functionality.

```jsx
import BottomSheet from './components/BottomSheet';
import DemoContent from './components/DemoContent';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Bottom Sheet
      </button>
      
      <BottomSheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <DemoContent />
      </BottomSheet>
    </div>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | Yes | Controls the visibility of the bottom sheet |
| `onClose` | function | Yes | Callback fired when the sheet should be closed |
| `children` | ReactNode | No | Content to display inside the bottom sheet |

### Snap Points

The component uses three predefined snap points:

- **Closed (100%)**: Sheet is hidden below the viewport
- **Half-open (50%)**: Sheet covers half the screen
- **Fully open (10%)**: Sheet covers most of the screen

## 🎨 Customization

### Modifying Snap Points

To customize snap points, edit the `snapPoints` array in `BottomSheet.js`:

```javascript
const snapPoints = [
  100, // closed
  60,  // quarter-open
  30,  // half-open  
  5    // fully open
];
```

### Styling

The component uses CSS modules. Key classes to customize:

- `.bottom-sheet` - Main container
- `.bottom-sheet-handle` - Drag handle
- `.bottom-sheet-header` - Header section
- `.bottom-sheet-content` - Content area
- `.bottom-sheet-controls` - Control buttons

### Animation Timing

Modify the spring animation in the `animateToSnapPoint` function:

```javascript
const springConfig = {
  tension: 300,    // Stiffness of the spring
  friction: 30,    // Damping of the spring
  mass: 1         // Mass of the object
};
```

## ♿ Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: 
  - `Escape` key to close
  - `Arrow Up/Down` to navigate snap points
- **Focus Management**: Proper focus handling
- **High Contrast Support**: Adapts to system preferences
- **Reduced Motion**: Respects user motion preferences

## 📱 Responsive Design

The bottom sheet adapts to different screen sizes:

- **Desktop**: Full drag functionality with mouse events
- **Tablet**: Touch-optimized interactions
- **Mobile**: Optimized for small screens with adjusted sizing

### Breakpoints

- `768px` and below: Tablet optimizations
- `480px` and below: Mobile optimizations

## 🧪 Testing

The project includes comprehensive unit tests using Jest and React Testing Library.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Test Coverage

- Component rendering
- User interactions (click, drag, keyboard)
- Accessibility features
- Animation behavior
- Edge cases and error handling

## 🔧 Technical Implementation

### Animation System

The component uses a custom spring animation system:

1. **RequestAnimationFrame**: Ensures smooth 60fps animations
2. **Spring Physics**: Natural, physics-based motion
3. **Velocity Detection**: Smart snapping based on gesture speed
4. **Interrupt Handling**: Smooth transitions between gestures

### Event Handling

- **Touch Events**: `touchstart`, `touchmove`, `touchend`
- **Mouse Events**: `mousedown`, `mousemove`, `mouseup`
- **Keyboard Events**: `keydown` for navigation
- **Global Listeners**: Proper cleanup to prevent memory leaks

### Performance Optimizations

- **Will-change CSS**: Optimizes rendering performance
- **Transform-based Animation**: Uses GPU acceleration
- **Event Debouncing**: Prevents excessive re-renders
- **Memory Management**: Proper cleanup of event listeners

## 🌟 Advanced Usage

### Custom Content

The bottom sheet accepts any React content:

```jsx
<BottomSheet isOpen={isOpen} onClose={handleClose}>
  <div>
    <h2>Custom Content</h2>
    <p>Any React components can go here</p>
    <form>
      {/* Form elements */}
    </form>
  </div>
</BottomSheet>
```

### Programmatic Control

Control the bottom sheet programmatically:

```jsx
// In the BottomSheet component, you can add ref forwarding
// to expose methods like goToSnapPoint(index)
```

## 🚀 Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder, ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## 🔮 Future Enhancements

Potential improvements for future versions:

- [ ] Multiple bottom sheets support
- [ ] Custom snap point configuration via props
- [ ] Swipe-to-dismiss functionality
- [ ] Integration with React Router
- [ ] TypeScript support
- [ ] Additional animation easing options
- [ ] Backdrop blur effects
- [ ] Auto-height calculation based on content

---

**Built with ❤️ using React and modern web technologies**

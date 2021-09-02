import { useState } from 'react';
import colorData from './color-data.json';
import ColorList from './components/ColorList';

function App() {
  const [ colors, setColors ] = useState(colorData);

  const onRemoveColor = id => {
    setColors(colors.filter( color => color.id !== id))
  }

  const onRateColor = (id, rating) => {
    setColors(colors.map(color => (
      color.id === id ? { ...color, rating } : color
    )))
  }

  return <ColorList colors={colors} onRemoveColor={onRemoveColor} onRateColor={onRateColor} />
}

export default App;

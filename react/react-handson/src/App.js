import { useState } from 'react';
import colorData from './color-data.json';
import ColorList from './components/ColorList';
import AddColorForm from './components/AddColorForm';

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

  const onNewColor = (title, color) => {
      setColors([
          ...colors,
          {
              id: colors.length + 1,
              title,
              color,
              rating: 0
          }
      ])
  }

  return (
      <>
        <AddColorForm onNewColor={onNewColor} />
        <ColorList colors={colors} onRemoveColor={onRemoveColor} onRateColor={onRateColor} />
      </>
  )
}

export default App;

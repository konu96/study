import ColorList from './components/ColorList';
import AddColorForm from './components/AddColorForm';
import CheckBox from './components/CheckBox';
import Phrase from "./components/Phrase";
import WordCount from "./components/WordCount";

function App() {
  return (
      <>
          <AddColorForm />
          <ColorList />
          <div>
              <CheckBox />
          </div>
          <div>
              <Phrase />
          </div>
          <div>
              <WordCount>You are not going to believe this but...</WordCount>
          </div>
      </>
  )
}

export default App;

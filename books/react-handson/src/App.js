import ColorList from './components/ColorList';
import AddColorForm from './components/AddColorForm';
import CheckBox from './components/CheckBox';
import Phrase from "./components/Phrase";
import WordCount from "./components/WordCount";
import CheckUseLayoutEffect from "./components/CheckUseLayoutEffect";
import CheckUseReducer from "./components/CheckUseReducer";
import GithubUser from "./components/GithubUser";

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
          <div>
              <CheckUseLayoutEffect />
          </div>
          <div>
              <CheckUseReducer />
          </div>
          <div>
              <GithubUser login="moonhighway" />
          </div>
      </>
  )
}

export default App;

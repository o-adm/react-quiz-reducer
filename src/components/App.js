import Header from "./Header";
import Main from "./Main";
import Quizz from "./Quizz";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Quizz />
      </Main>
      <Footer />
    </>
  );
}

export default App;

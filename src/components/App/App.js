import './App.scss';
import Form from '../Form/Form';
import fetchRewards from '../../images/fetchRewards.png';

const App = () => {
  return (
    <main className="app">
      <section className="app-container">
        <img className="app-logo" src={fetchRewards}></img>
        <Form />
      </section>
    </main>
  );
}

export default App;

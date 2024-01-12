import { useEffect, useState } from 'react';
import './App.scss';
import shuffle from './utils/shuffle';
import FlipCard from './components/FlipCard';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Sidebar from './components/SideBar';
import { AnimalsResponse, Entry } from './def/animals.defs';
import match from './utils/match';

const API_URL: string =
  'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';

function App() {
  const [animals, setAnimals] = useState<Entry[]>([]);
  const [successes, setSuccesses] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [total, setTotal] = useState(0);
  const [playesName, setPlayersName] = useState('Tulio Triviño?');
  const [matchers, setMatchers] = useState<string[]>([]);

  const handleCount = (uuid: string) => {
    setMatchers([...matchers, uuid]);
  };

  async function request(url: string): Promise<AnimalsResponse> {
    const response = await fetch(url);
    return await response.json();
  }

  const sweetName = () => {
    withReactContent(Swal).fire({
      title: <i>Your beautiful name</i>,
      input: 'text',
      playesName,
      preConfirm: () => {
        const playerName = Swal.getInput()?.value || '';
        setPlayersName(playerName);
        localStorage.setItem('playerName', playerName);
      },
    });
  };

  useEffect(() => {
    if (matchers.length === 2) {
      const [uno, dos] = matchers;
      const isMatch = match(uno, dos);

      if (isMatch) {
        console.log('se logro');

        setAnimals(prev => {
          return prev.map(obj => {
            if (
              obj.fields.image.uuid === uno ||
              obj.fields.image.uuid === dos
            ) {
              return { ...obj, matchOpen: true, isOpen: false };
            }
            return obj;
          });
        });
        setSuccesses(prev => prev + 1);
      } else {
        console.log('no se logro');
        setAnimals(prev => {
          return prev.map(obj => {
            if (
              obj.fields.image.uuid === uno ||
              obj.fields.image.uuid === dos
            ) {
              return { ...obj, isOpen: false, matchOpen: false };
            }
            return obj;
          });
        });
        setMistakes(prev => prev + 1);
      }
      setMatchers([]);
    }
  }, [matchers]);

  useEffect(() => {
    // ESTO SE PODRIA HABER HECHO CON UN HOOK, PERO PARA NO ESCRIBIR TANTO LO DEJE SIMPLE
    const localPlayerName = localStorage.getItem('playerName');

    if (localPlayerName) {
      setPlayersName(localPlayerName);
    } else {
      sweetName();
    }
  }, []);

  useEffect(() => {
    try {
      const data = request(API_URL);

      data.then(data => {
        const { entries } = data;
        setTotal(entries.length);
        const copy = entries;
        const double = copy.concat(entries);
        const random = shuffle(double);
        setAnimals(random);
      });
    } catch (error) {
      console.error('Error fetching animals');
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Memory Game</h1>
      <div className="row">
        <div className="col-md-3">
          <Sidebar
            name={playesName}
            successes={successes}
            mistakes={mistakes}
          />
        </div>
        <div className="col-sm-9">
          <div className="game">
            {animals.map((animal, index) => (
              <FlipCard
                imageUrl={animal.fields.image.url}
                uuid={animal.fields.image.uuid}
                count={handleCount}
                key={animal.meta.slug + index}
                outsideOpen={animal.isOpen}
                matchOpen={animal.matchOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

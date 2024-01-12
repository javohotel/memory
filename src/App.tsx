import { useEffect, useState } from 'react';
import './App.scss';
import shuffle from './utils/shuffle';
import FlipCard from './components/FlipCard';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Sidebar from './components/SideBar';
import { AnimalsResponse, Entry } from './def/animals.defs';

const API_URL: string =
  'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';

function App() {
  const [animals, setAnimals] = useState<Entry[]>([]);
  const [successes, setSuccesses] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [total, setTotal] = useState(0);
  const [playesName, setPlayersName] = useState('Tulio Triviño?');
  const [first, setFirst] = useState<Entry>();
  const [second, setSecond] = useState<Entry>();
  const [noOpen, setNoOpen] = useState(false);

  const handleCount = (card: Entry) => {
    if (first !== undefined && first?.id !== card.id) {
      setSecond(card);
    } else {
      setFirst(card);
    }
  };

  function removeSelection() {
    setFirst(undefined);
    setSecond(undefined);
    setNoOpen(false);
  }

  useEffect(() => {
    if (total != 0 && successes === total) {
      withReactContent(Swal).fire({
        title: 'You Win!',
        text: 'The job is yours!',
        icon: 'success',
      });
    }
  }, [successes]);

  useEffect(() => {
    if (first && second) {
      setNoOpen(true);
      if (first.fields.image.uuid === second.fields.image.uuid) {
        setSuccesses(prev => prev + 1);
        setAnimals(prevArray => {
          return prevArray.map(obj => {
            if (obj.fields.image.uuid === first.fields.image.uuid) {
              return { ...obj, matched: true };
            } else {
              return obj;
            }
          });
        });
        removeSelection();
      } else {
        setMistakes(prev => prev + 1);
        setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [first, second]);

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
        const randomId = random.map((item, index) => {
          return { ...item, id: item.fields.image.uuid + index };
        });
        setAnimals(randomId);
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
            {animals.map(animal => (
              <FlipCard
                card={animal}
                key={animal.id}
                count={handleCount}
                open={
                  animal.id === first?.id ||
                  animal.id === second?.id ||
                  animal.matched === true
                }
                noOpen={noOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

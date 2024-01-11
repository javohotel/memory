import { useEffect, useState } from 'react';
import './App.scss';
import shuffle from './utils/shuffle';
import FlipCard from './components/FlipCard';
import { AnimalsResponse, Entry } from './def/animals.defs';

const API_URL: string =
  'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';

function App() {
  const [animals, setAnimals] = useState<Entry[]>([]);

  const handleCount = (uuid: string) => {
    console.log(uuid);
  };

  async function request(url: string): Promise<AnimalsResponse> {
    const response = await fetch(url);
    return await response.json();
  }

  useEffect(() => {
    try {
      const data = request(API_URL);

      data.then(data => {
        const { entries } = data;
        const copy = entries;
        const double = copy.concat(entries);
        const random = shuffle(double);
        setAnimals(random);
      });
    } catch (error) {
      console.error('error al recuperar a los animalitos');
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Memory Game</h1>
      <div className="row">
        <div className="col-md-2">
          <p>Aciertos: 0</p>
          <p>Errores: 0</p>
        </div>
        <div className="col-sm-10">
          <div className="game">
            {animals.map((animal, index) => (
              <FlipCard
                imageUrl={animal.fields.image.url}
                uuid={animal.fields.image.uuid}
                count={handleCount}
                key={animal.meta.slug + index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

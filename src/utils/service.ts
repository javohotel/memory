import { AnimalsResponse } from '../def/animals.defs';

async function getAnimals(url: string): Promise<AnimalsResponse> {
  const response = await fetch(url);
  return await response.json();
}

export default getAnimals;

import { useState } from 'react';
import './FlipCard.scss';

type FlipProps = {
  imageUrl: string;
  uuid: string;
  count: (uuid: string) => void;
};

export default function FlipCard(props: FlipProps) {
  const { imageUrl, uuid, count } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(prev => !prev);
    count(uuid);
  };
  return (
    <div className="flip-card" onClick={handleClick}>
      <div className={'flip-card-inner' + (open ? ' open' : '')}>
        <div className="flip-card-front">
          <h1>?</h1>
        </div>
        <div className="flip-card-back">
          <img width="100%" src={imageUrl} alt="Avatar" />
        </div>
      </div>
    </div>
  );
}

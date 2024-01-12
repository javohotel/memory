import { useEffect, useState } from 'react';
import './FlipCard.scss';

type FlipProps = {
  imageUrl: string;
  uuid: string;
  count: (uuid: string) => void;
  outsideOpen?: boolean;
  matchOpen?: boolean;
};

export default function FlipCard(props: FlipProps) {
  const { imageUrl, uuid, count, outsideOpen, matchOpen } = props;
  const [open, setOpen] = useState(outsideOpen);
  const handleClick = () => {
    setOpen(true);
    count(uuid);
  };

  return (
    <div className="flip-card" onClick={handleClick}>
      <div className={'flip-card-inner' + (open ? ' open' : '')}>
        <div className="flip-card-front">
          <h1>?</h1> {imageUrl}
        </div>
        <div className="flip-card-back">
          <img width="100%" src={imageUrl} alt="Avatar" />
        </div>
      </div>
    </div>
  );
}

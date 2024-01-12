import './FlipCard.scss';
import { Entry } from '../../def/animals.defs';

type FlipProps = {
  card: Entry;
  count: (item: Entry) => any;
  open: boolean;
  noOpen?: boolean;
};

export default function FlipCard(props: FlipProps) {
  const { card, count, open, noOpen } = props;

  return (
    <div className="flip-card" onClick={() => !noOpen && count(card)}>
      <div className={'flip-card-inner' + (open ? ' open' : '')}>
        <div className="flip-card-front">
          <h1>?</h1>
        </div>
        <div className="flip-card-back">
          <img width="100%" src={card.fields.image.url} alt="Avatar" />
        </div>
      </div>
    </div>
  );
}

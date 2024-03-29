type Props = {
  name: string;
  successes: number;
  mistakes: number;
};

export default function Sidebar(props: Props) {
  const { name, successes, mistakes } = props;
  return (
    <>
      <h3>Hi {name}</h3>
      <p>Tap the cards and find the pairs! have fun for hours</p>
      <p>Your score is:</p>
      <div className="row">
        <p className="alert alert-success mx-1 col-xl-12 col-md-5">
          Right: <b>{successes}</b>
        </p>
        <p className="alert alert-danger mx-1 col-xl-12 col-md-5">
          Wrong: <b>{mistakes}</b>
        </p>
      </div>
    </>
  );
}

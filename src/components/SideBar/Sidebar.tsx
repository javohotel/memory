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
      <p>Your score is:</p>
      <div className="row">
      <p className="alert alert-success mx-1 col-xl-12 col-md-5">
        Successes: <b>{successes}</b>
      </p>
      <p className="alert alert-danger mx-1 col-xl-12 col-md-5">
        Mistakes: <b>{mistakes}</b>
      </p>
      </div>
    </>
  );
}

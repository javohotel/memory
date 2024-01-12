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
      <p className="alert alert-success">
        Successes: <b>{successes}</b>
      </p>
      <p className="alert alert-danger">
        Mistakes: <b>{mistakes}</b>
      </p>
    </>
  );
}

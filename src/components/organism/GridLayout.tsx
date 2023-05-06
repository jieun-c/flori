import Card from "../molecule/Card";

const GridLayout = () => {
  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default GridLayout;

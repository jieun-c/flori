import GridLayout from "../organism/GridLayout";

const Main = () => {
  return (
    <>
      {/* Banner */}
      <div className="h-60">
        <div className="w-full h-full bg-no-repeat bg-cover bg-center bg-[url('/public/images/banners/2.jpg')]" />
      </div>

      {/* Grid */}
      <div className="max-w-5xl p-1 m-auto">
        <GridLayout />
      </div>
    </>
  );
};

export default Main;

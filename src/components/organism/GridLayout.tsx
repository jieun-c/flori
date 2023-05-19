import { IProduct } from "../../@type";
import Card from "../molecule/Card";

const GridLayout = ({ datas }: { datas: IProduct[] }) => {
  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {datas?.map((data: IProduct) => (
        <Card key={data.productId} data={data} />
      ))}
      {!datas && <p className="text-xs">상품을 등록해주세요.</p>}
    </div>
  );
};

export default GridLayout;

const CreateProduct = () => {
  return (
    <main className="max-w-5xl p-1 m-auto">
      <form className="max-w-xl m-auto p-1 mt-3 bg-[#f4f4f4] rounded shadow-md">
        <h1 className="text-lg text-center py-5">새로운 상품 등록</h1>

        <div className="flex flex-col [&>div]:flex [&>div]:mb-4 [&_label]:w-24 [&_label]:text-sm [&>div>_:not(label)]:flex-1 [&>div>_:not(label)]:h-8">
          <div>
            <label htmlFor="productImg">상품이미지</label>
            <input type="file" id="productImg" className="text-sm" />
          </div>
          <div>
            <label htmlFor="productNm">상품명</label>
            <input type="text" placeholder="상품명" className="text-sm indent-1" />
          </div>
          <div>
            <label htmlFor="price">원가</label>
            <input type="number" placeholder="원가" className="text-sm indent-1" />
          </div>
          <div>
            <label htmlFor="category">카테고리</label>
            <select id="category" className="text-sm indent-1">
              <option value="">전체</option>
            </select>
          </div>
          <div>
            <label htmlFor="description">상품 설명</label>
            <textarea placeholder="상품 설명" className="text-sm indent-1" />
          </div>
          <div>
            <label htmlFor="options">옵션들</label>
            <input type="text" placeholder="콤마(,)로 옵션 구분" className="text-sm indent-1" />
          </div>
        </div>

        <div className="flex justify-center pt-10 pb-5">
          <button className="bg-red-500 text-white py-2 px-8 rounded">상품 등록</button>
        </div>
      </form>
    </main>
  );
};

export default CreateProduct;

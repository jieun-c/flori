import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image34 from "../Atom/Image34";
import { uploadProductImage } from "../../services/cloudinary";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../store";
import FormItem from "../molecule/FormItem";
import { IProduct, categorys } from "../../@type";
import { writeDB } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface IProductForm {
  brandName: string;
  name: string;
  description: string | undefined;
  category: string;
  originPrice: number;
  price: number;
  discount: number;
  options: string;
  images: FileList;
}

interface IImageFile {
  name: string;
  src: string;
}

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IProductForm>();
  const [imageFiles, setImageFiles] = useState<IImageFile[]>([]);
  const currentUser = useRecoilValue(currentUserAtom);
  const originPrice = watch("originPrice");
  const discount = watch("discount");
  const navigate = useNavigate();

  const onUpload = (e: any) => {
    const files = e.target.files;
    if (imageFiles.length + files.length > 5) {
      alert("이미지는 최대 5개 까지 추가 가능합니다.");
      return;
    }

    Array.from(files).map((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<void>((resolve) => {
        reader.onload = () => {
          setImageFiles((prev: any) => [...prev, { name: file.name, src: reader.result }]);
          resolve();
        };
      });
    });
  };

  const deleteImg = (idx: number) => {
    setImageFiles(imageFiles.filter((_: any, i: number) => i !== idx));
  };

  const onSubmit: SubmitHandler<IProductForm> = async (data) => {
    const confirm = window.confirm("상품을 등록하시겠습니까?");
    if (!confirm) return;

    if (!currentUser) {
      alert("잘못된 접근입니다.");
      return;
    }

    const productId = `${Date.now()}_${currentUser.uid}`;
    const price = Math.round((originPrice * (100 - discount)) / 100 / 10) * 10;
    const options = data.options.split(",");
    const images = await uploadProductImage(currentUser.uid, imageFiles);

    const save = {
      productId,
      ...data,
      price,
      images,
      options,
      originPrice: Number(originPrice),
      discount: Number(originPrice),
      sellerId: currentUser.uid,
      createAt: new Date(),
      updateAt: new Date(),
    } as IProduct;

    writeDB("/products", save);

    alert("상품이 등록되었습니다.");
    navigate("/");
  };

  return (
    <main className="max-w-5xl p-1 m-auto">
      <form
        className="max-w-xl m-auto p-1 mt-3 bg-[#f4f4f4] rounded shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg text-center py-5">새로운 상품 등록</h1>

        <div className="flex flex-col">
          <FormItem
            labelId="brandName"
            labelNm="브랜드명"
            required
            element={
              <input
                type="text"
                placeholder="브랜드명"
                className="text-sm indent-1 h-8 w-full"
                id="brandName"
                {...register("brandName", {
                  required: "브랜드명을 입력해주세요.",
                  // validate: (value) => {
                  //   return !!value.trim();
                  // },
                  // pattern: {
                  //   value: /(^\s*)|(\s*$)/,
                  //   message: "공백이 포함됨",
                  // },
                })}
                maxLength={10}
              />
            }
            error={errors.brandName?.message}
          />
          <FormItem
            labelId="name"
            labelNm="상품명"
            required
            element={
              <input
                type="text"
                placeholder="상품명"
                className="text-sm indent-1 h-8 w-full"
                id="name"
                {...register("name", { required: "상품명을 입력해주세요." })}
              />
            }
            error={errors.name?.message}
          />
          <FormItem
            labelId="description"
            labelNm="상품 설명"
            element={
              <textarea
                placeholder="상품 설명"
                className="text-sm indent-1 h-16 w-full"
                id="description"
                {...register("description")}
              />
            }
            error={errors.description?.message}
          />
          <FormItem
            labelId="category"
            labelNm="카테고리"
            required
            element={
              <select
                id="category"
                className="text-sm indent-1 h-8 w-full"
                {...register("category", { required: "카테고리를 선택해주세요." })}
              >
                <option value="">선택</option>
                {categorys.map((category: any) => (
                  <option key={category.code} value={category.code}>
                    {category.label}
                  </option>
                ))}
              </select>
            }
            error={errors.category?.message}
          />
          <FormItem
            labelId="originPrice"
            labelNm="원가"
            required
            element={
              <input
                type="number"
                placeholder="원가"
                className="text-sm indent-1 h-8 w-full"
                id="originPrice"
                {...register("originPrice", { required: "원가를 입력해주세요." })}
                min="0"
                step={10}
              />
            }
            error={errors.originPrice?.message}
          />
          <FormItem
            labelId="discount"
            labelNm="할인률"
            required
            element={
              <input
                type="number"
                placeholder="할인률 %"
                className="text-sm indent-1 h-8 w-full"
                id="discount"
                {...register("discount", {
                  required: "할인률을 입력해주세요. 없다면 0으로 설정해주세요.",
                })}
                min="0"
                max="100"
                step={5}
              />
            }
            error={errors.discount?.message}
          />
          <FormItem
            labelId="price"
            labelNm="가격"
            element={
              <input
                type="number"
                className="text-sm indent-1 h-8 w-full bg-inherit"
                readOnly
                id="price"
                {...register("price")}
                value={`${Math.round((originPrice * (100 - discount)) / 100 / 10) * 10}`}
              />
            }
            error={errors.price?.message}
          />
          <FormItem
            labelId="options"
            labelNm="옵션들"
            required
            element={
              <input
                type="text"
                placeholder="콤마(,)로 옵션 구분"
                className="text-sm indent-1 h-8 w-full"
                id="options"
                {...register("options", { required: "옵션을 1개 이상 입력해주세요." })}
              />
            }
            error={errors.options?.message}
          />
          <div className="mb-4 flex">
            <label className="w-24 text-sm">
              상품이미지
              <span className="text-red-500">&nbsp;*</span>
            </label>
            <label
              htmlFor="images"
              className="text-sm text-center cursor-pointer p-1 rounded text-white bg-zinc-700 hover:bg-zinc-500 duration-100"
            >
              파일 선택
            </label>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              id="images"
              {...register("images", { required: "이미지를 선택해주세요." })}
              onChange={(e) => onUpload(e)}
            />
            <p className="text-xs text-red-500 pt-1">{errors.images?.message}</p>
          </div>
          {imageFiles.length > 0 && (
            <>
              <div className="flex w-full h-40 border shadow-md overflow-x-auto bg-white p-3">
                {imageFiles.map((file: IImageFile, idx: number) => (
                  <div key={idx} className="relative w-20 mr-2 shrink-0">
                    <Image34 src={file.src} alt={file.name} />
                    <p className="text-xs truncate ...">{file.name}</p>
                    <button
                      className="absolute top-1 right-1 px-1 rounded text-xs text-white bg-zinc-700 hover:bg-zinc-500 duration-100"
                      onClick={() => deleteImg(idx)}
                    >
                      ⅹ
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs mb-1">⚠️ 이미지는 최대 5개 까지 등록가능합니다.</p>
              <p className="text-xs">⚠️ 이미지는 3:4 비율로 올려주세요.</p>
            </>
          )}
        </div>

        <div className="flex justify-center pt-10 pb-5">
          <button className="bg-red-500 text-white py-2 px-8 rounded">상품 등록</button>
        </div>
      </form>
    </main>
  );
};

export default CreateProduct;

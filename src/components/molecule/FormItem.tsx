interface IFormItem {
  labelId: string;
  labelNm: string;
  element: React.ReactNode;
  required?: boolean;
  error?: string;
}

const FormItem = ({ labelId, labelNm, required, element, error }: IFormItem) => {
  return (
    <div className="mb-4 flex">
      <label htmlFor={labelId} className="w-24 text-sm">
        {labelNm}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </label>
      <div className="flex-1">
        {element}
        {error && <p className="text-xs text-red-500 pt-1">{error}</p>}
      </div>
    </div>
  );
};

export default FormItem;

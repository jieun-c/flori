const Image34 = ({ src = "http://via.placeholder.com/640x480", alt = "Image" }) => {
  return (
    <>
      {/* Image - 3:4 */}
      <div className="relative w-full h-0 pb-[133%] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
      </div>
    </>
  );
};

export default Image34;

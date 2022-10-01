import Image from "next/image";

const WImage = ({ quality = 75, height, width, src, className, layout="fill", loader = true }) => {
  return (
    <Image
      objectFit={"contain"}
      className={className}
      src={src}
      height={height}
      width={width}
      quality={quality}
      alt="Picture of the author"
      layout={layout}
    />
  );
};
export default WImage;

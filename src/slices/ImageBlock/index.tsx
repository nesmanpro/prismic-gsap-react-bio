import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    <div className="my-20">
      <PrismicNextImage field={slice.primary.image} imgixParams={{ w: 600 }} />
      <p className="-mt-6 text-base ml-2">
        {slice.primary.caption}
      </p>
    </div>

  );
};

export default ImageBlock;

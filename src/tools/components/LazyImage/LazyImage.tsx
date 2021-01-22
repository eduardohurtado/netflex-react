import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 * Photo presentational component
 */

//Component styles
import "react-lazy-load-image-component/src/effects/blur.css";

//Interfaces
interface IImage {
  alt: string;
  height: string;
  width: string;
  src: any;
}

class Photo extends React.Component<IImage, any> {
  constructor(props: IImage) {
    super(props);
  }

  render() {
    const { alt, height, src, width } = this.props;

    return (
      <div>
        <LazyLoadImage
          alt={alt}
          height={height}
          width={width}
          src={src}
          effect="blur"
        />
      </div>
    );
  }
}

export default Photo;

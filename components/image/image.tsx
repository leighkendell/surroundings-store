import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageLoaded?: () => void;
}

const Image: React.FunctionComponent<Props> = ({ src, alt, imageLoaded, ...props }) => {
  const source = `https://res.cloudinary.com/dklnli1vg/image/fetch/f_auto/q_auto/${src}`;
  const imageRef = React.createRef<HTMLImageElement>();
  const [loaded, updateLoaded] = useState(false);

  const handleImageLoaded = () => {
    if (imageLoaded) {
      imageLoaded();
    }
    updateLoaded(true);
  };

  useEffect(() => {
    // Fire handleImageLoaded function if the image has already loaded
    if (imageRef.current && imageRef.current.complete) {
      handleImageLoaded();
    }
  }, []);

  const spring = useSpring({
    from: { opacity: 0 },
    opacity: loaded ? 1 : 0,
  });

  return <animated.img src={source} alt={alt} ref={imageRef} onLoad={handleImageLoaded} style={spring} {...props} />;
};

export default Image;

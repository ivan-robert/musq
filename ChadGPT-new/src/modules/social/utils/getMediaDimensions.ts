import { Media } from "#modules/social/domain/media.types";

type Dimensions = {
  height: number;
  width: number;
};

type ResizeOptions = {
  maxWidth: number;
  maxHeight: number;
};

export const getMediaDimensions = (
  media: Media,
  options: ResizeOptions
): Dimensions => {
  const { height, width } = media;
  const heightFactor = height / options.maxHeight;
  const widthFactor = width / options.maxWidth;
  const factor = Math.max(heightFactor, widthFactor);
  return {
    height: Math.round(height / factor),
    width: Math.round(width / factor),
  };
};

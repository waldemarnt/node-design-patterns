class Image {}

class PNGImage extends Image {}

class JPGImage extends Image {}

class GIFImage extends Image {}

/**
 * More complex Factory example where a class is created based on a dynamic value
 */
function createImage(type) {
  const supportedImageTypes = {
    jpg: JPGImage,
    png: PNGImage,
    gif: GIFImage,
  };
  /**
   * We are using ES6 object literals for dynamic object creation,
   * it replaces the need of using a switch statement or a bunch of if/elses.
   * See more at https://ponyfoo.com/articles/es6-object-literal-features-in-depth
   */
  return new (supportedImageTypes[type] || Image)();
}

// The Image class is being exported here just for test purposes
module.exports = {
  createImage,
  Image,
  PNGImage,
  JPGImage,
  GIFImage,
};

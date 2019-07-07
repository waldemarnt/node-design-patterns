class Image {}

/**
 * Simple factory example is just a function that constructs an object
 * and returns it.
 */
function createImage(type) {
  return new Image(type);
}

// The Image class is being exported here just for test purposes
module.exports = {
  createImage,
  Image,
};

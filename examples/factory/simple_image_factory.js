class Image {}

/**
 * Simple factory example just a function that constructs and object
 * and return it.
 */
function createImage() {
  return new Image();
}

// The Image class is being exported here just for test purposes
module.exports = {
  createImage,
  Image,
};

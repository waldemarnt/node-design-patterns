const { createImage, DefaultImage, JPGImage, PNGImage, GIFImage } = require('../advanced_image_factory');

describe('Image Factory', () => {
  it('should create an instance of DefaultImage given the type is not supported', () => {
    const ImageInstance = createImage('bmp');
    expect(ImageInstance).toBeInstanceOf(DefaultImage);
  });

  it('should create an instance of JPG given the type is jpg', () => {
    const ImageInstance = createImage('jpg');
    expect(ImageInstance).toBeInstanceOf(JPGImage);
  });

  it('should create an instance of GIF given the type is gif', () => {
    const ImageInstance = createImage('gif');
    expect(ImageInstance).toBeInstanceOf(GIFImage);
  });

  it('should create an instance of PNG given the type is png', () => {
    const ImageInstance = createImage('png');
    expect(ImageInstance).toBeInstanceOf(PNGImage);
  });
});

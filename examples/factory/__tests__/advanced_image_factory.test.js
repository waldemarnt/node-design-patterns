const { createImage, Image, PNGImage, JPGImage, GIFImage } = require('../advanced_image_factory');

describe('Advanced Image Factory', () => {
  it('should create an instance of Image given the type is not supported', () => {
    const ImageInstance = createImage('bmp');
    expect(ImageInstance).toBeInstanceOf(Image);
  });

  it('should create an instance of JPG given the type is jpg', () => {
    const ImageInstance = createImage('jpg');
    expect(ImageInstance).toBeInstanceOf(JPGImage);
    expect(ImageInstance).toBeInstanceOf(Image); // Also is an instance of Image
  });

  it('should create an instance of GIF given the type is gif', () => {
    const ImageInstance = createImage('gif');
    expect(ImageInstance).toBeInstanceOf(GIFImage);
    expect(ImageInstance).toBeInstanceOf(Image); // Also is an instance of Image
  });

  it('should create an instance of PNG given the type is png', () => {
    const ImageInstance = createImage('png');
    expect(ImageInstance).toBeInstanceOf(PNGImage);
    expect(ImageInstance).toBeInstanceOf(Image); // Also is an instance of Image
  });
});

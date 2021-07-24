const changeImage = () => {
  const commandPhotos = document.querySelectorAll('.command__photo');
  commandPhotos.forEach((photo) => {
    let tempSrcPhoto;
    photo.addEventListener('mouseenter', () => {
      tempSrcPhoto = photo.src;
      photo.src = photo.dataset.img;
    });

    photo.addEventListener('mouseleave', () => {
      photo.src = tempSrcPhoto;
    });
  });
};

export default changeImage;

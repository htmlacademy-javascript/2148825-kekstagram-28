const uploadFileInput = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const setUploadFileListener = () => {
  uploadFileInput.addEventListener('change', () => {
    const file = uploadFileInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
}

export {setUploadFileListener};

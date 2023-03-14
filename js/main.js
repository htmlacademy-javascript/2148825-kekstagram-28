import {initGallery} from './gallery.js';
import {generatePhotos} from './generate-data.js';
import {renderPhotos} from './pictures.js';
import {initForm} from './form-initiation.js';
import './form-validation.js';

// Генерация данных и создание миниатюр
const PHOTO_NUMBER = 25;
const photoData = generatePhotos(PHOTO_NUMBER);
renderPhotos(photoData);

//Отрисовка большого изображения
initGallery(photoData);

initForm();

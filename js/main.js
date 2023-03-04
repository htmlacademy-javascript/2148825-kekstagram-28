import {initGallery} from './gallery.js';
import {generatePhotos} from './generate-data.js';
import {renderPhotos} from './pictures.js';

// Генерация данных и создание миниатюр
const PHOTO_NUMBER = 25;
const photoData = generatePhotos(PHOTO_NUMBER);
renderPhotos(photoData);

//Отрисовка большого изображения
initGallery(photoData);

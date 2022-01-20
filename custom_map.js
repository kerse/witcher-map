ymaps.ready(function () {

    var LAYER_NAME = 'witcherMap',
        MAP_TYPE_NAME = 'user#customMap',
    /* Для того чтобы вычислить координаты левого нижнего и правого верхнего углов прямоугольной координатной
     * области, нам необходимо знать максимальный зум, ширину и высоту изображения в пикселях на максимальном зуме.
     */
        MAX_ZOOM = 7,
        PIC_WIDTH = 4596,
        PIC_HEIGHT = 4736;

    /**
     * Конструктор, создающий собственный слой.
     */

    var Layer = function () {
        var layer = new ymaps.Layer('./new/%z/tile-%x-%y.png', {
            // Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
            // раскомментируйте эту строчку и укажите ссылку на изображение.
            //notFoundTile: './background.jpg'
        });
        // Указываем доступный диапазон масштабов для данного слоя.
        layer.getZoomRange = function () {
            return ymaps.vow.resolve([1, 7]);
        };
        // Добавляем свои копирайты.
        layer.getCopyrights = function () {
            return ymaps.vow.resolve('©');
        };
        return layer;
    };
    // Добавляем в хранилище слоев свой конструктор.
    ymaps.layer.storage.add(LAYER_NAME, Layer);

    /**
     * Создадим новый тип карты.
     * MAP_TYPE_NAME - имя нового типа.
     * LAYER_NAME - ключ в хранилище слоев или функция конструктор.
     */
    var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
    // Сохраняем тип в хранилище типов.
    ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);

    // Вычисляем размер всех тайлов на максимальном зуме.
    var worldSize = Math.pow(2, MAX_ZOOM) * 256,
        /**
         * Создаем карту, указав свой новый тип карты.
         */
        map = new ymaps.Map('map', {
            center: [54.51, 25.5],
            zoom: 6,
            controls: ['zoomControl', 'rulerControl', 'typeSelector'],
            type: MAP_TYPE_NAME
        }, {
           

            // Задаем в качестве проекции Декартову. При данном расчёте центр изображения будет лежать в координатах [0, 0].
            // projection: new ymaps.projection.Cartesian([[PIC_HEIGHT / 2 - worldSize, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, worldSize - PIC_WIDTH / 2]], [false, false]),
            // Устанавливаем область просмотра карты так, чтобы пользователь не смог выйти за пределы изображения.
            // restrictMapArea: [[-PIC_HEIGHT / 2, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, PIC_WIDTH / 2]]

            // При данном расчёте, в координатах [0, 0] будет находиться левый нижний угол изображения,
            // правый верхний будет находиться в координатах [PIC_HEIGHT, PIC_WIDTH].
            // projection: new ymaps.projection.Cartesian([[PIC_HEIGHT - worldSize, 0], [PIC_HEIGHT, worldSize]], [false, false]),
            // restrictMapArea: [[0, 0], [PIC_HEIGHT, PIC_WIDTH]]
        });


    map.geoObjects.add(point);
});

const formatSeconds = (value) => {
    let secondTime = parseInt(value); // секунд
    let minuteTime = 0; // минута
    let hourTime = 0; // час
    if (secondTime > 60) {// Если количество секунд больше 60, преобразовать количество секунд в целое число
        // Получить минуты, разделить на 60, чтобы получить целые числа, получить целые минуты
        minuteTime = parseInt(secondTime / 60);
        // Получить количество секунд, взять количество секунд, чтобы получить целое число секунд
        secondTime = parseInt(secondTime % 60);
        // Если минуты больше 60, конвертируем минуты в часы
        if (minuteTime > 60) {
            // Получаем часы, получаем минуты, разделенные на 60, получаем целые часы
            hourTime = parseInt(minuteTime / 60);
            // Получаем очки в часах и часах, получаем минуты в минутах, поделенные на 60 очков в часах
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    let result = "" + parseInt(secondTime) + " seconds ";

    if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + " min " + result;
    }
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + " hours " + result;
    }
    return result;
}

module.exports = formatSeconds
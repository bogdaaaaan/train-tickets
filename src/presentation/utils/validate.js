export const validate = (d_date, a_date, d_place, a_place) => {
    if (d_date === '') {alert('Заповніть поле дати відправки'); return false};
    if (a_date === '') {alert('Заповніть поле дати прибуття'); return false};
    if (d_place === '' || d_place === 'None') {alert('Заповніть поле місця відправки'); return false};
    if (a_place === '' || a_place === 'None') {alert('Заповніть поле місця прибуття'); return false};
    return true;
}

export const validate_user = (name, second_name, middle, passport_num) => {
    if (name === '') {alert("Заповніть поле Ім'я"); return false};
    if (second_name === '') {alert('Заповніть поле Прізвище'); return false};
    if (middle === '') {alert('Заповніть поле По-батькові'); return false};
    if (passport_num === '') {alert('Заповніть поле Номера паспорту'); return false};
    return true;
}
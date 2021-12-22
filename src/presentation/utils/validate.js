export const validate = (d_date, a_date, d_place, a_place) => {
    if (d_date === '') {alert('Заповніть поле дати відправки'); return false};
    if (a_date === '') {alert('Заповніть поле дати прибуття'); return false};
    if (d_place === '' || d_place === 'None') {alert('Заповніть поле місця відправки'); return false};
    if (a_place === '' || a_place === 'None') {alert('Заповніть поле місця прибуття'); return false};
    return true;
}
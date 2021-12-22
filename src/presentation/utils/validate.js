export const validate = (d_date, a_date, d_place, a_place) => {
    if (d_date === '') return 'Заповніть поле дати відправки';
    if (a_date === '') return 'Заповніть поле дати прибуття';
    if (d_place === '' || d_place === 'None') return 'Заповніть поле місця відправки';
    if (a_place === '' || a_place === 'None') return 'Заповніть поле місця прибуття';
    return false;
}
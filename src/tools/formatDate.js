export const formatDate = (monthsToAdd) => {
    let today = new Date();
    let dateToFormat = new Date(today.setMonth(today.getMonth() + monthsToAdd));
    let year = dateToFormat.getFullYear();
    let month = dateToFormat.getMonth() + 1;
    let day = dateToFormat.getDate();
    return month < 10 ? `${year}-0${month}-${day}` : `${year}-${month}-${day}`;
}

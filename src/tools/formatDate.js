export const formatDate = (monthsToAdd = 0) => {
    let today = new Date();
    let dateToFormat = new Date(today.setMonth(today.getMonth() + monthsToAdd));

    let year = dateToFormat.getFullYear();

    let month = dateToFormat.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    let day = dateToFormat.getDate();
    day = day < 10 ? "0" + day : day;
    
    return `${year}-${month}-${day}`;
}

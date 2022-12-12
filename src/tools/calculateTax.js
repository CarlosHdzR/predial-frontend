export const calculateTax = (value) => {
    try {
        let taxValue = Math.round((value.replace(/[.]/g, '')) * 0.01) || "";
        let formatValue = new Intl.NumberFormat('en-mx').format(taxValue)
        return formatValue
    } catch (error) {
        console.log(error);
    }
}
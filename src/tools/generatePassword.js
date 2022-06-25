export const generatePassword = (num) => {
    let minusculas = "abcdefghijklmnopqrstuvwxyz";
    let mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numeros = "0123456789";
    let simbolos = "!#$%&?_-.";
    const caracteres = minusculas+mayusculas+numeros+simbolos;
    let password = "";

    for (let i = 0 ; i < num; i++) {
        password += caracteres[Math.floor(Math.random() * caracteres.length)]
    }

    return password;
}
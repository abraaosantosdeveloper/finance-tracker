export const currencyFormatter = (ammount) => {
    const formatter = Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
    });

    return formatter.format(ammount);
}
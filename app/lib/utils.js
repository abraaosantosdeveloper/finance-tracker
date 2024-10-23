export const currencyFormatter = (total) => {
    const formatter = Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
    });

    return formatter.format(total);
}
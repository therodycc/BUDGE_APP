export const cleanAmountFormat = (amount: string) => {
    return +(amount?.toString().replace(/[^0-9.]/g, ''))
}

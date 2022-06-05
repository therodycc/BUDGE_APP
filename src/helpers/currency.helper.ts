export const currencyFormat = (num: number) => {
    return typeof num === 'number' ? '$' + (num || 0)?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : num
}
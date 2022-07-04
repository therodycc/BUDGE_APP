export const getFilterByStatus = (index: number) => ({
    0: ["PENDING", "IN_PROGRESS", "COMPLETED"],
    1: ["PENDING"],
    2: ["IN_PROGRESS"],
    3: ["COMPLETED"],
}[index])
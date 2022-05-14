export const isRequired = (field: string | number | boolean, errorMessage: string, setError: Function) => {
    if (field === 0 || !field) {
        setError(errorMessage)
        return true
    };
    setError('')
    return false
}
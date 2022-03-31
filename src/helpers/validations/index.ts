export const isRequired = (field: string, errorMessage: string, setError: Function) => {
    if (field === '') {
        setError(errorMessage)
        return true
    };
    setError('')
    return false
}
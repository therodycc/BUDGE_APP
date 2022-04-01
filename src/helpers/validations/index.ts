export const isRequired = (field: string | number | undefined, errorMessage: string, setError: Function) => {
    if (field === '' || field === 0) {
        setError(errorMessage)
        return true
    };
    setError('')
    return false
}
import { useCallback, useEffect, useState } from 'react';

interface useFetchI<T> {
    params?: T | any,
    providerAction: any
    functionProviderName: string;
    callback?: Function
}

// hook in progress ... 
const useFetch = <T extends {}, D = {}>({ params = undefined, providerAction, callback, functionProviderName }: useFetchI<T>, waitChanges?: any) => {

    const [data, setData] = useState<D | null>(null);
    const [error, setError] = useState(null);

    const getData = useCallback(async (params: T) => {
        const result = await providerAction?.[functionProviderName]?.(params);
        if (result?.error) return setError(result.error);
        setData(result?.data);
        callback?.(result?.data)
    }, [callback, functionProviderName, providerAction])


    useEffect(() => {
        getData(params)
    }, [getData, params, waitChanges]);

    return { data, error, getData }
}

export default useFetch
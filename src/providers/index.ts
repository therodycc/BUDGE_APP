

class HttpProvider {
    get(url: string) {
        return fetch(url)
            .then((res) => res)
            .then((data) => data.json())
            .catch((error) => error);
    }

    post(url: string, body: any) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res)
            .catch((error) => error);
    }
    patch(url: string, id: string, body: any) {
        return fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res)
            .catch((error) => error);
    }

    delete(url: string, id: string) {
        return fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res)
            .catch((error) => error);
    }
}

const httpProvider = new HttpProvider();
export default httpProvider  

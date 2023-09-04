interface apiParameters {
    [key: string]: string;
}

export const apiFetch = async (apiUrl: string, parameters?: apiParameters) => {
    let queryString = '';
    if (parameters) {
        queryString = Object.keys(parameters)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
            .join('&');
    }

    let url = apiUrl;
    if (queryString) {
        url += `?${queryString}`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

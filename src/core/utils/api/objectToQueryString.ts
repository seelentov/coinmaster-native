function objectToQueryString(obj: IQueryStringObject): string {
    const params: string[] = [];

    for (const key in obj) {
        const value = obj[key];

        if (Array.isArray(value)) {
            value.forEach(item => {
                params.push(`${key}[]=${item}`);
            });
        } else if (typeof value == "boolean") {
            params.push(`${key}=${value ? "true" : "false"}`);
        } else {
            params.push(`${key}=${value}`);
        }
    }

    return params.join('&');
}
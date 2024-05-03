const getJobs = (limit, offset) => {
    const url = "https://api.weekday.technology/adhoc/getSampleJdJSON";

    const requestBody = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "limit": limit,
            "offset": offset,
        }),
    };

    return fetch(url, requestBody).then((response) => {
        let jobList = response.json();
        return jobList;
    }).catch((error) => {
        return error;
    });
}

export { getJobs }
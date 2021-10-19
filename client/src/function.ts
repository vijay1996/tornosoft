export const apiPostCall = async (url: string, body:object): Promise<object> => {
    let data:object = {}
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((response) => {
        console.log(response)
        if (!response.ok) return response.json().then(err => Promise.reject(err))
        data = response.json()
    }).catch((err)=>{
        data = {...err}
    })
    console.log(data)
    return data
}
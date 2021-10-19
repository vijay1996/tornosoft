export type EventType = {
    target: {
        name: string,
        value: string | number | object
    }
}

export type ResponseDataType = {
    error?:string,
    response?:string
}
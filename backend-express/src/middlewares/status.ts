import { statusList } from "./array";

export function HttpLogs (request, response, next) {
    
    const {url, method} = request;
    
    const message = `${method} => ${url} at ${new Date()}`

    statusList.push(message)
    
    console.log(statusList)
    console.log(`At moment, ${statusList.length} methods are requested`)
    
    return next()
}

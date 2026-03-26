export function logger(req, res, next) {
    console.log(`middleware alert: ${req.method} ${req.url}`)  
    next() 
}
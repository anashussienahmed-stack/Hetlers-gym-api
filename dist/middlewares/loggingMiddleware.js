export function loggingMiddleware(req, res, next) {
    const cur_time = new Date().toLocaleString(`en-EG`, { timeZone: "Africa/Cairo" }); //.replace('T','  ').substring(0,20)
    const method = req.method;
    const url = req.url;
    console.log(` [${cur_time}]  [${method}] request to [${url}]`);
    next();
}
//without .toISOString() -> (Thu Aug 20 2026 18:45:34 GMT+0300 (Eastern European Summer Time))
// after transrorm this strange thing to readable time with toISOString
// we can use the properities that be in any string 
//without .replace and .substring -> (2026-08-20T15:40:17.138Z  POST  /api/auth/signup
// فيه T - Z زياده
//.toISOString -> grintch time  and need .replace  & .subsstring/ .toLocaleString -> africa/cairo -my lap and donot need .replace or .substring

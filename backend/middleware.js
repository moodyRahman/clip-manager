const verifyJSONBody = (body) => {
    return (req, res, next) => {
        body.forEach(element => {
            if (!req.body.hasOwnProperty(element)) {
                return next({
                    status: 400,
                    message: `bad body, missing ${element}`
                })
            }
        });
        return next()
    }
}

export { verifyJSONBody }
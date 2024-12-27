const ErrorMiddleware = (error, res) => {
    console.log(error)
    return res.status(500).json({ error: error ?? "Internal server error!" });
}

export default ErrorMiddleware
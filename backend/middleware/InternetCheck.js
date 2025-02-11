import isOnline from "is-online";

const InternetCheck = async (req, res, next) => {
    try {
        const isConnected = await isOnline();
        if (!isConnected) {
            return res.status(503).json({
                networkError: true,
                error: "No internet connection. Please try again later."
            });
        }

        next();
    } catch (error) {
        console.error("INTERNET_CHECK_MIDDLEWARE_ERROR", error)
    }
}

export default InternetCheck
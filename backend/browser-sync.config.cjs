module.exports = {
    proxy: "http://localhost:4000",
    files: [
        "./emails/**/*.js",
    ],
    port: 4001,
    notify: false
}
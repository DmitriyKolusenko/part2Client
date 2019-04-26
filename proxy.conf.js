// see https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md
const PROXY_CONFIG = [
    {
        context: [
            "/assets/clients.json",
            "/assets/products.json",
            "/loginAction",
            "/api/products",
            "/api/clients/user",
            "/api/clients",
            "/api/writeorder",
            "/api/cardreq",
            "/logout"
        ],
        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
    }
  ]
   module.exports = PROXY_CONFIG; 
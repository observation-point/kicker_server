module.exports = {
  apps : [
      {
        name: "KickerServer",
        script: "dist/app.js",
        watch: false,
        env: {
            "NODE_ENV": "development"
        }
      }
  ]
}

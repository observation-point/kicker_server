const session = require("express-session");
const RedisStore = require("connect-redis")(session);

export const redisStore = new RedisStore();

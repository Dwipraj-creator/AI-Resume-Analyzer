const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  tls: {}, // Upstash requires TLS regardless of whether REDIS_URL uses redis:// or rediss://
  keepAlive: 10000, // send a TCP keep-alive every 10s so idle local/router NAT timeouts
  // don't silently kill the connection between requests — this is what was causing
  // the repeated reconnects.
});

let hasLoggedConnect = false;

redis.on("connect", () => {
  if (!hasLoggedConnect) {
    console.log("Redis connected");
    hasLoggedConnect = true;
  }
});

redis.on("close", () => {
  hasLoggedConnect = false;
});

redis.on("error", (err) => {
  console.log("Redis connection error:", err.message);
});

module.exports = redis;
import log from "loglevel";

const isDev = process.env.NODE_ENV !== "production";

log.setDefaultLevel(isDev ? "debug" : "warn");

const logger = {
  debug: log.debug.bind(log),
  info: log.info.bind(log),
  warn: log.warn.bind(log),
  error: log.error.bind(log),
};

export default logger;

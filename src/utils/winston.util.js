import { createLogger, format, transports, addColors } from "winston";

const { combine, printf, colorize, simple, json } = format;
const { Console, File } = transports;

// Definir niveles y colores personalizados
const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const colors = {
  fatal: "red",
  error: "yellow",
  warn: "magenta",
  info: "blue",
  http: "white",
  debug: "green",
};

// Aplicar colores personalizados
addColors(colors);

// Formato personalizado para la consola
const customFormat = printf(({ level, message }) => {
  return `[${level.toUpperCase()}]: ${message}`;
});

// Crear el logger
const winstonLogger = createLogger({
  levels,
  format: combine(colorize(), customFormat),
  transports: [
    // Guardar en archivos
    new File({
      level: "error",
      filename: "./logs/errors.log",
      format: json(),
    }),
    new File({
      level: "warn",
      filename: "./logs/warnings.log",
      format: json(),
    }),
    new File({
      filename: "./logs/combined.log",
      format: json(),
    }),
  ],
});

// Mostrar logs solo en desarrollo
if (process.env.NODE_ENV !== "production") {
  winstonLogger.add(
    new Console({
      level: "debug",
      format: combine(colorize(), simple()),
    })
  );
} else {
  winstonLogger.add(
    new Console({
      level: "error",
      format: combine(colorize(), simple()),
    })
  );
}

export default winstonLogger;

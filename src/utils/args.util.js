import { Command } from "commander";

const args = new Command();

args
  .option("-p <port>", "Puerto del servidor (por defecto: 3000)")
  .option("--mode <mode>", "Modo de ejecución (dev, test, prod)", "dev");

args.parse();

export default args.opts();

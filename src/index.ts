import { ConnectTauri } from "./connect-tauri";
import type { Connectable } from "@fireproof/encrypted-blockstore";

const tauriCxs = new Map<string, ConnectTauri>();

export { ConnectTauri };

export const connect = {
  tauri: ({ name, blockstore }: Connectable, refresh = false) => {
    if (!name) throw new Error("database name is required");
    if (!refresh && tauriCxs.has(name)) {
      return tauriCxs.get(name)!;
    }
    const connection = new ConnectTauri(name);
    connection.connect(blockstore);
    tauriCxs.set(name, connection);
    return connection;
  },
};

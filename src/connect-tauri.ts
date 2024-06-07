import type {
  DownloadMetaFnParams,
  DownloadDataFnParams,
  UploadMetaFnParams,
  UploadDataFnParams,
} from "./types";

import { Connection } from "@fireproof/encrypted-blockstore";
import {
  readBinaryFile,
  writeBinaryFile,
  BaseDirectory,
} from "@tauri-apps/api/fs";

export class ConnectTauri extends Connection {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  async metaUpload(bytes: Uint8Array, params: UploadMetaFnParams) {
    const { name, branch } = params;
    const key = new URLSearchParams({ name, branch }).toString();
    await writeBinaryFile(key, bytes, { dir: BaseDirectory.Data });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async dataUpload(bytes: Uint8Array, params: UploadDataFnParams) {
    const { type, name, car } = params;
    const key = new URLSearchParams({ type, name, car }).toString();
    await writeBinaryFile(key, bytes, { dir: BaseDirectory.Data });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async metaDownload({ name, branch }: DownloadMetaFnParams) {
    const key = new URLSearchParams({ name, branch }).toString();
    const contents = await readBinaryFile(key, { dir: BaseDirectory.Data });
    return contents;
  }

  async dataDownload({ type, name, car }: DownloadDataFnParams) {
    const key = new URLSearchParams({ type, name, car }).toString();
    const contents = await readBinaryFile(key, { dir: BaseDirectory.Data });
    return contents;
  }
}

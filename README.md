# Fireproof Connector for Tauri Backend

Save your [Fireproof](https://use-fireproof.com/) data to a local file using the [Tauri](https://tauri.studio/) backend.

Uses [Tauri FS API](https://tauri.app/v1/api/js/fs) to write data to a file.

## Use

```javascript
import { fireproof } from '@fireproof/core'
import { connect } from '@douganderson444/fireproof-connector-tauri';

const db = fireproof('my-database');
const connection = new connect.tauri(db)

// use the cx
connection.ready.then(() => {
  // do something with the db
})
```

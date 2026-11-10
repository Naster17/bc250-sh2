# Site configuration

Values for this deployment. The repository defaults live in `.env.example`; this
page records what this host currently uses. It contains no secrets.

| Item | Value |
|---|---|
| SSH host | `nik@192.168.1.105` |
| Hostname | `bc500` |
| Repository checkout | `~/bc250-sh2` |
| Data root (`SH2_DIR`) | `/home/nik/sh2` |
| SHUI portal | `https://192.168.1.105:8483` |
| Timezone | `Europe/Rome` |
| SteamID3 | `950207934` |
| Steam shortcut appid | `3102825927` |
| Offline Prism nickname / UUID | `nik` / `0749cb21fe1d3cd78fe4babbe5fee5fe` |
| Deploy host (`DEPLOY_HOST`) | `nik@192.168.1.105` |
| Deploy directory (`DEPLOY_DIR`) | `~/bc250-sh2` |

Use these values in the ignored `.env` file, or pass them to `make deploy`:

```bash
make deploy DEPLOY_HOST=nik@192.168.1.105 \
            DEPLOY_DIR=~/bc250-sh2
```

# Steam Headless 2 + BC-250 (AMD Cyan Skillfish / RADV GFX1013) tuning.
#
# The upstream image is used unmodified; every change is copied over it from
# rootfs/ so the deltas stay reviewable:
#   * gamescope launcher wrapper without --force-grab-cursor
#   * systemd drop-in that points the gaming-mode unit at that wrapper
#   * first-boot seeding of ~/.config/sunshine/{sunshine.conf,apps.json}
#   * "long press Select -> Quick Access Menu" added to Steam's default
#     controller layouts (re-applied on every boot, Steam updates overwrite them)
FROM josh5/steam-headless:2

USER root

COPY rootfs/usr/local/bin/gamescope-no-force-grab \
     /usr/local/bin/gamescope-no-force-grab

COPY rootfs/usr/local/bin/steam-controller-patch \
     /usr/local/bin/steam-controller-patch

COPY rootfs/usr/local/sh-init.d/10-seed-sunshine-config.sh \
     /usr/local/sh-init.d/10-seed-sunshine-config.sh

COPY rootfs/usr/local/sh-init.d/20-patch-steam-controller-base.sh \
     /usr/local/sh-init.d/20-patch-steam-controller-base.sh

COPY rootfs/usr/share/steam-headless-custom/ \
     /usr/share/steam-headless-custom/

COPY rootfs/etc/systemd/system/steam-headless-gamescope.service.d/50-no-force-grab-cursor.conf \
     /etc/systemd/system/steam-headless-gamescope.service.d/50-no-force-grab-cursor.conf

RUN set -eux; \
    chmod 0755 /usr/local/bin/gamescope-no-force-grab \
               /usr/local/bin/steam-controller-patch \
               /usr/local/sh-init.d/10-seed-sunshine-config.sh \
               /usr/local/sh-init.d/20-patch-steam-controller-base.sh; \
    chmod 0644 /etc/systemd/system/steam-headless-gamescope.service.d/50-no-force-grab-cursor.conf \
               /usr/share/steam-headless-custom/sunshine.conf \
               /usr/share/steam-headless-custom/apps.json; \
    bash -n /usr/local/bin/gamescope-no-force-grab; \
    bash -n /usr/local/sh-init.d/10-seed-sunshine-config.sh; \
    bash -n /usr/local/sh-init.d/20-patch-steam-controller-base.sh; \
    python3 -m py_compile /usr/local/bin/steam-controller-patch; \
    rm -rf /usr/local/bin/__pycache__

# The image runs systemd as PID 1 with the stock entrypoint; keep it.

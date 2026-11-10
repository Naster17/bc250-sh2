# Steam Headless 2 + BC-250 (AMD Cyan Skillfish / RADV GFX1013) tuning.
#
# The upstream image is used unmodified; every change is copied over it from
# rootfs/ so the deltas stay reviewable:
#   * gamescope launcher wrapper without --force-grab-cursor
#   * systemd drop-in that points the gaming-mode unit at that wrapper
#   * first-boot seeding of ~/.config/sunshine/{sunshine.conf,apps.json}
#   * "long press Select -> Quick Access Menu" added to Steam's default
#     controller layouts (re-applied on every boot, Steam updates overwrite them)
#   * GPU utilisation exporter, because the BC-250 driver does not support
#     gpu_busy_percent and Steam's performance overlay reads exactly that file
#   * CPU clock publisher, because the BC-250 kernel has no cpufreq driver and
#     the overlay reads cpu*/cpufreq/scaling_cur_freq
#   * Moonlight-driven display modes: Sunshine's global prep command applies the
#     client's resolution/refresh to KWin and relaunches gamescope so the game
#     renders at that mode instead of being scaled
# Pinned by digest: the tag is mutable, and the deltas below assume this exact
# filesystem layout (systemd units in /usr/lib/systemd/system, Steam under
# /home/steamheadless). Bump both tag and digest together.
FROM josh5/steam-headless:2@sha256:c60f4d7243a4d94515f722441fff90b752413bf6a45bb221c9a4ed55bc4d9108

USER root

ARG IMAGE_VERSION=1.4.14
ARG GIT_REVISION=unknown

LABEL org.opencontainers.image.title="Steam Headless BC-250" \
      org.opencontainers.image.description="Thin Steam Headless 2 layer for the AMD BC-250 (Cyan Skillfish / RADV GFX1013)" \
      org.opencontainers.image.version="${IMAGE_VERSION}" \
      org.opencontainers.image.revision="${GIT_REVISION}" \
      org.opencontainers.image.source="https://github.com/Naster17/steam-headless-bc250" \
      org.opencontainers.image.licenses="MIT"

# The curated rootfs mirrors the container filesystem; one COPY keeps the layer
# count down. .dockerignore keeps VCS, docs and local data out of the context.
COPY rootfs/ /

RUN set -eux; \
    chmod 0755 /usr/local/bin/gamescope-no-force-grab \
               /usr/local/bin/steam-controller-patch \
               /usr/local/bin/steam-gpu-load \
               /usr/local/bin/steam-cpu-freq \
               /usr/local/bin/steam-display-request \
               /usr/local/sbin/steam-display-syncd \
               /usr/local/sh-init.d/10-seed-sunshine-config.sh \
               /usr/local/sh-init.d/20-patch-steam-controller-base.sh \
               /usr/local/sh-init.d/30-manage-sunshine-display-prep.sh; \
    chmod 0644 /etc/systemd/system/steam-headless-gamescope.service.d/50-no-force-grab-cursor.conf \
               /etc/systemd/system/steam-display-syncd.service \
               /usr/share/steam-headless-custom/sunshine.conf \
               /usr/share/steam-headless-custom/apps.json; \
    bash -n /usr/local/bin/gamescope-no-force-grab; \
    bash -n /usr/local/bin/steam-cpu-freq; \
    bash -n /usr/local/bin/steam-display-request; \
    bash -n /usr/local/sbin/steam-display-syncd; \
    bash -n /usr/local/sh-init.d/10-seed-sunshine-config.sh; \
    bash -n /usr/local/sh-init.d/20-patch-steam-controller-base.sh; \
    bash -n /usr/local/sh-init.d/30-manage-sunshine-display-prep.sh; \
    PYTHONPYCACHEPREFIX=/tmp/pycache python3 -m py_compile \
                          /usr/local/bin/steam-controller-patch \
                          /usr/local/bin/steam-gpu-load; \
    rm -rf /tmp/pycache /usr/local/bin/__pycache__; \
    mkdir -p /etc/systemd/system/multi-user.target.wants; \
    ln -sf /etc/systemd/system/steam-gpu-load.service \
           /etc/systemd/system/multi-user.target.wants/steam-gpu-load.service; \
    ln -sf /etc/systemd/system/steam-cpu-freq.service \
           /etc/systemd/system/multi-user.target.wants/steam-cpu-freq.service; \
    ln -sf /etc/systemd/system/steam-display-syncd.service \
           /etc/systemd/system/multi-user.target.wants/steam-display-syncd.service

# The image runs systemd as PID 1 with the stock entrypoint; keep it.

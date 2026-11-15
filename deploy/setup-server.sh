#!/usr/bin/env bash
# Eenmalig op de server (als gewone gebruiker met sudo): maakt van de Dockge-stack een git-clone
# en zet de timer aan die elke minuut pull.sh draait. Opnieuw draaien kan geen kwaad.
set -euo pipefail
REPO=https://github.com/lurtze1/MijnKleineWebsites.git
STACK=/opt/stacks/rekenen

if [ ! -d "$STACK/.git" ]; then
  if [ -d "$STACK" ]; then
    # de oude stack (losse html-map) stoppen en buiten /opt/stacks bewaren, anders ziet Dockge hem als stack
    (cd "$STACK" && docker compose down) || true
    sudo mv "$STACK" "$HOME/rekenen-oud-$(date +%Y%m%d-%H%M%S)"
  fi
  git clone --branch main "$REPO" "$STACK"
fi
bash "$STACK/deploy/pull.sh" --force </dev/null   # </dev/null: anders eet docker de rest van dit script op als het via stdin komt

sudo cp "$STACK"/deploy/kleinewebsites-pull.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now kleinewebsites-pull.timer
systemctl list-timers kleinewebsites-pull.timer --no-pager

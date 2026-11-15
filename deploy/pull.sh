#!/usr/bin/env bash
# Draait op de server, elke minuut via kleinewebsites-pull.timer.
# Haalt origin/main op; is er iets nieuws, dan wordt de map gelijkgetrokken en de stack bijgewerkt.
#   pull.sh          alleen iets doen als main veranderd is
#   pull.sh --force  altijd opnieuw uitrollen
set -euo pipefail

# Alles in een functie: bash heeft het script dan al helemaal gelezen voordat git het bestand vervangt.
main() {
  cd "$(dirname "$(readlink -f "$0")")/.."
  local marker=.git/uitgerold new
  git fetch --quiet origin main
  new=$(git rev-parse origin/main)
  if [ "${1:-}" != "--force" ] && [ "$(cat "$marker" 2>/dev/null)" = "$new" ]; then exit 0; fi

  # De server is geen werkplek: lokale wijzigingen (bijv. via de Dockge-editor) vervallen.
  git reset --quiet --hard "$new"
  docker compose up -d --build --remove-orphans
  docker compose exec -T sites nginx -t
  docker compose exec -T sites nginx -s reload
  # Pas na een geslaagde uitrol vastleggen; mislukt er iets, dan probeert de volgende run het opnieuw.
  echo "$new" > "$marker"
  echo "uitgerold: $(git log -1 --format='%h %s')"
  exit 0
}
main "$@"

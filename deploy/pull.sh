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

  # Sleutels voor de API: één keer aanmaken, daarna nooit meer aanraken. Niet in git (.gitignore).
  # DB_KEY ontsleutelt het databasebestand; raak je hem kwijt, dan is de database onleesbaar.
  # Ze staan bewust buiten deze map: deze map is de webmap van nginx. De map ernaast ziet nginx niet,
  # en Dockge (dat /opt/stacks kent) kan er wel bij als je de stack vanuit Dockge herstart.
  local geheim=../.kleinewebsites
  if ! grep -qs '^DB_KEY=' "$geheim/env"; then
    ( umask 077; mkdir -p "$geheim"
      printf 'DB_KEY=%s\nSERVER_SECRET=%s\n' "$(openssl rand -hex 32)" "$(openssl rand -hex 32)" > "$geheim/env" )
    chmod 700 "$geheim"; chmod 600 "$geheim/env"
    echo "nieuwe sleutels gemaakt in $(readlink -f "$geheim/env"): bewaar een kopie op een veilige plek"
  fi

  docker compose up -d --build --remove-orphans
  docker compose exec -T sites nginx -t
  docker compose exec -T sites nginx -s reload
  # Pas na een geslaagde uitrol vastleggen; mislukt er iets, dan probeert de volgende run het opnieuw.
  echo "$new" > "$marker"
  echo "uitgerold: $(git log -1 --format='%h %s')"
  exit 0
}
main "$@"

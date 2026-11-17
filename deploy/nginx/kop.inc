# Koppen voor elk antwoord. Los bestand, omdat een location met een eigen add_header de koppen van
# de server niet meer erft: elke location die er een toevoegt, haalt dit bestand er opnieuw bij.
add_header Cache-Control "no-cache";                 # altijd navragen (ETag): een push is direct zichtbaar
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "DENY";                   # niet in een frame op een andere site
add_header Referrer-Policy "same-origin";

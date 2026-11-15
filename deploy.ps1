<#
  Online zetten = pushen naar main. De server haalt main elke minuut op (deploy/pull.sh).
  Dit script doet dat in één keer en wacht niet op de timer:
    .\deploy.ps1     tests draaien, main pushen, de server meteen laten pullen
#>
param([string]$SshHost = 'minime')
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

node --test uwv-rekenhulp/engine.test.js | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Rekentests falen (node --test uwv-rekenhulp/engine.test.js); niets gepusht.' }

git push origin main
if ($LASTEXITCODE -ne 0) { throw 'git push mislukt' }

ssh $SshHost 'sudo systemctl start kleinewebsites-pull.service; journalctl -u kleinewebsites-pull.service -n 3 --no-pager -o cat'
if ($LASTEXITCODE -ne 0) { throw 'pull op de server mislukt' }
Write-Host 'Klaar: https://rekenen.blankandblank.party'

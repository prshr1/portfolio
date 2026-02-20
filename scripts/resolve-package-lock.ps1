$in='C:\Users\FoxtrotX146\OneDrive\Portfolio\package-lock.json'
$bak=$in + '.orig.bak'
Copy-Item -Force -Path $in -Destination $bak
$out = New-Object System.Collections.Generic.List[string]
$state='normal'
Get-Content -Path $in | ForEach-Object {
  $line = $_
  if ($line -like '<<<<<<<*') { $state='head'; return }
  if ($line -eq '=======') { if ($state -eq 'head') { $state='skip'; return } }
  if ($line -like '>>>>>>>*') { $state='normal'; return }
  if ($state -eq 'head' -or $state -eq 'normal') { $out.Add($line) }
}
$out | Set-Content -Path $in -Encoding UTF8
try {
  $json = Get-Content -Raw -Path $in | ConvertFrom-Json
  Write-Output 'JSON_OK'
} catch {
  Write-Output ('JSON_ERROR ' + $_.Exception.Message)
  exit 2
}

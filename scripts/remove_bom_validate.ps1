$path='C:\Users\FoxtrotX146\OneDrive\Portfolio\package-lock.json'
$bak=$path + '.prefix.bak'
Copy-Item -Force -Path $path -Destination $bak
[byte[]]$bytes = [System.IO.File]::ReadAllBytes($path)
if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
  $new = $bytes[3..($bytes.Length-1)]
  [System.IO.File]::WriteAllBytes($path,$new)
  Write-Output 'BOM_REMOVED'
  $s = [System.Text.Encoding]::UTF8.GetString($new)
} else {
  Write-Output 'NO_BOM'
  $s = [System.Text.Encoding]::UTF8.GetString($bytes)
}
try {
  $null = $s | ConvertFrom-Json
  Write-Output 'JSON_OK'
} catch {
  Write-Output ('JSON_ERROR ' + $_.Exception.Message)
  exit 2
}

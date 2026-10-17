param(
  [string]$Path = "01______ITAIF2026_Power_of_AI_in_Business.pptx",
  [string]$OutputSubdirectory = "",
  [switch]$SkipSpeakerPhoto
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$sourcePath = if ([System.IO.Path]::IsPathRooted($Path)) { $Path } else { Join-Path $projectRoot $Path }
$slidesRoot = Join-Path $projectRoot "public\slides"
$outputDirectory = if ($OutputSubdirectory) {
  Join-Path $slidesRoot $OutputSubdirectory
}
else {
  $slidesRoot
}
$manifestPath = Join-Path $outputDirectory "manifest.json"

if (-not (Test-Path $sourcePath)) {
  throw "PPTX source not found: $sourcePath"
}

New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
Get-ChildItem $outputDirectory -Filter "slide-*.png" | Remove-Item -Force

$powerPoint = $null
$presentation = $null

try {
  $powerPoint = New-Object -ComObject PowerPoint.Application
  $powerPoint.Visible = -1
  $presentation = $powerPoint.Presentations.Open($sourcePath, $true, $true, $false)
  $manifestSlides = @()

  for ($index = 1; $index -le $presentation.Slides.Count; $index++) {
    $fileName = "slide-{0:D3}.png" -f $index
    $targetPath = Join-Path $outputDirectory $fileName
    $presentation.Slides.Item($index).Export($targetPath, "PNG", 1920, 1080)
    $manifestSlides += [ordered]@{
      file = $fileName
      title = "Original slide $index"
    }
    Write-Host "Rendered slide $index of $($presentation.Slides.Count)"
  }

  $manifest = [ordered]@{
    generatedAt = (Get-Date).ToUniversalTime().ToString("o")
    source = [System.IO.Path]::GetFileName($sourcePath)
    slides = $manifestSlides
  }
  $manifest | ConvertTo-Json -Depth 5 | Set-Content -Path $manifestPath -Encoding UTF8
}
finally {
  if ($presentation) {
    $presentation.Close()
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($presentation)
  }
  if ($powerPoint) {
    $powerPoint.Quit()
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($powerPoint)
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}

if (-not $SkipSpeakerPhoto) {
  Add-Type -AssemblyName System.Drawing
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $tempDirectory = Join-Path ([System.IO.Path]::GetTempPath()) ("itaif-pptx-" + [guid]::NewGuid())

  try {
    [System.IO.Compression.ZipFile]::ExtractToDirectory($sourcePath, $tempDirectory)
    $mediaDirectory = Join-Path $tempDirectory "ppt\media"
    $candidates = @()

    if (Test-Path $mediaDirectory) {
      Get-ChildItem $mediaDirectory -File | ForEach-Object {
        try {
          $image = [System.Drawing.Image]::FromFile($_.FullName)
          $area = $image.Width * $image.Height
          $ratio = $image.Width / [double]$image.Height
          $portraitWeight = if ($ratio -ge 0.55 -and $ratio -le 1.3) { 2.0 } else { 0.55 }
          $candidates += [pscustomobject]@{
            Path = $_.FullName
            Score = $area * $portraitWeight
            Width = $image.Width
            Height = $image.Height
          }
          $image.Dispose()
        }
        catch {
          # Ignore vectors and unsupported media.
        }
      }
    }

    $best = $candidates | Where-Object { $_.Width -ge 500 -and $_.Height -ge 500 } |
      Sort-Object Score -Descending | Select-Object -First 1

    if ($best) {
      $speakerTarget = Join-Path $projectRoot "public\speaker.jpg"
      $sourceImage = [System.Drawing.Image]::FromFile($best.Path)
      try {
        $sourceImage.Save($speakerTarget, [System.Drawing.Imaging.ImageFormat]::Jpeg)
      }
      finally {
        $sourceImage.Dispose()
      }
      Write-Host "Extracted speaker-photo candidate ($($best.Width)x$($best.Height)). Verify it visually."
    }
    else {
      Write-Warning "No suitable speaker-photo candidate was found in the PPTX media."
    }
  }
  finally {
    if (Test-Path $tempDirectory) {
      Remove-Item $tempDirectory -Recurse -Force
    }
  }
}

Write-Host ""
Write-Host "Import complete: $($manifestSlides.Count) original slides."
Write-Host "Run 'npm run dev' to review the presentation."

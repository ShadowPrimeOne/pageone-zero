# PowerShell script to convert key images to responsive WebP sizes for Next.js optimization
# Requires sharp-cli (run: npm install -g sharp-cli) or use npx sharp-cli

# PowerShell script to convert key images to responsive WebP sizes for Next.js optimization
# Requires sharp-cli (run: npm install -g sharp-cli) or use npx sharp-cli

$optimizedDir = Join-Path $PSScriptRoot "optimized"
if (-not (Test-Path $optimizedDir)) {
    New-Item -ItemType Directory -Path $optimizedDir | Out-Null
}

$images = @(
    "Trusted by Champions.jpg",
    "International.jpg",
    "Hero truck horse transport.jpg",
    "Australia wide.jpg",
    "About Us Image.jpg",
    "Magic Millions Logo.jpg"
)

$sizes = @(320, 640, 960, 1200)

foreach ($img in $images) {
    foreach ($size in $sizes) {
        $input = "./$img"
        $basename = [System.IO.Path]::GetFileNameWithoutExtension($img)
        $output = Join-Path $optimizedDir ("${basename}-${size}w.webp")
        Write-Host "Converting $img to $output ($size w)"
        npx sharp-cli "$input" resize $size --format webp --quality 68 --output "$output"
    }
}

# Convert PNG badge logos as well
$badges = @(
    "Inglis Logo.png",
    "IRT Logo.png"
)

foreach ($img in $badges) {
    foreach ($size in @(64,128,256)) {
        $input = "./$img"
        $basename = [System.IO.Path]::GetFileNameWithoutExtension($img)
        $output = Join-Path $optimizedDir ("${basename}-${size}w.webp")
        Write-Host "Converting $img to $output ($size w)"
        npx sharp-cli "$input" resize $size --format webp --quality 70 --output "$output"
    }
}

# Truck Logo (PNG, hero)
$truckLogo = "Truck Logo.png"
foreach ($size in @(110, 220, 250)) {
    $input = "./$truckLogo"
    $basename = [System.IO.Path]::GetFileNameWithoutExtension($truckLogo)
    $output = Join-Path $optimizedDir ("${basename}-${size}w.webp")
    Write-Host "Converting $truckLogo to $output ($size w)"
    npx sharp-cli "$input" resize $size --format webp --quality 75 --output "$output"
}

Write-Host "All conversions complete. WebP images are in ./optimized/"

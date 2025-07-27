# PowerShell script to download all image assets from sydneyhorsetransport.com.au reference site
# Run this script from the project root or from within the IMAGES/horse-transport directory

# PowerShell script to download all image assets for horse transport landing page
# Each file is saved with the correct filename for the codebase

$images = @{
    # Hero/Background
    "https://cdn.prod.website-files.com/670776e68fbcb2930ea24ce7/6711c45bfcd5be115b7066a0_DSC07487.jpg" = "hero.jpg"
    # Logo
    "https://cdn.prod.website-files.com/670776e68fbcb2930ea24ce7/67241c8da51c4a94b7e2bb13_Webflow%20Background.svg" = "horse-logo.svg"
    # Trust Badges
    "https://cdn.prod.website-files.com/670776e68fbcb2930ea24ce7/6711c45bfcd5be115b7066a0_google-partner-logo.png" = "google-partner-logo.png"
    "https://cdn.prod.website-files.com/670776e68fbcb2930ea24ce7/6711c45bfcd5be115b7066a0_IRT-logo.png" = "IRT-logo.png"
    "https://cdn.prod.website-files.com/670776e68fbcb2930ea24ce7/6711c45bfcd5be115b7066a0_magic-millions-logo.png" = "magic-millions-logo.png"
    # About section
    "https://cdn.prod.website-files.com/670776e68fbcb2930ea24ce7/6711c45bfcd5be115b7066a0_DSC07488.jpg" = "about.jpg"
}

foreach ($pair in $images.GetEnumerator()) {
    $url = $pair.Key
    $filename = $pair.Value
    Invoke-WebRequest -Uri $url -OutFile $filename
    Write-Host "Downloaded $filename"
}

Write-Host "All images downloaded. Ready for reload."

Write-Host "All images downloaded. Move or rename files as needed."

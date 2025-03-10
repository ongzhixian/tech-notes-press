# Script for publishing to Neocities

function Get-NeocitiesApiKey {

    # LOCAL PC SETUP
    $secretsGuid = '47df7034-c1c1-4b87-8373-89f5e42fc9ec'
    $secretsAbstractPath = "%APPDATA%\Microsoft\UserSecrets\$secretsGuid\secrets.json"
    $secretsFilePath = [System.Environment]::ExpandEnvironmentVariables($secretsAbstractPath)
    $secretsKey = "neocities:zhixian_api_key"

    # Get API Key

    $secretsJson = Get-Content C:\Users\zhixian\AppData\Roaming\Microsoft\UserSecrets\47df7034-c1c1-4b87-8373-89f5e42fc9ec\secrets.json | ConvertFrom-Json
    $neocitiesApiKey = $secretsJson.$secretsKey
    return $neocitiesApiKey
}

function Get-SiteInfo {
    $headers = @{
        "Authorization" = "Bearer $neocitiesApiKey"
    }

    $response = Invoke-RestMethod -Method 'Get' -Uri "$neocitiesBaseApiUrl/info" -Headers $headers

    return $response.info
}

function Get-FileList {
    $headers = @{
        "Authorization" = "Bearer $neocitiesApiKey"
    }

    $body = @{
    }

    $response = Invoke-RestMethod -Method 'Get' -Uri "$neocitiesBaseApiUrl/list" -Headers $headers -Body $body

    return $response.files
}

function Delete-Files ($filesToDelete) {
    $headers = @{
        "Authorization" = "Bearer $neocitiesApiKey"
        "Content-Type" = "application/x-www-form-urlencoded"
    }

    $body = @()
    foreach ($file in $filesToDelete) {
        $body += "filenames[]=$([uri]::EscapeDataString($file.path))"
    }
    $finalBody = $body -join "&"
    Write-Host $finalBody

    $response = Invoke-RestMethod -Method Post -Uri "$neocitiesBaseApiUrl/delete" -Headers $headers -Body $finalBody
    $response
}

function Get-FilesToUpload {
    return Get-ChildItem .\artifacts\ -Recurse -File | Sort-Object -Property @{Expression = "DirectoryName"}, @{Expression = "FullName"} | Select-Object FullName
}

function Upload-Files($filesToUpload) {
    $publishRootDirectory = "C:\src\github.com\ongzhixian\tech-notes-press\artifacts\"
#     foreach ($file in $filesToUpload) {
#         Write-Host "Local path is $($file.FullName)"
#         $remotePath = $file.FullName.Replace($publishRootDirectory, "").Replace("`\", "/")
#         Write-Host "Remote path is $remotePath"
#     }

    $boundary = [System.Guid]::NewGuid().ToString()
    $LF = "`r`n"
    $bodyBuilder = @() # Initialize an empty array for the body
    foreach ($filePath in $filesToUpload) {
        $remotePath = $filePath.FullName.Replace($publishRootDirectory, "").Replace("`\", "/")
        $fileContent = Get-Content -Path $filePath.FullName -Raw -AsByteStream
        $contentType = "application/octet-stream" # Default
        Write-Host "Publishing $($filePath.FullName) to [$remotePath]"

#         if ($fileName.EndsWith(".html")) { $contentType = "text/html" }
#         elseif ($fileName.EndsWith(".txt")) { $contentType = "text/plain" }
#         elseif ($fileName.EndsWith(".jpg")) { $contentType = "image/jpeg" }
#         # Add more content type mappings as needed
#
        $bodyBuilder += "--$boundary"
        $bodyBuilder += "Content-Disposition: form-data; name=`"$remotePath`"; filename=`"$remotePath`""
        $bodyBuilder += "Content-Type: $contentType"
        $bodyBuilder += ""
        $bodyBuilder += ([byte[]]$fileContent)
    }
    $bodyBuilder += "--$boundary--"

    $contentTypeHeader = "multipart/form-data; boundary=$boundary"
    $body = ($bodyBuilder -join $LF)
    $headers = @{
        "Authorization" = "Bearer $neocitiesApiKey"
        "Content-Type" = "multipart/form-data; boundary=$boundary"
    }

    try {
        Invoke-RestMethod -Method Post -Uri "$neocitiesBaseApiUrl/upload" -Headers $headers -Body $body
        Write-Host "Files uploaded successfully."
    } catch {
        Write-Error "Error uploading files: $($_.Exception.Message)"
    }
}

function New-SyncList($filesToUpload)
{
    if (-not (Test-Path "sync-list.json")) {
        "" | Out-File "sync-list.json"
        #$syncList = New-Object System.Collections.ArrayList
        #$syncList | ConvertTo-Json | Out-File "sync-list.json"
    }

    $syncList = Get-Content "sync-list.json" | ConvertFrom-Json
    if ($syncList -eq $null) {
        $syncList = New-Object System.Collections.ArrayList
    }

    foreach ($entry in $syncList) {
        $entry.action = 'remove'
    }

    $publishRootDirectory = "C:\src\github.com\ongzhixian\tech-notes-press\artifacts\"

    foreach ($file in $filesToUpload) {
        $syncEntry = $syncList | Where-Object { $_.localPath -eq $file.FullName }
        if ($syncEntry -eq $null) {
            $newValue = @{
                localPath = $file.FullName
                remotePath = $file.FullName.Replace($publishRootDirectory, "").Replace("`\", "/")
                localMD5 = $(Get-FileHash $file.FullName -Algorithm MD5).Hash
                status = 'pending-upload'
                action = 'upload'
            }
            $null = $syncList.Add($newValue)
        } else {
            $fileMD5 = $(Get-FileHash $file.FullName -Algorithm MD5).Hash
            if ($fileMD5 -ne $syncEntry.localMD5) {
                $syncEntry.localMD5 = $fileMD5
                $syncEntry.action = 'upload'
            } else {
                if ($syncEntry.status -eq 'pending-upload') {
                    $syncEntry.action = 'upload'
                }
                # Else means that file is already uploaded (status -eq 'uploaded')
                elseif ($syncEntry.status -eq 'uploaded') {
                    $syncEntry.action = $null
                }
            }
        }
    }

    $syncList | ConvertTo-Json | Out-File "sync-list.json"
}

function Merge-SyncList ($fileList) {
    $syncList = Get-Content "sync-list.json" | ConvertFrom-Json
    $syncList
}

# MAIN SCRIPT

$neocitiesBaseApiUrl = "https://neocities.org/api"
$neocitiesApiKey = Get-NeocitiesApiKey

# Get-SiteInfo
# $fileList = Get-FileList
# $fileList
# $filesToDelete = $fileList | Where-Object { -not $_.is_directory -and $_.path -ne "index.html" }
# Delete-Files $filesToDelete

# $filesToDelete = $fileList | Where-Object { $_.path -ne "index.html" }
# Delete-Files $filesToDelete

$filesToUpload = Get-FilesToUpload
$subset = $filesToUpload | Select-Object -First 5
#Upload-Files $subset

New-SyncList $subset
#
# $fileList = Get-FileList
# $fileList
# Merge-SyncList $fileList


return
# Test run -- Get site info

# Get site file list

# $response.files

# Delete all files from website
# $body = @{}
# $filesToDelete = $response.files | Where-Object { -not $_.is_directory -and $_.path -ne "index.html" }
# # for ($i = 0; $i -lt $filesToDelete.Count; $i++) {
# #     Write-Host $filesToDelete[$i].path
# #     $body["filenames[$i]"] = $filesToDelete[$i].path
# #     $body["filenames[]"] += $_ + "," # Append with comma
# # }
# $body = "{"
# $filesToDelete | ForEach-Object {
#     #Write-Host $_.path
#     #$body["filenames[]"] += $_.path.ToString() + "," # Append with comma
# #     Write-Host $_.path
#      $body += "`"filenames[]`":`"$($_.path)`","
# }
# $body = $body.Trim(",")
# $body += "}"
#
# # Test
# $body
#
# $headers = @{
#     "Content-Type" = "application/json"
#     "Authorization" = "Bearer $neocitiesApiKey"
# }
# $response = Invoke-RestMethod -Method 'POST' -Uri "$neocitiesBaseApiUrl/delete" -Headers $headers -Body $body
#
# $response = Invoke-RestMethod -Method 'Get' -Uri "$neocitiesBaseApiUrl/list" -Headers $headers
# Write-Host '===='
# $response.files | % { Write-Host $_.path }
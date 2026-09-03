# Cai dat FunClip (modelscope/FunClip) tren Windows.
# Dung trong PowerShell:  .\tools\funclip\install.ps1 [-TargetDir C:\funclip]
param(
    [string]$TargetDir = "$env:USERPROFILE\funclip",
    [string]$FunclipRef = "v2.2.1"
)

$ErrorActionPreference = "Stop"

$RepoDir = Join-Path $TargetDir "FunClip"
$VenvDir = Join-Path $TargetDir "venv"

Write-Host "==> Thu muc cai dat: $TargetDir"
Write-Host "==> Phien ban FunClip: $FunclipRef"

foreach ($cmd in @("python", "git", "ffmpeg")) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        Write-Error "Thieu '$cmd'. Cai dat truoc khi chay lai (vi du: winget install Gyan.FFmpeg, winget install Git.Git, winget install Python.Python.3.11)."
        exit 1
    }
}

New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null

if (Test-Path (Join-Path $RepoDir ".git")) {
    Write-Host "==> Da co ma nguon, dang cap nhat ve $FunclipRef"
    git -C $RepoDir fetch --tags --depth 1 origin $FunclipRef
    git -C $RepoDir checkout -q FETCH_HEAD
} else {
    Write-Host "==> Clone FunClip"
    git clone --depth 1 --branch $FunclipRef https://github.com/modelscope/FunClip.git $RepoDir
}

if (-not (Test-Path $VenvDir)) {
    Write-Host "==> Tao moi truong ao tai $VenvDir"
    python -m venv $VenvDir
}

$Py = Join-Path $VenvDir "Scripts\python.exe"
& $Py -m pip install --upgrade pip setuptools wheel

# Khong co GPU NVIDIA thi cai torch ban CPU, nhe hon khoang 5 GB.
$TorchFlavor = $env:FUNCLIP_TORCH
if (-not $TorchFlavor) {
    if (Get-Command nvidia-smi -ErrorAction SilentlyContinue) { $TorchFlavor = "cuda" } else { $TorchFlavor = "cpu" }
}
if ($TorchFlavor -eq "cpu") {
    Write-Host "==> Cai torch ban CPU (khoang 250 MB)"
    & $Py -m pip install torch torchaudio --index-url https://download.pytorch.org/whl/cpu
} else {
    Write-Host "==> Cai torch ban CUDA (khoang 3 GB)"
    & $Py -m pip install torch torchaudio
}

Write-Host "==> Cai dat cac thu vien con lai"
& $Py -m pip install -r (Join-Path $RepoDir "requirements.txt")

& $Py -c "import funasr, gradio, torch; print('funasr', funasr.__version__); print('gradio', gradio.__version__); print('torch', torch.__version__)"

Write-Host ""
Write-Host "==> Cai dat xong."
Write-Host "Buoc tiep theo:"
Write-Host "  1. Tai truoc model:  & '$Py' tools\funclip\download_models.py"
Write-Host "  2. Chay giao dien:   cd '$RepoDir'; & '$Py' funclip\launch.py"
Write-Host "     Mo trinh duyet tai http://localhost:7860"
Write-Host ""
Write-Host "Luu y: model ASR mac dinh chi ho tro tieng Trung va tieng Anh, chua co tieng Viet."

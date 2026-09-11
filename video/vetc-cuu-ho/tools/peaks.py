import subprocess, sys, numpy as np, pathlib, os
FF = "ffmpeg"
SR = 48000
for f in sorted(pathlib.Path("public/audio/sfx").glob("*.mp3")):
    raw = subprocess.run([FF,"-v","quiet","-i",str(f),"-ac","1","-ar",str(SR),"-f","s16le","-"],capture_output=True).stdout
    x = np.frombuffer(raw, dtype="<i2").astype(np.float32)/32768.0
    if len(x)==0: print(f.name,"EMPTY"); continue
    dur = len(x)/SR
    # RMS envelope, 5ms windows
    w = int(SR*0.005)
    n = len(x)//w
    env = np.sqrt((x[:n*w].reshape(n,w)**2).mean(axis=1))
    pk = int(env.argmax())
    t_pk = pk*0.005
    peak_db = 20*np.log10(max(np.abs(x).max(),1e-9))
    print(f"{f.name:28s} dur={dur:6.2f}s peak={peak_db:6.1f}dB  peakAt={t_pk:5.3f}s = {t_pk*30:5.2f}f")

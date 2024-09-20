# Usage

MP4がfaststartならファイルの先頭にdurationなどが含まれるブロックがあるので、応答は早い。

```
$ time node usage.js https://raw.githubusercontent.com/mstssk/til/refs/heads/master/mp4-duration/sample/faststart.mp4
{ duration: 7688960, timescale: 256000, durationInSeconds: 30.035 }
node usage.js   0.18s user 0.02s system 30% cpu 0.646 total
```

faststartでない場合は、ファイルの末尾にdurationなどが含まれるブロックがあるので、ファイルを末尾までダウンロードする必要があり遅い。

```
$ time node usage.js https://raw.githubusercontent.com/mstssk/til/refs/heads/master/mp4-duration/sample/non-faststart.mp4
{ duration: 7680000, timescale: 256000, durationInSeconds: 30 }
node usage.js   0.51s user 0.21s system 11% cpu 6.265 total
```

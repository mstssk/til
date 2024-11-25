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

MOVファイルもほぼ同じ形式なのでイケる。

```
$ time node usage.js https://raw.githubusercontent.com/mstssk/til/refs/heads/master/mp4-duration/sample/non-faststart.mov
{ duration: 691200000, timescale: 23040000, durationInSeconds: 30 }
node usage.js   0.42s user 0.08s system 13% cpu 3.661 total

$ time node usage.js https://raw.githubusercontent.com/mstssk/til/refs/heads/master/mp4-duration/sample/faststart.mov
{ duration: 7680000, timescale: 256000, durationInSeconds: 30 }
node usage.js   0.19s user 0.02s system 10% cpu 1.954 total
```

# References

- > numairawan/video-duration: 📺 Get video duration from URL and local video in Node.js and the browser without ffmpeg/ffprobe. https://github.com/numairawan/video-duration
- > -movflags faststartが有効なのかffmpegで調べる - kazeno memo https://icat.hatenablog.com/entry/2021/11/11/221446

-----

mp4,movファイルが音声を含むかどうかの判定。
音声トラックがあれば、moovアトムの中に音声のシーク情報について示す `smhd` アトムがあるので、それを探している。

```
$ time node find-smhd.mjs ./sample/faststart_no-audio.mp4
'smhd' atom is exist? false
node find-smhd.mjs ./sample/faststart_no-audio.mp4  0.06s user 0.01s system 82% cpu 0.091 total
```

###### 音频播放
```js
export function playAudio ({muted = true}) {
    const audio = new Audio(require('@/assets/water.wav'))
    audio.autoplay = 'autoplay'
    audio.preload = 'preload'
    audio.muted = muted
    audio.oncanplaythrough = (event) => {
        const playedPromise = audio.play()
        if (playedPromise) {
            playedPromise.then((data) => {
                // to do nothing
            }).catch((e) => {
                setTimeout(() => {
                    audio.pause()
                    audio.load()
                }, 1000)
                if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
                    console.log(e.name)
                }
            })
        }
    }
}
```
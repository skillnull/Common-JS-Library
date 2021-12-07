###### 音频播放
```js
export function playAudio (src) {
    const audio = document.createElement('audio')
    audio.src = src || require('@/assets/water.wav')
    audio.preload = true
    audio.oncanplaythrough = (event) => {
        const playedPromise = audio.play()
        if (playedPromise) {
            playedPromise.then(() => {
                console.log("playing sound !!!")
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
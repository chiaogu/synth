import Promise from 'q'
import MediaRecorder from 'audio-recorder-polyfill'
import 'promise-decode-audio-data'

const deferAudioContext = Promise.defer()

const isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
if (isIOS) {
  const onTouch = e => {
    const context = new AudioContext()
    const buffer = context.createBuffer(1, 1, 22050);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    if (source.start) {
      source.start(0);
    } else if (source.play) {
      source.play(0);
    } else if (source.noteOn) {
      source.noteOn(0);
    }

    deferAudioContext.resolve(new AudioContext())
    window.removeEventListener('touchend', onTouch)
  }
  window.addEventListener('touchend', onTouch)
} else {
  deferAudioContext.resolve(new AudioContext())
}

deferAudioContext.promise.then(e => {
  console.log(e)
  debugger
})

export function record() {
  return (() => {
    let recorder = null
    const deferred = Promise.defer()
    const resolveStream = navigator.mediaDevices.getUserMedia({
      audio: true
    })
    resolveStream
      .then(stream => {
        return Promise.all([
          deferAudioContext.promise,
          stream
        ])
      })
      .then(([context, stream]) => {
        debugger
        const onStop = () => {
          stream.getAudioTracks().forEach(track => track.stop())
          stream = null
          fetch(URL.createObjectURL(new Blob(chunks)))
            .then(response => response.arrayBuffer())
            .then(buffer => {
              console.log('buffer', buffer)
              return context.decodeAudioData(buffer)
            })
            .then(buffer => {
              console.log('buffer', buffer)
              return deferred.resolve(buffer)
            })
        }
        const onError = error => {
          stream.getAudioTracks().forEach(track => track.stop())
          stream = null
          deferred.reject(error)
        }
        const onDataAvailable = ({ data }) => data.size && chunks.push(data)

        const chunks = []
        recorder = new MediaRecorder(stream)
        recorder.addEventListener('stop', onStop)
        recorder.addEventListener('dataavailable', onDataAvailable)
        recorder.start(undefined, context)
      })
    return {
      result: deferred.promise,
      stop: () => {
        resolveStream.then(() => {
          if (recorder) {
            recorder.stop()
            recorder = null
          }
        })
      }
    }
  })()
}
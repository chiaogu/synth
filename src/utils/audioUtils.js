import Promise from 'q'
import MediaRecorder from 'audio-recorder-polyfill'

const audioContext = new AudioContext()

export function record() {
  return (() => {
    let recorder = null
    const deferred = Promise.defer()
    const resolveStream = navigator.mediaDevices.getUserMedia({
      audio: true
    })
    resolveStream.then(stream => {
      const onStop = () => {
        stream.getAudioTracks().forEach(track => track.stop())
        stream = null
        fetch(URL.createObjectURL(new Blob(chunks)))
          .then(response => response.arrayBuffer())
          .then(buffer => audioContext.decodeAudioData(buffer))
          .then(buffer => deferred.resolve(buffer))
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
      recorder.start()
    })
    return {
      result: deferred.promise,
      stop: () => {
        resolveStream.then(() => {
          if(recorder) {
            recorder.stop()
            recorder = null
          }
        })
      }
    }
  })()
}
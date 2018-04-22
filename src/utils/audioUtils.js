import Promise from 'q'

const audioContext = new AudioContext()

export function record() {
  return (() => {
    let recorder = null
    const deferred = Promise.defer()
    const resolveStream = navigator.mediaDevices.getUserMedia({
      audio: true
    })
    resolveStream.then(stream => {
      const chunks = []
      recorder = new MediaRecorder(stream)
      recorder.onstop = () => {
        stream.getAudioTracks().forEach(track => track.stop())
        stream = null
        fetch(URL.createObjectURL(new Blob(chunks)))
          .then(response => response.arrayBuffer())
          .then(buffer => audioContext.decodeAudioData(buffer))
          .then(buffer => deferred.resolve(buffer))
      }
      recorder.onerror = error => {
        stream.getAudioTracks().forEach(track => track.stop())
        stream = null
        deferred.reject(error)
      }
      recorder.ondataavailable = ({ data }) => data.size && chunks.push(data)
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
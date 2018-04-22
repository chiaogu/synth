import Promise from 'q'

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
        const fileReader = new FileReader();
        fileReader.onloadend = () => deferred.resolve(fileReader.result)
        fileReader.readAsArrayBuffer(new Blob(chunks));
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
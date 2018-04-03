import Tone from 'tone'

export function noteToFrequency(note) {
  return new Tone.Frequency(note).toFrequency()
}
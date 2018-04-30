import firebase from 'firebase'
import 'firebase/firestore'
import { FIRE_BASE_CONFIG } from '@utils/constant'

const PRESET = 'Preset'

firebase.initializeApp(FIRE_BASE_CONFIG)
const db = firebase.firestore()

export const getPreset = id => db.collection(PRESET).doc(id).get().then(doc => doc.data())
export const sharePreset = preset => db.collection(PRESET).doc().set(preset)
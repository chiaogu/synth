import modules from '@assets/data/modules.json'

const PRESET = () => ({
  "0": {
    "id": "0",
    "name": "test",
    "modules": [
      {
        "id": "omniOscillator",
        "params": {
          "start": true,
          "volume.value": -20,
          "frequency.value": 220,
          "type": "square"
        }
      },
      {
        "id": "amplitudeEnvelope",
        "params": {
          "attack": 0.1,
          "decay": 0.2,
          "sustain": 1,
          "release": 0.8
        }
      },
      {
        "id": "filter"
      },
      {
        "id": "filter"
      },
      {
        "id": "filter"
      },
      {
        "id": "filter"
      },
      {
        "id": "master"
      }
    ]
  },
  "1": {
    "id": "1",
    "name": "testNo2",
    "modules": [
      {
        "id": "omniOscillator",
        "params": {
          "start": true,
          "volume.value": -20,
          "frequency.value": 220,
          "type": "triangle"
        }
      },
      {
        "id": "master"
      }
    ]
  }
})

export function getPreset(id) {
  return Promise.resolve(PRESET()[id])
}

export function getModule(id) {
  const module = modules[id]
  if (module === undefined) {
    return Promise.reject(`Unsupported id: "${id}"`)
  }
  return Promise.resolve(module)
}

export function getModules(ids) {
  return Promise.resolve(ids.map(id => {
    const module = modules[id]
    if (module === undefined) {
      throw new Error(`Unsupported id: "${id}"`)
    }
    return module
  }))
}

export function findModules(params) {
  return Promise.resolve(Object.values(modules))
}
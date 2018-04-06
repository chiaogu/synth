import modules from '@assets/data/modules.json'

const MODULES = () => JSON.parse(JSON.stringify(modules))

const PRESET = () => ({
  "0": {
    "id": "0",
    "name": "test",
    "modules": [
      {
        "id": "omniOscillator",
        "params": {
          "start": true,
          "volume.value": 0,
          "frequency.value": 220,
          "type": "triangle"
        }
      },
      {
        "id": "amplitudeEnvelope",
      },
      {
        "id": "freeverb"
      },
      {
        "id": "master"
      }
    ],
    "panels": [
      {
        "controls": [
          {
            "type": "button",
            "style": {
              "width": '200px',
              "height": '50px',
              "left": '116px',
              "top": 0
            },
            "actions": [
              {
                "index": 1,
                "id": "trigger"
              }
            ]
          },
          {
            "type": "switch",
            "style": {
              "width": '100px',
              "height": '100px',
              "left": '8px',
              "top": '0'
            },
            "actions": [
              {
                "index": 0,
                "id": "type",
                "params": {
                  "true": 'square',
                  "false": 'sawtooth'
                }
              }
            ]
          },
          {
            "type": "slider",
            "style": {
              "width": '100px',
              "height": '300px',
              "left": '8px',
              "top": '108px'
            },
            "config": {
              "max": 880,
              "min": 0,
              "defaultValue": 220
            },
            "actions": [
              {
                "index": 0,
                "id": "frequency.value"
              }
            ]
          }
        ]
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
        "id": "master"
      }
    ]
  }
})

export function getPreset(id) {
  return Promise.resolve(PRESET()[id])
}

export function getModule(id) {
  const module = MODULES()[id]
  if (module === undefined) {
    return Promise.reject(`Unsupported id: "${id}"`)
  }
  return Promise.resolve(module)
}

export function getModules(ids) {
  return Promise.resolve(ids.map(id => {
    const module = MODULES()[id]
    if (module === undefined) {
      throw new Error(`Unsupported id: "${id}"`)
    }
    return module
  }))
}

export function findModules(params) {
  return Promise.resolve(Object.values(MODULES()))
}
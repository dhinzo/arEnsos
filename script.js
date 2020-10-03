window.onload = () => {
  const button = document.querySelector('button[data-action="change"]')
  button.innerText = "Cycle"

  let places = staticLoadPlaces()
  renderPlaces(places)
}

function staticLoadPlaces() {
  return [
    {
      name: "AR Sculptures",
      location: {
        lat: 41.497716,
        lng: -81.570081,
      },
    },
  ]
}

var models = [
  {
    url: "./assets/unaligned.glb",
    scale: "0.5 0.5 0.5",
    info: "Red Enso with Two Rotations",
    rotation: "0 180 0",
  },
  {
    url: "./assets/aligned.glb",
    scale: "0.2 0.2 0.2",
    rotation: "0 180 0",
    info: "Red Enso with Three Rotations",
  },
  {
    url: "./assets/color_enso.glb",
    scale: "0.08 0.08 0.08",
    rotation: "0 180 0",
    info: "Red-colored Enso",
  },
]

var modelIndex = 0
var setModel = function(model, entity) {
  if (model.scale) {
    entity.setAttribute("scale", model.scale)
  }

  if (model.rotation) {
    entity.setAttribute("rotation", model.rotation)
  }

  if (model.position) {
    entity.setAttribute("position", model.position)
  }

  entity.setAttribute("gltf-model", model.url)

  const div = document.querySelector(".instructions")
  div.innerText = model.info
}

function renderPlaces(places) {
  let scene = document.querySelector("a-scene")

  places.forEach((place) => {
    let latitude = place.location.lat
    let longitude = place.location.lng

    let model = document.createElement("a-entity")
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    )

    setModel(models[modelIndex], model)

    model.setAttribute("animation-mixer", "")

    document
      .querySelector('button[data-action="change"]')
      .addEventListener("click", function() {
        var entity = document.querySelector("[gps-entity-place]")
        modelIndex++
        var newIndex = modelIndex % models.length
        setModel(models[newIndex], entity)
      })

    scene.appendChild(model)
  })
}

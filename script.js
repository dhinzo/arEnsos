window.onload = () => {
  let places = staticLoadPlaces()
  renderPlaces(places)
}

function staticLoadPlaces() {
  return [
    {
      name: "AR Sculpture",
      location: {
        lat: 41.497726,
        lng: -81.570082,
      },
    },
  ]
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
    model.setAttribute("gltf-model", "./assets/Red_Enso_3Rings2.glb")
    model.setAttribute("rotation", "0 180 0")
    model.setAttribute("animation-mixer", "")
    model.setAttribute("scale", "3 3 3")

    model.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"))
    })

    scene.appendChild(model)
  })
}

const filters = document.querySelectorAll("[data-gallery-filter]")
const items = document.querySelectorAll("[data-gallery-category]")
const projectContext = document.querySelector("[data-project-context]")

const projectDescriptions = {
  "mass-hysteria": {
    title: "Mass Hysteria",
    description: "Original concept comic."
  },
  "tune-up": {
    title: "Tune Up",
    description: "Original rhythm game concept."
  },
  "starboard": {
    title: "Starboard the Sea-Cat",
    description: "Original illustrated story project."
  }
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.galleryFilter

    filters.forEach(button => {
      button.setAttribute("aria-pressed", String(button === filter))
    })

    items.forEach(item => {
      item.hidden = selected !== "all" && item.dataset.galleryCategory !== selected
    })

    if (projectContext) {
      const context = projectDescriptions[selected]

      if (context) {
        projectContext.querySelector(".project-context__title").textContent = context.title
        projectContext.querySelector(".project-context__description").textContent = context.description
        projectContext.hidden = false
      } else {
        projectContext.hidden = true
      }
    }
  })
})

const dialog = document.querySelector(".gallery-dialog")

if (dialog) {
  const dialogImage = dialog.querySelector(".gallery-dialog__media img")
  const dialogProject = dialog.querySelector(".gallery-dialog__caption .eyebrow")
  const dialogTitle = dialog.querySelector("#gallery-dialog-title")
  const closeButton = dialog.querySelector(".gallery-close")
  let lastTrigger = null

  document.querySelectorAll(".gallery-open").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".gallery-item")
      const image = button.querySelector("img")

      lastTrigger = button
      dialogImage.src = image.currentSrc || image.src
      dialogImage.alt = image.alt
      dialogProject.textContent = item.dataset.galleryProject
      dialogTitle.textContent = item.dataset.galleryTitle
      dialog.showModal()
    })
  })

  closeButton.addEventListener("click", () => {
    dialog.close()
  })

  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      dialog.close()
    }
  })

  dialog.addEventListener("close", () => {
    if (lastTrigger) {
      lastTrigger.focus()
    }
  })
}

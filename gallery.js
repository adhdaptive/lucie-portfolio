const filters = document.querySelectorAll("[data-gallery-filter]")
const serviceLinks = document.querySelectorAll("[data-service-filter]")
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

const updateContext = (title = "", description = "") => {
  if (!projectContext) return

  if (!title) {
    projectContext.hidden = true
    return
  }

  projectContext.querySelector(".project-context__title").textContent = title
  projectContext.querySelector(".project-context__description").textContent = description
  projectContext.hidden = false
}

const clearServiceState = () => {
  serviceLinks.forEach(link => link.removeAttribute("aria-current"))
}

const applyProjectFilter = selected => {
  filters.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.galleryFilter === selected))
  })

  clearServiceState()

  items.forEach(item => {
    item.hidden = selected !== "all" && item.dataset.galleryCategory !== selected
  })

  const context = projectDescriptions[selected]
  updateContext(context?.title, context?.description)
}

const applyServiceFilter = (selected, label, activeLink) => {
  filters.forEach(button => button.setAttribute("aria-pressed", "false"))

  serviceLinks.forEach(link => {
    if (link === activeLink) {
      link.setAttribute("aria-current", "true")
    } else {
      link.removeAttribute("aria-current")
    }
  })

  items.forEach(item => {
    const services = (item.dataset.galleryServices || "").split(" ").filter(Boolean)
    item.hidden = !services.includes(selected)
  })

  updateContext(label, "Selected examples from the portfolio.")
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    applyProjectFilter(filter.dataset.galleryFilter)
  })
})

serviceLinks.forEach(link => {
  link.addEventListener("click", () => {
    applyServiceFilter(link.dataset.serviceFilter, link.textContent.trim(), link)
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

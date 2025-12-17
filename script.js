// Import Three.js
import * as THREE from "three"

// Three.js Background Animation
let scene, camera, renderer, particles

function initThreeJS() {
  // Scene setup
  scene = new THREE.Scene()

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // Renderer setup
  const canvas = document.getElementById("bg-canvas")
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 1000
  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x6366f1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  })

  particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)

  // Add geometric shapes
  const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100)
  const material = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    wireframe: true,
  })
  const torus = new THREE.Mesh(geometry, material)
  torus.position.set(-3, 0, -2)
  scene.add(torus)

  // Lighting
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    // Rotate particles
    particles.rotation.y += 0.001
    particles.rotation.x += 0.0005

    // Rotate torus
    torus.rotation.x += 0.01
    torus.rotation.y += 0.005

    renderer.render(scene, camera)
  }

  animate()
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener("resize", onWindowResize)

// Initialize Three.js on load
window.addEventListener("load", initThreeJS)

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    // Update active link
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
    this.classList.add("active")

    // Close mobile menu if open
    document.querySelector(".nav-menu").classList.remove("active")
  })
})

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-menu")

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
  })
}

// Navbar scroll effect
const navbar = document.querySelector(".navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
    }
  })
}, observerOptions)

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

// Form submission
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formInputs = contactForm.querySelectorAll("input, textarea")
    const formData = {
      name: formInputs[0].value,
      email: formInputs[1].value,
      subject: formInputs[2].value,
      message: formInputs[3].value,
    }

    console.log("Form submitted:", formData)

    // Show success message
    alert("Thank you for your message! I'll get back to you soon.")

    // Reset form
    contactForm.reset()
  })
}

// Particle animation on mouse move
let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1

  if (particles) {
    particles.rotation.x = mouseY * 0.1
    particles.rotation.y = mouseX * 0.1
  }
})

// Active section highlighting
const sections = document.querySelectorAll("section[id]")

function highlightNavLink() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", highlightNavLink)

// Skill bar animation on scroll
const skillBars = document.querySelectorAll(".skill-progress")
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fillBar 1.5s ease-in-out forwards"
      }
    })
  },
  { threshold: 0.5 },
)

skillBars.forEach((bar) => skillObserver.observe(bar))

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
    heroContent.style.opacity = 1 - scrolled / window.innerHeight
  }
})

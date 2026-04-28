import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrainCircuit,
  BriefcaseBusiness,
  Camera,
  Compass,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Radar,
  Route,
  Sparkles,
} from 'lucide-react'
import './styles.css'

const projects = [
  {
    title: 'Radar-Camera 3D Object Detection',
    meta: 'TU Delft / Mar 2026',
    tag: 'Multimodal Perception',
    icon: Radar,
    summary:
      'Radar-dominant 3D object detection pipeline on View-of-Delft with image-assisted point-level fusion and CenterPoint-style BEV detection.',
    details: [
      'Implemented cross-modal projection, feature sampling, fusion modules, LiDAR teacher training, and training-time distillation.',
      'Designed reproducible ablations across baseline, fusion, teacher, and distillation settings under constrained compute.',
    ],
  },
  {
    title: 'Carry-No-Spill',
    meta: 'TU Delft / Mar 2026',
    tag: 'Shared-Control HRI',
    icon: BrainCircuit,
    summary:
      'Physics-based HRI simulation platform for comparing force-feedback effects on task performance.',
    details: [
      'Built with Python, pygame, Box2D/LiquidFun, and esper ECS for rigid-body dynamics, particle simulation, and collision handling.',
      'Added teleoperation, blind-mode evaluation, runtime scoring, trajectory logging, procedural maps, and fixed-seed workflows.',
    ],
  },
  {
    title: 'Hierarchical Planning for Mobile Manipulation',
    meta: 'TU Delft / Jan 2026',
    tag: 'Planning & Control',
    icon: Route,
    summary:
      'Full motion planning pipeline for a non-holonomic robot operating in cluttered environments.',
    details: [
      'Implemented Informed RRT* with kinodynamic steering and benchmarked MPC against MPPI for real-time control.',
      'Validated in PyBullet simulations, improving time-to-goal while maintaining real-time feasibility.',
    ],
  },
]

const experience = [
  {
    role: 'ADAS Advisor',
    company: 'Porsche China R&D Satellite',
    location: 'Shanghai, China',
    date: 'Mar 2023 - Aug 2025',
    points: [
      'Worked on ADAS systems involving sensing, perception, and control pipelines in real-world driving environments.',
      'Analyzed and benchmarked sensor fusion and positioning systems through vehicle testing and performance validation.',
      'Designed evaluation workflows covering scenario definition, data collection, and system-level metrics.',
    ],
  },
  {
    role: 'ADAS Project Manager / Engineer',
    company: 'Ford Research Engineering Center',
    location: 'Nanjing, China',
    date: 'Apr 2019 - Dec 2022',
    points: [
      'Managed embedded-system lifecycles combining sensing, perception, and control modules.',
      'Coordinated integration across software, hardware, HIL, and vehicle-level validation teams.',
      'Led system debugging with CAN tools and diagnostic workflows while supporting FuSa and cybersecurity compliance.',
    ],
  },
]

const education = [
  {
    school: 'Delft University of Technology',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Zegel_Technische_Universiteit_Delft.svg',
    degree: 'M.Sc. in Robotics',
    location: 'Delft, Netherlands',
    date: 'Sep 2025 - Present',
  },
  {
    school: 'University College London',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/c2/UCL_Logo%2C_plain_background.svg',
    degree: 'M.Sc. in Engineering with Entrepreneurship & Innovation',
    location: 'London, UK',
    date: 'Sep 2017 - Sep 2018',
  },
  {
    school: 'Yuan-Ze University',
    logo: 'https://www.yzu.edu.tw/templates/yzu_2016_v2/ui/logo-sm.png',
    degree: 'B.Sc. in Mechanical Engineering / GPA 3.58/4.0 / Top 12%',
    location: 'Taoyuan, Taiwan',
    date: 'Sep 2013 - Jun 2017',
  },
]

const skills = [
  ['Programming', 'C++, Python, MATLAB'],
  ['Robotics & AI', 'ROS2, PyTorch, YOLO, PyBullet'],
  ['Tools', 'Linux, Git, Gazebo, Rviz, SolidWorks'],
  ['Languages', 'English, Mandarin, Dutch'],
]

const hobbies = [
  ['Long Trails', 'Hiking and long-distance routes.'],
  ['Tennis', 'A steady 2.0 court rhythm.'],
  ['Piano', 'Band keyboard player and quiet practice hours.'],
]

function SectionTitle({ eyebrow, title, id }) {
  return (
    <>
      <p className="section-kicker">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </>
  )
}

function ParticleTitle() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })
    const particles = []
    const pointer = { x: -9999, y: -9999, active: false }
    let animationFrame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let disposed = false
    let lastDraw = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const makeParticles = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const rect = canvas.getBoundingClientRect()
      width = Math.max(320, rect.width)
      height = Math.max(220, rect.height)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const textCanvas = document.createElement('canvas')
      const textContext = textCanvas.getContext('2d')
      textCanvas.width = canvas.width
      textCanvas.height = canvas.height
      textContext.scale(dpr, dpr)
      textContext.clearRect(0, 0, width, height)
      textContext.textAlign = 'center'
      textContext.textBaseline = 'middle'
      const lines = ['Terry', 'Zhang']
      let fontSize = Math.min(width * 0.22, 154)
      textContext.font = `900 ${fontSize}px Arial Black, Arial, sans-serif`
      while (Math.max(...lines.map((line) => textContext.measureText(line).width)) > width * 0.62 && fontSize > 42) {
        fontSize -= 4
        textContext.font = `900 ${fontSize}px Arial Black, Arial, sans-serif`
      }
      textContext.fillStyle = '#ffffff'
      textContext.strokeStyle = '#ffffff'
      textContext.lineWidth = Math.max(5, fontSize * 0.08)
      textContext.lineJoin = 'round'
      textContext.shadowColor = '#ffffff'
      textContext.shadowBlur = 2
      textContext.strokeText(lines[0], width / 2, height / 2 - fontSize * 0.43)
      textContext.strokeText(lines[1], width / 2, height / 2 + fontSize * 0.58)

      const imageData = textContext.getImageData(0, 0, textCanvas.width, textCanvas.height).data
      const nextParticles = []
      const step = width < 700 ? 8 : 6
      const maxParticles = width < 700 ? 360 : 760

      for (let y = 0; y < textCanvas.height; y += step * dpr) {
        for (let x = 0; x < textCanvas.width; x += step * dpr) {
          const index = (y * textCanvas.width + x) * 4 + 3
          if (imageData[index] > 80) {
            const targetX = x / dpr + (Math.random() - 0.5) * step * 0.7
            const targetY = y / dpr + (Math.random() - 0.5) * step * 0.7
            nextParticles.push({
              x: targetX + (Math.random() - 0.5) * 4,
              y: targetY + (Math.random() - 0.5) * 4,
              tx: targetX,
              ty: targetY,
              vx: 0,
              vy: 0,
              size: Math.random() * 0.7 + 0.65,
              hue: Math.random() > 0.5 ? 316 : 272,
            })
          }
        }
      }

      if (nextParticles.length > maxParticles) {
        const stride = nextParticles.length / maxParticles
        const reducedParticles = []
        for (let index = 0; index < maxParticles; index += 1) {
          reducedParticles.push(nextParticles[Math.floor(index * stride)])
        }
        particles.splice(0, particles.length, ...reducedParticles)
      } else {
        particles.splice(0, particles.length, ...nextParticles)
      }
    }

    const draw = (timestamp = 0) => {
      if (timestamp - lastDraw < 33) {
        animationFrame = requestAnimationFrame(draw)
        return
      }
      lastDraw = timestamp
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'source-over'
      context.globalCompositeOperation = 'lighter'

      particles.forEach((particle) => {
        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = pointer.active ? Math.min(150, width * 0.16) : 0

        if (distance < repelRadius) {
          const force = (1 - distance / repelRadius) * 0.34
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force
          particle.vy += Math.sin(angle) * force
        }

        particle.vx += (particle.tx - particle.x) * 0.026
        particle.vy += (particle.ty - particle.y) * 0.026
        particle.vx *= 0.86
        particle.vy *= 0.86
        particle.x += particle.vx
        particle.y += particle.vy

        context.fillStyle = `hsla(${particle.hue}, 100%, 78%, 0.7)`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(draw)
      }
    }

    const movePointer = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const leavePointer = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    makeParticles()
    document.fonts?.ready.then(() => {
      if (!disposed) {
        makeParticles()
      }
    })
    draw()
    window.addEventListener('resize', makeParticles)
    canvas.addEventListener('pointermove', movePointer)
    canvas.addEventListener('pointerleave', leavePointer)

    return () => {
      disposed = true
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', makeParticles)
      canvas.removeEventListener('pointermove', movePointer)
      canvas.removeEventListener('pointerleave', leavePointer)
    }
  }, [])

  return (
    <div className="particle-title" aria-label="Terry Zhang">
      <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
      <div className="particle-word" aria-hidden="true">
        <span>Terry</span>
        <span>Zhang</span>
      </div>
    </div>
  )
}

function EducationGlobe() {
  return (
    <div className="education-globe" aria-label="Animated education path from Taiwan to London to Delft">
      <div className="globe-sphere">
        <svg className="continent-map" viewBox="0 0 420 420" aria-hidden="true">
          <path className="continent north-america" d="M62 126 C90 91 143 86 168 116 C184 136 164 158 141 164 C115 171 108 197 82 190 C55 182 38 151 62 126 Z" />
          <path className="continent south-america" d="M153 216 C178 226 186 260 176 292 C167 324 143 354 126 340 C111 328 123 293 113 267 C104 241 122 210 153 216 Z" />
          <path className="continent europe" d="M197 116 C223 99 254 103 264 126 C273 145 249 158 224 152 C202 147 178 139 197 116 Z" />
          <path className="continent africa" d="M226 170 C260 175 279 211 271 252 C264 292 235 318 212 292 C190 266 194 220 202 190 C205 178 213 171 226 170 Z" />
          <path className="continent asia" d="M269 124 C318 104 367 128 375 166 C383 203 342 214 322 195 C302 177 283 189 265 171 C247 154 247 134 269 124 Z" />
          <path className="continent australia" d="M319 279 C345 267 374 277 383 299 C368 319 330 318 310 302 C303 294 307 284 319 279 Z" />
        </svg>
        <div className="globe-lat lat-one" />
        <div className="globe-lat lat-two" />
        <div className="globe-lat lat-three" />
        <div className="globe-meridian meridian-one" />
        <div className="globe-meridian meridian-two" />
        <svg className="route-map" viewBox="0 0 420 420" role="img" aria-hidden="true">
          <path className="route-path route-tw-ucl" d="M332 188 C296 144 255 115 226 122" />
          <path className="route-path route-ucl-tu" d="M226 122 C232 113 240 109 247 112" />
          <circle className="route-dot dot-tw" cx="332" cy="188" r="5" />
          <circle className="route-dot dot-ucl" cx="226" cy="122" r="5" />
          <circle className="route-dot dot-tu" cx="247" cy="112" r="5" />
        </svg>
      </div>
      <div className="geo-label label-taiwan">Taiwan</div>
      <div className="geo-label label-england">England</div>
      <div className="geo-label label-netherlands">Netherlands</div>
      <div className="campus-pin pin-yzu">
        <span>Yuan-Ze University</span>
      </div>
      <div className="campus-pin pin-ucl">
        <span>University College London</span>
      </div>
      <div className="campus-pin pin-tu">
        <span>Delft University of Technology</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <header className="site-header">
        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#experience">Industry Notes</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#wild">Wild</a>
          <a href="#hobbies">Hobbies</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="space-grid" aria-hidden="true" />
          <div className="orbital orbital-one" aria-hidden="true" />
          <div className="orbital orbital-two" aria-hidden="true" />
          <div className="signal-line signal-one" aria-hidden="true" />
          <div className="signal-line signal-two" aria-hidden="true" />
          <div className="hero-content">
            <h1 className="sr-only">Terry Zhang</h1>
            <ParticleTitle />
            <p className="hero-copy">
              On long-distance trails, I am accustomed to measuring the vastness of nature with my footsteps; in my career, I have dedicated myself to deciphering the intricate system logic behind the road. From the Porsche China R&D Satellite in Shanghai to the robotics labs at Delft University of Technology, my drive has always been fueled by a quest for the essence of "intelligent machines". By combining a system-level perspective forged in the ADAS industry with my current deep dive into perception and motion planning algorithms, I am exploring how to make robots integrate more seamlessly and naturally into human environments. I am a proactive achiever: rather than waiting for opportunities, I prefer to define my goals and dedicate relentless effort to realizing them. I believe that the most elegant code, much like the most breathtaking scenery, is only reached through full commitment.
            </p>
          </div>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <SectionTitle eyebrow="Projects" title="Prototypes on the Trail" id="projects-title" />
          </div>
          <div className="project-grid">
            {projects.map((project) => {
              const Icon = project.icon
              return (
                <article className="project-card" key={project.title}>
                  <div className="card-topline">
                    <span className="icon-chip" aria-hidden="true"><Icon size={20} /></span>
                    <span>{project.tag}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="meta">{project.meta}</p>
                  <p>{project.summary}</p>
                  <ul>
                    {project.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section split-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading sticky-heading">
            <SectionTitle eyebrow="Industry Notes" title="Signals from the road" id="experience-title" />
            <p>
              Two chapters from real-world ADAS work: sensing, perception, control, integration, vehicle testing, and validation workflows.
            </p>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={item.company}>
                <div className="timeline-icon" aria-hidden="true"><BriefcaseBusiness size={18} /></div>
                <div className="timeline-copy">
                  <h3>{item.role}</h3>
                  <p className="meta">{item.company} / {item.location}</p>
                  <p className="date">{item.date}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="experience-photo-slot" aria-label={`Photo placeholder for ${item.company}`}>
                  <Camera size={22} />
                  <span>Photo space</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section education-section" id="education" aria-labelledby="education-title">
          <div>
            <div className="section-heading">
              <SectionTitle eyebrow="Education" title="Coordinates of the Compass" id="education-title" />
            </div>
            <div className="education-list">
              {education.map((item) => (
                <article className="education-item" key={item.school}>
                  <span className="school-logo" aria-hidden="true">
                    <img src={item.logo} alt="" loading="lazy" />
                  </span>
                  <div>
                    <h3>{item.school}</h3>
                    <p>{item.degree}</p>
                    <p className="meta">{item.location} / {item.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <EducationGlobe />
        </section>

        <section className="section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading">
            <SectionTitle eyebrow="Skills" title="The Gear in the Pack" id="skills-title" />
          </div>
          <div className="skill-list">
            {skills.map(([label, value]) => (
              <div className="skill-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section wild-section" id="wild" aria-labelledby="wild-title">
          <div className="section-heading">
            <SectionTitle eyebrow="Travel" title="Wind of the Wild" id="wild-title" />
            <p>
              A future gallery for trails, cities, coastlines, and quiet travel moments. The layout is ready for photos and short field notes.
            </p>
          </div>
          <div className="wild-grid">
            {['High Trails', 'Open Water', 'Night Cities'].map((label, index) => (
              <article className="wild-card" key={label}>
                <Compass size={24} aria-hidden="true" />
                <span>Slot 0{index + 1}</span>
                <h3>{label}</h3>
                <p>Photo and story coming soon.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section hobbies-section" id="hobbies" aria-labelledby="hobbies-title">
          <div className="section-heading">
            <SectionTitle eyebrow="Hobbies" title="Echoes from the Valley" id="hobbies-title" />
          </div>
          <div className="hobby-grid">
            {hobbies.map(([title, description]) => (
              <article className="hobby-card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-band" id="contact" aria-labelledby="contact-title">
          <Sparkles className="contact-spark" size={28} aria-hidden="true" />
          <div>
            <SectionTitle eyebrow="Contact" title="Ping the Station" id="contact-title" />
          </div>
          <div className="contact-links">
            <a href="mailto:zhangruifang0913@outlook.com"><Mail size={18} /> Email</a>
            <a href="tel:+31626138070"><Phone size={18} /> Phone</a>
            <span><Navigation size={18} /> LinkedIn: Ruifang (Terry) Zhang</span>
            <span><MapPin size={18} /> Delft, Netherlands</span>
          </div>
        </section>
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)

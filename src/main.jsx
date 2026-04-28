import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
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
    meta: 'TU Delft · Mar 2026',
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
    meta: 'TU Delft · Mar 2026',
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
    meta: 'TU Delft · Jan 2026',
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
    logo: 'TU',
    degree: 'M.Sc. in Robotics',
    location: 'Delft, Netherlands',
    date: 'Sep 2025 - Present',
  },
  {
    school: 'University College London',
    logo: 'UCL',
    degree: 'M.Sc. in Engineering with Entrepreneurship & Innovation',
    location: 'London, UK',
    date: 'Sep 2017 - Sep 2018',
  },
  {
    school: 'Yuan-Ze University',
    logo: 'YZU',
    degree: 'B.Sc. in Mechanical Engineering · GPA 3.58/4.0 · Top 12%',
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

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

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

    const makeParticles = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
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
      let fontSize = Math.min(width * 0.22, 168)
      textContext.font = `900 ${fontSize}px Arial Black, Inter, Arial, sans-serif`
      while (textContext.measureText('Terry Zhang').width > width * 0.92 && fontSize > 42) {
        fontSize -= 4
        textContext.font = `900 ${fontSize}px Arial Black, Inter, Arial, sans-serif`
      }
      textContext.fillStyle = '#ffffff'
      textContext.fillText('Terry Zhang', width / 2, height / 2 + fontSize * 0.02)

      const imageData = textContext.getImageData(0, 0, textCanvas.width, textCanvas.height).data
      const nextParticles = []
      const step = Math.max(3, Math.floor(width / 240))

      for (let y = 0; y < textCanvas.height; y += step * dpr) {
        for (let x = 0; x < textCanvas.width; x += step * dpr) {
          const index = (y * textCanvas.width + x) * 4 + 3
          if (imageData[index] > 80) {
            const targetX = x / dpr
            const targetY = y / dpr
            nextParticles.push({
              x: targetX + (Math.random() - 0.5) * 40,
              y: targetY + (Math.random() - 0.5) * 40,
              tx: targetX,
              ty: targetY,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.1 + 1.05,
              hue: Math.random() > 0.5 ? 316 : 272,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }
      }

      particles.splice(0, particles.length, ...nextParticles)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'source-over'
      context.font = `900 ${Math.min(width * 0.22, 168)}px Arial Black, Inter, Arial, sans-serif`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = 'rgba(255, 255, 255, 0.035)'
      context.fillText('Terry Zhang', width / 2, height / 2)
      context.globalCompositeOperation = 'lighter'

      particles.forEach((particle) => {
        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = pointer.active ? 118 : 0

        if (distance < repelRadius) {
          const force = (1 - distance / repelRadius) * 0.32
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force
          particle.vy += Math.sin(angle) * force
        }

        particle.vx += (particle.tx - particle.x) * 0.014
        particle.vy += (particle.ty - particle.y) * 0.014
        particle.vx *= 0.88
        particle.vy *= 0.88
        particle.x += particle.vx
        particle.y += particle.vy

        const twinkle = 0.58 + Math.sin(performance.now() * 0.0012 + particle.phase) * 0.26
        context.fillStyle = `hsla(${particle.hue}, 100%, ${68 + twinkle * 18}%, ${0.58 + twinkle * 0.28})`
        context.shadowColor = `hsla(${particle.hue}, 100%, 70%, 0.65)`
        context.shadowBlur = 9
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })

      animationFrame = requestAnimationFrame(draw)
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
    draw()
    window.addEventListener('resize', makeParticles)
    canvas.addEventListener('pointermove', movePointer)
    canvas.addEventListener('pointerleave', leavePointer)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', makeParticles)
      canvas.removeEventListener('pointermove', movePointer)
      canvas.removeEventListener('pointerleave', leavePointer)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-title" aria-label="Terry Zhang" />
}

function EducationGlobe() {
  return (
    <div className="education-globe" aria-label="Animated education path from Taiwan to London to Delft">
      <div className="globe-sphere">
        <div className="globe-lat lat-one" />
        <div className="globe-lat lat-two" />
        <div className="globe-lat lat-three" />
        <div className="globe-meridian meridian-one" />
        <div className="globe-meridian meridian-two" />
        <svg className="route-map" viewBox="0 0 420 420" role="img" aria-hidden="true">
          <path className="route-path route-tw-ucl" d="M286 238 C222 195 168 146 122 118" />
          <path className="route-path route-ucl-tu" d="M122 118 C144 100 167 94 192 91" />
          <circle className="route-dot dot-tw" cx="286" cy="238" r="5" />
          <circle className="route-dot dot-ucl" cx="122" cy="118" r="5" />
          <circle className="route-dot dot-tu" cx="192" cy="91" r="5" />
        </svg>
      </div>
      <div className="campus-pin pin-yzu">
        <span>Yuan-Ze University</span>
      </div>
      <div className="campus-pin pin-ucl">
        <span>UCL</span>
      </div>
      <div className="campus-pin pin-tu">
        <span>TU Delft</span>
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
              Robotics M.Sc. student at TU Delft building perception, planning, and control systems inside quiet digital space.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                View Projects <ArrowUpRight size={18} />
              </a>
              <a className="button secondary" href={asset('Terry-Zhang-CV.pdf')} target="_blank" rel="noreferrer">
                Download CV <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="section intro" aria-labelledby="profile-title">
          <div>
            <p className="section-kicker">Who I Am</p>
            <h2 id="profile-title">System-level robotics engineer with ADAS validation experience.</h2>
          </div>
          <p>
            My work connects robotics research with production engineering: multimodal perception, motion planning, shared-control simulation, vehicle testing, data collection, and performance validation. I am especially interested in applying robotics and automation to real industrial environments.
          </p>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <h2 id="projects-title">Projects: Prototypes on the Trail</h2>
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
            <p className="section-kicker">Industry Notes</p>
            <h2 id="experience-title">Signals from the road</h2>
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
                  <p className="meta">{item.company} · {item.location}</p>
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
              <h2 id="education-title">Education: Coordinates of the Compass</h2>
            </div>
            <div className="education-list">
              {education.map((item) => (
                <article className="education-item" key={item.school}>
                  <span className="school-logo" aria-hidden="true">{item.logo}</span>
                  <div>
                    <h3>{item.school}</h3>
                    <p>{item.degree}</p>
                    <p className="meta">{item.location} · {item.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <EducationGlobe />
        </section>

        <section className="section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading">
            <h2 id="skills-title">Skills: The Gear in the Pack</h2>
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
            <h2 id="wild-title">Travel: Wind of the Wild</h2>
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
            <h2 id="hobbies-title">Hobbies: Echoes from the Valley</h2>
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
            <h2 id="contact-title">Contact: Ping the Station</h2>
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

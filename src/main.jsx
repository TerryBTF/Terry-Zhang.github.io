import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Camera,
  Compass,
  GraduationCap,
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
    degree: 'M.Sc. in Robotics',
    location: 'Delft, Netherlands',
    date: 'Sep 2025 - Present',
  },
  {
    school: 'University College London',
    degree: 'M.Sc. in Engineering with Entrepreneurship & Innovation',
    location: 'London, UK',
    date: 'Sep 2017 - Sep 2018',
  },
  {
    school: 'Yuan-Ze University',
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

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

function playMusicBoxTone(audioState) {
  const now = performance.now()
  if (now - audioState.lastNote < 430) return
  audioState.lastNote = now

  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return

  if (!audioState.context) {
    audioState.context = new AudioContext()
    audioState.delay = audioState.context.createDelay(1.2)
    audioState.delay.delayTime.value = 0.22
    audioState.feedback = audioState.context.createGain()
    audioState.feedback.gain.value = 0.16
    audioState.wet = audioState.context.createGain()
    audioState.wet.gain.value = 0.028
    audioState.delay.connect(audioState.feedback)
    audioState.feedback.connect(audioState.delay)
    audioState.delay.connect(audioState.wet)
    audioState.wet.connect(audioState.context.destination)
  }

  const ctx = audioState.context
  if (ctx.state === 'suspended') ctx.resume()

  const notes = [392, 493.88, 587.33, 659.25, 783.99, 659.25, 587.33]
  const frequency = notes[audioState.noteIndex % notes.length]
  audioState.noteIndex += 1

  const osc = ctx.createOscillator()
  const shimmer = ctx.createOscillator()
  const gain = ctx.createGain()
  const shimmerGain = ctx.createGain()
  const t = ctx.currentTime

  osc.type = 'sine'
  osc.frequency.setValueAtTime(frequency, t)
  shimmer.type = 'triangle'
  shimmer.frequency.setValueAtTime(frequency * 2.01, t)

  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.026, t + 0.035)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.05)
  shimmerGain.gain.setValueAtTime(0.0001, t)
  shimmerGain.gain.exponentialRampToValueAtTime(0.006, t + 0.05)
  shimmerGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7)

  osc.connect(gain)
  shimmer.connect(shimmerGain)
  gain.connect(ctx.destination)
  gain.connect(audioState.delay)
  shimmerGain.connect(ctx.destination)
  shimmerGain.connect(audioState.delay)

  osc.start(t)
  shimmer.start(t)
  osc.stop(t + 1.1)
  shimmer.stop(t + 0.75)
}

function ParticleTitle() {
  const canvasRef = useRef(null)
  const audioRef = useRef({ context: null, lastNote: 0, noteIndex: 0 })

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
      textContext.font = `800 ${Math.min(width * 0.16, 124)}px Inter, Arial, sans-serif`
      textContext.fillStyle = '#ffffff'
      textContext.fillText('Terry Zhang', width / 2, height / 2)

      const imageData = textContext.getImageData(0, 0, textCanvas.width, textCanvas.height).data
      const nextParticles = []
      const step = Math.max(5, Math.floor(width / 150))

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
              size: Math.random() * 1.3 + 0.8,
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
      playMusicBoxTone(audioRef.current)
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

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          TZ
        </a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#experience">Industry Notes</a>
          <a href="#wild">Wild</a>
          <a href="#education">Education</a>
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
          <div className="status-chip status-one">SYS · CALM</div>
          <div className="status-chip status-two">AUDIO · HOVER</div>
          <div className="status-chip status-three">DEPTH · 03</div>
          <div className="hero-content">
            <p className="eyebrow">Robotics · Autonomous Systems · ADAS</p>
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
            <p className="section-kicker">Profile</p>
            <h2 id="profile-title">System-level robotics engineer with ADAS validation experience.</h2>
          </div>
          <p>
            My work connects robotics research with production engineering: multimodal perception, motion planning, shared-control simulation, vehicle testing, data collection, and performance validation. I am especially interested in applying robotics and automation to real industrial environments.
          </p>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="section-kicker">Selected Work</p>
            <h2 id="projects-title">Academic and robotics projects</h2>
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

        <section className="section wild-section" id="wild" aria-labelledby="wild-title">
          <div className="section-heading">
            <p className="section-kicker">Personal Atlas</p>
            <h2 id="wild-title">Winds of the Wild</h2>
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

        <section className="section education-skills" id="education" aria-labelledby="education-title">
          <div>
            <div className="section-heading">
              <p className="section-kicker">Academic</p>
              <h2 id="education-title">Education</h2>
            </div>
            <div className="education-list">
              {education.map((item) => (
                <article className="education-item" key={item.school}>
                  <GraduationCap size={20} aria-hidden="true" />
                  <div>
                    <h3>{item.school}</h3>
                    <p>{item.degree}</p>
                    <p className="meta">{item.location} · {item.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="section-heading">
              <p className="section-kicker">Toolkit</p>
              <h2>Technical skills</h2>
            </div>
            <div className="skill-list">
              {skills.map(([label, value]) => (
                <div className="skill-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-band" id="contact" aria-labelledby="contact-title">
          <Sparkles className="contact-spark" size={28} aria-hidden="true" />
          <div>
            <p className="section-kicker">Contact</p>
            <h2 id="contact-title">Open to robotics, autonomy, and industrial automation opportunities.</h2>
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

import React, { useEffect, useMemo, useRef, useState } from 'react'
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

const DEG_TO_RAD = Math.PI / 180

const continentPolygons = [
  {
    name: 'North America',
    points: [
      [-168, 72], [-140, 70], [-110, 65], [-72, 58], [-55, 48], [-78, 28],
      [-95, 16], [-114, 24], [-124, 42], [-150, 58],
    ],
  },
  {
    name: 'South America',
    points: [
      [-80, 12], [-50, 5], [-36, -12], [-45, -34], [-64, -55], [-75, -42],
      [-81, -18],
    ],
  },
  {
    name: 'Europe',
    points: [
      [-11, 58], [10, 61], [31, 56], [40, 45], [28, 36], [7, 36], [-6, 43],
    ],
  },
  {
    name: 'Africa',
    points: [
      [-17, 34], [13, 37], [35, 30], [48, 10], [40, -20], [25, -35],
      [4, -34], [-12, -18], [-18, 6],
    ],
  },
  {
    name: 'Asia',
    points: [
      [36, 55], [70, 66], [118, 60], [150, 48], [145, 22], [120, 8],
      [96, 18], [78, 6], [58, 18], [42, 36],
    ],
  },
  {
    name: 'Australia',
    points: [
      [112, -12], [134, -10], [154, -25], [146, -39], [116, -35], [109, -22],
    ],
  },
  {
    name: 'Greenland',
    points: [
      [-52, 82], [-24, 78], [-22, 64], [-45, 59], [-64, 68],
    ],
  },
]

const educationStops = [
  {
    key: 'yzu',
    label: 'Yuan-Ze University',
    region: 'Taiwan',
    lon: 121.26,
    lat: 24.97,
    pinOffset: { x: 92, y: -16 },
    regionOffset: { x: 54, y: 24 },
  },
  {
    key: 'ucl',
    label: 'University College London',
    region: 'England',
    lon: -0.13,
    lat: 51.52,
    pinOffset: { x: -38, y: 38 },
    regionOffset: { x: -18, y: 66 },
  },
  {
    key: 'tu',
    label: 'Delft University of Technology',
    region: 'Netherlands',
    lon: 4.37,
    lat: 52.0,
    pinOffset: { x: 112, y: -24 },
    regionOffset: { x: 44, y: -42 },
  },
]

function SectionTitle({ eyebrow, title, id }) {
  return (
    <>
      <p className="section-kicker">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </>
  )
}

function latLonToVector([lon, lat]) {
  const lambda = lon * DEG_TO_RAD
  const phi = lat * DEG_TO_RAD
  const cosPhi = Math.cos(phi)
  return [cosPhi * Math.cos(lambda), cosPhi * Math.sin(lambda), Math.sin(phi)]
}

function vectorToLatLon([x, y, z]) {
  return [Math.atan2(y, x) / DEG_TO_RAD, Math.asin(z) / DEG_TO_RAD]
}

function interpolateGreatCircle(start, end, steps = 44) {
  const a = latLonToVector(start)
  const b = latLonToVector(end)
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const omega = Math.acos(dot)

  if (omega < 0.0001) {
    return [start, end]
  }

  const sinOmega = Math.sin(omega)
  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = index / steps
    const scaleA = Math.sin((1 - t) * omega) / sinOmega
    const scaleB = Math.sin(t * omega) / sinOmega
    return vectorToLatLon([
      scaleA * a[0] + scaleB * b[0],
      scaleA * a[1] + scaleB * b[1],
      scaleA * a[2] + scaleB * b[2],
    ])
  })
}

function createProjector(centerLon, centerLat = 28) {
  const radius = 178
  const center = 210
  const lambda0 = centerLon * DEG_TO_RAD
  const phi0 = centerLat * DEG_TO_RAD
  const sinPhi0 = Math.sin(phi0)
  const cosPhi0 = Math.cos(phi0)

  return ([lon, lat]) => {
    const lambda = lon * DEG_TO_RAD
    const phi = lat * DEG_TO_RAD
    const delta = lambda - lambda0
    const sinPhi = Math.sin(phi)
    const cosPhi = Math.cos(phi)
    const visible = sinPhi0 * sinPhi + cosPhi0 * cosPhi * Math.cos(delta)

    return {
      x: center + radius * cosPhi * Math.sin(delta),
      y: center - radius * (cosPhi0 * sinPhi - sinPhi0 * cosPhi * Math.cos(delta)),
      visible,
    }
  }
}

function pathFromProjected(points, project, close = false) {
  const projected = points.map(project)
  const visibleRatio = projected.filter((point) => point.visible > -0.08).length / projected.length

  if (visibleRatio < 0.35) {
    return ''
  }

  const path = projected
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ')

  return close ? `${path} Z` : path
}

function routePathFromProjected(points, project) {
  const projected = points.map(project)
  const segments = []
  let current = []

  projected.forEach((point) => {
    if (point.visible > 0.03) {
      current.push(point)
      return
    }

    if (current.length > 1) {
      segments.push(current)
    }
    current = []
  })

  if (current.length > 1) {
    segments.push(current)
  }

  const longest = segments.sort((a, b) => b.length - a.length)[0]

  if (!longest || longest.length < 8) {
    return ''
  }

  return longest
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ')
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
      textContext.fillText(lines[0], width / 2, height / 2 - fontSize * 0.43)
      textContext.fillText(lines[1], width / 2, height / 2 + fontSize * 0.58)

      const imageData = textContext.getImageData(0, 0, textCanvas.width, textCanvas.height).data
      const nextParticles = []
      const step = 3
      const maxParticles = width < 700 ? 5200 : 9500

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
              size: Math.random() * 0.5 + 1.05,
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

        context.fillStyle = `hsla(${particle.hue}, 100%, 78%, 0.92)`
        context.fillRect(particle.x, particle.y, particle.size, particle.size)
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
  const [rotation, setRotation] = useState(121)

  useEffect(() => {
    let frame = 0
    let start = 0
    const keyframes = [121, 66, 66, 2.5, 2.5, 121]

    const animate = (timestamp) => {
      if (!start) {
        start = timestamp
      }

      const cycle = ((timestamp - start) % 15000) / 15000
      const segment = Math.min(4, Math.floor(cycle * 5))
      const local = cycle * 5 - segment
      const eased = local < 0.5 ? 2 * local * local : 1 - ((-2 * local + 2) ** 2) / 2
      const nextRotation = keyframes[segment] + (keyframes[segment + 1] - keyframes[segment]) * eased
      setRotation(nextRotation)
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [])

  const globe = useMemo(() => {
    const project = createProjector(rotation)
    const routes = [
      interpolateGreatCircle([educationStops[0].lon, educationStops[0].lat], [educationStops[1].lon, educationStops[1].lat]),
      interpolateGreatCircle([educationStops[1].lon, educationStops[1].lat], [educationStops[2].lon, educationStops[2].lat], 18),
    ]

    return {
      continents: continentPolygons.map((continent) => ({
        ...continent,
        path: pathFromProjected(continent.points, project, true),
      })),
      stops: educationStops.map((stop) => ({ ...stop, point: project([stop.lon, stop.lat]) })),
      routes: routes.map((route) => routePathFromProjected(route, project)),
    }
  }, [rotation])

  return (
    <div className="education-globe" aria-label="Animated education path from Taiwan to London to Delft">
      <div className="globe-sphere">
        <div className="globe-lat lat-one" />
        <div className="globe-lat lat-two" />
        <div className="globe-lat lat-three" />
        <div className="globe-meridian meridian-one" />
        <div className="globe-meridian meridian-two" />
        <svg className="globe-map" viewBox="0 0 420 420" role="img" aria-hidden="true">
          <defs>
            <clipPath id="globeClip">
              <circle cx="210" cy="210" r="178" />
            </clipPath>
          </defs>
          <g clipPath="url(#globeClip)">
            {globe.continents.map((continent) => (
              continent.path ? <path className={`continent ${continent.name.toLowerCase().replaceAll(' ', '-')}`} d={continent.path} key={continent.name} /> : null
            ))}
            {globe.routes.map((route, index) => (
              route ? <path className={`route-path route-${index}`} d={route} key={route} /> : null
            ))}
            {globe.stops.map((stop) => (
              stop.point.visible > 0 ? (
                <circle
                  className={`route-dot dot-${stop.key}`}
                  cx={stop.point.x}
                  cy={stop.point.y}
                  key={stop.key}
                  r="5"
                />
              ) : null
            ))}
          </g>
        </svg>
      </div>
      {globe.stops.map((stop) => (
        stop.point.visible > 0 ? (
          <React.Fragment key={stop.key}>
            <div
              className="geo-label"
              style={{
                left: `calc(${(stop.point.x / 420) * 100}% + ${stop.regionOffset.x}px)`,
                top: `calc(${(stop.point.y / 420) * 100}% + ${stop.regionOffset.y}px)`,
              }}
            >
              {stop.region}
            </div>
            <div
              className="campus-pin"
              style={{
                left: `calc(${(stop.point.x / 420) * 100}% + ${stop.pinOffset.x}px)`,
                top: `calc(${(stop.point.y / 420) * 100}% + ${stop.pinOffset.y}px)`,
              }}
            >
              <span>{stop.label}</span>
            </div>
          </React.Fragment>
        ) : null
      ))}
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

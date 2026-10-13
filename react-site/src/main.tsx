import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './progress.css'
import './pages.css'
import './nebula.css'

const media = (year: string, month: string, name: string) => `/media/${year}/${month}/${name}`
const m17 = (name: string) => media('2017', '07', name)
const m18 = (name: string) => media('2017', '08', name)

const characters = [
  {
    name: 'Tantalus',
    image: m17('TantalusProfile.png'),
    summary: 'Would you believe me if I told you that every night somebody somewhere saves the world?',
    detail: 'These nameless heroes fight in the shadows, often sacrificing themselves. Their wars are invisible, their enemies don’t officially exist. No one will ever know about their rebellion against darkness. My name is Tantalus Denton. It’s been my codename for so long I don’t even remember my real name. My story is one that many, in distrust, would call a creation of a paranoid mind; others will find it an entertaining script, and yet others will see answers.'
  },
  {
    name: 'Magdalene',
    image: m17('MagdaleneProfile.jpg'),
    summary: 'Females Fight for Equal Representation in Gaming.',
    detail: 'A more interesting, diverse cast of characters was one of the original Deus Ex goals. Magdalene is the fiancée of Tantalus and the victim of a cruel experiment that replaced her spine with a bionic spine.'
  },
  { name: 'Corporal Armstrong', image: m17('CArmstrong-e1503111949790.png'), summary: 'UNATCO Special Operations Group, company B, Fifth platoon, Alpha squad.' },
  { name: 'Janus', image: m18('Janus.jpg'), summary: 'The two-faced hacker.' },
  { name: 'Dr. Johnson', image: m17('DrJohnsonFreeman-300x300.jpg'), summary: 'An aged Gordon Freeman.' },
  { name: 'Captain Valiante', image: m17('CaptainValianteProfile-e1503113131280.jpg'), summary: 'Travel the world and seven seas.' },
  { name: 'Bob Page', image: m18('NewBobPageAI-300x300.jpg'), summary: 'The billionaire nerd.' },
  { name: 'Anna Navarre', image: m18('NewAnnaNavarreAI-300x300.jpg'), summary: 'The assassin.' }
]

const features = [
  { title: 'Design inspired by early Deus Ex Concepts', image: m17('InvisibleWarGUI.jpg') },
  { title: 'Resurrected Story elements', image: m18('deus-ex-3-cancelled-concepts-03-240x300.jpg') },
  { title: 'Smaller, More Detailed Maps', image: m18('Contamination-300x300.jpg') },
  { title: 'Original soundtrack', image: media('2018', '03', 'COVERguitar-300x300.jpg') },
  { title: 'New Skills', image: m18('skilliconPiloting.bmp') },
  { title: 'Tomes of new code', image: m17('hackingwebsite.gif') }
]

const missions = [
  { title: 'Chapter 1: MAJESTIC REVELATIONS', image: m17('TantalusMJ12.jpg') },
  { title: 'Chapter 2: CLAN WARS', image: m17('QHMotel2.jpg') },
  { title: 'Chapter 3: TROUBLESHOOTER', image: m17('HeliNYC.jpg') },
  { title: 'Chapter 4: INSURRECTION', image: m17('TantalusUNATCO.jpg') },
  { title: 'Chapter 5: ACCESS DENIED', image: m17('SchackletonCrater.jpg') }
]

function HomePage() {
  const [mission, setMission] = useState(0)
  const activeMission = missions[mission]

  return <>
    <a className="skip-link" href="#content">Skip to content</a>
    <header id="main" className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <a className="logo" href="#main"><img src={m17('DXAI-title.png')} alt="Deus Ex: Apocalypse Inside" /></a>
        <div className="nav-links">
          <a href="/">Main</a>
          <a href="/backstory">Backstory</a>
          <a href="/codename-nebula">Codename Nebula</a>
          <a href="/sarif-industries">Sarif Industries</a>
          <a href="/#credits">Credits</a>
        </div>
      </nav>
      <div className="hero-world" aria-hidden="true" />
      <div className="hero-network" aria-hidden="true" />
      <div className="hero-content">
        <h1>A Deus Ex backstory mod</h1>
        <div className="hero-actions">
          <a className="dx-button" href="https://www.moddb.com/mods/deus-ex-apocalypse-inside" target="_blank" rel="noreferrer">Apocalypse Inside</a>
          <a className="dx-button" href="https://www.moddb.com/mods/codename-nebula" target="_blank" rel="noreferrer">Codename Nebula</a>
        </div>
      </div>
    </header>

    <main id="content">
      <section className="about-us" id="about">
        <header className="section-header inverse">
          <h2>Apocalypse Inside</h2>
          <p>When The World Is On Your Shoulders Is It Worth Saving?</p>
        </header>
        <div className="about-grid">
          <blockquote>“In the beginning Warren envisioned the game as X-Files but he somehow ended up with James Bond.”</blockquote>
          <div className="about-copy">
            <p>Apocalypse Inside is born from the back-story of the Deus Ex saga. It revives the cut content of Deus Ex that didn’t make it into the game including the story, levels, textures and Easter eggs.</p>
            <p>Follow us for updates on the release.</p>
            <a className="archive-link" href="https://www.youtube.com/watch?v=vYH4a9Y5RvA" target="_blank" rel="noreferrer">Watch the original development video ↗</a>
          </div>
          <div className="skills" aria-label="Original project progress">
            {[
              ['Story and dialogs', 80],
              ['Level design', 80],
              ['Code', 95],
              ['Soundtrack', 70]
            ].map(([label, value]) => <div className="skill" key={label}>
              <div className="skill-value">{value}%</div>
              <div><strong>{label}</strong><span><i className={`progress-${value}`} /></span></div>
            </div>)}
          </div>
        </div>
        <div className="credits-line" id="credits">
          <p><strong>Artem “Tantalus” D</strong> — Project Director, Lead Writer, Lead Level Designer, Texture Designer, Senior Programmer, Soundtrack</p>
          <p><strong>Dmitriy “CorpArmstrong” Fedykovych</strong> — Senior Programmer, Writer, Assistant Level Designer, Soundtrack</p>
          <p><strong>Evgeniy “JJoe” Bortnik</strong> — Junior Programmer, 3D Modeller, Assistant Level Designer</p>
        </div>
      </section>

      <section className="characters">
        <header className="section-header">
          <h2>Characters</h2>
          <p>Harvey Smith: To me, the answer is “fewer characters equals deeper characters.” We just tried to do too much. I’d rather have made the game 75% in length, but deeper.</p>
        </header>
        <div className="character-grid">
          {characters.map((character, index) => <article className={`character color-${index % 4}`} key={character.name}>
            <img src={character.image} alt="" />
            <h3>{character.name}</h3>
            <p>{character.summary}</p>
            {character.detail && <details><summary>Read dossier</summary><p>{character.detail}</p></details>}
          </article>)}
        </div>
      </section>

      <section className="features">
        <header className="section-header">
          <h2>Features</h2>
          <p>Ophelia found the following features in “Apocalypse Inside”</p>
        </header>
        <div className="feature-grid">
          {features.map((feature) => <article className="feature-card" key={feature.title}>
            <img src={feature.image} alt="" />
            <h3>{feature.title}</h3>
          </article>)}
        </div>
      </section>

      <section className="missions" aria-labelledby="missions-title">
        <header className="section-header inverse">
          <h2 id="missions-title">Missions</h2>
          <p>Welcome to the World of Terror</p>
        </header>
        <div className="mission-viewer">
          <img src={activeMission.image} alt="" />
          <div className="mission-caption">
            <span>{String(mission + 1).padStart(2, '0')} / {String(missions.length).padStart(2, '0')}</span>
            <h3>{activeMission.title}</h3>
          </div>
          <div className="mission-controls">
            <button type="button" onClick={() => setMission((mission - 1 + missions.length) % missions.length)} aria-label="Previous mission">‹</button>
            <div className="mission-dots">{missions.map((item, index) => <button className={index === mission ? 'active' : ''} type="button" key={item.title} onClick={() => setMission(index)} aria-label={`Show ${item.title}`} />)}</div>
            <button type="button" onClick={() => setMission((mission + 1) % missions.length)} aria-label="Next mission">›</button>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div className="footer-main">
        <div><img className="footer-logo" src={m17('DXAI-title.png')} alt="Deus Ex: Apocalypse Inside" /><a href="https://www.moddb.com/mods/deus-ex-apocalypse-inside" target="_blank" rel="noreferrer">View Apocalypse Inside on ModDB ↗</a></div>
        <div><img className="nebula-logo" src={m17('codename-nebula-title.png')} alt="Codename Nebula" /><a href="https://www.moddb.com/mods/codename-nebula" target="_blank" rel="noreferrer">View Codename Nebula on ModDB ↗</a></div>
        <div className="legal">
          <p>Apocalypse Inside and Codename Nebula are not supported by Eidos or Ion Storm. Deus Ex is a registered trademark of Eidos Montreal and Square Enix.</p>
          <p>Website and mod developed by <a href="https://www.heraldic.cloud" target="_blank" rel="noreferrer">Heraldic</a>.</p>
        </div>
      </div>
    </footer>
  </>
}

const backstoryTimeline = [
  ['2018', 'Paul Denton is born.'],
  ['2023', 'Majestic 12 selects Paul for the nano-augmentation project and begins clone research.'],
  ['2029', 'J.C. Denton is born; artificial incubation accelerates the program.'],
  ['2035', 'The Denton parents are killed and J.C. is sent to a controlled Swiss school.'],
  ['2050', 'Paul receives successful nano-augmentation.'],
  ['2051', 'J.C. joins UNATCO and enters training.'],
  ['2052', 'The world reaches ten minutes before the apocalypse.']
]

function ArchiveNav({ theme = 'dx' }: { theme?: 'dx' | 'sarif' }) {
  return <nav className={`archive-nav ${theme}`} aria-label="Primary navigation">
    <a className="archive-logo" href="/">{theme === 'sarif' ? <><b>SARIF</b><span>INDUSTRIES</span></> : <img src={m17('DXAI-title.png')} alt="Deus Ex: Apocalypse Inside" />}</a>
    <div>
      <a href="/">Main</a>
      <a href="/backstory">Backstory</a>
      <a href="/codename-nebula">Codename Nebula</a>
      <a href="/sarif-industries">Sarif Industries</a>
    </div>
  </nav>
}

function BackstoryPage() {
  return <div className="backstory-page">
    <ArchiveNav />
    <header className="lore-hero">
      <div>
        <p className="kicker">Deus Ex Continuity Archive // 2052</p>
        <h1>Ten minutes before<br />the apocalypse.</h1>
        <p>The world is unstable, divided, and close to collapse—but it is not beyond saving. Technology offers hope while the institutions controlling it conceal a deeper conspiracy.</p>
      </div>
    </header>
    <main>
      <section className="lore-intro">
        <div>
          <p className="section-number">01 // THE WORLD</p>
          <h2>A future assembled from fragments</h2>
        </div>
        <div>
          <p>The Deus Ex continuity bible gathered the history behind the original game, including material that never reached the final release. Apocalypse Inside begins in that negative space: unfinished locations, displaced characters, abandoned missions, and clues that survived only in documents and dialogue.</p>
          <p>By 2052, plague, economic collapse, environmental damage, and extreme inequality have hollowed out public life. UNATCO presents itself as a stabilizing force, yet its authority is entangled with the very cabal it claims to oppose.</p>
        </div>
      </section>

      <section className="world-faults">
        <article><span>01</span><h3>Gray Death</h3><p>A manufactured pandemic makes access to Ambrosia a weapon of political control.</p></article>
        <article><span>02</span><h3>Haves / Have Nots</h3><p>The middle class has nearly disappeared; fortified wealth rises above increasingly desperate streets.</p></article>
        <article><span>03</span><h3>Augmented Humanity</h3><p>Mechanical augmentation saves lives while creating a new social caste—useful, visible, and feared.</p></article>
        <article><span>04</span><h3>Invisible Government</h3><p>Majestic 12, the Illuminati, corporations, and artificial intelligences compete to define the next order.</p></article>
      </section>

      <section className="denton-project">
        <div className="denton-image"><img src={m17('JC-Paul-Jaime.jpg')} alt="J.C. and Paul Denton" /></div>
        <div>
          <p className="section-number">02 // THE DENTON PROJECT</p>
          <h2>Brothers by design</h2>
          <p>Majestic 12’s nano-augmentation program begins with Paul Denton’s genetics. J.C. is raised as his younger brother but is, in fact, a later clone—part of a decades-long effort to create agents whose bodies can command and interpret nanotechnology.</p>
          <p>The program’s controlled childhoods, hidden experiments, and kill-switches turn the Dentons into both the conspiracy’s greatest achievement and its most dangerous mistake.</p>
        </div>
      </section>

      <section className="timeline-section">
        <p className="section-number">03 // DENTONIAN TIMELINE</p>
        <div className="lore-timeline">{backstoryTimeline.map(([year, event]) => <article key={year}><time>{year}</time><span /><p>{event}</p></article>)}</div>
      </section>

      <section className="cut-missions">
        <header><p className="section-number">04 // CUT HORIZONS</p><h2>Missions beyond the final game</h2><p>The continuity material names several settings once imagined as playable missions. Apocalypse Inside treats them as open doors rather than discarded trivia.</p></header>
        <div>
          <article className="cut-texas"><h3>Texas</h3><p>A destabilized border and the expanding Russo-Mexican Alliance.</p></article>
          <article className="cut-moon"><h3>Moon Base</h3><p>Industrial ambition and conspiracy move beyond Earth.</p></article>
          <article className="cut-space"><h3>Space Station</h3><p>Orbital infrastructure becomes a strategic frontier.</p></article>
          <article className="cut-weather"><h3>Mt. Weather</h3><p>Continuity-of-government machinery prepares for the end.</p></article>
        </div>
      </section>

      <section className="lost-sequels">
        <header>
          <p className="section-number">05 // ION STORM’S LOST SEQUELS</p>
          <h2>The trilogy that might have been</h2>
        </header>
        <article>
          <div className="lost-year">2003—04</div>
          <div><h3>Deus Ex: Insurrection</h3><p>Art Min’s team explored several directions before settling on a grounded prequel starring Blake, a genetic predecessor to J.C. The concept mixed recognizable near-future geopolitics, mysterious enhancement technology, competing alliances, a customizable home base, and recruitable specialists whose loyalties could conflict.</p></div>
        </article>
        <article>
          <div className="lost-year">2004—05</div>
          <div><h3>Deus Ex 3</h3><p>Jordan Thomas led a parallel vision set in a single open New Orleans. Its discarded biotech experiment would become a mercenary inside a generative mission system, moving through rooftops and sewers while visibly crude augmentations made ordinary public life dangerous.</p></div>
        </article>
      </section>

      <section className="source-terminal">
        <span>SOURCE INDEX</span>
        <a href="https://www.nanoaugur.net/dx/bible/" target="_blank" rel="noreferrer">The Deus Ex Continuity Bible ↗</a>
        <a href="https://www.eurogamer.net/ion-storms-lost-deus-ex-sequels" target="_blank" rel="noreferrer">Ion Storm’s Lost Deus Ex Sequels ↗</a>
      </section>
    </main>
    <footer className="archive-footer"><img src={m17('DXAI-title.png')} alt="Apocalypse Inside" /><a href="/">Return to main archive</a></footer>
  </div>
}

const augmentations = [
  { code: '5784_AC433', type: 'VISION', name: 'Eye-Know Retinal Prosthesis', line: 'Digital information projected directly over your vision.', detail: 'Organic-plastic lenses and a tissue interface connect to the optic nerve, creating a private retinal display for communications and medical data.' },
  { code: '5730_AC827', type: 'POWER', name: 'Mechanical Arm Replacement', line: 'Strength that will never tire, ache, or fail you.', detail: 'A lightweight polymer frame uses micro-motors, liquid buffers, and electro-stimulated myomers to reproduce muscular movement at far greater strength.' },
  { code: '5730_AC827', type: 'INSIGHT', name: 'C.A.S.I.E. Social Enhancer', line: 'Understand what people may say before they say it.', detail: 'Optical polygraph analysis interprets expression, body language, and context to build a live psychological profile and persuasion model.' },
  { code: '5136_AC529', type: 'SPEED', name: 'Mechanical Leg Replacement', line: 'Precision and power engineered into every movement.', detail: 'Protected myomer bundles increase speed, jumping ability, balance, and the potential for near-silent movement.' },
  { code: '5183_AC829', type: 'DURABILITY', name: 'Rhino Dermal Plating', line: 'Protection against injury, impact, and degradation.', detail: 'A micro-thin carbon nanotube weave suspended in shear-thickening fluid becomes rigid under impact and disperses kinetic force.' }
]

function SarifPage() {
  const [selectedAug, setSelectedAug] = useState(0)
  const aug = augmentations[selectedAug]
  return <div className="sarif-page">
    <ArchiveNav theme="sarif" />
    <header className="sarif-hero">
      <div className="sarif-ring" aria-hidden="true"><i /><i /><i /></div>
      <div className="sarif-hero-copy"><p>WELCOME TO SARIF INDUSTRIES</p><h1>Envisioning<br />a new future.</h1><span>EVOLVE YOURSELF</span></div>
      <div className="sarif-stat"><span>DETROIT // NORTH AMERICA</span><b>HET_2007</b><small>Human Enhancement Technologies</small></div>
    </header>
    <main>
      <section className="sarif-about">
        <div><p className="sarif-label">SARIF AND YOU // 01</p><h2>A path to a better you.</h2></div>
        <div><p>David Sarif founded the company in 2007 by acquiring a failing Detroit automobile factory and converting it to automated prosthetics production. His premise was simple: accident and physical limitation should not decide the shape of a person’s future.</p><p>Today, Sarif Industries designs advanced mechanical augmentations for human implantation. Its Detroit operation combines manufacturing, clinical screening, surgical care, and Human Enhancement Technologies research.</p></div>
      </section>

      <section className="aug-lab">
        <header><p className="sarif-label">AUGMENTATION CATALOG // 02</p><h2>Experience a better you.</h2></header>
        <div className="aug-interface">
          <div className="aug-tabs" role="tablist" aria-label="Augmentation categories">{augmentations.map((item, index) => <button role="tab" aria-selected={selectedAug === index} className={selectedAug === index ? 'active' : ''} onClick={() => setSelectedAug(index)} key={item.type}><span>0{index + 1}</span>{item.type}</button>)}</div>
          <div className="aug-visual" aria-hidden="true"><div className={`limb limb-${selectedAug}`}><i /><i /><i /><b /></div><span>{aug.code}</span></div>
          <article className="aug-detail" role="tabpanel"><span>{aug.code}</span><p>{aug.type} ENHANCEMENT PACKAGE</p><h3>{aug.name}</h3><strong>{aug.line}</strong><p>{aug.detail}</p><dl><div><dt>FRAME</dt><dd>Nanocarbon composite</dd></div><div><dt>INTERFACE</dt><dd>Neural conductor array</dd></div><div><dt>STATUS</dt><dd>Clinical release</dd></div></dl></article>
        </div>
      </section>

      <section className="sarif-company">
        <div className="company-quote"><span>DAVID SARIF // FOUNDER, CEO</span><blockquote>“Only those with vision—and those with cunning—can hope to survive and prosper.”</blockquote></div>
        <div className="company-data"><article><b>1,500+</b><span>Detroit-area employees</span></article><article><b>2007</b><span>Manufacturing founded</span></article><article><b>PRIVATE</b><span>Unified ownership</span></article></div>
      </section>

      <section className="sarif-road">
        <header><p className="sarif-label">THE ROAD TO HERE // 03</p><h2>Building the augmented future.</h2></header>
        <div><article><time>2007</time><h3>Detroit foundation</h3><p>A former automobile plant is converted for automated prosthetics production.</p></article><article><time>2008</time><h3>Privately owned</h3><p>David Sarif rejects a public offering to preserve unified control of the company’s direction.</p></article><article><time>2009</time><h3>Military contract</h3><p>The Recycle Military Bill expands access to prosthetics for wounded service members.</p></article><article><time>2010</time><h3>Eye-Know breakthrough</h3><p>A successful neural-tissue interface advances retinal prosthesis development.</p></article></div>
      </section>

      <section className="sarif-source"><span>ARCHIVED CORPORATE DATA</span><a href="http://web.archive.org/web/20150522231826id_/https://www.sarifindustries.com/en/_xml/sarif.xml" target="_blank" rel="noreferrer">Sarif Industries XML archive ↗</a></section>
    </main>
    <footer className="sarif-footer"><div><b>SARIF</b><span>INDUSTRIES</span></div><p>Fictional corporate archive from the Deus Ex universe.</p><a href="/">Apocalypse Inside Archive</a></footer>
  </div>
}

function CodenameNebulaPage() {
  return <div className="nebula-page">
    <ArchiveNav />
    <header className="nebula-hero">
      <div className="nebula-stars" aria-hidden="true" />
      <div className="nebula-hero-copy">
        <p className="nebula-kicker">APOCALYPSE INSIDE // CHAPTER 06</p>
        <img className="nebula-wordmark" src={m17('codename-nebula-title.png')} alt="Codename Nebula" />
        <h1>The conspiracy does not end at the edge of Earth.</h1>
        <p>Beyond the planet, Ophelia waits. Orbital infrastructure, silent corridors, and an unfinished mission become the next horizon of Apocalypse Inside.</p>
        <a className="nebula-button" href="https://www.moddb.com/mods/codename-nebula" target="_blank" rel="noreferrer">View Codename Nebula on ModDB</a>
      </div>
    </header>

    <main>
      <section className="nebula-chapter">
        <div className="nebula-chapter-image">
          <img src={m17('OpheliaDeusEx.jpg')} alt="Ophelia looking toward Earth" />
          <span>MISSION FILE // 06</span>
        </div>
        <div>
          <p className="nebula-label">CHAPTER 06</p>
          <h2>Codename Nebula</h2>
          <p>The sixth chapter has moved out of the main mission sequence and into its own archive. Its imagery turns away from the streets and bunkers of Earth toward the orbital frontier.</p>
          <p>Codename Nebula carries the project into a colder, more isolated space: Ophelia, the Earth below, and the unanswered signals surrounding a mission that was always meant to stand apart.</p>
        </div>
      </section>

      <section className="nebula-horizons">
        <header>
          <p className="nebula-label">ORBITAL ARCHIVE // 2052</p>
          <h2>A second horizon</h2>
        </header>
        <div className="nebula-grid">
          <article>
            <img src={m17('OpheliaHallEarthView.jpg')} alt="A corridor overlooking Earth" />
            <div><span>01 // OPHELIA</span><h3>Above the world</h3><p>The familiar blue planet becomes distant scenery beyond sealed glass and darkened halls.</p></div>
          </article>
          <article>
            <img src={m18('EarthAndMoon.jpg')} alt="Earth and the Moon in space" />
            <div><span>02 // ORBIT</span><h3>The lunar frontier</h3><p>Industrial ambition and the old conspiracy extend into the space between Earth and Moon.</p></div>
          </article>
          <article>
            <img src={m17('Eagle_nebula_pillars_2014.jpg')} alt="The Pillars of Creation in the Eagle Nebula" />
            <div><span>03 // NEBULA</span><h3>Signals in the dark</h3><p>A name drawn from deep space marks the final chapter of this recovered mission archive.</p></div>
          </article>
        </div>
      </section>

      <section className="nebula-project">
        <div>
          <p className="nebula-label">PROJECT ARCHIVE</p>
          <h2>Codename Nebula lives beyond Chapter 6.</h2>
        </div>
        <div>
          <p>The original Codename Nebula page invited players into an early alpha. This restored page preserves the chapter and its visual identity without recreating the retired registration form.</p>
          <a href="https://www.moddb.com/mods/codename-nebula" target="_blank" rel="noreferrer">Open the current project archive →</a>
        </div>
      </section>
    </main>

    <footer className="nebula-footer">
      <img src={m17('codename-nebula-title.png')} alt="Codename Nebula" />
      <a href="/">Return to Apocalypse Inside</a>
    </footer>
  </div>
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/backstory') {
    document.title = 'Backstory — Apocalypse Inside'
    return <BackstoryPage />
  }
  if (path === '/sarif-industries') {
    document.title = 'Sarif Industries — Evolve Yourself'
    return <SarifPage />
  }
  if (path === '/codename-nebula') {
    document.title = 'Codename Nebula — Apocalypse Inside'
    return <CodenameNebulaPage />
  }
  document.title = 'Apocalypse Inside'
  return <HomePage />
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

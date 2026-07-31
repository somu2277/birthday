# Task List - Pixar-Level Birthday Experience

## [x] Project Setup & Dependencies
- [x] Install `gsap` dependency in `client/package.json`

## [x] Global Styling & Effects
- [x] Update `client/src/styles/global.css` with aurora, firefly, and envelope animations
- [x] Upgrade `client/src/components/BackgroundEffects.jsx` to render a dark elegant blue-gold ambient light glow (no heavy particles/trails)

## [x] Heartfelt Birthday Card Flow (Page 1 - Page 6)
- [x] Implement `client/src/context/AdventureContext.jsx` (Global audio state coordinates and reset flows)
- [x] Implement `client/src/components/Navbar.jsx` (Clean and minimal top bar featuring gold text brand logo and mute/unmute buttons with no complex menus)
- [x] Redesign `client/src/pages/Home.jsx` (Page 1 Landing page - navy night sky, twinkling/shooting stars, 3D-shaded radial gradient gold/pink/purple/rosegold balloon clusters on left/right columns, wooden boards with crowned pig, cool pig, main pig sitting on clouds, 10-second countdown glass cards, rising heart balloons, and surprise button)
- [x] Redesign `client/src/pages/WishPage.jsx` (Page 2 Birthday wish - clean centered stationery cream letter card with gold corner SVGs, custom typed text highlighting keywords in gold, gold-halo title headings, glassmorphic quote cards with gold leaf borders, floating bokeh sparkles, and gold cake decorator button. Removed all cartoon illustrations/pigs/sunset photos/balloons on this page)
- [x] Redesign `client/src/pages/CakeDecorator.jsx` (Page 3 Cake decorator - interactive 3-tier customizer with flavor color updates, frosting overlay paths, togglable topping selections with pop indicators, candle count staggers, candle-lighting triggers, candle-blowing effects with smoke/confetti bursts, and navigation redirects)
- [x] Redesign `client/src/pages/PuzzlePage.jsx` (Page 4 Jigsaw Puzzle - replaced image puzzle with a Birthday Quiz Challenge containing 5 customizable multiple choice questions, visual progress bar, Next/Previous controls, correct/wrong animations, score metrics, and unlock button)
- [x] Redesign `client/src/pages/GalleryPage.jsx` (Page 5 Photo memories - Polaroid Memory Album with white photo margins, drop shadows, handwritten captions, a blurred lightbox slider with left/right/close triggers, golden floating sparkles, progress headers, and a bottom glassmorphism note card)
- [x] Redesign `client/src/pages/LetterPage.jsx` (Page 6 Final Letter - envelope opening motion sequence mapping `closed` -> `open` -> `sliding` -> `expanded`, warm cream textured paper card with gold corner frames, custom Pixar-style starry night sibling stargazing illustration frame with floating gold heart overlay, handwritten script, quote notes, and replay trigger)

## [x] Interaction & Layer Stacking Fixes
- [x] Standardize z-index values across all pages and components
- [x] Resolve import ambiguity on `Navbar` by appending `.jsx` explicitly inside `routes.jsx` to prevent runtime React resolution blank screen crashes
- [x] Remove custom cursors and trails to keep browsing clean and responsive
- [x] Add explicit `pointer-events: none` to all floating background elements
- [x] Align Express backend to port `5099` to avoid host proxy aborts and EADDRINUSE conflicts

## [x] Verification
- [x] Clean and rebuild client production bundle using `npm run build`
- [x] Verify everything runs without warnings or console errors

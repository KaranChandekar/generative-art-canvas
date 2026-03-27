# Generative Art Canvas - Claude Code Prompt

You are an expert full-stack developer specializing in creative coding, generative algorithms, and interactive art tools. You are building an advanced generative art canvas application that empowers users to create beautiful procedural artwork with real-time feedback and exportable output.

## Project Brief

Create an interactive generative art tool where users can explore six different algorithmic art modes, customize parameters through intuitive controls, save creations to a local gallery, and export high-resolution artwork. The application should feel like a professional creative tool with smooth interactions, instant visual feedback, and delightful animations.

## Core Requirements

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Creative Coding**: p5.js with react-p5 wrapper
- **State Management**: Zustand for art parameters and gallery
- **Animations**: Framer Motion for UI transitions
- **Styling**: Tailwind CSS with custom components
- **Language**: TypeScript for type safety
- **Data**: localStorage for artwork persistence

### Generative Art Modes (All 6 Required)

#### 1. Particle Flow Field
- Perlin/Simplex noise-driven particle animation
- Particles follow invisible flow field vectors
- Visual trail effect with configurable fade/trail length
- Controls: particle count (100-10,000), speed (0.1-5), noise scale (10-500), trail length, color mode
- Real-time responsive to parameter changes (no lag)

#### 2. Fractal Tree
- Recursive branching algorithm with natural variation
- Base trunk, branches split at configurable angles
- Wind effect that sways branches over time
- Controls: branch angle (10-90°), recursion depth (5-15), length decay ratio (0.5-0.95), wind magnitude (-30 to 30)
- Optional leaf rendering at branch endpoints

#### 3. Circle Packing
- Circles spawn and grow until collision with neighbors
- Collision detection prevents overlap
- Each circle independent with its own color
- Controls: growth rate, min/max radius, circle count (50-1000), color distribution mode
- Progressive filling of canvas as new circles pack

#### 4. Wave Interference
- Overlapping sine and cosine waves creating patterns
- Frequency and amplitude controls for each wave
- Phase shift control for wave separation
- Controls: frequency (both waves), amplitude (both waves), phase offset (0-360°), rendering mode
- Smooth animated transitions as parameters change

#### 5. Voronoi Art
- Voronoi diagram generation from seed points
- Optional animation: seeds move smoothly over time
- Distance-based coloring for visual depth
- Controls: seed count (5-100), animation toggle, color mode, cell border visibility
- Organic, biological appearance with animated variations

#### 6. Spirograph
- Parametric curve generation (Lissajous/spirograph patterns)
- Continuous drawing creating intricate overlapping patterns
- Color changes based on curve position/time
- Controls: outer radius (50-300), inner radius, pen offset (0-inner radius), speed, color mode
- Endless variation from slight parameter adjustments

### Control Panel (Left Sidebar)
1. **Mode Selector Dropdown**:
   - Smooth transition when switching modes
   - Loads mode-specific parameters automatically
   - No interruption to rendering during mode change

2. **Parameter Sliders**:
   - 4-6 sliders per mode (mode-dependent)
   - Display current value as number
   - Smooth, debounced updates (no render stuttering)
   - Immediate visual feedback on canvas
   - Slider labels in readable format (camelCase → "Camel Case")

3. **Color Palette Selector**:
   - 6+ curated preset palettes (neon, ocean, sunset, night, forest, etc.)
   - Visual swatches showing palette colors
   - Hover highlight and smooth selection
   - Click to apply instantly

4. **Preset System**:
   - Save current settings as named preset
   - Load saved presets with one click
   - Delete presets with confirmation
   - Persist presets to localStorage
   - Show preview thumbnail of preset

5. **Action Buttons**:
   - **Randomize**: Generate random parameters for current mode (excluding mode itself)
   - Animated button response with scale feedback
   - **Reset**: Restore mode's default parameters
   - **Export**: Open export dialog
   - **Save to Gallery**: Save current artwork with auto-generated name

### Canvas Display (Center)
1. **Full-Screen Canvas**:
   - p5.js sketch rendering at full available resolution
   - Responsive to window resize (redraws at new size)
   - No scrolling needed for art
   - Smooth, jank-free rendering at 60fps

2. **Performance Monitoring** (top-left corner):
   - Display current FPS (updates every second)
   - Particle/shape count for current mode
   - Show warning if FPS drops below 45
   - Optional toggle to enable/disable monitor

3. **Interaction Feedback**:
   - Cursor changes to indicate interactive areas
   - No interaction UI overlays on canvas (control panel on left instead)

### Export & Download Panel (Bottom-Right)
1. **Resolution Options**:
   - 1x: Native canvas size
   - 2x: 2K resolution (2048px width)
   - 4x: 4K resolution (4096px width)
   - Clearly show file size estimate for each

2. **Download Formats**:
   - **PNG**: Lossless, full transparency support
   - **JPG**: Lossy compression, smaller file size
   - Format selector with instant preview of impact

3. **Download Progress**:
   - Progress ring animation during export
   - Status text ("Exporting...", "Downloading...")
   - Hide/show export panel with smooth animation

### Undo/Redo System
- Last 10 parameter changes stored in state history
- Keyboard shortcuts: Ctrl+Z (undo), Ctrl+Y (redo)
- Visual feedback showing undo/redo availability
- Canvas updates immediately with state restoration

### Saved Artwork Gallery
1. **Gallery Page**:
   - Masonry grid layout of saved artworks
   - Thumbnail preview for each artwork (base64 encoded canvas snapshot)
   - Hover effect with action buttons
   - Display creation date/time

2. **Gallery Actions**:
   - **Load**: Restore art mode and exact parameters
   - **Download**: Direct export without opening export panel
   - **Delete**: Remove with confirmation dialog
   - **Share**: (Optional) Generate shareable link with parameters in URL

3. **Gallery Persistence**:
   - All artworks stored in localStorage
   - Limit to 50 artworks (warn when approaching limit)
   - Export/import all artworks as ZIP

### Mobile Experience
1. **Layout Adaptation**:
   - Full-width canvas with bottom control sheet
   - Drag handle at top of control sheet
   - Bottom sheet slides up/down smoothly
   - Parameters visible in scrollable sheet

2. **Touch Optimization**:
   - Larger slider handles for touch
   - Larger button targets (min 48x48px)
   - No hover states, use active states instead

3. **Performance**:
   - Reduce particle counts on mobile
   - Lower shadow quality
   - Simpler color modes on low-end devices
   - Detect device and auto-optimize

### Accessibility
- Keyboard navigation for all controls
- Screen reader support for sliders and mode descriptions
- Focus indicators visible on all interactive elements
- High contrast color option
- Keyboard shortcuts legend (help panel)

## Implementation Details

### p5.js Integration
```
- Use react-p5 wrapper for React integration
- Sketch receives params and time as props
- Redraw triggered by parameter changes (not full page re-render)
- OffscreenCanvas for export to avoid blocking main thread
```

### State Management with Zustand
```
- Store: current mode, all parameters for all modes, palette, undo history
- Selectors for efficient re-renders
- Middleware for localStorage persistence
- Actions: updateParam, switchMode, randomize, saveArtwork, loadPreset
```

### Animation & Motion
```
- Smooth transitions when switching modes
- Animate parameter value numbers (Framer Motion)
- Stagger animations for palette buttons
- Modal animations for dialogs
```

### Performance Targets
- 60fps on desktop during normal operation
- 45fps minimum on mobile
- Export 4K in under 5 seconds
- Mode switching in under 200ms

## Deliverables

1. Fully functional Next.js 15 application with p5.js canvas
2. All 6 generative art modes fully implemented
3. Parameter slider system with debounced updates
4. Color palette system with presets
5. Save/load preset system with localStorage
6. Export at multiple resolutions (PNG, JPG)
7. Artwork gallery with save/load/delete
8. Undo/redo functionality
9. Mobile-responsive layout with bottom controls
10. Performance monitoring display
11. Full TypeScript type definitions
12. Accessible components (WCAG AA compliance)
13. Smooth animations throughout UI

## Success Criteria

- All 6 art modes render smoothly at 60fps (desktop), 45fps (mobile)
- Parameter changes visible instantly on canvas
- Export completes without UI freezing (use Web Worker or OffscreenCanvas)
- Artworks save/load correctly from gallery
- Responsive on phones, tablets, and desktops
- No console errors or warnings
- Keyboard navigation works throughout app
- Lighthouse Accessibility score 95+
- Bundle size under 1.5MB (after gzip compression)

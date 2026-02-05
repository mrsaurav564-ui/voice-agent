# Implementation Plan - XYZ College Digital Transformation

## Goal
Create a high-fidelity, interactive mobile prototype for XYZ College targeting iPhone 14/15 Pro resolution. The site will serve as a transparent, authentic portal for prospective students and parents in Nepal.

## User Review Required
> [!IMPORTANT]
> - **Images**: Will use AI-generated or placeholder images that fit the "authentic Nepali" description.
> - **Mobile-First**: The design is optimized for mobile screens (approx 393px width). Desktop view will be a centered mobile container or responsive, but focus is mobile.
> - **Technology**: Plain HTML, Vanilla CSS, and minimal JS for interaction.

## Proposed Changes

### Core Structure
- **Root Directory**: `c:/pixellabs/xyz-college`
- **Files**:
    - `index.html`: Main entry (SPA approach or Multi-page? Multi-page feels more distinct for prototype handling, but SPA is smoother. I will use **Multi-page** for simplicity in file management, `index.html`, `programs.html`, `student-life.html`).
    - `styles.css`: Central stylesheet with CSS variables for the color palette.
    - `script.js`: Handling Modal, Navigation active states, and basic interactions.

### Design System (CSS)
- **Colors**:
    - Primary: Deep Navy/Charcoal (`#2C3E50` or similar)
    - Accent: Muted Rhododendron Red (`#D65A5A`) or Marigold Yellow (`#F39C12`). Let's go with Red for CTAs as it's vibrant but professional.
    - Background: Off-white/Clean White.
- **Typography**: Modern Sans-Serif (e.g., 'Inter' or 'Poppins' via Google Fonts).
- **Layout**: Flexbox and Grid. Mobile-first media queries.

### Component Details

#### [Global Components]
- **Sticky Bottom Navigation**: Links to Home, Programs, Student Life.
- **Floating Action Button (FAB)**: "Talk to Us" - triggers Modal.
- **Contact Modal**: Fixed positioning, slide-up animation.
- **Header**: Logo, Hamburger (visual only or simple menu), Language Toggle.

#### [Screen 1: Home] (`index.html`)
- Hero Section with background image.
- Horizontal scroll container for Trust Signals.
- Vertical card stack for "Campus Life Unfiltered".

#### [Screen 2: Programs] (`programs.html`)
- Tab system (CSS/JS based switching).
- Cards for Course details with "Transparency Block" (Pricing).
- Faculty circles.

#### [Screen 3: Student Life] (`student-life.html`)
- Horizontal Scroll Snap for Testimonials.
- Full-width container for Virtual Tour.

## Verification Plan

### Automated Tests
- None required for this prototype level.

### Manual Verification
- **Browser Testing**: Use Browser Tool to open `index.html` and verify:
    - responsive layout consistency on mobile dimensions.
    - Modal opens/closes.
    - Navigation links work.
    - Scrolling is smooth (vertical and horizontal).

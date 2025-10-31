# Birds Tracking - Design doc

**Author(s):** Julio Ramirez  
**Status:** Draft  
**Last updated:** 2025-09-28  

---

## Contents
This document describes the *take-home challenge* for the **Senior Web Developer role at Copilot Money**.  

The objective is to build a simple web app that displays birds, shows details in a modal with zoom, and allows users to add notes. The information comes from a GraphQL API provided with an access token.  

---

## Objective
**What and why are we doing this?**  
The goal is to evaluate how a candidate approaches a problem from zero to one: building a functional app from scratch that follows a design spec (Figma) and handles network/UX challenges correctly.  

This exercise is **not** about coding speed. It focuses on clarity of design, fidelity to the UI/UX, and handling background tasks and errors gracefully.  

---

## Goals
- Replicate the Figma design with high accuracy.  
- Display a list of birds with basic information.  
- Show a detail modal when selecting a bird, with zoom on image.  
- Allow adding notes to a bird using GraphQL mutations.  
- Apply watermark to all images (thumbnails and detail).  
- Handle slow and failed downloads gracefully.  
- Keep the code simple, modular, and easy to review.  

---

## Non-goals  TBD
- No need for advanced performance optimizations (SSR, CDN).  
- No need for full test coverage or E2E automation.  
- No backend development (only consume the provided API).  
- No requirement to build a full design system.  

---

## Background
### Context
- **Email received (from Meghan, Copilot Money):**  
  - Take-home challenge for a simple web app to track birds.  
  - Spend “less than one day” on it.  
  - Deadline: **November 3, 2025**.  
  - Provided:  
    - **GraphQL API** with schema + access token.  
    - **Figma file** with the design.  
    - **Starter project** with Vite + React.  
  - Delivery: private GitHub repo, with reviewer access.  
  - Reward: $100 gift card for completing the exercise.  

### API Schema (summary)
- **Query**: `birds`, `bird(id)`  
- **Mutation**: `addNote(birdId, comment, timestamp)`  
- **Types**: `Bird` (with notes), `Note`  

### Watermark Service
- POST JPEG bytes to endpoint → returns watermarked image.  

---

## Overview
The proposal is a single-page app built with **React + TypeScript** using **Vite**.  

The frontend will use a lightweight GraphQL client (`graphql-request`) integrated with **TanStack Query** for caching, retries, and optimistic updates.  

The UI will follow the Figma design strictly, styled with **TailwindCSS**, with small animations added using **Framer Motion**.  

---

## Detailed Design

### New Functions & Components
- **Hooks**:  
  - `useBirds`, `useBird(birdId)`: fetch data from GraphQL.  
  - `useAddNote`: mutation with optimistic update.  
- **Helper**:  
  - `watermarkUrl`: downloads image → POST to watermark endpoint → creates local blob URL.  
- **Components**:  
  - `BirdCard`: shows thumbnail, names, watermark lazy-loaded.  
  - `BirdGrid`: responsive grid of birds.  
  - `BirdModal`: detail with zoom/pan image, notes, form to add new note.  
  - `Skeleton`: loading states.  

### Folder Structure

``` 
src/
  api/
    client.ts
    queries.ts
    hooks.ts
    watermark.ts
  components/
    BirdCard.tsx
    BirdGrid.tsx
    BirdModal.tsx
    Skeleton.tsx
  app/
    App.tsx
    
```

---

## Solution 1 (Preferred)

### Frontend
- **React + Vite + TS**  
- **TanStack Query** for queries/mutations and background tasks.  
- **TailwindCSS** for accurate styling.  
- **Framer Motion** for animations.  
- **IntersectionObserver** for lazy watermarking thumbnails.  

### Backend
- None. The app only consumes the provided **GraphQL API** and **Watermark service**.  

---

## Solution 2 (Alternative)

### Frontend
- Use **Apollo Client** instead of TanStack Query.  
- Stronger caching but adds extra setup (likely overkill for this scope).  

### Backend
- Same (only consuming).  

---

## Considerations
- **Trade-off**: Apollo adds unnecessary complexity for a short challenge.  
- **Accepted tech debt**: no i18n or dark mode.  
- **Performance**: limited to lazy load + abort controllers.  
- **Accessibility**: role="dialog", focus trap, alt texts, keyboard navigation.  

---

## Metrics
Validation points for delivery:  
- Design accuracy vs. Figma (spacing, typography, colors).  
- Acceptable loading time (<2–3s even with watermark).  
- Error handling (retry, skeletons, fallback messages).  
- Notes saved and persisted correctly.  
- Responsive layout (mobile + desktop).  

---

## Links
- [GraphQL endpoint](https://takehome.graphql.copilot.money)  
- [Watermark endpoint](https://us-central1-copilot-take-home.cloudfunctions.net/watermark)  
- [Figma design] (private link)  

# Birds Tracking - Design doc

**Author(s):** Julio Ramirez De Freitas
**Status:** Draft  
**Last updated:** 2025-09-31  

---

## Contents
This document describes the *take-home challenge* for the **Senior Web Developer role at Copilot Money**.  

The objective is to build a simple web app that displays birds, shows details in a modal with zoom, and allows users to add notes. The information comes from a GraphQL API provided with an access token.  

---

## Objective
The goal is to evaluate how a candidate approaches a problem from zero to one: building a functional app from scratch that follows a design spec (Figma) and handles network/UX challenges correctly.  

This exercise is **not** about coding speed. It focuses on clarity of design, fidelity to the UI/UX, and handling background tasks and errors gracefully.  

---

## Goals
- UI matches the design spec as closely as possible.
- Handle slow and failed downloads gracefully.
- App responsiveness (handle background tasks efficiently).
- Display a list of birds with basic information.    
- Allow adding notes to a bird using GraphQL mutations.  
- Apply watermark to all images (thumbnails and detail).  
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

### API Schema (summary)
```
type Query {
	birds: [Bird!]!
	bird(id: ID!): Bird
}

type Mutation {
	addNote(birdId: ID!, comment: String!, timestamp: Int!): ID
}

type Bird {
	id: ID!
	thumb_url: String!
	image_url: String!
	latin_name: String!
	english_name: String!
	notes: [Note!]!
}

type Note {
	id: ID!
	comment: String!
	timestamp: Int! # Milliseconds from epoch.
}
```
- **Query**: `birds`, `bird(id)`  
- **Mutation**: `addNote(birdId, comment, timestamp)`  
- **Types**: `Bird` (with notes), `Note`  

### Watermark Service
All images that will be shown on screen shall be watermarked. In order to watermark, you need to invoke the following HTTP function:

POST https://us-central1-copilot-take-home.cloudfunctions.net/watermark

The body should contain the bytes of the image (should be jpeg, the original format of the bird URLs), and the headers should contain the application/octet-stream Content-Type header, and the number of bytes in the Content-Length header. The response will have the Content-Length header, the Content-Type header with image/jpeg, and the body will be the bytes of a JPEG image.

Again, if you have any questions or issues, you are encouraged to ask the interviewer.

---

## Overview
The proposal is a single-page app built with **React + TypeScript** using **Vite**.  

The frontend will use a the same stack as the starter project, this decision was made because in the first interview with Gabriel Dieguez CTO, he told me the actual stack used at Copilot Money is very similar to the starter project.

The UI will follow the Figma design strictly, styled with **TailwindCSS**, with small animations added using **Framer Motion**.  

---

## Decisions taken

### Frontend
- **React + Vite + TS**
- **TailwindCSS** for accurate styling.  
- **Framer Motion** for animations.  
- **IntersectionObserver** for lazy watermarking thumbnails.  
- **Apollo Client** for GraphQL queries/mutations.
- **Shadcn Dialog** for accessible modal.
- **Error Boundary** for catching rendering errors.
- **Error Handling on requests**: retries + user feedback.
- **Cache watermarked images** in memory to avoid redundant requests.
- **React hook form** for handling notes form. (Maybe is overkill for a single input form, but it's a good practice for future scalability and production projects).

### Backend
- None. The app only consumes the provided **GraphQL API** and **Watermark service**.  


## Considerations
- **Trade-off**: Apollo adds unnecessary complexity for a short challenge but provides a robust solution for state management and caching.
- **Accepted tech debt**: no i18n, dark mode deactivation and testing.
- **Performance**: limited to lazy load + cache, and code-splitting.  
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

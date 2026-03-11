# Cessna 172 Skyhawk Pre-Flight Checklist

A mobile-first, responsive web app for the Cessna 172 Skyhawk pre-flight checklist.

![Pre-flight checklist](https://img.shields.io/badge/Pre--flight-Cessna%20172-0ea5e9)

## Features

- **Mobile-first** — Large touch targets (44px min), readable text, safe-area insets for notched devices. Tapping anywhere on a row toggles the checkbox.
- **Responsive** — Adapts from phone to tablet/desktop; header and progress bar scale with window width so elements don’t overlap.
- **Session progress** — Progress is saved in `sessionStorage` while you use the app. Refresh keeps your checks; closing the tab clears state so your next visit starts with a blank checklist.
- **Three sections** — Preflight interior (18 items), preflight exterior / walkaround (24 items), engine run-up & before takeoff (12 items). All sections start expanded; you can collapse/expand by tapping the section header.
- **Progress bar** — Fixed at the top with overall completion percentage. Always visible while scrolling.
- **Preflight complete** — When all items are checked, a centered “Preflight complete” message and checkmark appear in the header.
- **Reset** — Reset button in the header clears all checkboxes and starts over.

## Disclaimer

**Reference only.** This checklist is not a substitute for the Pilot’s Operating Handbook (POH) or operator-approved procedures for your specific aircraft. Always use the checklist and procedures approved for your Cessna 172.

## License

Use and modify as you like. No warranty; use at your own risk.

# Furlink — panel demonstration and implementation handoff

## Current scope
This branch is a React Native UI demonstration. It does **not** establish real Raspberry Pi connectivity, verified pet safety, or successful Android device testing. Default mode is Demo; switching to Actual does not start hardware.

## Panel walk-through
1. Sign in using the clearly labeled sample credentials `admin / 1234`. Authentication is local mock logic, not production security.
2. Home: show animated beagle, sample temperature/battery/food/water. Tap Feed or Water to change demo levels.
3. Switch to Actual: sample readings become unavailable, and commands must not claim success.
4. Monitor: explain the Raspberry Pi 4 camera placeholder and future secure stream.
5. Clean: return to Demo, start the **12-second** simulated conveyor/rinse sequence, then press STOP while running. This does not actuate any motor or pump.
6. Schedule: add, edit, toggle, and remove sample feeding schedules. These changes are in-memory and reset when the app reloads.
7. Notifications: filter sample alerts and mark them read. Actual Mode must not show these as live events.
8. Settings/Device: review mode, profile, and unverified device status.

## Safety acceptance criteria for hardware work
- Demonstrate the moving floor only with an empty cage; the conveyor is not proven safe for a dog on it.
- Implement a **physical hardwired emergency stop** and appropriate guards/interlocks, independently of app UI.
- No automatic cleaning based only on camera interpretation or a software warning.
- Use authenticated command IDs, acknowledgement, command timeout, fault state, and no automatic restart.
- STOP must shut down motor and pump promptly; display confirmed Stopped only after hardware acknowledgement.
- On network loss, power faults, occupancy uncertainty, or sensor faults, fail to a safe nonmoving state.
- Test motor/pump control with an empty cage and simulated waste before any further animal-related evaluation.

## Production integration checklist
- Replace mock authentication with secure Firebase auth and access rules.
- Build a device adapter for Raspberry Pi 4 telemetry and commands, separate from demo state.
- Define device command protocol (command ID, timestamp, status, timeout, ack).
- Integrate camera stream with authenticated transport, lifecycle cleanup, and no false LIVE badge.
- Persist schedules and notifications, validate timezone and device acknowledgements.
- Handle offline state, retries, and conflict resolution without replaying hazardous commands.
- Add unit tests for demo/actual mode, navigation, input validation, and STOP state transitions.
- Run `npm install`, `npm run lint`, `npm test -- --watch=false`, and `npm run android` in a configured development environment; fix all failures before presenting.
- Test on a physical Android phone and multiple screen sizes; verify screen reader labels and reduced-motion preferences.
- Obtain permission or replace Snoopy-specific licensed character art with an original beagle mascot for public/commercial release.

## Known limitations
- No actual IoT controls, sensor readings, or camera stream.
- Demo values and schedules are local and temporary; no guaranteed persistence across app restarts.
- Visual consistency was improved in source code, but no screenshot-based visual QA or successful native build has been verified in this environment.

# Furlink — panel demonstration and implementation readiness

## Current status
This branch is a **UI demonstration**, not a validated connected pet-care system. App demo actions never actuate hardware. Authentication in AuthContext is mock/local (demo: admin / 1234), **not production security**. Do not use this credential for real deployments. All percentages and alerts are examples. No real camera stream or physical emergency-stop verification is implemented.

## Panel walkthrough
1. Launch app; sign in with demo account (admin / 1234).
2. Home: select **Demo**. Show animated beagle, sample food/water/temperature/battery readings.
3. Tap **Feed** or **Water** to change sample levels; no physical action occurs.
4. Visit **Schedule**; add, edit, enable, and delete example feeding schedules. These are local screen state, not saved to Raspberry Pi.
5. Visit **Monitor**; show the camera placeholder and explain the planned Raspberry Pi camera feed.
6. Visit **Cleaning**; explain the moving flat conveyor floor. **Only simulate cleaning with an empty cage**. Start demo, watch progress, press STOP DEMO; no motor or pump moves.
7. Visit **Notifications**; demonstrate sample alerts and read filters.
8. Switch to **Actual** mode. Show that real readings are unavailable and physical controls are disabled. Switching modes is not proof of connection.
9. Return to Demo mode for further panel walkthrough.

## Requirements before actual app testing
- Replace mock authentication with authenticated account/device pairing, secure credentials and access rules.
- Integrate Raspberry Pi 4 with verified telemetry, command acknowledgements, timeout handling, and offline states.
- Separate demo and actual data/commands at the service layer; never let demo state write to device endpoints.
- Add real camera stream with authentication, permission handling, reconnection, and explicit offline state.
- Implement feed/water command state machine with success only on hardware acknowledgement; add physical tests.
- For cleaning, **do not operate the conveyor with a dog present**. Use an empty cage for prototype tests. A camera view or owner acknowledgement is not a sufficient safety interlock. Require independent risk assessment, physical guards/interlocks, hardwired emergency stop, fault handling, and validation before considering occupied operation.
- STOP must not be gated behind an in-app confirmation. The UI must show stopping/pending until hardware confirms, with timeout/error behavior. Hardwired emergency stop must work without app/network.
- Persist and sync schedules safely; validate quantities and timing.
- Persist alert events from verified sensors; remove sample-only alerts from actual mode.
- Test on real Android hardware: navigation, screen sizes, keyboard overlap, reduced motion, offline/reconnection, permissions, accessibility, lifecycle, and animation performance.
- Build/lint/test pipeline has **not been executed in this session**. Do not claim release readiness based only on committed UI changes.

## Notes
This is an original black-and-white beagle illustration inspired by a classic cozy cartoon aesthetic, not a licensed Snoopy character or official Peanuts asset.

# React Native App Guide

## Prerequisites
- Node.js (v14 or newer)
- npm or yarn
- React Native CLI (`npm install -g react-native-cli`)
- Android Studio (for Android) or Xcode (for iOS)

## Installation

1. Clone this repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd [project-folder]
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the App

### Android
```bash
# Start Metro bundler
npm start

# In a new terminal
npm run android
```

### iOS
```bash
# Start Metro bundler
npm start

# In a new terminal
npm run ios
```

## Troubleshooting
- If you encounter issues, try:
  ```bash
  cd android && ./gradlew clean && cd ..
  npm start -- --reset-cache
  ```
- Make sure your emulator is running before starting the app

## Additional Commands
- Run tests: `npm test`
- Lint code: `npm run lint`

# App Preview

<div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;">
  <!-- Row 1 -->
  <div style="flex: 1 1 300%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/3286e976-52f2-49f3-a37e-3345df59bf9f" alt="Home" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Home</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/68d5d7ec-7f20-4959-9904-d64c6d2e9efd" alt="Overview" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Overview</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/b92f7476-ad01-4479-9649-bf024ff895f4" alt="Balance_Graph" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Balance Graph</p>
  </div>

  <!-- Row 2 -->
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/35e9497e-91c2-44b3-b980-fee6e9bfa084" alt="Expense" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Expense</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/bc960e3c-71eb-44d3-9135-eb624d2b8caf" alt="Expenses" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Expenses</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/388bc35a-0848-476a-81b1-7dde2fb6f8be" alt="Groups" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Groups</p>
  </div>

  <!-- Row 3 -->
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/8749aa6d-32c5-45af-9d5a-8a84f05f59be" alt="MyProfile" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">MyProfile</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/e0d9d6da-8f76-4022-af3c-31cf3e52acae" alt="Settlements" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Settlements</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/24087827-da00-4341-8e29-9fa87b8e911f" alt="Profile" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Profile</p>
  </div>

  <!-- Row 4 -->
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/40ff6d84-7c80-465e-ae34-c57bae10324e" alt="Group_Members" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Group Members</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/3228f3bd-7971-4fcc-aea9-21770adfe83f" alt="Create_Expense" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Create Expense</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/5049d1a1-033a-49a7-a5da-16fc00c2abfc" alt="Create_Group" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Create Group</p>
  </div>

  <!-- Row 5 -->
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/bf16a548-2cd3-488c-9f83-e026d49e76e9" alt="Join_Group" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">Join Group</p>
  </div>
  <div style="flex: 1 1 30%; min-width: 250px;">
    <img src="https://github.com/user-attachments/assets/e662edb7-9f9e-492b-86bb-b9dd86e4480f" alt="UPI" style="width: 40%; border-radius: 8px;">
    <p style="text-align: center; margin-top: 8px;">UPI</p>
  </div>
</div>


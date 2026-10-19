# Habitly – Habit Tracker

<p align="center">
  <strong>Build Better Habits, One Day at a Time.</strong>
</p>

Habitly is a modern habit-tracking mobile application built with Expo, React Native, and TypeScript. It helps users develop consistent daily routines, monitor their progress, track streaks, and build a healthier lifestyle.

## ✨ Features

### Habit Management

- Create new daily habits.
- Edit existing habits.
- Delete habits.
- Customize habit names, descriptions, and icons.
- Configure individual reminder preferences.

### Daily Tracking

- Daily habit checklist.
- Mark habits as completed or incomplete.
- Automatic daily progress calculation.
- Persistent completion history.

### Streak Tracking

- Automatic current streak calculation.
- Longest streak tracking.
- Individual habit streaks.
- Historical completion records.

### Analytics & Statistics

- Weekly progress overview.
- Daily completion percentages.
- Total habit completions.
- Current and longest streak statistics.
- Weekly completion rate.

### Local Database

- SQLite database integration.
- Persistent offline storage.
- Separate habit and completion-history tables.
- Transaction-based database operations.

## 🛠️ Technology Stack

| Technology         | Purpose                      |
| ------------------ | ---------------------------- |
| Expo SDK 57        | Mobile development framework |
| React Native       | Cross-platform mobile UI     |
| TypeScript         | Type-safe development        |
| Expo SQLite        | Local database               |
| Expo Notifications | Habit reminders              |
| Expo Haptics       | Touch feedback               |
| Expo Vector Icons  | Application icons            |

## 📁 Project Structure

```text
habitly/
│
├── App.tsx
├── app.json
├── package.json
├── README.md
│
└── src/
    ├── components/
    │   ├── common/
    │   ├── dashboard/
    │   └── habits/
    │
    ├── constants/
    │   └── theme.ts
    │
    ├── database/
    │   ├── database.ts
    │   ├── habit_queries.ts
    │   └── statistics_queries.ts
    │
    ├── hooks/
    │   ├── use_habits.ts
    │   └── use_statistics.ts
    │
    ├── screens/
    │   └── home_screen.tsx
    │
    ├── services/
    │
    ├── styles/
    │
    └── types/
        └── habit.types.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Expo CLI through `npx`
- Android Studio or Expo Go

### Installation

Clone the repository:

```bash
git clone https://github.com/LabibArefin123/habitly_expo.git
```

Navigate to the project:

```bash
cd habitly_expo
```

Install dependencies:

```bash
npm install
```

Install compatible Expo dependencies:

```bash
npx expo install --fix
```

Start the development server:

```bash
npx expo start
```

Clear cache and restart:

```bash
npx expo start -c
```

## 🗄️ Database

Habitly uses SQLite for local data persistence.

### Database Tables

**habits**

Stores habit information, including:

- Habit title and description
- Icon and color
- Reminder preferences
- Creation timestamp

**habit_logs**

Stores daily habit completion records:

- Habit ID
- Completion date
- Completion timestamp

**settings**

Stores application preferences.

## 🗺️ Development Roadmap

- [x] Initial Expo project setup
- [x] Habit management
- [x] SQLite database integration
- [x] Daily completion tracking
- [x] Daily progress calculation
- [x] Current streak calculation
- [x] Longest streak calculation
- [x] Weekly progress analytics
- [ ] Scheduled daily notifications
- [ ] Custom bottom navigation
- [ ] Dedicated statistics screen
- [ ] Habit categories
- [ ] Dark mode
- [ ] Monthly analytics
- [ ] Data backup and export

## 📱 Platforms

- Android
- iOS

## 👨‍💻 Developer

**Md. Labib Arefin**

Full Stack Developer & Software Engineer

GitHub: [LabibArefin123](https://github.com/LabibArefin123)

Portfolio: [labib.work](https://labib.work)

## 📄 License

This project is currently under development. Licensing details will be added later.

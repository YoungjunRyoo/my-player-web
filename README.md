# MyPlayer

MyPlayer is a React-based MLB analytics and player-tracking web application that allows users to explore MLB games, standings, player statistics, league leaders, and news while following their favorite players through personalized accounts.

**Live Website:** [View MyPlayer](https://staging.d25rr9q5twxsbp.amplifyapp.com/)


## Features

### MLB Dashboard
- View MLB game schedules and league standings.
- Browse league leaders in home runs, wins, and batting average.
- Read league-wide and team-specific MLB news.

### Player Search
- Search MLB players using case-insensitive partial-name matching.
- Browse featured players directly from the dashboard.
- Open detailed player profiles through an interactive modal.

### Player Analytics
- View player profiles with team, position, jersey number, and official MLB imagery.
- Display recent game performance and season-by-season statistics.
- Dynamically render hitter- or pitcher-specific statistics based on player position.
- Support two-way players with both hitting and pitching data.
- Calculate league-wide rankings for AVG, HR, OPS, RBI, ERA, wins, strikeouts, and saves.

### Personalized Player Tracking
- Sign in with Google using Firebase Authentication.
- Follow and unfollow MLB players.
- Store user-specific favorite players in Cloud Firestore.
- Automatically synchronize saved players with authenticated users.

## Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- Vite
- React Router
- CSS

### State Management
- React Context API
- React Hooks

### Authentication & Database
- Firebase Authentication
- Google Sign-In
- Cloud Firestore

### APIs & External Data
- MLB Stats API
- MLB RSS Feeds
- RSS2JSON API
- MLB Static Media Assets
- Fetch API

### Development Tools
- Git
- GitHub
- npm
- ESLint

## Screenshots

### Dashboard
<img width="1710" height="1074" alt="Screenshot 2026-08-30 at 12 47 04 PM" src="https://github.com/user-attachments/assets/bcc70e87-b033-4bd1-879e-f5bb76867817" />


### Player Details
<img width="1705" height="1073" alt="Screenshot 2026-08-30 at 12 49 30 PM" src="https://github.com/user-attachments/assets/73c9a852-cc8f-4f68-852c-d013761918a1" />


### Favorites
<img width="1710" height="1071" alt="Screenshot 2026-08-30 at 12 49 49 PM" src="https://github.com/user-attachments/assets/8d8d69d5-b983-427a-af14-d8e3c82be022" />


## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/YoungjunRyoo/my-player-web.git
cd my-player-web
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```




# Prime User Web App

A React/Vite application for casino users to place bets on numbers. The app connects to the desktop-backend API and is now deployed as a web experience (no Electron runtime on Railway).

## Features

- 🔐 User authentication with secure token storage
- 🎲 Real-time live game display with countdown timer
- 💰 Place bets on numbers 1-12
- 📊 View betting history
- 💵 Transaction history
- 📈 Balance tracking
- 🏆 Winner announcements and profit calculation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **desktop-backend** running on port 8000 (see parent directory)

## Installation

1. Navigate to the project directory:
```bash
cd prime-user-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Development

### Running the App in Development Mode

```bash
npm run dev
```
This starts the Vite dev server at `http://localhost:5173` (or the port Vite chooses).

### Backend Connection

Make sure the `desktop-backend` server is running on port 8000 before starting the app.

## Building for Production

```bash
npm run build
```

The built assets will be in `dist/`. To serve locally in a production-like mode:

```bash
npm run start
```

On Railway, the web service runs `npm run start` to serve the built `dist` bundle.

## Project Structure

```
prime-user-app/
├── electron-main.js          # Electron main process
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── electron-builder.yml      # Electron Builder configuration
├── public/
│   └── icon.ico             # App icon (Windows)
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main app component with routing
    ├── index.css            # Global styles
    ├── utils/
    │   └── api.js           # API client with token management
    ├── store/
    │   ├── store.js         # Redux store configuration
    │   └── slices/
    │       ├── userSlice.js # User state (auth, balance)
    │       └── gameSlice.js # Game state (live game, bets)
    ├── pages/
    │   ├── LoginPage.jsx    # User login page
    │   ├── DashboardPage.jsx # Main betting interface
    │   ├── MyBetsPage.jsx   # View placed bets
    │   └── TransactionsPage.jsx # Transaction history
    └── components/
        ├── BalanceCard.jsx  # Display user balance
        ├── GameTimer.jsx    # Countdown timer
        ├── BettingPanel.jsx # Number selection & bet placement
        └── BetHistory.jsx   # Recent bets display
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

For production or different environments, change the URL accordingly.

### API Endpoints

The app connects to the following backend endpoints:

- `POST /users/login` - User authentication
- `GET /users/getLiveGame` - Get current live game
- `POST /users/create-bet` - Place a bet
- `POST /users/getUserBalance` - Get user balance
- `POST /users/getUserTransactions` - Get transaction history
- `POST /users/getBetProfit` - Check bet winnings
- `POST /users/refresh-token` - Refresh access token

## Usage

1. **Login**: Enter your username and password
2. **View Live Game**: See the current game timer and status
3. **Place Bets**: 
   - Select numbers (1-12)
   - Enter bet amounts
   - Click "Place Bet"
4. **View Bets**: Check your betting history in "My Bets"
5. **Transactions**: View all your transactions and balance changes
6. **Winner Announcement**: Winners are announced automatically when drawn

## Security

- Tokens are stored securely using localStorage (Electron safeStorage can be enabled)
- Automatic token refresh on expiry
- Protected routes requiring authentication
- CORS handled by backend

## Troubleshooting

### App won't start

- Ensure Node.js v16+ is installed
- Check that all dependencies are installed: `npm install`
- Verify `.env` file exists with correct API URL

### Cannot connect to backend

- Verify `desktop-backend` is running on port 8000
- Check `VITE_API_BASE_URL` in `.env` file
- Ensure firewall isn't blocking the connection

### Build fails

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure you have sufficient disk space
- Check Node.js version compatibility

### Login fails

- Verify backend is running and accessible
- Check username/password are correct
- Ensure user account is active in the backend system

## Development Tips

- Use `npm run dev` for fast development with hot reload
- Use `npm run electron:dev` to test Electron-specific features
- Check browser/Electron console for debugging
- Network tab shows all API calls

## Contributing

1. Make changes in the `src/` directory
2. Test thoroughly in development mode
3. Build and test the EXE before deploying

## License

ISC

## Support

For issues or questions:
1. Check the troubleshooting section
2. Verify backend is running correctly
3. Check console logs for error messages

---

**Last Updated**: November 2024
**Version**: 1.0.0


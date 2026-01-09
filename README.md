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

## Creating Desktop App with Electron

This application can be packaged as a standalone desktop application for Windows using Electron.

### Prerequisites for Desktop Build

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Windows OS** (for Windows builds)

### Development with Electron

To run the app in Electron during development:

```bash
npm run electron:dev
```

This command will:
1. Start the Vite development server
2. Wait for the server to be ready
3. Launch the Electron app connected to the dev server

Alternatively, you can run them separately:

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Electron (after dev server is running)
npm run electron
```

**Note**: Make sure to set `ELECTRON_DEV_SERVER_URL` environment variable if your dev server runs on a different port:
```bash
ELECTRON_DEV_SERVER_URL=http://localhost:5173 npm run electron
```

### Building Desktop Application

To create a distributable Windows desktop application:

1. **Build the web application first**:
   ```bash
   npm run build
   ```
   This creates the production build in the `dist/` folder.

2. **Package the Electron app**:
   ```bash
   npm run electron:build
   ```
   This will:
   - Build the web app (if not already built)
   - Package everything into a Windows installer using electron-builder
   - Create an NSIS installer in the `release/` directory

### Build Output

After running `npm run electron:build`, you'll find:

- **Installer**: `release/KSS Desktop Setup x.x.x.exe` - Windows installer
- **Unpacked**: `release/win-unpacked/` - Unpacked application files

### Electron Configuration

The Electron configuration is defined in `package.json` under the `build` section:

- **App ID**: `com.kssdesktop.primeuser`
- **Product Name**: `KSS Desktop`
- **Output Directory**: `release/`
- **Target Platform**: Windows x64
- **Installer Type**: NSIS

### Electron Main Process

The main Electron process is located in `electron/main.js` and handles:
- Window creation and management
- Loading the web app (dev server or built files)
- Print functionality for receipts
- External link handling

### Preload Script

The `electron/preload.js` file provides secure communication between the renderer process (web app) and the main process, exposing safe APIs for printing and other desktop features.

### Customizing the Build

To customize the build (icon, installer options, etc.), modify the `build` section in `package.json` or create an `electron-builder.yml` file. Common customizations:

- **App Icon**: Add icon files and reference them in the build config
- **Installer Options**: Customize NSIS installer behavior
- **File Associations**: Add file type associations
- **Auto-updater**: Configure automatic updates

### Troubleshooting Desktop Build

**Build fails with "electron-builder not found"**:
```bash
npm install --save-dev electron-builder
```

**App doesn't load in Electron**:
- Ensure `npm run build` completed successfully
- Check that `dist/index.html` exists
- Verify the `main` field in `package.json` points to `electron/main.js`

**Installer creation fails**:
- Ensure you have sufficient disk space
- Check Windows permissions
- Verify NSIS is available (electron-builder includes it)

**App window is blank**:
- Check Electron console for errors (DevTools should open automatically in dev mode)
- Verify the build output path in `electron/main.js` matches your `dist/` folder structure

### Distribution

Once built, distribute the installer file (`KSS Desktop Setup x.x.x.exe`) to end users. They can install it like any other Windows application.

---

**Last Updated**: November 2024
**Version**: 1.0.0


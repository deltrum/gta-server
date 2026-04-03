# GTA5 Roleplay Server

A GTA5 multiplayer roleplay server built on the [RAGE Multiplayer](https://rage.mp/) framework. Features a full RP experience with factions, jobs, economy, player progression, and more.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: RAGE Multiplayer (server + client scripting)
- **Database**: MySQL / MariaDB
- **Client UI**: React (pre-built static assets)
- **Discord Bot**: discord.js for server notifications and commands
- **Auth**: MD5 password hashing

## Project Structure

```
gta-server/
├── client_packages/                  # Client-side code (runs on player machines)
│   ├── index.js                      # Client entry point, camera setup, GUI init
│   ├── clientside.js/                # Feature modules
│   │   ├── atm.js                    # ATM interface
│   │   ├── auth.js                   # Character creation UI
│   │   ├── bus.js                    # Public transit system
│   │   ├── control.js                # Player input handling
│   │   ├── discord.js                # Discord rich presence
│   │   ├── draw.js                   # Drawing utilities
│   │   ├── fly.js                    # Flight mechanics
│   │   ├── items.js                  # Inventory UI
│   │   ├── license.js                # Driving license UI
│   │   ├── location.js               # Location HUD
│   │   ├── main.js                   # Core event handlers, radio sync
│   │   ├── money.js                  # Money display
│   │   ├── nametag.js                # Player name tags
│   │   ├── phone.js                  # Phone/SMS system
│   │   ├── police.js                 # Police UI (wanted list, dispatch)
│   │   ├── raycast.js                # Raycasting utilities
│   │   └── speedometer.js            # Vehicle speedometer
│   ├── html/                         # React UI (pre-built)
│   │   ├── index.html
│   │   └── static/
│   └── libs/
│       └── nativeui.js               # NativeUI menu library
│
├── packages/gta5-multiplayer.ru/     # Server-side code
│   ├── index.js                      # Main entry point, world setup, timers
│   ├── commands/                     # Chat command handlers
│   │   ├── admin.js                  # Admin commands (kick, ban, promote, etc.)
│   │   ├── basic.js                  # RP commands (/me, /do, /say, /w, etc.)
│   │   ├── faction.js                # Faction management commands
│   │   ├── jobs.js                   # Job system commands
│   │   └── temp.js                   # Experimental commands
│   ├── events/                       # Server event handlers
│   │   ├── auth.js                   # Login / registration
│   │   ├── atm.js                    # ATM transactions
│   │   ├── cef.js                    # Client GUI events
│   │   ├── checkpoint.js             # Checkpoint events
│   │   ├── colshape.js               # Collision shapes (stores, ATMs, etc.)
│   │   ├── command.js                # Command routing
│   │   ├── control.js                # Key input handling
│   │   ├── entity.js                 # Entity interactions
│   │   ├── phone.js                  # Phone/SMS events
│   │   ├── player.js                 # Player join/quit/death/chat
│   │   ├── police.js                 # Police system events
│   │   └── vehicle.js                # Vehicle events
│   ├── plugins/                      # Core plugin system
│   │   ├── api.js                    # Global utility functions
│   │   ├── discord.js                # Discord bot integration
│   │   ├── events.js                 # Event auto-loader
│   │   ├── factions.js               # Faction config loader
│   │   ├── systems.js                # System auto-loader
│   │   └── ad_manager.js             # Advertisement system
│   ├── systems/                      # Core systems
│   │   ├── config.js                 # Server configuration
│   │   ├── distance.js               # Distance calculations
│   │   └── mysql.js                  # Database connection
│   └── configs/                      # JSON configuration data
│       ├── atm.json                  # ATM locations
│       ├── blips.json                # Map blip markers
│       ├── buyCar.json               # Vehicle shop prices
│       ├── interiors.json            # Interior locations
│       ├── jobs.json                 # Job definitions
│       ├── route.json                # Taxi routes
│       ├── vehicles.json             # Vehicle spawn data
│       ├── weaponstore.json          # Weapon shop data
│       └── faction/                  # Faction configs (10 factions)
│           ├── LSPD.json
│           ├── Army.json
│           ├── MOHLS.json
│           ├── CityHall.json
│           ├── PrisonLS.json
│           ├── SWAT.json
│           ├── LSNews.json
│           ├── DrivingSchool.json
│           ├── LaFuenteBlanca.json
│           └── RussianMafia.json
│
└── gta5-multiplayer.ru.sql           # Database schema + seed data
```

## Features

### Player Systems
- Registration and login with character customization (face, hair, clothing)
- Experience, kills/deaths tracking, and stat progression
- Dual currency: cash on hand + bank account (via ATMs)
- Inventory system with consumable items
- Survival stats: hunger, thirst, narcotic addiction
- Wanted levels and jail system
- Mute system for communication bans

### Factions (10)
| # | Faction | Description |
|---|---------|-------------|
| 1 | LSPD | Los Santos Police Department |
| 2 | Army | Military |
| 3 | MOHLS | Hospital / EMS |
| 4 | CityHall | Government |
| 5 | PrisonLS | Prison |
| 6 | SWAT | Special Weapons and Tactics |
| 7 | LSNews | News Agency |
| 8 | DrivingSchool | Driving School |
| 9 | LaFuenteBlanca | Criminal Organization |
| 10 | RussianMafia | Organized Crime |

Each faction has ranks, salaries, warehouses, bank accounts, and weapon distribution points.

### Economy
- ATM network for deposits, withdrawals, and transfers
- Weapon stores (ammunition shops)
- Vehicle purchase shops
- Player-to-player payments (`/pay`)
- Hourly payday with tax system

### Communication
- Proximity-based local chat with range detection
- RP commands: `/me`, `/do`, `/try`, `/say`, `/s` (shout), `/w` (whisper)
- OOC chat: `/b`
- Phone and SMS system
- Police radio dispatch
- Emoji shortcuts (smiles, laughter, salute, sadness)

### Discord Integration
- Server log channel
- Bot commands: `!online`, `!banks`, `!warehouses`, `!save`, `!ip`, `!site`

## Setup

### Prerequisites
- [RAGE Multiplayer Server](https://rage.mp/)
- Node.js
- MySQL or MariaDB

### Database Setup

1. Create a database named `gta5-multiplayer.ru`:
   ```sql
   CREATE DATABASE `gta5-multiplayer.ru`;
   ```
2. Import the schema:
   ```bash
   mysql -u root -p gta5-multiplayer.ru < gta5-multiplayer.ru.sql
   ```

### Configuration

1. **Database** - Update connection settings in `packages/gta5-multiplayer.ru/index.js`:
   ```js
   global.pool = mysql.createPool({
       connectionLimit: 10,
       host: 'localhost',
       user: 'root',
       password: '',
       database: 'gta5-multiplayer.ru'
   });
   ```

2. **Discord Bot** - Set the `DISCORD_BOT_TOKEN` environment variable, or update the fallback in `packages/gta5-multiplayer.ru/plugins/discord.js`.

### Running

Place the project files in your RAGE MP server directory and start the server as usual:
```bash
# From your RAGE MP server directory
./server  # Linux
server.exe  # Windows
```

## Admin Commands

Admin commands are available based on admin level (1-6):
- `/kick [id] [reason]` - Kick a player
- `/ban [id] [reason]` - Ban a player
- `/mute [id] [seconds]` - Mute a player
- `/setadmin [id] [level]` - Set admin level
- `/setmember [id] [faction]` - Assign faction
- `/setrank [id] [rank]` - Set faction rank
- `/goto [id]` - Teleport to player
- `/gethere [id]` - Teleport player to you
- `/setwanted [id] [level]` - Set wanted level
- `/setjail [id] [seconds]` - Jail a player

## License

This project is provided as-is for educational and personal use.

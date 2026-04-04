# GTA5 Roleplay Server

A GTA5 multiplayer roleplay server built on the [RAGE Multiplayer](https://rage.mp/) framework. Features a full RP experience with factions, jobs, economy, player progression, and more.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: RAGE Multiplayer (server + client scripting)
- **Database**: MySQL / MariaDB
- **Client UI**: React (pre-built static assets)
- **Discord Bot**: discord.js for server notifications and commands
- **Auth**: MD5 password hashing

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

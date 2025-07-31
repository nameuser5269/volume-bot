# Volume Bot

This Discord bot posts a daily list of Taiwanese stocks whose trading volume has skyrocketed. The bot fetches stock data (placeholder logic is provided) and sends the results to a configured channel.

## Environment Variables

The bot relies on the following secrets:

- `DISCORD_TOKEN` – Discord bot token
- `DISCORD_CHANNEL_ID` – channel ID for posting messages
- `FINMIND_TOKEN` – token for the FinMind API (unused in the placeholder implementation)

## Local Usage

```bash
npm install
npm start
```

## GitHub Actions

The included workflow runs every weekday at 19:00 Taiwan time and can also be triggered manually. Make sure to set the secrets listed above in your repository settings.

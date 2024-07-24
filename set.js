const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0hwUzh3UmVub0s5RFFOcXp0TzNuemUvRjJYcnVLR2J1Zkc5Y2NtY0NHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkt3Sk1oelA0SUZ6OS9VM1Q0U3VjNjRaOXVBL2FhbUh1QzBqeEUvU0lRRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQndXNGs0cVhHMXVvdzA0VExrbTc0d3RqRWNEVFV6cGhaQU5YaXlhTTJjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrNGsvR3lMWnQ0UE1QblE0d1ZyUGNnMDRkYXBIbGdvczAzdEljQiswN1hvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtOcnRheDEycTNpRFo3dUhTemNFdjNzcUdtVE9DZDhYNzFXei9TVmdsSFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imxwenh3NEhVNXhjR2twTlBEYmxVaFRVTU1xTDZ0K0FYRVhWN0NFdEg2Z1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUt4QWtlRVZWZDZEQkFWZ1NZQXJ6RXEwZEtzKzJhRUVwSEc2V1h2ZXQzST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1ZzdE9kWkE3Z1c1Q2xkdFlQT1M4aTJ6VkVYWExEN3Z4RG41M01aN2tFbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InM1TjRWNUI0a2pnWmgrMy9qcmdIQ21UeU5HRDNNMXM0K24vcE5NODRWam5Md2lNQTViZXRVZ3JvTkprVVdZZWpmTXpkYnRBcHB4RlluUkVUR2wySWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkxLCJhZHZTZWNyZXRLZXkiOiJwNWNmdWhQbjZlQW5IRTcxK3hheVNlS3JWU0tDQWczMHVTYXpTWGtDcDJNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJya1A0ZGZfd1NaYWloYTY3TUFudFNBIiwicGhvbmVJZCI6IjNkODg0NTBhLTk1NWEtNDY5OC1hODE3LTQ0YjQ1MjZjYzQwZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyVm9oYUl5TTdxcVA3RlZuR2ViVCtJQXhwZDQ9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkQ3UjF2ZmRxZDI1U2dadEZ5cjFBek0zeGhZQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xlUXV1Z0dFTVQvaExVR0dBa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImdBY1d0VWdNN0FEbjJnMTBJS0dsTnB2b04xUzlzM0lsNDhBbm9ZWGRGQjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6InhOQWJlNjYxa0l4UFF0eFlMbXZYbUZMMXN1VGF1ZmZHVzd4T3BlRGZuSUluODEzV3FuR0tSOXZtRmsydVN1VU9kQVM4Wkt3QWM5QmxmT1dPRzVMWUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJRMUZ1UzBteFoxVlNISnEzR0hqdStzODZaZWN4dndCMHpVU3V4L0dOL1BveVgyek5Kam8yTUl4REFjNWliRGU4YUpDL1pmRFpKQ2t4MndFR1hPNGRpUT09In0sIm1lIjp7ImlkIjoiMjU0NzI4NDY3NjU2OjM3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjQ4MDc3MzQ0NjI4OTM0OjM3QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3Mjg0Njc2NTY6MzdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWUFIRnJWSURPd0E1OW9OZENDaHBUYWI2RGRVdmJOeUplUEFKNkdGM1JRZSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0F3SUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxODQzNjY1LCJsYXN0UHJvcEhhc2giOiIyUnV0TjAifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

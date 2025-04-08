# Qvixter

Boilerplate för webbserver med Node.js och Express.

# SQLite

Eftersom att skolans databasserver är nere så behöver vi använda oss av SQLite. Detta eftersom vi sedan ska hosta på en molntjänst.

## Installera SQLite
```bash
npm install sqlite3 sqlite
```

Den stora skillnaden mellan SQLite och MySQL är att SQLite är en filbaserad databas, medan MySQL är en serverbaserad databas. Det innebär att SQLite är enklare att använda för mindre projekt eller för utveckling, medan MySQL är mer kraftfullt och skalbart för större projekt.

## Skapa databas och tabeller

Med SQLite har jag skapat databasen / tabellerna i en fil med javascript. Koden körs vid serverstart och skapar databasen om den inte redan finns. Du kan använda Tableplus för att se databasen och tabellerna när den väl skapats.

SQL fråga för att skapa en tweet tabell som körs med javascript:

```sql
await db.exec(`
  CREATE TABLE IF NOT EXISTS tweet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    author_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
```

Se db-sqlite.js filen för att se koden och fler exempel.

## Glitch

På det stora hela ska [Glitch](https://glitch.com/) hostingen inte vara några problem. Det som brukar ställa till det är avsaknaden av korrekt konfiguration i `package.json` filen. Se till att du har följande konfiguration i din `package.json` fil:

```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": "16"
  }
}
```

Med de ändringarna (och att du väntar lite, kolla i Glitch Logs) så ska Glitch installera samtliga paket automagiskt och starta servern. Om det strular så kan det också vara så att du behöver trigga Glitchs byggsystem, genom att ändra i en fil.

## VIKTIGT!

När du testar sessions med Glitch så behöver du öppna din preview i ett nytt fönster för att det ska fungera.

## Uppdatera från GitHub i Glitch

Det här förutsätter att du inte har ändrat i filerna på Glitch, utan bara i GitHub. Om du har ändrat i Glitch så kommer det att bli konflikter när du försöker hämta de senaste ändringarna.

1. Gå till ditt Glitch-projekt och klicka på "Tools" i det nedre vänstra hörnet.
2. Välj "Terminal" för att öppna en terminal.
3. Skriv `git pull` för att hämta de senaste ändringarna från GitHub.

Om du ändrat kommer det att bli konflikter. Du kan lösa dem genom att öppna filerna i Glitch och göra de ändringar som behövs. Om du inte vill lösa konflikterna kan du alltid klona om projektet från GitHub.

1. Gå till ditt Glitch-projekt och klicka på "Tools" i det nedre vänstra hörnet.
2. Välj "Import and Export" och sedan "Import from GitHub".
3. Klistra in din GitHub-repo URL och klicka på "OK".
4. Glitch kommer nu att klona ner projektet från GitHub och skapa en ny version av ditt projekt.

## Färdig hosting med Glitch

Här hittar du mitt exempel hostat på Glitch, [Violet-pollen-moth](https://violet-pollen-moth.glitch.me/).


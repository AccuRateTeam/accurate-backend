<p align="center">
    <img src="https://pparchery.wipplingerconsulting.at/ressources/assets/images/logo.svg" width="320" alt="Nest Logo" />
</p>
<p align="center">
    <a href="#getting-started">Getting Started</a> |
    <a href="#ressourcen">Ressourcen</a>
</p>

<hr/>

Dieses Repository enthält die Accurate REST API. Die API basiert auf dem [NestJS](https://docs.nestjs.com/) Framework
und die Verbindung zur MariaDB Datenbank läuft über [Prisma](https://www.prisma.io/).

## Getting Started
Um das Projekt lokal zum Laufen zu bringen, müssen zuerst einige Dinge eingerichtet werden. 
Eine kurze Anleitung findest du in diesem Abschnitt.

### 0. Development Tools installieren (falls noch nicht vorhanden)
Wir arbeiten mit Yarn da es von der Performance her besser ist als NPM. Um Yarn zu installieren,
müssen wir zuerst NPM installieren da Yarn darauf aufbaut. NPM kann auf der [Node.js Website](https://nodejs.org/en/download/)
heruntergeladen werden. Sollte irgendein Problem auftreten kannst du mir auf Discord schreiben (`Nikkl#0001`).

Nach der Installation kannst du Yarn installieren:
```shell
C:\Users\FixiHartmann\accurate-backend> npm install --global yarn
```

Zu guter Letzt müssen wir noch das Prisma CLI installieren:
```shell
C:\Users\FixiHartmann\accurate-backend> yarn global add prisma
```

### 1. Packages installieren
Jetzt müssen wir die Packages für dieses Projekt mit folgendem Befehl installieren:
```shell
C:\Users\FixiHartmann\accurate-backend> yarn install
```

### 2. Dotenv File
Im `.env` File kann das Projekt konfiguriert werden. Da es Best Practice ist, keine sensiblen 
Daten in einem Repository zu speichern wird das `.env` File von git ignoriert. Es befindet sich
im Projekt Root bereits die `.env.example` Datei, diese kopieren wir jetzt, nennen die 
Kopie `.env` und passen dann den Inhalt an.
```shell
C:\Users\FixiHartmann\accurate-backend> copy .env.example .env
```

### 3. Schema von der DB herunterladen
Dieser Befehl sollte jedes Mal ausgeführt werden, wenn sich am DB Schema irgendwas 
geändert hat.

```shell
C:\Users\FixiHartmann\accurate-backend> prisma db push
```

## Ressourcen
Es wäre vom Vorteil sich mindestens die grundlegende Dokumentation durchzulesen.

### Grundlegend NestJS
- [Introduction](https://docs.nestjs.com/)
- [First Steps](https://docs.nestjs.com/first-steps)
- [Controllers](https://docs.nestjs.com/controllers)
- [Providers](https://docs.nestjs.com/providers)
- [Modules](https://docs.nestjs.com/modules)

### Grundlegend Prisma
- [What is Prisma?](https://www.prisma.io/docs/concepts/overview/what-is-prisma)
- [Prisma - generate](https://www.prisma.io/docs/reference/api-reference/command-reference#generate)
- [Prisma - db pull](https://www.prisma.io/docs/reference/api-reference/command-reference#db-pull)
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)

- [`Data`](#data)
  - [Overview](#overview)
- [Specs](#specs)
  - [pages.json](#pagesjson)
    - [Example](#example)
  - [runs.json](#runsjson)
    - [Example](#example-1)
  - [teams.json](#teamsjson)
    - [Example](#example-2)

# `Data`
## Overview
File `pages.json` in the root data directory describes the sub-folders under `pages` and outlines other page variables. Each page contains `runs.json` and `teams.json` which contain team data and all of the M+ runs for said teams. Folder `meta` contains `coloring.json` which contains all of the coloring data for M+ scores and `dungeontimers.json` which contains the default timing for each M+ dungeon.


# Specs
## pages.json

```js
{
  /**
    * Slug of webpage
    * used to generate [root domain]/slug
    * @type String
    */
  [Slug]: {

    /**
      * Name of page
      * used as title of page
      */
    "name": String,

    /**
      * M+ Start date
      * used as lower bound when geting M+ runs
      */
    "start-date": Unix Timestamp,

    /**
      * M+ End date
      * used as upper bound when geting M+ runs
      */
    "end-date": Unix Timestamp,

    /**
      * Numbers of players required per team to count as a run
      */
    "players-required": Integer
  }
}
```
### Example
```json
{
  "tournament-1": {
    "name": "Tournament 1",
    "start-date": 1628694000,
    "end-date": 1639298800,
    "players-required": 4
  }
}
```

## runs.json

```js
{
  "data": {
  /**
    * Id of the Run
    * See "Getting Run ID"
    * @type String
    */
    [RunId]: {

    /**
      * Unique Identifier of the team
      * usually Team #
      */
      "team": String,

    /**
      * Full name of the Dungeon
      */
      "dunegonName": String,

    /**
      * Abreviated name of the Dungeon
      * See https://raider.io/api/v1/mythic-plus/static-data?expansion_id=8
      */
      "dungeonAbbr": String,

    /**
      * Level of the M+ Run
      */
      "keystoneLevel": Integer,

    /**
      * Duration of M+ Run in MS
      */
      "clearTime": Integer,

    /**
      * Raider.io's calculated score of the M+ Run
      */
      "score": Float,

    /**
      * Datetime M+ run was completed
      */
      "dateCompleted": "2021-08-12T05:07:03.000Z",

    /**
      * The difference in time of M+ Run vs given dungeon timer in MS
      */
      "timeDiff": Integer,

    /**
      * The percent difference in time of M+ Run vs given dungeon timer
      */
      "percDiff": Float,

    /**
      * URL of the run
      */
      "url": String,

    /**
      * Resulting Key recived from completion
      */
      "keyMod": Integer,

    /**
      * Color Hex of the score as calculated by Raider.io
      */
      "scoreColor": String
    }
  },
  "topRuns": {
  /**
    * All of the top runs from each team
    */
    [TeamId]:[RunId]
  }
}
```
### Example
```json
{
  "data": {
    "5213689": {
      "team": "Team 1",
      "dunegonName": "De Other Side",
      "dungeonAbbr": "DOS",
      "keystoneLevel": 15,
      "clearTime": 2834171,
      "score": 118.8,
      "dateCompleted": "2021-08-13T03:15:10.000Z",
      "timeDiff": 254171,
      "percDiff": 0.09851589147286832,
      "url": "https://raider.io/mythic-plus-runs/season-sl-2/5213689-15-de-other-side",
      "keyMod": 0,
      "scoreColor": "#346cdf",
    }
  },
  "TopRuns": {
    "Team 1": "5213689",
  }
}
```



## teams.json

```js
{
/**
  * Unique identifier of the team
  * @type String
  */
  [TeamId]: {

  /**
    * Team name
    */
    "name": String,

  /**
    * Players on team in the order of:
    * Tank, Healer, Dps[3]
    * in format of [NAME]-[REALM]
    */
    "players": String[5],

  /**
    * Combined score of all members on team
    */
    "score": Integer
  }
}
```
### Example
```json
{
  "Team 3": {
    "name": "I Swear We're Ramping",
    "players": [
      "Gharakor-Illidan",
      "Nerissa-Illidan",
      "Miserea-Illidan",
      "Azajin-Illidan",
      "Fellerosa-Illidan"
    ],
    "score": 11177
  }
}
```
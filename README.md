<p align="center">
<a href="https://airtable.com/" target="blank" style="margin-right: 10px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtable_Logo.svg/1280px-Airtable_Logo.svg.png" width="320" alt="Airtable Logo" /></a>
<a href="https://firebase.google.com/" target="blank"><img src="https://firebase.google.com/images/brand-guidelines/logo-built_white.png" width="320" alt="Firebase Logo" /></a>
</p>

## Description

Starter App for Serving [Airtable Bases](https://airtable.com) with Serverless Firebase Functions to avoid API Limits.

## Airtable Configuration

- Add Airtable API Key to .env > AIRTABLE_KEY
- Add Airtable Base to .env > AIRTABLE_BASE

## Installation

```bash
$ cd functions && npm install
```

## Running the functions

```bash
# development with watch
$ cd functions && firebase serve
```

## Deploy

```bash
$ firebase deploy
```

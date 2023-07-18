#! /usr/bin/env node

const fs = require('fs');
const weekStart = require('weekstart');

const locals = require('../src/i18n/locales.json');

const startOfWeek = locals.reduce((acc, cv) => {
  const day = weekStart.getWeekStartByLocale(cv);

  return Object.assign(acc, { [cv]: day });
}, {});

const stringData = `${JSON.stringify(startOfWeek, null, 2)}\n`;

fs.writeFileSync(__dirname + '/../src/i18n/start-of-week.json', stringData);

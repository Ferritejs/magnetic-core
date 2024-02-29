#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

const getSettings = () => {
  return {
    "telemetry.enableCrashReporter": false,
    "cSpell.language": "en,ru,fr,de-de,it,es,ch,pt_PT",
    "cmake.configureOnOpen": false,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false,
    "files.watcherExclude": {
      "**/target": true,
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "typescript.preferences.importModuleSpecifier": "shortest",
    },
    "cSpell.words": [],
  };
};

(() => {
  const VS_DIR_NAME = ".vscode";
  const FILE_NAME = "settings.json";
  const VSCODE_PATH = path.join(__dirname, "..", VS_DIR_NAME);
  const SETTINGS_PATH = path.join(VSCODE_PATH, FILE_NAME);

  if (!fs.existsSync(VSCODE_PATH)) {
    fs.mkdirSync(VSCODE_PATH);
  }

  if (!fs.existsSync(SETTINGS_PATH)) {
    const text = JSON.stringify(getSettings(), null, 2);
    fs.writeFileSync(SETTINGS_PATH, text);
  }
})();

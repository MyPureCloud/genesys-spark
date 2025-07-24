#!/usr/bin/env node

import { createFastMCPServer } from './mcp/server';
import * as fs from 'fs';
import * as path from 'path';

function getComponentsVersion(): string {
  try {
    const jsonDocsPath = path.resolve(__dirname, '../data/json-docs.json');
    const jsonDocs = JSON.parse(fs.readFileSync(jsonDocsPath, 'utf8'));
    return jsonDocs.sourceMetadata?.version || '1.0.0';
  } catch (error) {
    console.warn('Warning: Could not read version from json-docs.json, using fallback');
    return '1.0.0';
  }
}

let server = createFastMCPServer({
  name: 'genesys-spark-mcp-server',
  description: 'Genesys Spark MCP server',
  version: getComponentsVersion(),
  port: 3001,
  bind: '0.0.0.0',
});

server.start({
  transportType: 'stdio',
});


// Handle process signals for graceful shutdown
process.on('SIGINT', () => {
  console.error('\n' + '='.repeat(80));
  console.error('\x1b[1m\x1b[33m  RECEIVED SIGINT SIGNAL\x1b[0m');
  console.error('='.repeat(80));
  console.error('\x1b[33mShutting down server gracefully...\x1b[0m');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('\n' + '='.repeat(80));
  console.error('\x1b[1m\x1b[33m  RECEIVED SIGTERM SIGNAL\x1b[0m');
  console.error('='.repeat(80));
  console.error('\x1b[33mShutting down server gracefully...\x1b[0m');
  process.exit(0);
});

// Log uncaught exceptions for better debugging
process.on('uncaughtException', (error) => {
  console.error('\n' + '='.repeat(80));
  console.error('\x1b[1m\x1b[31m  UNCAUGHT EXCEPTION\x1b[0m');
  console.error('='.repeat(80));
  console.error('\x1b[31mUncaught Exception:\x1b[0m', error);
  console.error('\x1b[31mServer will now exit\x1b[0m');
  process.exit(1);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, _promise) => {
  console.error('\n' + '='.repeat(80));
  console.error('\x1b[1m\x1b[31m  UNHANDLED PROMISE REJECTION\x1b[0m');
  console.error('='.repeat(80));
  console.error('\x1b[31mUnhandled Promise Rejection:\x1b[0m', reason);
  // We don't exit here to allow the server to continue running
});

// Export the server for testing
export default server;
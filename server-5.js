#!/usr/bin/env node

/**
 * Script de inicialização do servidor Next.js
 * Garante que o servidor sempre inicie na porta 3000
 */

const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;

console.log(`🚀 Iniciando servidor Next.js na porta ${PORT}...`);

// Inicia o servidor Next.js com a porta especificada
const nextProcess = spawn('next', ['dev', '-p', PORT.toString()], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PORT: PORT.toString(),
  }
});

nextProcess.on('error', (error) => {
  console.error('❌ Erro ao iniciar o servidor:', error);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Servidor encerrado com código ${code}`);
    process.exit(code);
  }
});

// Tratamento de sinais para encerramento gracioso
process.on('SIGINT', () => {
  console.log('\n⏹️  Encerrando servidor...');
  nextProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n⏹️  Encerrando servidor...');
  nextProcess.kill('SIGTERM');
  process.exit(0);
});

console.log(`✅ Servidor configurado para escutar na porta ${PORT}`);
console.log(`🌐 Acesse: http://localhost:${PORT}`);

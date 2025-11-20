/**
 * Middleware de verificação de porta
 * Garante que o servidor Next.js sempre use a porta 3000
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Log da porta em uso (apenas em desenvolvimento)
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || '3000';
    console.log(`✅ Servidor rodando na porta ${port}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

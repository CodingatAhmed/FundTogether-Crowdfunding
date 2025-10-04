// src/utils/pkceFunctions.ts (for Node.js)

import { randomBytes, createHash } from 'crypto';

function base64urlEncode(buffer: Buffer): string {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function generatePKCE(): { code_verifier: string; code_challenge: string } {
  const code_verifier = base64urlEncode(randomBytes(32));
  const hash = createHash('sha256').update(code_verifier).digest();
  const code_challenge = base64urlEncode(hash);
  return { code_verifier, code_challenge };
}

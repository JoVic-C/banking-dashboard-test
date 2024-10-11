import { v4 as uuidv4 } from 'uuid';

export function generateE2EId(): string {
  const e2eId = uuidv4();
  return `E2E${e2eId.replace(/-/g, '').toUpperCase()}`;
}

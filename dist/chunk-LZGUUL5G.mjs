// src/utils/generate-e2eID.ts
import { v4 as uuidv4 } from "uuid";
function generateE2EId() {
  const e2eId = uuidv4();
  return `E2E${e2eId.replace(/-/g, "").toUpperCase()}`;
}

export {
  generateE2EId
};

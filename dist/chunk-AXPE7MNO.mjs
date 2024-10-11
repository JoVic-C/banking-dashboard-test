import {
  prisma
} from "./chunk-4C7UQITC.mjs";

// src/services/billet.ts
var addBillet = async (data) => {
  const newBillet = await prisma.billet.create({
    data
  });
  return newBillet;
};

export {
  addBillet
};

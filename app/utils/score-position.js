const developer = { namePosition: 'Developer', min: 0, max: 5 };
const lead = { namePosition: 'Lead', min: 5, max: 10 };
const tl = { namePosition: 'TL', min: 10, max: 20 };
const em = { namePosition: 'EM', min: 20, max: 30 };
const head = { namePosition: 'HEAD', min: 30, max: 50 };
const ceo = { namePosition: 'CEO', min: 50, max: Infinity };

const positions = [developer, lead, tl, em, head, ceo];

module.exports = { positions };

const scavCalculationSameTime = (units, options, period = 60) => {
  const unitHaul = {
    spear: 25,
    sword: 15,
    axe: 10,
    archer: 10,
    light: 80,
    marcher: 50,
    heavy: 50,
  };
  const scavOptions = {
    lazy: options.lazy.checked,
    humble: options.humble.checked,
    clever: options.clever.checked,
    great: options.great.checked,
  };
  const details = {
    lootFactor: { lazy: 0.1, humble: 0.25, clever: 0.5, great: 0.75 },
    durExp: 0.45, //duration exponent
    durInit: 1800, //initial duration in seconds
    durFactor: 1, //duration factor HU61
  };

  let result = calcOptions(units, unitHaul, scavOptions, details, period);

  return result;
};

export default scavCalculationSameTime;

//get unit numbers from units obj parameter
//sum multiplicated values by unit haul

const totalCapacity = (unitHaul, units) => {
  const haulArr = Object.values(unitHaul);
  const unitArr = Object.values(units);
  let haulByUnits = [];
  let sumHaul = 0;
  for (let i = 0; i <= haulArr.length - 1; i++) {
    let unitNum = 0;
    if (unitArr[i] !== "") unitNum = unitArr[i];
    haulByUnits.push(unitNum * haulArr[i]);
    sumHaul += unitNum * haulArr[i];
  }

  return { haulByUnits, sumHaul }; // array of total haul by units, total haul
};

//gives the possible options
const genScavOptions = (scavOptions, lootFactor) => {
  let options = {};
  const { lazy: opt1, humble: opt2, clever: opt3, great: opt4 } = scavOptions;
  const { lazy: lf1, humble: lf2, clever: lf3, great: lf4 } = lootFactor;

  if (opt1 === true) {
    options = { 1: { share: { 1: 1 }, lf: { 1: lf1 } } };
    if (opt2 === true) {
      options = {
        ...options,
        2: {
          share: { 2: 1 },
          lf: { 2: lf2 },
        },
        12: { share: { 1: 2.5 / 3.5, 2: 1 / 3.5 }, lf: { 1: lf1, 2: lf2 } },
      };
      if (opt3 === true) {
        options = {
          ...options,
          3: { share: { 3: 1 }, lf: { 3: lf3 } },
          23: { share: { 2: 2 / 3, 3: 1 / 3 }, lf: { 2: lf2, 3: lf3 } },
          123: { share: { 1: 5 / 8, 2: 2 / 8, 3: 1 / 8 }, lf: { 1: lf1, 2: lf2, 3: lf3 } },
        };
        if (opt4 === true) {
          options = {
            ...options,
            4: { share: { 4: 1 }, lf: { 4: lf4 } },
            34: { share: { 3: 1.5 / 2.5, 4: 1 / 2.5 }, lf: { 3: lf3, 4: lf4 } },
            234: {
              share: { 2: 3 / 5.5, 3: 1.5 / 5.5, 4: 1 / 5.5 },
              lf: { 2: lf2, 3: lf3, 4: lf4 },
            },
            1234: {
              share: { 1: 7.5 / 13, 2: 3 / 13, 3: 1.5 / 13, 4: 1 / 13 },
              lf: { 1: lf1, 2: lf2, 3: lf3, 4: lf4 },
            },
          };
        }
      }
    }
  }

  return options;
};

const calcEfficiency = (capacity, details, durExp, durInit, durFactor, period) => {
  if (capacity === 0) return 0;
  //details object contains 2 object share (haul of options) and lf(loot factor of options)
  let result = {};
  let maxTime = 0;
  let loot = 0;
  Object.keys(details["lf"]).map((key) => {
    const { share, lf } = details;
    //calculate max duration
    let timeSec =
      (Math.pow(Math.pow(lf[key] * (capacity * share[key]), 2) * 100, durExp) + durInit) *
      durFactor;
    if (timeSec > maxTime) maxTime = timeSec;
    //calculate loot
    loot += capacity * share[key] * lf[key];
  });
  //calculate efficiency, time periods are sec(1), min(60), hour(3600)
  let tPeriod = maxTime / period;
  result = { efficiency: loot / tPeriod, loot, time: tPeriod };
  return result;
};
// calculate unit share per options
const unitShare = (share, units, unitHaul) => {
  let result = {};
  const unitNo = Object.entries(units);
  Object.keys(share).map((key) => {
    let unitShare = {};
    let maxHaul = 0;
    for (const [entry, value] of unitNo) {
      let un = Number((value * share[key]).toFixed(0));
      maxHaul = maxHaul + un * unitHaul[entry];
      unitShare = { ...unitShare, [entry]: Number((value * share[key]).toFixed(0)) };
    }

    result = { ...result, [key]: { unitShare, maxHaul } };
  });

  return result;
};

const calcOptions = (units, unitHaul, scavOptions, details, period) => {
  const { lootFactor, durExp, durInit, durFactor } = details;
  const options = genScavOptions(scavOptions, lootFactor);
  const { sumHaul: totalCap } = totalCapacity(unitHaul, units);
  // calculate loot/time by options
  const entries = Object.entries(options);
  let optValues = [];
  let bestEff = 0;
  let bestOpt = 0;
  for (const [entry, value] of entries) {
    let result = {
      opt: entry,
      res: calcEfficiency(totalCap, value, durExp, durInit, durFactor, period),
      unShare: unitShare(value.share, units, unitHaul),
    };
    if (result.res.efficiency > bestEff) {
      bestEff = result.res.efficiency;
      bestOpt = entry;
    }
    optValues = [...optValues, result];
  }

  return { optValues, bestOpt };
};

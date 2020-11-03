import { init, RXPUnit } from "rxp";

// Update Instructions
// provide instructions on how to update the current RXP Unit
// these can be stored so the Unit can be reconstructed if
// earlier arguments need to be changed

///
///
///
// init needed? place in history or elsewhere?
class InitUpdate {
  RXPMethod: "init";
  textArgs: (string | RegExp | RXPUnit)[];
  constructor(textArgs: (string | RegExp | RXPUnit)[]) {
    this.RXPMethod = "init";
    this.textArgs = textArgs;
  }
}
//
//
//

type RXPTextKeys =
  | "or"
  | "followedBy"
  | "notFollowedBy"
  | "precededBy"
  | "notPrecededBy";

class TextUpdate {
  RXPMethod: RXPTextKeys;
  textArgs: (string | RegExp | RXPUnit)[];

  constructor(RXPMethod: RXPTextKeys, textArgs: (string | RegExp | RXPUnit)[]) {
    this.textArgs = textArgs;
    this.RXPMethod = RXPMethod;
  }
}

class VariableUpdate {
  RXPMethod: "isVariable";
  variableName: string;

  constructor(variableName: string) {
    this.variableName = variableName;
    this.RXPMethod = "isVariable";
  }
}

type RXPFrequencyKeys = "occurs" | "occursAtLeast";

class FrequencyUpdate {
  RXPMethod: RXPFrequencyKeys;
  firstDigit: number;

  constructor(RXPMethod: RXPFrequencyKeys, firstDigit: number) {
    this.RXPMethod = RXPMethod;
    this.firstDigit = firstDigit;
  }
}

type RXPRangeKey = "occursBetween";

class RangeUpdate {
  RXPMethod: RXPRangeKey;
  firstDigit: number;
  secondDigit: number;
  constructor(RXPMethod: RXPRangeKey, firstDigit: number, secondDigit: number) {
    this.RXPMethod = RXPMethod;
    this.firstDigit = firstDigit;
    this.secondDigit = secondDigit;
  }
}

type RXPGetterKeys =
  | "occursOnceOrMore"
  | "occursZeroOrMore"
  | "greedyOnceOrMore"
  | "greedyZeroOrMore"
  | "atStart"
  | "atEnd"
  | "isOptional"
  | "isCaptured";

class GetterUpdate {
  RXPMethod: RXPGetterKeys;
  constructor(RXPMethod: RXPGetterKeys) {
    this.RXPMethod = RXPMethod;
  }
}

// union of all possible update types that can be received
type UpdateInstructions =
  | GetterUpdate
  | VariableUpdate
  | RangeUpdate
  | FrequencyUpdate
  | TextUpdate;

// receive an update, and apply arguments based on the class of the update object
// returns an RXP Unit (not regex), which is then turned into an updateResult object
// that grabs the available keys at that stage of the constructor
// along with transforming the RXP Unit into regex
// this allows us to get the available next steps while not having to map out
// all the possible pathways of the constructor within the update reducer function

// these steps may be mapped out later to improve performance
const applyUpdate = (
  currentRXP: RegExp,
  update: UpdateInstructions | UpdateResult
): RXPUnit => {
  const newRXP = init(currentRXP);
  const updatePath =
    update instanceof UpdateResult ? update.instructions : update;
  if (updatePath instanceof TextUpdate) {
    return newRXP[updatePath.RXPMethod](
      updatePath.textArgs[0],
      ...updatePath.textArgs.slice(1)
    ); // correct?
  } else if (updatePath instanceof FrequencyUpdate) {
    return newRXP[updatePath.RXPMethod](updatePath.firstDigit);
  } else if (updatePath instanceof RangeUpdate) {
    return newRXP.occursBetween(updatePath.firstDigit, updatePath.secondDigit);
  } else if (updatePath instanceof VariableUpdate) {
    const { variableName } = updatePath;
    return variableName ? newRXP.isVariable(variableName) : newRXP.isVariable();
  } else if (updatePath instanceof GetterUpdate) {
    if (updatePath.RXPMethod === "greedyOnceOrMore") {
      return newRXP.occursOnceOrMore.and.isGreedy;
    } else if (updatePath.RXPMethod === "greedyZeroOrMore") {
      return newRXP.occursZeroOrMore.and.isGreedy;
    } else {
      return newRXP[updatePath.RXPMethod];
    }
  } else {
    throw new Error("Incorrect update object applied");
  }
};

//store update result with instructions for both caching and recalcing if needed
class UpdateResult {
  regex: RegExp;
  availableKeys: string[]; //change to string literals later
  instructions: UpdateInstructions;
  constructor(
    newRXPUnit: RXPUnit,
    updateInstructions: UpdateInstructions,
    previousKeys: string[]
  ) {
    const RXPWithAnd = newRXPUnit.and ?? newRXPUnit;
    this.regex = newRXPUnit.construct();
    this.availableKeys = Object.keys(RXPWithAnd)
      .filter((x) => !["text", "_text", "construct", "isGreedy"].includes(x))
      .filter((x) => previousKeys.includes(x));
    this.instructions = updateInstructions;
  }
}
/*
// formats update info after new RXP Unit has been calculated
// how can it recalc update without args????
class RXPUpdate {
    RXPMethod: string;
    availableKeys: string[];
    resultingRegex: RegExp;
    constructor(RXPMethod: string, currentRXPUnit: RXPUnit, lastUpdate: RXPUpdate) {
        const RXPWithAnd = currentRXPUnit.and ?? currentRXPUnit;

        this.RXPMethod = RXPMethod;
        this.availableKeys = Object.keys(RXPWithAnd).filter(x => !(["text", "_text", "construct", "isGreedy"].includes(x))).filter(x => lastUpdate.availableKeys.includes(x));// change
        this.resultingRegex = currentRXPUnit.construct();//change
    }
}*/
class RXPStoreUnit {
  name: string;
  ID: number;
  currentRegex: RegExp;
  updateHistory: UpdateResult[];
  currentKeys: string[];
  constructor(name: string, ID: number, updateHistory: UpdateResult[]) {
    const mostRecentUpdate = updateHistory[updateHistory.length - 1];

    this.name = name;
    this.ID = ID;
    this.currentRegex = mostRecentUpdate.regex; //store init for start
    this.updateHistory = updateHistory;
    this.currentKeys = mostRecentUpdate.availableKeys;
  }
  removeUpdate() {
    const newUpdateHistory = this.updateHistory.slice(
      0,
      this.updateHistory.length - 1
    ); //
    return new RXPStoreUnit(this.name, this.ID, newUpdateHistory);
  }
  addUpdate(newUpdate: UpdateResult) {
    const newUpdateHistory = [...this.updateHistory, newUpdate];
    return new RXPStoreUnit(this.name, this.ID, newUpdateHistory);
  }
  reconstruct(newUpdate: UpdateResult, injectionPoint: number) {
    // replace old update with new one
    const presentHistory = [
      ...this.updateHistory.slice(0, injectionPoint),
      newUpdate,
    ];
    const futureUpdates = this.updateHistory.slice(injectionPoint + 1);

    return futureUpdates.reduce((currentStoreUnit, update) => {
      const refreshedUpdate = applyUpdate(
        currentStoreUnit.currentRegex,
        update
      );
      const updateResult = new UpdateResult(
        refreshedUpdate,
        update.instructions,
        currentStoreUnit.currentKeys
      );
      return currentStoreUnit.addUpdate(updateResult);
    }, new RXPStoreUnit(this.name, this.ID, presentHistory));
    // separate future updates into new array
    // use reducer to apply each future update and pass the
    // resulting regex along until the final new storeRXP
    // is produced
    // return that store RXP
  }
}

// will store in useState, need to find index of current storeRXP and slice it in when setting state

// data flow
// onClick, format update instructions, send those to applyUpdate, use result
// to create UpdateResult with new regex and keys, use addUpdate to add
// new result, find index of rxp store unit, slice it in, and reset state

// provide the current RXPStoreUnit and intended update
// and return a new RXPStoreUnit with update applied and history saved
const getUpdatedRXPStoreUnit = (
  storeUnit: RXPStoreUnit,
  update: UpdateInstructions
) =>
  storeUnit.addUpdate(
    new UpdateResult(
      applyUpdate(storeUnit.currentRegex, update),
      update,
      storeUnit.currentKeys
    )
  );

const replaceRXPStoreUnit = (
  RXPStore: RXPStoreUnit[],
  replacementRXP: RXPStoreUnit
) => {
  const replaceIndex = RXPStore.findIndex((x) => x.ID === replacementRXP.ID);
  return [
    ...RXPStore.slice(0, replaceIndex),
    replacementRXP,
    ...RXPStore.slice(replaceIndex + 1),
  ];
};

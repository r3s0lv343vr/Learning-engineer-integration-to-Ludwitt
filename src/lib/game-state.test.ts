import { describe, expect, it } from "vitest";
import {
  applyAnswer,
  createInitialState,
  completeModule,
  applySidequestResult,
} from "./game-state";

describe("game-state", () => {
  it("starts with 5 hearts and $14800", () => {
    const s = createInitialState({ userId: "u1" });
    expect(s.hearts).toBe(5);
    expect(s.cash).toBe(14800);
  });

  it("awards a heart every 5 correct answers", () => {
    let s = createInitialState({ userId: "u1" });
    s = { ...s, hearts: 3 };
    for (let i = 0; i < 5; i++) {
      s = applyAnswer(s, { questionId: `q${i}`, correct: true });
    }
    expect(s.hearts).toBe(4);
    expect(s.goldBars).toBe(1);
  });

  it("loses a heart after 4 wrong in a row and can enter detention", () => {
    let s = createInitialState({ userId: "u1" });
    s = { ...s, hearts: 1 };
    for (let i = 0; i < 4; i++) {
      s = applyAnswer(s, { questionId: `w${i}`, correct: false });
    }
    expect(s.hearts).toBe(0);
    expect(s.inDetention).toBe(true);
  });

  it("completes modules and unlocks the next", () => {
    let s = createInitialState({ userId: "u1" });
    s = completeModule(s, "m1");
    expect(s.completedModules).toContain("m1");
    expect(s.unlockedModules).toContain("m2");
  });

  it("opens a wealth chest for gold bars", () => {
    let s = createInitialState({ userId: "u1" });
    s = applySidequestResult(s, {
      sidequestId: "sq-chest-10",
      success: true,
      capitalDelta: 1000,
      chestGold: 10,
    });
    expect(s.goldBars).toBe(10);
    expect(s.completedSidequests).toContain("sq-chest-10");
  });
});

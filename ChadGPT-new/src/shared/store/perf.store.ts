import { Circuit, ClassicPerf } from "#modules/Seance/domain/perf.types";
import { atom } from "jotai";

export const classicPerfAtom = atom<ClassicPerf | null>(null);

export const circuitSetAtom = atom<Circuit | null>(null);

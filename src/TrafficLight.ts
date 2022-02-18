import { createMachine } from "xstate";

type TrafficLightEvent =
  | { type: "NEXT" }
  | { type: "TURN_OFF" }
  | { type: "TURN_ON" };

type TrafficLighState =
  | { value: "green"; context: undefined }
  | { value: "yellow"; context: undefined }
  | { value: "red"; context: undefined }
  | { value: "OFF"; context: undefined };

export const trafficLightMachine = createMachine<
  undefined,
  TrafficLightEvent,
  TrafficLighState
>({
  id: "trafficLight",
  initial: "ON",
  states: {
    ON: {
      on: { TURN_OFF: "OFF" },
      initial: "red",
      states: {
        green: {
          on: { NEXT: "yellow" },
          after: {
            3500: "yellow",
          },
        },
        yellow: {
          on: { NEXT: "red" },
          after: {
            1500: "red",
          },
        },
        red: {
          on: { NEXT: "green" },
          after: {
            5000: "green",
          },
        },
      },
    },
    OFF: {
      on: { TURN_ON: "ON" },
    },
  },
});

import { Device, makeSprite, t, GameProps, DeviceSize } from "../index";

export const gameProps: GameProps = {
  id: "Game" as const,
  size: {
    portrait: {
      width: 300,
      height: 200,
      minHeightXL: 1000,
    },
    landscape: {
      width: 200,
      height: 300,
      minWidthXL: 1000,
    },
  },
};

interface TestPlatformInputs {
  buttonPressed: {
    move: boolean;
    show: boolean;
    action: boolean;
    log: boolean;
    setRandom: boolean;
    startTimer: boolean;
    setDate: boolean;
    sound: {
      play: boolean;
      playFromPosition: boolean;
      playLoop: boolean;
      pause: boolean;
      getPosition: boolean;
    };
    network: {
      get: boolean;
      post: boolean;
      put: boolean;
      delete: boolean;
    };
  };
}

function getInitTestPlatformInputs(): TestPlatformInputs {
  return {
    buttonPressed: {
      move: false,
      show: true,
      action: false,
      log: false,
      setRandom: false,
      startTimer: false,
      setDate: false,
      sound: {
        play: false,
        playFromPosition: false,
        playLoop: false,
        pause: false,
        getPosition: false,
      },
      network: {
        get: false,
        post: false,
        put: false,
        delete: false,
      },
    },
  };
}

/**
 * A test platform (instead of web, iOS etc) with mocked methods and a simple
 * input.
 */
export function getTestPlatform(customSize?: DeviceSize) {
  const audio = {
    getPosition: jest.fn(() => 50),
    play: jest.fn(),
    pause: jest.fn(),
  };
  const network = {
    get: jest.fn((url: string, callback: (data: unknown) => void) => {
      callback(`GET-${url}`);
    }),
    post: jest.fn((url, body, callback) => {
      callback(`POST-${url}-${body.data}`);
    }),
    put: jest.fn((url, body, callback) => {
      callback(`PUT-${url}-${body.data}`);
    }),
    delete: jest.fn((url, callback) => {
      callback(`DELETE-${url}`);
    }),
  };

  const mutableTestDevice: Device<TestPlatformInputs> = {
    inputs: getInitTestPlatformInputs(),
    size: customSize || {
      width: 300,
      height: 200,
      widthMargin: 0,
      heightMargin: 0,
      deviceWidth: 500,
      deviceHeight: 300,
    },
    log: jest.fn(),
    random: jest.fn(() => 0.5),
    timeout(callback) {
      callback();
    },
    now: () => new Date(Date.UTC(1995, 12, 17, 3, 24, 0)),
    audio: () => audio,
    network,
    storage: {
      getStore: jest.fn(() => ({ text1: "storage" })),
      setStore: jest.fn(),
    },
  };

  function resetInputs() {
    mutableTestDevice.inputs = getInitTestPlatformInputs();
  }

  return {
    platform: {
      getGetDevice() {
        return () => mutableTestDevice;
      },
    },
    resetInputs,
    mutableTestDevice,
  };
}

interface TestGameState {
  position: number;
}

/**
 * A simple 'game' which moves a circle across the screen if an input is
 * pressed.
 */
export const TestGame = makeSprite<
  GameProps,
  TestGameState,
  TestPlatformInputs
>({
  init() {
    return { position: 5 };
  },

  loop({ state, device }) {
    const posInc = device.inputs.buttonPressed.move ? 1 : 0;
    return { position: state.position + posInc };
  },

  render({ state }) {
    return [
      t.circle({
        position: {
          x: state.position,
          y: 50,
          rotation: 0,
        },
        radius: 10,
        color: "#0095DD",
        scaleX: 5,
        anchorY: 0,
      }),
    ];
  },
});

export const TestGameWithSprites = makeSprite<
  GameProps,
  { showSprite: boolean },
  TestPlatformInputs
>({
  init() {
    return { showSprite: true };
  },

  loop({ device }) {
    const showSprite = device.inputs.buttonPressed.show;
    return { showSprite };
  },

  render({ state }) {
    return state.showSprite
      ? [
          TestSprite({
            id: "test",
            position: {
              x: 50,
              y: 0,
              rotation: 0,
            },
            initPos: 50,
          }),
          MultipleRendersSprite({
            id: "multiple-renders",
            position: { x: 0, y: 0 },
          }),
        ]
      : [];
  },
});

interface TestSpriteProps {
  initPos: number;
}
const TestSprite = makeSprite<
  TestSpriteProps,
  TestGameState,
  TestPlatformInputs
>({
  init({ props }) {
    return { position: props.initPos };
  },
  loop({ state }) {
    return { position: state.position + 1 };
  },
  render({ state }) {
    return [
      t.circle({
        position: {
          x: state.position,
          y: 50,
          rotation: 10,
        },
        radius: 10,
        color: "#0095DD",
      }),
    ];
  },
});

const MultipleRendersSprite = makeSprite({
  render() {
    return [
      t.text({
        font: { name: "Arial", size: 12 },
        text: "this is landscape",
        color: "red",
      }),
    ];
  },
  renderP() {
    return [
      t.text({
        font: { name: "Arial", size: 12 },
        text: "this is portrait",
        color: "red",
      }),
    ];
  },
  renderXL() {
    return [
      t.text({
        font: { name: "Arial", size: 12 },
        text: "this is XL landscape",
        color: "red",
      }),
    ];
  },
  renderPXL() {
    return [
      t.text({
        font: { name: "Arial", size: 12 },
        text: "this is XL portrait",
        color: "red",
      }),
    ];
  },
});

interface FullTestGameState {
  position: number;
  testInitUpdateState?: string;
  testRenderUpdateState?: string;
  testRenderUpdateState2?: string;
  testRenderTimeout?: string;
}

/**
 * Same as 'TestGame', but with updateState and all device features
 */
export const FullTestGame = makeSprite<
  GameProps,
  FullTestGameState,
  TestPlatformInputs
>({
  init({ updateState, device }) {
    device.timeout(() => {
      updateState((state) => ({
        ...state,
        testInitUpdateState: "initialised",
      }));
    }, 100);

    return {
      position: 5,
    };
  },

  loop({ state, device, updateState }) {
    const posInc = device.inputs.buttonPressed.move ? 1 : 0;

    if (device.inputs.buttonPressed.action) {
      updateState((prevState) => ({
        ...prevState,
        testRenderUpdateState: `render time: ${device.now().toISOString()}`,
      }));
      updateState((prevState) => ({
        ...prevState,
        testRenderUpdateState2: `render time 2: ${device.now().toISOString()}`,
      }));
      device.timeout(() => {
        updateState((prevState) => ({
          ...prevState,
          testRenderTimeout: "updateState from timeout in render",
        }));
      }, 1000);
    }

    if (device.inputs.buttonPressed.log) {
      device.log("Log Message");
    }

    if (device.inputs.buttonPressed.startTimer) {
      device.timeout(() => {
        device.log("timeout complete");
      }, 100);
    }

    // Audio
    if (device.inputs.buttonPressed.sound.play) {
      device.audio("filename").play();
    }
    if (device.inputs.buttonPressed.sound.playFromPosition) {
      device.audio("filename").play(100);
    }
    if (device.inputs.buttonPressed.sound.playLoop) {
      device.audio("filename").play(0, true);
    }
    if (device.inputs.buttonPressed.sound.pause) {
      device.audio("filename").pause();
    }
    if (device.inputs.buttonPressed.sound.getPosition) {
      device.log(device.audio("filename").getPosition());
    }

    // Network
    if (device.inputs.buttonPressed.network.get) {
      device.network.get("/test", (data) => {
        device.log(data);
      });
    }
    if (device.inputs.buttonPressed.network.put) {
      device.network.put("/test", { data: "PUT_BODY" }, (data) => {
        device.log(data);
      });
    }
    if (device.inputs.buttonPressed.network.post) {
      device.network.post("/test", { data: "POST_BODY" }, (data) => {
        device.log(data);
      });
    }
    if (device.inputs.buttonPressed.network.delete) {
      device.network.delete("/test", (data) => {
        device.log(data);
      });
    }

    if (device.inputs.buttonPressed.setDate) {
      device.log(device.now().toISOString());
    }

    if (device.inputs.buttonPressed.setRandom) {
      device.log(device.random());
    }

    if (state.testInitUpdateState) {
      device.log(state.testInitUpdateState);
    }

    if (state.testRenderUpdateState) {
      device.log(state.testRenderUpdateState);
    }

    if (state.testRenderUpdateState2) {
      device.log(state.testRenderUpdateState2);
    }

    if (state.testRenderTimeout) {
      device.log(state.testRenderTimeout);
    }

    return {
      position: state.position + posInc,
    };
  },

  render({ state }) {
    return [
      t.circle({
        position: {
          x: state.position,
          y: 50,
          rotation: 0,
        },
        radius: 10,
        color: "#0095DD",
      }),
    ];
  },
});

/// -- Nested Sprite test

export const NestedSpriteGame = makeSprite<GameProps>({
  render() {
    return [
      NestedFirstSprite({
        id: "first",
        position: { x: 20, y: 20, rotation: -90 },
      }),
    ];
  },
});

const NestedFirstSprite = makeSprite({
  render() {
    return [
      NestedSecondSprite({
        id: "second",
        position: { x: 50, y: 20, rotation: -90 },
      }),
    ];
  },
});

const NestedSecondSprite = makeSprite({
  render() {
    return [
      t.text({
        text: "nested",
        color: "black",
        position: { x: 10, y: 20, rotation: 225 },
      }),
    ];
  },
});

/// -- Test local storage

interface LocalStorageGameState {
  text1?: string;
  text2?: string;
}

export const LocalStorageGame = makeSprite<
  GameProps,
  LocalStorageGameState,
  TestPlatformInputs
>({
  init({ device }) {
    const store = device.storage.getStore();
    return {
      text1: store.text1,
      text2: store.text2,
    };
  },

  loop({ device, state }) {
    device.storage.setStore({ text2: "new-val" });

    return state;
  },

  render({ state: { text1, text2 } }) {
    return [
      text1
        ? t.text({
            text: text1,
            color: "red",
          })
        : null,
      text2
        ? t.text({
            text: text2,
            color: "blue",
          })
        : null,
    ];
  },
});

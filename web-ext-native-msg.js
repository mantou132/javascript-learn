const {Setup} = require("web-ext-native-msg");

const postSetupHandler = info => {
  console.log(info);
};

const setup = new Setup({
  hostDescription: "Description of the host",
  hostName: "ping_pong2",
  mainScriptFile: "./ping_pong.js",
  chromeExtensionIds: ["chrome-extension://mnfljgpldcccpfnjajfdmdfkdamefolg"],
  webExtensionIds: ["b2afc2a9d256132f4928ac919552fbf92ade4164@temporary-addon"],
  callback: postSetupHandler,
});

setup.run();

export function getUserAgentDataHighEntropyValues() {
  return navigator.userAgentData.getHighEntropyValues([
    "architecture",
    "bitness",
    "formFactor",
    "fullVersionList",
    "model",
    "platformVersion",
    "wow64",
  ]);
}

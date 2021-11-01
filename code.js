charset = "utf-8";
src = "https://cdn.ethers.io/scripts/ethers-v4.min.js";
type = "text/javascript";

window.ethereum.enable();
var provider = new ethers.providers.Web3Provider(
  web3.currentProvider,
  "ropsten"
);
var MoodContractAddress = "0xFB933b9A9a824Bb2ca5762EF72Fc4827b8873E9B";

var MoodContractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
var MoodContract;
var signer;

provider.listAccounts().then(function (accounts) {
  signer = provider.getSigner(
    accounts[0]
  );
  MoodContract = new ethers.Contract(
    MoodContractAddress,
    MoodContractABI,
    signer
  );
});

async function getMood() {
  getMoodPromise = MoodContract.getMood();
  var Mood = await getMoodPromise;
  console.log(Mood);
  alert(Mood);
}
async function setMood() {
  var newMood = prompt("What is your mood?");
  let mood = document.getElementById("mood");
  setMoodPromise = MoodContract.setMood(newMood);
  await setMoodPromise;
}

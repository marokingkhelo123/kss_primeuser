import { useState, useEffect, useRef } from "react";
import backgroundImage from "../assets/images/0_background_and_logo/bg_main@2x.jpg";
import logo from "../assets/images/3_landing/navbar/logo_kss@2x.png";
import infoIcon from "../assets/images/3_landing/navbar/ico_info-popup@2x.png";
import timerIcon from "../assets/images/3_landing/navbar/img_timer@2x.png";
import userIcon from "../assets/images/3_landing/navbar/ico-user@2x.png";
import claimIcon from "../assets/images/3_landing/navbar/ico-claim@2x.png";
import balanceIcon from "../assets/images/3_landing/navbar/ico-balance@2x.png";
import closeIcon from "../assets/images/3_landing/navbar/ico-close@2x.png";
import loginExitSound from "../assets/sounds/login&exit.mp3";
import betAmtSound from "../assets/sounds/bet-amt.mp3";
import allBtnSound from "../assets/sounds/all-btn.mp3";
import slotMachineSound from "../assets/sounds/slot-machine.mp3";
import winResultSound from "../assets/sounds/win-result.mp3";
import betCoinBg from "../assets/images/3_landing/coins section/bet-coin-bg@2x.png";
import betCoin10 from "../assets/images/3_landing/coins section/bet-coin10@2x.png";
import betCoin20 from "../assets/images/3_landing/coins section/bet-coin20@2x.png";
import betCoin50 from "../assets/images/3_landing/coins section/bet-coin50@2x.png";
import betCoin100 from "../assets/images/3_landing/coins section/bet-coin100@2x.png";
import betCoin500 from "../assets/images/3_landing/coins section/bet-coin500@2x.png";
import betCoin1000 from "../assets/images/3_landing/coins section/bet-coin1000@2x.png";
import betButton from "../assets/images/3_landing/betting buttons/img-button@2x.png";
import playAndWin from "../assets/images/3_landing/play and win/img_play&win@2x.png";
import slotMachineImg from "../assets/images/3_landing/slotmachine/img_slot-machin@2x.png";
import bettingFrame from "../assets/images/3_landing/betting area/img_frame@2x.png";
import betNum1 from "../assets/images/3_landing/betting area/bet-num1@2x.png";
import betNum2 from "../assets/images/3_landing/betting area/bet-num2@2x.png";
import betNum3 from "../assets/images/3_landing/betting area/bet-num3@2x.png";
import betNum4 from "../assets/images/3_landing/betting area/bet-num4@2x.png";
import betNum5 from "../assets/images/3_landing/betting area/bet-num5@2x.png";
import betNum6 from "../assets/images/3_landing/betting area/bet-num6@2x.png";
import betNum7 from "../assets/images/3_landing/betting area/bet-num7@2x.png";
import betNum8 from "../assets/images/3_landing/betting area/bet-num8@2x.png";
import betNum9 from "../assets/images/3_landing/betting area/bet-num9@2x.png";
import betNum10 from "../assets/images/3_landing/betting area/bet-num10@2x.png";
import betNum11 from "../assets/images/3_landing/betting area/bet-num11@2x.png";
import betNum12 from "../assets/images/3_landing/betting area/bet-num12@2x.png";
// Arrow icons for betting area
import arrowUp from "../assets/images/3_landing/betting area/ico_arrow-up@2x.png";
import arrowLeft from "../assets/images/3_landing/betting area/ico_arrow-left@2x.png";
// Draw table icons
import drawIcon1 from "../assets/images/3_landing/draw_table/icon-result1_umbrella@2x.png";
import drawIcon2 from "../assets/images/3_landing/draw_table/icon-result2_ball@2x.png";
import drawIcon3 from "../assets/images/3_landing/draw_table/icon-result3_sun@2x.png";
import drawIcon4 from "../assets/images/3_landing/draw_table/icon-result4_diva@2x.png";
import drawIcon5 from "../assets/images/3_landing/draw_table/icon-result5_cow@2x.png";
import drawIcon6 from "../assets/images/3_landing/draw_table/icon-result6_bucket@2x.png";
import drawIcon7 from "../assets/images/3_landing/draw_table/icon-result7_kite@2x.png";
import drawIcon8 from "../assets/images/3_landing/draw_table/icon-result8_bhovara@2x.png";
import drawIcon9 from "../assets/images/3_landing/draw_table/icon-result9_rose@2x.png";
import drawIcon10 from "../assets/images/3_landing/draw_table/icon-result10_butterfly@2x.png";
import drawIcon11 from "../assets/images/3_landing/draw_table/icon-result11_kabutar@2x.png";
import drawIcon12 from "../assets/images/3_landing/draw_table/icon-result12_rabbit@2x.png";
// Slot machine images - Picture and Number (linked)
import picSm1 from "../assets/images/3_landing/slotmachine/pic_sm1@2x.png";
import picSm2 from "../assets/images/3_landing/slotmachine/pic_sm2@2x.png";
import picSm3 from "../assets/images/3_landing/slotmachine/pic_sm3@2x.png";
import picSm4 from "../assets/images/3_landing/slotmachine/pic_sm4@2x.png";
import picSm5 from "../assets/images/3_landing/slotmachine/pic_sm5@2x.png";
import picSm6 from "../assets/images/3_landing/slotmachine/pic_sm6@2x.png";
import picSm7 from "../assets/images/3_landing/slotmachine/pic_sm7@2x.png";
import picSm8 from "../assets/images/3_landing/slotmachine/pic_sm8@2x.png";
import picSm9 from "../assets/images/3_landing/slotmachine/pic_sm9@2x.png";
import picSm10 from "../assets/images/3_landing/slotmachine/pic_sm10@2x.png";
import picSm11 from "../assets/images/3_landing/slotmachine/pic_sm11@2x.png";
import picSm12 from "../assets/images/3_landing/slotmachine/pic_sm12@2x.png";
import numSm1 from "../assets/images/3_landing/slotmachine/num_sm1@2x.png";
import numSm2 from "../assets/images/3_landing/slotmachine/num_sm2@2x.png";
import numSm3 from "../assets/images/3_landing/slotmachine/num_sm3@2x.png";
import numSm4 from "../assets/images/3_landing/slotmachine/num_sm4@2x.png";
import numSm5 from "../assets/images/3_landing/slotmachine/num_sm5@2x.png";
import numSm6 from "../assets/images/3_landing/slotmachine/num_sm6@2x.png";
import numSm7 from "../assets/images/3_landing/slotmachine/num_sm7@2x.png";
import numSm8 from "../assets/images/3_landing/slotmachine/num_sm8@2x.png";
import numSm9 from "../assets/images/3_landing/slotmachine/num_sm9@2x.png";
import numSm10 from "../assets/images/3_landing/slotmachine/num_sm10@2x.png";
import numSm11 from "../assets/images/3_landing/slotmachine/num_sm11@2x.png";
import numSm12 from "../assets/images/3_landing/slotmachine/num_sm12@2x.png";
// Slot machine win images
import win1x from "../assets/images/3_landing/slotmachine/win_1x@2x.png";
import win2x from "../assets/images/3_landing/slotmachine/win_2x@2x.png";
import win3x from "../assets/images/3_landing/slotmachine/win_3x@2x.png";
import win4x from "../assets/images/3_landing/slotmachine/win_4x@2x.png";
import win5x from "../assets/images/3_landing/slotmachine/win_5x@2x.png";
import win6x from "../assets/images/3_landing/slotmachine/win_6x@2x.png";
import win7x from "../assets/images/3_landing/slotmachine/win_7x@2x.png";
import win8x from "../assets/images/3_landing/slotmachine/win_8x@2x.png";
import win9x from "../assets/images/3_landing/slotmachine/win_9x@2x.png";
import { api } from "../utils/api";
import toast from "react-hot-toast";
import Receipt from "../components/Receipt";
import AttentionPopup from "../components/AttentionPopup";
import CongratulationsPopup from "../components/CongratulationsPopup";
import OopsPopup from "../components/OopsPopup";
import SlotMachine from "../components/SlotMachine";
import InformationPopup from "../components/InformationPopup";

const Landing = ({ onLogout, onShowMyAccount }) => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [countdown, setCountdown] = useState("00:00");
  const [latestGames, setLatestGames] = useState([]);
  const [runningGameTime, setRunningGameTime] = useState("");
  const [betValues, setBetValues] = useState({
    bet1: "",
    bet2: "",
    bet3: "",
    bet4: "",
    bet5: "",
    bet6: "",
    bet7: "",
    bet8: "",
    bet9: "",
    bet10: "",
    bet11: "",
    bet12: "",
  });
  const [selectedBettingNumber, setSelectedBettingNumber] = useState([]); // Array to support multiple number selections (1-12)
  const [shouldClearNumbersOnNextSelect, setShouldClearNumbersOnNextSelect] = useState(false); // Clear previous selection after placing a bet
  const [selectedButton, setSelectedButton] = useState([]); // Array to support multiple button selections: 'red', 'black', 'odd', 'even', 'arrow1-7'
  const [lastBetValues, setLastBetValues] = useState(null); // Store last bet values for REPEAT functionality
  const [isBettingDisabled, setIsBettingDisabled] = useState(false); // Track if betting is disabled (last 20 seconds)
  const [isBettingInProgress, setIsBettingInProgress] = useState(false); // Track if bet request is in progress
  const [remainingSeconds, setRemainingSeconds] = useState(0); // Track remaining seconds for countdown
  const [infoData, setInfoData] = useState([]); // Information popup data from backend
  const [isInfoLoading, setIsInfoLoading] = useState(false); // Loading state for information popup
  const [totalBetPlacedInRound, setTotalBetPlacedInRound] = useState(0); // Track total bet placed in current round
  const [winAmount, setWinAmount] = useState(0); // Track win amount from game result
  const [showReceipt, setShowReceipt] = useState(false); // Show receipt popup
  const [receiptData, setReceiptData] = useState(null); // Receipt data from backend
  // Claim barcode checking states
  const [showClaimInput, setShowClaimInput] = useState(true); // Control input visibility
  const [claimBarcode, setClaimBarcode] = useState(""); // Store the input value
  const [isCheckingClaim, setIsCheckingClaim] = useState(false); // Loading state
  const [showAttentionPopup, setShowAttentionPopup] = useState(false); // AttentionPopup visibility
  const [showCongratulationsPopup, setShowCongratulationsPopup] = useState(false); // CongratulationsPopup visibility
  const [showOopsPopup, setShowOopsPopup] = useState(false); // OopsPopup visibility
  const [claimMessage, setClaimMessage] = useState(""); // Popup message
  const [claimCoins, setClaimCoins] = useState(0); // Winning amount
  const countdownIntervalRef = useRef(null);
  const lastGameIdRef = useRef(null); // Track last game ID to detect new games
  const lastFetchTimeRef = useRef(null); // Track last fetch time to throttle API calls
  const slotMachineTimeoutsRef = useRef([]); // Track timeouts to clear them
  const winnerPollingIntervalRef = useRef(null); // Track winner polling interval (deprecated, kept for cleanup)
  const lastWinnerGameIdRef = useRef(null); // Track game ID where winner was found
  const slotMachineAudioRef = useRef(null); // Track slot machine audio to stop it when needed
  const hasPlayedSlotSoundRef = useRef(false); // Track if slot sound played this round
  const winnerDataRef = useRef(null); // Store winner data when received from API
  const isApiCallInProgressRef = useRef(false); // Track if API call is in progress
  const apiCallTimeoutRef = useRef(null); // Track timeout for sequential API calls
  const hasMadeFirstApiCallRef = useRef(false); // Track if first API call at 5 seconds has been made
  const claimInputRef = useRef(null); // Ref for claim barcode input field
  const barcodeBufferRef = useRef(""); // Buffer to accumulate barcode characters
  const lastBarcodeKeyTimeRef = useRef(0); // Track timing between keystrokes for barcode detection
  const claimCheckRef = useRef(null); // Always point to latest handleClaimCheck for dev simulations
  const claimCheckInProgressRef = useRef(false); // Prevent double submit (barcode scanner firing twice)
  const lastClaimedBarcodeRef = useRef(""); // Cooldown: last submitted barcode
  const lastClaimTimeRef = useRef(0); // Cooldown: time of last submit (ms)
  const CLAIM_COOLDOWN_MS = 2000; // Ignore same barcode for 2s after submit

  const isEditableElement = (element) => {
    if (!element) return false;
    const tag = element.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || element.isContentEditable;
  };

  const shouldRefocusClaimInput = () => {
    const activeElement = document.activeElement;
    if (!activeElement) return true;
    if (activeElement === claimInputRef.current) return true;
    if (isEditableElement(activeElement)) return false;
    return true;
  };

  // Slot machine image arrays
  const picSmImages = [
    picSm1,
    picSm2,
    picSm3,
    picSm4,
    picSm5,
    picSm6,
    picSm7,
    picSm8,
    picSm9,
    picSm10,
    picSm11,
    picSm12,
  ];
  const numSmImages = [
    numSm1,
    numSm2,
    numSm3,
    numSm4,
    numSm5,
    numSm6,
    numSm7,
    numSm8,
    numSm9,
    numSm10,
    numSm11,
    numSm12,
  ];
  const winImages = [
    win1x,
    win2x,
    win3x,
    win4x,
    win5x,
    win6x,
    win7x,
    win8x,
    win9x,
  ];

  // Slot machine animation state
  const [slotMachineState, setSlotMachineState] = useState({
    pictureReel: { currentIndex: 0, isSpinning: true, targetIndex: null },
    numberReel: { currentIndex: 0, isSpinning: true, targetIndex: null },
    multiplierReel: { currentIndex: 0, isSpinning: true, targetIndex: null },
  });

  // Helper function to convert string winning number to numeric value
  const convertWinningNumberToNumeric = (winningNumber) => {
    if (!winningNumber) return null;

    const numberMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
    };

    const lowerCase = winningNumber.toLowerCase();
    return numberMap[lowerCase] || null;
  };

  // Helper function to map betting image number (1-12) to betValues key
  const getBettingKey = (bettingNumber) => {
    const mapping = {
      1: "bet1",
      2: "bet2",
      3: "bet3",
      4: "bet4",
      5: "bet5",
      6: "bet6",
      7: "bet7",
      8: "bet8",
      9: "bet9",
      10: "bet10",
      11: "bet11",
      12: "bet12",
    };
    return mapping[bettingNumber] || null;
  };

  const MAX_BET_VALUE = 9990;
  const MAX_BET_INPUT_LENGTH = 4;

  // Mapping of button selections to bet keys
  const buttonBetMapping = {
    red: ["bet1", "bet2", "bet5", "bet6", "bet9", "bet10"],
    black: ["bet3", "bet4", "bet7", "bet8", "bet11", "bet12"],
    odd: ["bet1", "bet3", "bet5", "bet7", "bet9", "bet11"],
    even: ["bet2", "bet4", "bet6", "bet8", "bet10", "bet12"],
    arrow1: ["bet1", "bet2", "bet3", "bet4"],
    arrow2: ["bet5", "bet6", "bet7", "bet8"],
    arrow3: ["bet9", "bet10", "bet11", "bet12"],
    arrow4: ["bet1", "bet5", "bet9"],
    arrow5: ["bet2", "bet6", "bet10"],
    arrow6: ["bet3", "bet7", "bet11"],
    arrow7: ["bet4", "bet8", "bet12"],
  };

  // Helper function to add coin value to bet keys
  const addCoinToBets = (betKeys, coinValue) => {
    const updatedBetValues = { ...betValues };
    let hasExceededMax = false;
    betKeys.forEach((betKey) => {
      const currentValue = updatedBetValues[betKey] || "";
      const currentNumber = currentValue === "" ? 0 : Number(currentValue);
      const nextValue = currentNumber + coinValue;
      if (nextValue > MAX_BET_VALUE) {
        if (!hasExceededMax) {
          toast.error("Max bet limit is 9990 only.");
          hasExceededMax = true;
        }
        updatedBetValues[betKey] = MAX_BET_VALUE.toString();
        return;
      }
      updatedBetValues[betKey] = nextValue.toString();
    });
    setBetValues(updatedBetValues);
  };

  // Helper function to clear all selections
  const clearAllSelections = () => {
    setSelectedBettingNumber([]);
    setSelectedButton([]);
  };

  // Helper function to store winner data and prepare for progressive display
  const storeWinnerData = (winningNumber, winningMultiplier, gameId) => {
    const winningNumberNumeric = convertWinningNumberToNumeric(winningNumber);
    const pictureIndex = winningNumberNumeric ? winningNumberNumeric - 1 : 0;
    const numberIndex = winningNumberNumeric ? winningNumberNumeric - 1 : 0;
    const multiplierIndex = Math.min(Math.max(winningMultiplier - 1, 0), 8);

    winnerDataRef.current = {
      pictureIndex,
      numberIndex,
      multiplierIndex,
      gameId,
    };

    // Mark this game as having a winner
    if (gameId) {
      lastWinnerGameIdRef.current = gameId;
    }
  };

  // Helper function to progressively display winner in last 3 seconds
  const displayProgressiveWinner = (seconds) => {
    if (!winnerDataRef.current) return;

    const { pictureIndex, numberIndex, multiplierIndex } = winnerDataRef.current;

    if (seconds === 3) {
      // Show first value (picture reel) at 3rd second - stop picture reel, keep others spinning
      setSlotMachineState((prev) => ({
        pictureReel: { currentIndex: pictureIndex, isSpinning: false, targetIndex: pictureIndex },
        numberReel: { ...prev.numberReel, isSpinning: true, targetIndex: null },
        multiplierReel: { ...prev.multiplierReel, isSpinning: true, targetIndex: null },
      }));
    } else if (seconds === 2) {
      // Show second value (number reel) at 2nd second - stop number reel, keep multiplier spinning
      setSlotMachineState((prev) => ({
        pictureReel: { ...prev.pictureReel, isSpinning: false, targetIndex: pictureIndex },
        numberReel: { currentIndex: numberIndex, isSpinning: false, targetIndex: numberIndex },
        multiplierReel: { ...prev.multiplierReel, isSpinning: true, targetIndex: null },
      }));
      // Play win result sound starting at last 2 seconds
      playWinResultSound();
    } else if (seconds === 1) {
      // Show last value (multiplier reel) at 1st second - stop all reels
      setSlotMachineState({
        pictureReel: { currentIndex: pictureIndex, isSpinning: false, targetIndex: pictureIndex },
        numberReel: { currentIndex: numberIndex, isSpinning: false, targetIndex: numberIndex },
        multiplierReel: { currentIndex: multiplierIndex, isSpinning: false, targetIndex: multiplierIndex },
      });
      // Stop spinning sound when all reels have stopped
    }
  };

  // Helper function to animate slot machine to winning result (legacy function, kept for compatibility)
  const animateSlotMachineToResult = (winningNumber, winningMultiplier, isFromPolling = false, gameId = null) => {
    const winningNumberNumeric = convertWinningNumberToNumeric(winningNumber);
    const pictureIndex = winningNumberNumeric ? winningNumberNumeric - 1 : 0;
    const numberIndex = winningNumberNumeric ? winningNumberNumeric - 1 : 0;
    const multiplierIndex = Math.min(Math.max(winningMultiplier - 1, 0), 8);

    // Mark this game as having a winner
    if (gameId) {
      lastWinnerGameIdRef.current = gameId;
    }

    // Clear any existing polling interval since we found a winner
    if (winnerPollingIntervalRef.current) {
      clearInterval(winnerPollingIntervalRef.current);
      winnerPollingIntervalRef.current = null;
    }

    setSlotMachineState({
      pictureReel: { currentIndex: pictureIndex, isSpinning: true, targetIndex: pictureIndex },
      numberReel: { currentIndex: numberIndex, isSpinning: true, targetIndex: numberIndex },
      multiplierReel: { currentIndex: multiplierIndex, isSpinning: true, targetIndex: multiplierIndex },
    });

    // Stop reels sequentially (shorter delays if from polling since it's already spinning)
    const delay1 = isFromPolling ? 500 : 2000;
    const delay2 = isFromPolling ? 750 : 2500;
    const delay3 = isFromPolling ? 1000 : 3000;

    const timeout1 = setTimeout(() => {
      setSlotMachineState((prev) => ({
        ...prev,
        pictureReel: { ...prev.pictureReel, isSpinning: false },
      }));
    }, delay1);
    slotMachineTimeoutsRef.current.push(timeout1);

    const timeout2 = setTimeout(() => {
      setSlotMachineState((prev) => ({
        ...prev,
        numberReel: { ...prev.numberReel, isSpinning: false },
      }));
    }, delay2);
    slotMachineTimeoutsRef.current.push(timeout2);

    const timeout3 = setTimeout(() => {
      setSlotMachineState((prev) => ({
        ...prev,
        multiplierReel: { ...prev.multiplierReel, isSpinning: false },
      }));
      // Play win result sound when all reels have stopped
      playWinResultSound();
    }, delay3);
    slotMachineTimeoutsRef.current.push(timeout3);
  };

  // Helper function to double all bet values
  const handleDoubleClick = () => {
    playAllBtnSound();
    const updatedBetValues = { ...betValues };
    for (let i = 1; i <= 12; i++) {
      const betKey = `bet${i}`;
      const currentValue = updatedBetValues[betKey];
      if (currentValue && currentValue !== "" && Number(currentValue) > 0) {
        // Double the bet value
        updatedBetValues[betKey] = (Number(currentValue) * 2).toString();
      }
    }
    setBetValues(updatedBetValues);
  };

  // Helper function to repeat the last bet placed
  const handleRepeatClick = () => {
    playAllBtnSound();
    if (!lastBetValues) {
      toast.error("No previous bet to repeat. Please place a bet first.");
      return;
    }
    // Restore the last bet values
    setBetValues({ ...lastBetValues });
  };

  // Helper function to check if a betting number should be highlighted
  const isBettingNumberHighlighted = (number) => {
    // Check if number is in the selected array
    if (selectedBettingNumber && selectedBettingNumber.includes(number)) return true;
    if (!selectedButton || selectedButton.length === 0) return false;
    const betKey = getBettingKey(number);
    // Check if any selected button includes this bet key
    return betKey && selectedButton.some(button => buttonBetMapping[button]?.includes(betKey));
  };

  // Helper function to handle button selection (supports multiple selections)
  const handleButtonSelection = (buttonType) => {
    playAllBtnSound();
    if (isBettingDisabled) {
      toast.error("Betting is disabled in the last 20 seconds of the round.");
      return;
    }
    // Toggle button selection: if already selected, remove it; otherwise add it
    setSelectedButton(prev => {
      const prevArray = prev || [];
      if (prevArray.includes(buttonType)) {
        return prevArray.filter(btn => btn !== buttonType);
      } else {
        return [...prevArray, buttonType];
      }
    });
    setSelectedBettingNumber([]);
  };

  // Helper function to handle betting number selection (toggle: add if not selected, remove if already selected)
  const handleBettingNumberSelection = (number) => {
    playAllBtnSound();
    if (isBettingDisabled) {
      toast.error("Betting is disabled in the last 20 seconds of the round.");
      return;
    }
    // Toggle number selection: if already selected, remove it; otherwise add it
    setSelectedBettingNumber(prev => {
      if (shouldClearNumbersOnNextSelect) {
        return [number];
      }
      const prevArray = prev || [];
      if (prevArray.includes(number)) {
        return prevArray.filter(num => num !== number);
      } else {
        return [...prevArray, number];
      }
    });
    if (shouldClearNumbersOnNextSelect) {
      setShouldClearNumbersOnNextSelect(false);
    }
    setSelectedButton([]);
  };

  // Function to handle coin click and add value to selected betting input
  const handleCoinClick = (coinValue) => {
    // Play bet amount sound
    playBetAmtSound();
    
    // Prevent betting if disabled (last 20 seconds)
    if (isBettingDisabled) {
      toast.error("Betting is disabled in the last 20 seconds of the round.");
      return;
    }

    // If buttons are selected, add coin to all mapped bets from all selected buttons
    if (selectedButton && selectedButton.length > 0) {
      // Collect all unique bet keys from all selected buttons
      const allBetKeys = new Set();
      selectedButton.forEach(button => {
        if (buttonBetMapping[button]) {
          buttonBetMapping[button].forEach(betKey => allBetKeys.add(betKey));
        }
      });
      // Add coin to all collected bet keys
      addCoinToBets(Array.from(allBetKeys), coinValue);
      setShouldClearNumbersOnNextSelect(true);
      return;
    }

    // If specific betting numbers are selected, add coin to all selected bets
    if (selectedBettingNumber && selectedBettingNumber.length > 0) {
      const betKeys = selectedBettingNumber
        .map((number) => getBettingKey(number))
        .filter(Boolean);
      if (betKeys.length > 0) {
        addCoinToBets(betKeys, coinValue);
        setShouldClearNumbersOnNextSelect(true);
      }
    }
  };

  const handleBetInputChange = (betKey, value) => {
    if (isBettingDisabled) {
      return;
    }

    const sanitizedValue = String(value ?? "").replace(/\D/g, "");
    const limitedValue = sanitizedValue.slice(0, MAX_BET_INPUT_LENGTH);

    setBetValues((prev) => ({ ...prev, [betKey]: limitedValue }));
  };

  // Helper function to handle bet value changes with validation (must be multiple of 10)
  const handleBetValueChange = (betKey, value) => {
    if (isBettingDisabled) {
      toast.error("Betting is disabled in the last 20 seconds of the round.");
      // Reset to empty value
      setBetValues((prev) => ({ ...prev, [betKey]: "" }));
      return;
    }

    // Allow empty string for clearing the input
    if (value === "" || value === null || value === undefined) {
      setBetValues((prev) => ({ ...prev, [betKey]: "" }));
      return;
    }

    // Convert to number
    const numValue = Number(value);

    // Check if it's a valid number
    if (isNaN(numValue)) {
      toast.error("Please enter a valid number.");
      // Reset to empty
      setBetValues((prev) => ({ ...prev, [betKey]: "" }));
      return;
    }

    // Check if it's zero - treat as empty
    if (numValue === 0) {
      setBetValues((prev) => ({ ...prev, [betKey]: "" }));
      return;
    }

    // Check if it's not negative
    if (numValue < 0) {
      toast.error("Bet amount cannot be negative.");
      // Reset to empty
      setBetValues((prev) => ({ ...prev, [betKey]: "" }));
      return;
    }

    if (numValue > MAX_BET_VALUE) {
      toast.error("Max bet limit is 9990 only.");
      setBetValues((prev) => ({ ...prev, [betKey]: "" }));
      return;
    }

    // Check if it's a multiple of 10
    if (numValue % 10 !== 0) {
      toast.error("Bet amount must be a multiple of 10.");
      // Reset to empty
      setBetValues((prev) => ({ ...prev, [betKey]: "" }));
      return;
    }

    // Update the bet value if valid
    setBetValues((prev) => ({ ...prev, [betKey]: value.toString() }));
    setShouldClearNumbersOnNextSelect(true);
  };

  // Fetch user balance from API
  const getUserBalance = async (userId) => {
    try {
      const response = await api.post("/users/getUserBalance", { userId });
      if (response.data && response.data.data && response.data.data.user) {
        const user = response.data.data.user;
        if (user.balance !== undefined) {
          setBalance(user.balance);
        }
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  };

  // Format helpers to align receipt time/date with current game time
  const formatGameDate = (dateInput) => {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatGameTime = (dateInput) => {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleInfoClick = () => {
    playAllBtnSound();
    setShowInfoPopup(true);
  };

  const playLoginExitSound = () => {
    const audio = new Audio(loginExitSound);
    audio.play().catch((error) => {
      // Handle autoplay restrictions
      console.log("Sound playback failed:", error);
    });
  };

  const playBetAmtSound = () => {
    const audio = new Audio(betAmtSound);
    audio.play().catch((error) => {
      // Handle autoplay restrictions
      console.log("Sound playback failed:", error);
    });
  };

  const playAllBtnSound = () => {
    const audio = new Audio(allBtnSound);
    audio.play().catch((error) => {
      // Handle autoplay restrictions
      console.log("Sound playback failed:", error);
    });
  };

  const playSlotMachineSound = () => {
    // Reuse existing audio if possible to avoid play/pause race errors
    if (slotMachineAudioRef.current) {
      slotMachineAudioRef.current.loop = false;
      if (slotMachineAudioRef.current.paused) {
        slotMachineAudioRef.current.currentTime = 0;
        slotMachineAudioRef.current.play().catch((error) => {
          // Handle autoplay restrictions
          console.log("Sound playback failed:", error);
        });
      }
      return;
    }

    // Play slot machine sound once (no loop)
    const audio = new Audio(slotMachineSound);
    audio.loop = false;
    audio.onended = () => {
      if (slotMachineAudioRef.current === audio) {
        slotMachineAudioRef.current = null;
      }
    };
    audio.play().catch((error) => {
      // Handle autoplay restrictions or play/pause race
      if (
        error?.name === "AbortError" ||
        /interrupted by a call to pause/i.test(error?.message || "")
      ) {
        return;
      }
      console.log("Sound playback failed:", error);
    });
    slotMachineAudioRef.current = audio;
  };

  const stopSlotMachineSound = (force = false) => {
    if (slotMachineAudioRef.current) {
      if (!force) return;
      slotMachineAudioRef.current.pause();
      slotMachineAudioRef.current.currentTime = 0;
      slotMachineAudioRef.current = null;
    }
  };

  const playWinResultSound = () => {
    // Stop slot machine sound first
    stopSlotMachineSound(true);
    // Play win result sound
    const audio = new Audio(winResultSound);
    audio.play().catch((error) => {
      // Handle autoplay restrictions
      console.log("Sound playback failed:", error);
    });
  };

  // Helper function to calculate total bet from betValues
  const calculateTotalBet = (betValues) => {
    return Object.values(betValues).reduce((total, value) => {
      const numValue = value && value !== "" ? Number(value) : 0;
      return total + (isNaN(numValue) ? 0 : numValue);
    }, 0);
  };

  // Helper function to convert betValues to backend format
  const convertBetValuesToBackendFormat = (betValues) => {
    const numberMap = {
      bet1: "one",
      bet2: "two",
      bet3: "three",
      bet4: "four",
      bet5: "five",
      bet6: "six",
      bet7: "seven",
      bet8: "eight",
      bet9: "nine",
      bet10: "ten",
      bet11: "eleven",
      bet12: "twelve",
    };

    const betAmounts = {};
    for (const [key, value] of Object.entries(betValues)) {
      if (value && value !== "" && Number(value) > 0) {
        const backendKey = numberMap[key];
        if (backendKey) {
          betAmounts[backendKey] = Number(value);
        }
      }
    }
    return betAmounts;
  };

  // Generate unique string for bet
  const generateUniqueString = (length = 10) => {
    const charset = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  };

  // Handle BET button click
  const handleBetClick = async () => {
    playAllBtnSound();
    // Check if a bet request is already in progress
    if (isBettingInProgress) {
      toast.error("Please wait for the previous bet to complete.");
      return;
    }
    // Check if betting is disabled (last 20 seconds)
    if (isBettingDisabled) {
      toast.error("Betting is disabled in the last 20 seconds of the round. Please wait for the next round.");
      return;
    }

    // Check if there are any bets placed
    const hasBets = Object.values(betValues).some(
      (value) => value && value !== "" && Number(value) > 0
    );

    if (!hasBets) {
      toast.error("Please place at least one bet before submitting.");
      return;
    }

    // Check if user is logged in
    if (!userId) {
      toast.error("User not logged in. Please login again.");
      return;
    }

    // Check if there's a current game
    if (!currentGame) {
      toast.error("No active game found. Please wait for a new game to start.");
      return;
    }

    // Get gameId from currentGame (it might be _id or gameId depending on the response structure)
    const gameId = currentGame.gameId || currentGame._id;
    if (!gameId) {
      toast.error("No active game found. Please wait for a new game to start.");
      return;
    }

    // Set betting in progress to prevent duplicate requests
    setIsBettingInProgress(true);

    try {
      // Convert betValues to backend format
      const betAmounts = convertBetValuesToBackendFormat(betValues);

      // Calculate total bet amount
      const totalBetAmount = Object.values(betAmounts).reduce(
        (sum, amount) => sum + amount,
        0
      );

      // Check if user has enough balance
      if (totalBetAmount > balance) {
        toast.error(`Insufficient balance. You have ${balance} points but need ${totalBetAmount} points.`);
        setIsBettingInProgress(false);
        return;
      }

      // Generate unique string
      const uniqueString = generateUniqueString();

      // Prepare bet data
      const betData = {
        gameId: gameId,
        userId: userId,
        betAmounts: betAmounts,
        uniqueString: uniqueString,
      };

      // Make API call to create bet
      const response = await api.post("/users/create-bet", betData);

      if (response.data && response.data.success) {
        // Store receipt data from backend response
        const receiptDataFromBackend = response.data.data;
        if (receiptDataFromBackend) {
        const alignedDate = formatGameDate(currentGame?.startTime);
        const alignedTime = formatGameTime(currentGame?.startTime);
        setReceiptData({
          ...receiptDataFromBackend,
          date: alignedDate || receiptDataFromBackend.date,
          drawTime: alignedTime || receiptDataFromBackend.drawTime,
          printTime: alignedTime || receiptDataFromBackend.printTime,
        });
          setShowReceipt(true);
        }

        // Store current bet values as last bet before clearing (for REPEAT functionality)
        setLastBetValues({ ...betValues });

        // Update total bet placed in current round (add to existing total)
        setTotalBetPlacedInRound((prevTotal) => prevTotal + totalBetAmount);

        // Update user balance (deduct total bet amount)
        const newBalance = balance - totalBetAmount;
        setBalance(newBalance);

        // Update balance in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            user.balance = newBalance;
            localStorage.setItem("user", JSON.stringify(user));
          } catch (error) {
            console.error("Error updating user in localStorage:", error);
          }
        }

        // Clear all bet values
        const emptyBets = {};
        for (let i = 1; i <= 12; i++) {
          emptyBets[`bet${i}`] = "";
        }
        setBetValues(emptyBets);

        // Clear all selections
        clearAllSelections();

        // Refresh user balance from API
        getUserBalance(userId);

        toast.success("Bet placed successfully!");
      } else {
        toast.error("Failed to place bet. Please try again.");
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to place bet. Please try again.";
      toast.error(errorMessage);
    } finally {
      // Reset betting in progress state after request completes
      setIsBettingInProgress(false);
    }
  };

  // Handle claim barcode check
  const handleClaimCheck = async () => {
    // Prevent double submit (scanner firing twice in a fraction of a second)
    if (claimCheckInProgressRef.current) return;

    const trimmedBarcode = (claimBarcode || "").trim();
    if (!trimmedBarcode) {
      playAllBtnSound();
      toast.error("Please enter a barcode number.");
      return;
    }

    // Cooldown: block same barcode within CLAIM_COOLDOWN_MS to avoid duplicate transactions
    const now = Date.now();
    if (
      lastClaimedBarcodeRef.current === trimmedBarcode &&
      now - lastClaimTimeRef.current < CLAIM_COOLDOWN_MS
    ) {
      return; // Silent skip; user already submitted this barcode
    }

    claimCheckInProgressRef.current = true;
    playAllBtnSound();

    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      claimCheckInProgressRef.current = false;
      toast.error("User not logged in. Please login again.");
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
      if (!user._id) {
        claimCheckInProgressRef.current = false;
        toast.error("User data is invalid. Please login again.");
        return;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      claimCheckInProgressRef.current = false;
      toast.error("User data is invalid. Please login again.");
      return;
    }

    setIsCheckingClaim(true);
    try {
      // Ensure balance is a valid number
      const userBalance = Number(user.balance) || Number(balance) || 0;
      if (isNaN(userBalance)) {
        claimCheckInProgressRef.current = false;
        toast.error("Invalid user balance. Please refresh and try again.");
        setIsCheckingClaim(false);
        return;
      }

      // Record barcode and time for cooldown (prevents duplicate API calls for same scan)
      lastClaimedBarcodeRef.current = trimmedBarcode;
      lastClaimTimeRef.current = Date.now();

      // Call API to check bet profit
      const response = await api.post("/users/getBetProfit", {
        betUniqueNumber: trimmedBarcode,
        user: {
          _id: user._id,
          createdBy: user.createdBy || null,
          balance: userBalance,
        },
      });

      if (response.data && response.data.data) {
        const result = response.data.data;

        // Handle different response scenarios
        if (result.isScanned) {
          // Already scanned - show AttentionPopup
          setClaimMessage("This ticket has already been scanned.");
          setShowAttentionPopup(true);
        } else if (result.isProfit && result.profit > 0) {
          // Winner - show CongratulationsPopup
          setClaimCoins(result.profit);
          setShowCongratulationsPopup(true);
          // Update balance - refresh from API to get the updated balance
          // The backend already added the profit to the user's balance
          if (userId) {
            getUserBalance(userId);
          }
          // Also update local balance immediately for better UX
          if (user._id === userId) {
            setBalance((prevBalance) => {
              const currentBalance = Number(prevBalance) || 0;
              return currentBalance + result.profit;
            });
            // Update balance in localStorage
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              try {
                const userObj = JSON.parse(storedUser);
                const currentBalance = Number(userObj.balance) || 0;
                userObj.balance = currentBalance + result.profit;
                localStorage.setItem("user", JSON.stringify(userObj));
              } catch (error) {
                console.error("Error updating user in localStorage:", error);
              }
            }
          }
        } else {
          // No winner - show OopsPopup
          setClaimMessage("There have no winning ticket. Better luck next time.");
          setShowOopsPopup(true);
        }
      } else {
        toast.error("Invalid response from server.");
      }

      // Clear input after successful submission (keep input box open for next scan)
      setClaimBarcode("");
    } catch (error) {
      console.error("Error checking claim:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to check barcode. Please try again.";

      // If game is still running, show specific toast
      if (errorMessage.includes("Game is still running") || errorMessage.includes("still running")) {
        toast.error("This ticket is for the current running game. Please wait for the game to finish before scanning.");
      }
      // If bet not found, show OopsPopup
      else if (errorMessage.includes("BET NOT FOUND") || errorMessage.includes("NOT FOUND")) {
        setClaimMessage("There have no winning ticket. Better luck next time.");
        setShowOopsPopup(true);
      }
      // Some backends send a validation failure when the ticket is simply not a winner
      else if (errorMessage.toLowerCase().includes("user validation failed")) {
        setClaimMessage("There have no winning ticket. Better luck next time.");
        setShowOopsPopup(true);
      } else {
        toast.error(errorMessage);
      }
      
      // Clear input after error (keep input box open for next scan)
      setClaimBarcode("");
    } finally {
      claimCheckInProgressRef.current = false;
      setIsCheckingClaim(false);
      // Refocus the input after checking completes for next barcode scan
      if (showClaimInput && claimInputRef.current && shouldRefocusClaimInput()) {
        setTimeout(() => {
          if (claimInputRef.current && shouldRefocusClaimInput()) {
            claimInputRef.current.focus();
          }
        }, 100);
      }
    }
  };

  // Keep a ref to the latest handleClaimCheck implementation so dev tools
  // simulations (like __simulateDoubleClaim) always call it with fresh state.
  useEffect(() => {
    claimCheckRef.current = handleClaimCheck;
  }, [handleClaimCheck]);

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Get user data from localStorage to get balance
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.username) {
          setUsername(user.username);
        }
        if (user._id) {
          setUserId(user._id);
          // Set initial balance from localStorage
          if (user.balance !== undefined) {
            setBalance(user.balance);
          }
          // Fetch latest balance from API
          getUserBalance(user._id);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Fetch live game data
  const getLiveGame = async () => {
    try {
      const response = await api.get("/users/getLiveGame");
      if (response.data && response.data.data) {
        const gameData = response.data.data;
        setCurrentGame(gameData);
        
        // Extract win amount from totalUsersPlayed array
        if (gameData.totalUsersPlayed && Array.isArray(gameData.totalUsersPlayed) && userId) {
          const userEntry = gameData.totalUsersPlayed.find(
            (entry) => entry._id === userId || entry._id?.toString() === userId?.toString()
          );
          if (userEntry && userEntry.total_winning !== null && userEntry.total_winning !== undefined) {
            setWinAmount(userEntry.total_winning);
          } else {
            // If user not found or total_winning is null, set to 0
            setWinAmount(0);
          }
        } else {
          setWinAmount(0);
        }
      }
    } catch (error) {
      console.error("Error fetching live game:", error);
      // Set default countdown if API fails
      setCountdown("00:00");
      setWinAmount(0);
    }
  };

  // Sequential API call function to check for winner (simple flow: one call at a time)
  const checkWinnerSequentially = async (currentGameId) => {
    // Don't make another call if one is in progress or if we already have winner data
    if (isApiCallInProgressRef.current || winnerDataRef.current) {
      return false; // Return false to indicate no winner found or call not made
    }

    isApiCallInProgressRef.current = true;

    try {
      const response = await api.get("/users/getLiveGame");
      if (response.data && response.data.data) {
        const gameData = response.data.data;
        const gameId = gameData.gameId || gameData._id;
        
        // Only process if it's the same game
        if (gameId === currentGameId && gameData.winning_number && gameData.winning_x) {
          // Winner found! Store the data and stop making more calls
          storeWinnerData(gameData.winning_number, gameData.winning_x, gameId);
          setCurrentGame(gameData);
          isApiCallInProgressRef.current = false;
          return true; // Return true to indicate winner found
        }
      }
    } catch (error) {
      console.error("Error checking for winner:", error);
    }

    // If we didn't get a winner, allow another call after response is processed
    isApiCallInProgressRef.current = false;
    return false; // Return false to indicate no winner found
  };

  // Recursive function to make sequential API calls until winner is found
  const makeSequentialApiCalls = async (currentGameId) => {
    // Check if we should stop (winner found)
    if (winnerDataRef.current) {
      return; // Winner found, stop making calls
    }

    const winnerFound = await checkWinnerSequentially(currentGameId);
    
    // If winner not found, wait then make another call (useEffect cleanup will stop this if outside valid range)
    if (!winnerFound && !winnerDataRef.current) {
      apiCallTimeoutRef.current = setTimeout(() => {
        // Clear the timeout ref and make another call
        apiCallTimeoutRef.current = null;
        makeSequentialApiCalls(currentGameId);
      }, 1000);
    }
  };

  // Fetch latest games data
  const getLatestGames = async () => {
    try {
      const response = await api.get("/users/getLatestGame");
      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const games = response.data.data;

        // Filter out games without winning_number (empty games) - these are completed games
        const gamesWithResults = games.filter((game) => game.winning_number);

        // Format games data to match drawResults structure (only games with results)
        const formattedGames = gamesWithResults.map((game) => {
          const gameTime = new Date(game.startTime);
          const hours = gameTime.getHours().toString().padStart(2, "0");
          const minutes = gameTime.getMinutes().toString().padStart(2, "0");

          // Convert string winning_number to numeric value
          const numericResult = convertWinningNumberToNumeric(
            game.winning_number
          );

          return {
            time: `${hours}:${minutes}`,
            result: numericResult,
            multiplier: game.winning_x || 0,
          };
        });
        setLatestGames(formattedGames);
      }
    } catch (error) {
      console.error("Error fetching latest games:", error);
      // Keep empty array on error
      setLatestGames([]);
    }
  };

  // Calculate and update countdown timer
  const updateCountdown = () => {
    if (!currentGame || !currentGame.startTime) {
      setCountdown("00:00");
      setRemainingSeconds(0);
      setIsBettingDisabled(false);
      return;
    }

    const startTime = new Date(currentGame.startTime);
    const currentTime = new Date();
    const duration = currentGame.duration || 5; // Default to 5 minutes if not provided

    // Calculate end time (startTime + duration in minutes)
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    // Calculate time difference
    const timeDifference = endTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      // Timer has ended, fetch new game
      setCountdown("00:00");
      setRemainingSeconds(0);
      setIsBettingDisabled(false);
      getLiveGame();
    } else {
      // Calculate remaining minutes and seconds
      const remainingMinutes = Math.floor(timeDifference / (1000 * 60));
      const totalRemainingSeconds = Math.floor(timeDifference / 1000);
      const remainingSecondsOnly = Math.floor(
        (timeDifference % (1000 * 60)) / 1000
      );

      // Update remaining seconds state
      setRemainingSeconds(totalRemainingSeconds);

      // Disable betting if 20 seconds or less remaining
      if (totalRemainingSeconds <= 20) {
        setIsBettingDisabled(true);
        // Fetch live game data in the last 20 seconds, but throttle to every 2 seconds
        const now = Date.now();
        if (!lastFetchTimeRef.current || (now - lastFetchTimeRef.current) >= 2000) {
          getLiveGame();
          lastFetchTimeRef.current = now;
        }
      } else {
        setIsBettingDisabled(false);
        // Reset fetch time when outside last 20 seconds
        lastFetchTimeRef.current = null;
      }

      // Format as MM:SS
      const formattedMinutes =
        remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
      const formattedSeconds =
        remainingSecondsOnly < 10 ? `0${remainingSecondsOnly}` : `${remainingSecondsOnly}`;

      setCountdown(`${formattedMinutes}:${formattedSeconds}`);
    }
  };

  // Fetch game data on component mount
  useEffect(() => {
    getLiveGame();
    getLatestGames();

    return () => {
      // Cleanup: clear all slot machine timeouts
      slotMachineTimeoutsRef.current.forEach(clearTimeout);
      slotMachineTimeoutsRef.current = [];
      // Cleanup winner polling interval
      if (winnerPollingIntervalRef.current) {
        clearInterval(winnerPollingIntervalRef.current);
        winnerPollingIntervalRef.current = null;
      }
      // Stop slot machine sound on unmount
      stopSlotMachineSound(true);
    };
  }, []);

  // Handle game changes and slot machine state
  useEffect(() => {
    if (!currentGame) return;

    const currentGameId = currentGame.gameId || currentGame._id;
    const isNewGame = currentGameId && lastGameIdRef.current !== currentGameId;
    const hasWinningResult = currentGame.winning_number && currentGame.winning_x;

    // New game detected
    if (isNewGame) {
      // Clear previous timeouts
      slotMachineTimeoutsRef.current.forEach(clearTimeout);
      slotMachineTimeoutsRef.current = [];

      // Clear winner polling interval
      if (winnerPollingIntervalRef.current) {
        clearInterval(winnerPollingIntervalRef.current);
        winnerPollingIntervalRef.current = null;
      }

      // Reset winner tracking for new game
      lastWinnerGameIdRef.current = null;
      winnerDataRef.current = null;
      hasMadeFirstApiCallRef.current = false;
      isApiCallInProgressRef.current = false;
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
        apiCallTimeoutRef.current = null;
      }

      // Fetch latest games and clear betting
      getLatestGames();
      const emptyBets = {};
      for (let i = 1; i <= 12; i++) {
        emptyBets[`bet${i}`] = "";
      }
      setBetValues(emptyBets);
      clearAllSelections();

      // Reset total bet placed in round for new game
      setTotalBetPlacedInRound(0);
      
      // Reset win amount for new game
      setWinAmount(0);

      // Don't reset slot machine state here - keep previous winner displayed until last 20 seconds
      // The state will be reset when we enter the last 20 seconds of the new round
      // Just ensure it's not spinning
      setSlotMachineState((prev) => ({
        pictureReel: { ...prev.pictureReel, isSpinning: false },
        numberReel: { ...prev.numberReel, isSpinning: false },
        multiplierReel: { ...prev.multiplierReel, isSpinning: false },
      }));
      // Reset slot sound tracking for the new round
      hasPlayedSlotSoundRef.current = false;

      lastGameIdRef.current = currentGameId;
    }

    // Extract win amount from totalUsersPlayed array whenever game data updates
    if (currentGame.totalUsersPlayed && Array.isArray(currentGame.totalUsersPlayed) && userId) {
      const userEntry = currentGame.totalUsersPlayed.find(
        (entry) => entry._id === userId || entry._id?.toString() === userId?.toString()
      );
      if (userEntry && userEntry.total_winning !== null && userEntry.total_winning !== undefined) {
        setWinAmount(userEntry.total_winning);
      } else if (!isNewGame && !userEntry) {
        // If user entry not found and it's not a new game, keep existing value
        // (don't reset if we just haven't found the user yet)
      }
    }

    // Initialize slot machine on first load if not already set
    if (!lastGameIdRef.current && currentGameId) {
      lastGameIdRef.current = currentGameId;
      if (hasWinningResult) {
        // If there's already a winner, store it for progressive display
        storeWinnerData(currentGame.winning_number, currentGame.winning_x, currentGameId);
        // Only animate immediately if we're outside the last 20 seconds
        // If we're in the last 20 seconds, let the progressive display handle it
        const isLast20Seconds = remainingSeconds > 0 && remainingSeconds <= 20;
        if (!isLast20Seconds) {
          animateSlotMachineToResult(currentGame.winning_number, currentGame.winning_x, false, currentGameId);
        }
      } else {
        // No winner yet, initialize to stopped state (will spin when last 20 seconds)
        setSlotMachineState({
          pictureReel: { currentIndex: 0, isSpinning: false, targetIndex: null },
          numberReel: { currentIndex: 0, isSpinning: false, targetIndex: null },
          multiplierReel: { currentIndex: 0, isSpinning: false, targetIndex: null },
        });
      }
    }

    // Handle winning result - only animate if we haven't already shown this winner
    if (hasWinningResult && lastWinnerGameIdRef.current !== currentGameId) {
      // Store winner data for progressive display (needed for both automated and manual winners)
      storeWinnerData(currentGame.winning_number, currentGame.winning_x, currentGameId);
      
      // Only animate immediately if we're outside the last 20 seconds
      // If we're in the last 20 seconds, let the progressive display handle it
      const isLast20Seconds = remainingSeconds > 0 && remainingSeconds <= 20;
      if (!isLast20Seconds) {
        animateSlotMachineToResult(currentGame.winning_number, currentGame.winning_x, false, currentGameId);
      }
    }
  }, [currentGame, remainingSeconds]);

  // Update running game time when currentGame changes
  useEffect(() => {
    if (currentGame && currentGame.startTime) {
      const gameTime = new Date(currentGame.startTime);
      const hours = gameTime.getHours().toString().padStart(2, "0");
      const minutes = gameTime.getMinutes().toString().padStart(2, "0");
      setRunningGameTime(`${hours}:${minutes}`);
    } else {
      setRunningGameTime("");
    }
  }, [currentGame]);

  // Update countdown timer every second when game data is available
  useEffect(() => {
    if (currentGame) {
      // Clear any existing interval
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }

      // Update countdown immediately
      updateCountdown();

      // Set up interval to update every second
      countdownIntervalRef.current = setInterval(() => {
        updateCountdown();
      }, 1000);
    }

    // Cleanup interval on unmount or when game changes
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [currentGame]);

  // Handle slot machine spinning in last 20 seconds
  useEffect(() => {
    if (!currentGame) return;

    const currentGameId = currentGame.gameId || currentGame._id;
    const hasWinningResult = currentGame.winning_number && currentGame.winning_x;
    const isLast20Seconds = remainingSeconds > 0 && remainingSeconds <= 20;
    const hasWinnerForCurrentGame = lastWinnerGameIdRef.current === currentGameId && hasWinningResult;

    // If we're in the last 20 seconds
    if (isLast20Seconds) {
      // If we don't have a winner for the current game yet, start spinning
      if (!hasWinnerForCurrentGame) {
        // Reset any previous winner display and start spinning
        setSlotMachineState((prev) => ({
          pictureReel: { currentIndex: 0, isSpinning: true, targetIndex: null },
          numberReel: { currentIndex: 0, isSpinning: true, targetIndex: null },
          multiplierReel: { currentIndex: 0, isSpinning: true, targetIndex: null },
        }));
        // Play slot machine spinning sound
        if (!hasPlayedSlotSoundRef.current) {
          playSlotMachineSound();
          hasPlayedSlotSoundRef.current = true;
        }
      } else {
        // We already have a winner for this game - clear any API timeouts
        if (apiCallTimeoutRef.current) {
          clearTimeout(apiCallTimeoutRef.current);
          apiCallTimeoutRef.current = null;
        }
      }
    } else {
      // Outside last 20 seconds - clear any API timeouts and reset flags
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
        apiCallTimeoutRef.current = null;
      }
      // Reset winner data and flags when outside last 20 seconds
      winnerDataRef.current = null;
      hasMadeFirstApiCallRef.current = false;
      isApiCallInProgressRef.current = false;

      // If we have a winner for the current game, keep it displayed (machine should already be stopped)
      // If we don't have a winner and we're outside last 20 seconds, ensure machine is stopped
      if (!hasWinnerForCurrentGame) {
        setSlotMachineState((prev) => ({
          pictureReel: { ...prev.pictureReel, isSpinning: false },
          numberReel: { ...prev.numberReel, isSpinning: false },
          multiplierReel: { ...prev.multiplierReel, isSpinning: false },
        }));
      }
    }

    // Cleanup on unmount or when game changes
    return () => {
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
        apiCallTimeoutRef.current = null;
      }
    };
  }, [remainingSeconds, currentGame]);

  // Sequential API calls for winner - simple flow: first call at 5 seconds, then wait and retry if needed
  useEffect(() => {
    if (!currentGame) return;

    const currentGameId = currentGame.gameId || currentGame._id;
    const hasWinnerForCurrentGame = lastWinnerGameIdRef.current === currentGameId && winnerDataRef.current;
    const isLast20Seconds = remainingSeconds > 0 && remainingSeconds <= 20;

    // Stop API calls if we're outside last 20 seconds, have a winner, or past 3 seconds
    if (!isLast20Seconds || hasWinnerForCurrentGame || remainingSeconds <= 3) {
      // Clear any pending timeout if we're outside valid range
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
        apiCallTimeoutRef.current = null;
      }
      return;
    }

    // First API call at exactly 5th second - start the sequential calling process
    if (remainingSeconds === 5 && !hasMadeFirstApiCallRef.current && !winnerDataRef.current) {
      hasMadeFirstApiCallRef.current = true;
      makeSequentialApiCalls(currentGameId);
    }

    // Cleanup
    return () => {
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
        apiCallTimeoutRef.current = null;
      }
    };
  }, [remainingSeconds, currentGame]);

  // Handle progressive winner display in last 3 seconds
  useEffect(() => {
    if (!currentGame || !winnerDataRef.current) return;

    const currentGameId = currentGame.gameId || currentGame._id;
    const isWinnerForCurrentGame = winnerDataRef.current.gameId === currentGameId;
    
    // Only display progressively if we have winner data for current game
    if (isWinnerForCurrentGame && remainingSeconds > 0 && remainingSeconds <= 3) {
      displayProgressiveWinner(remainingSeconds);
    }
  }, [remainingSeconds, currentGame]);

  // Auto-submit claim barcode when scanning (without pressing Enter)
  // Unique string length is fixed at 10 characters
  const BARCODE_LENGTH = 10;

  useEffect(() => {
    const trimmedBarcode = claimBarcode.trim();
    if (trimmedBarcode.length !== BARCODE_LENGTH || !showClaimInput || isCheckingClaim) return;
    // Prevent double submit: do not trigger if a claim is already in progress
    if (claimCheckInProgressRef.current) return;
    // Cooldown: do not re-submit same barcode within CLAIM_COOLDOWN_MS
    const now = Date.now();
    if (
      lastClaimedBarcodeRef.current === trimmedBarcode &&
      now - lastClaimTimeRef.current < CLAIM_COOLDOWN_MS
    ) {
      return;
    }
    // Automatically submit when barcode reaches the fixed length (barcode scanners send all chars at once)
    handleClaimCheck();
  }, [claimBarcode, showClaimInput, isCheckingClaim]);

  // Auto-focus claim input when it becomes visible
  useEffect(() => {
    if (showClaimInput && claimInputRef.current && !isCheckingClaim) {
      // Use setTimeout to ensure the input is rendered before focusing
      const focusTimer = setTimeout(() => {
        if (claimInputRef.current && shouldRefocusClaimInput()) {
          claimInputRef.current.focus();
        }
      }, 100);
      
      return () => clearTimeout(focusTimer);
    }
  }, [showClaimInput, isCheckingClaim]);

  // Global barcode scanner detection - automatically capture barcode input
  useEffect(() => {
    if (!showClaimInput) return;

    const handleGlobalKeyDown = (e) => {
      // Skip if currently checking claim
      if (isCheckingClaim) {
        return;
      }

      // Check if claim input is focused - if so, let it handle input normally
      if (document.activeElement === claimInputRef.current) {
        return;
      }

      const currentTime = Date.now();
      const timeSinceLastKey = currentTime - lastBarcodeKeyTimeRef.current;

      // Check if this might be barcode scanner input
      // Barcode scanners send characters very quickly (usually < 50ms apart)
      // and don't use modifier keys
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        // Check if we're not in any other input/textarea field
        const activeElement = document.activeElement;
        const isInInputField = activeElement && (
          activeElement.tagName === "INPUT" || 
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable
        );

        // If rapid input detected (likely barcode scanner) and not in any input field
        if (timeSinceLastKey < 50 && !isInInputField) {
          // Rapid character input detected - likely barcode scanner
          // Focus the claim input to capture the barcode
          if (claimInputRef.current) {
            e.preventDefault();
            claimInputRef.current.focus();
            // Clear any existing value when starting a new scan
            setClaimBarcode("");
            barcodeBufferRef.current = "";
            // The character will naturally flow into the focused input
          }
        }
      }

      // Handle Enter key - if barcode scanner sends Enter and input is focused, it will be handled by onKeyPress
      // If Enter is pressed elsewhere but we have a barcode buffer, focus input and submit
      if (e.key === "Enter" && barcodeBufferRef.current.length > 0 && claimInputRef.current) {
        e.preventDefault();
        claimInputRef.current.focus();
        setClaimBarcode(barcodeBufferRef.current);
        barcodeBufferRef.current = "";
      }

      lastBarcodeKeyTimeRef.current = currentTime;
    };

    // Add global keyboard listener with capture phase to catch events early
    window.addEventListener("keydown", handleGlobalKeyDown, true);
    
    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
      barcodeBufferRef.current = "";
      lastBarcodeKeyTimeRef.current = 0;
    };
  }, [isCheckingClaim, showClaimInput]);

  // Helper function to get draw table icon based on result number
  const getDrawIcon = (resultNumber) => {
    const iconMap = {
      1: drawIcon1,
      2: drawIcon2,
      3: drawIcon3,
      4: drawIcon4,
      5: drawIcon5,
      6: drawIcon6,
      7: drawIcon7,
      8: drawIcon8,
      9: drawIcon9,
      10: drawIcon10,
      11: drawIcon11,
      12: drawIcon12,
    };
    return iconMap[resultNumber] || drawIcon1;
  };

  // Dev-only: expose multi-scan simulator for console (reproduce barcode scanner duplicate bug).
  // Triggers claim check 4 times in quick succession. Run: __simulateDoubleClaim()  or  __simulateDoubleClaim('1234567890')
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    window.__simulateDoubleClaim = (barcode) => {
      const value =
        barcode && String(barcode).trim().length === 10
          ? String(barcode).trim()
          : "2528528919";

      // First ensure the claim barcode state is set.
      setClaimBarcode(value);

      // Then (after React has a chance to re-render) call the latest
      // handleClaimCheck 4 times via ref to simulate rapid repeated scans.
      setTimeout(() => {
        if (claimCheckRef.current) {
          const fmt = (d) => d.toLocaleTimeString("en-GB", { hour12: false }) + "." + String(d.getMilliseconds()).padStart(3, "0");
          const t1 = new Date();
          console.log("[Simulate double scan] 1st entry at:", fmt(t1));
          claimCheckRef.current();
          const t2 = new Date();
          console.log("[Simulate double scan] 2nd entry at:", fmt(t2));
          claimCheckRef.current();
          const t3 = new Date();
          console.log("[Simulate double scan] 3rd entry at:", fmt(t3));
          claimCheckRef.current();
          const t4 = new Date();
          console.log("[Simulate double scan] 4th entry at:", fmt(t4));
          claimCheckRef.current();
        }
      }, 0);
    };
  }

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar - Top navigation bar with gradient background */}
      <nav
        className="w-full h-16 flex items-center px-4 justify-between"
        style={{
          background: "linear-gradient(to bottom, #0063cd, #4c017c)",
        }}
      >
        {/* Logo - KSS brand logo on the left side */}
        <img
          src={logo}
          alt="KSS Logo"
          className="ml-5 h-12 w-auto object-contain w90"
        />

        {/* Disclaimer text - "FOR AMUSEMENT ONLY" message */}
        <span className="text-white font-semibold text-lg ml-5 mr-5">
          FOR AMUSEMENT ONLY
        </span>

        {/* Info icon - Opens information popup/modal */}
        <img
          src={infoIcon}
          alt="infoIcon"
          className="h-12 w-auto object-contain cursor-pointer"
          onClick={handleInfoClick}
        />

        {/* Timer icon - Displays game timer or countdown */}
        <div className="relative flex items-center">
          <div
            className="relative"
            style={{ marginTop: "15vh", marginLeft: "5vh" }}
          >
            <img
              src={timerIcon}
              alt="timerIcon"
              className="h-36 w-auto object-contain"
            />
            {/* Timer display - Dynamic timer value from backend */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-white font-bold text-4xl drop-shadow-lg">
                {countdown}
              </span>
            </div>
          </div>
        </div>

        {/* User section - Displays user icon and user name */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            playAllBtnSound();
            if (onShowMyAccount) {
              onShowMyAccount();
            }
          }}
        >
          <img
            src={userIcon}
            alt="userIcon"
            className="h-12 w-auto object-contain"
          />
          <span className="text-white font-semibold text-lg">
            {username || "Users"}
          </span>
        </div>

        {/* Claim icon - Button to claim rewards/winnings */}
        <div className="relative flex items-center justify-center">
          <img
            src={claimIcon}
            alt="claimIcon"
            className="h-12 w-auto object-contain cursor-pointer"
            onClick={() => {
              playAllBtnSound();
              setShowClaimInput(true);
              setClaimBarcode("");
            }}
          />
          {showClaimInput && (
            <input
              ref={claimInputRef}
              type="text"
              value={claimBarcode}
              maxLength={BARCODE_LENGTH}
              onChange={(e) => {
                setClaimBarcode(e.target.value);
                // Update buffer for barcode scanner detection
                barcodeBufferRef.current = e.target.value;
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isCheckingClaim) {
                  handleClaimCheck();
                }
              }}
              onBlur={(e) => {
                // Prevent losing focus if we're not checking - keep ready for next scan
                // Only allow blur if we're checking claim (processing)
                if (!isCheckingClaim) {
                  // Small delay to allow other focus events to complete
                  setTimeout(() => {
                    if (claimInputRef.current && showClaimInput && shouldRefocusClaimInput()) {
                      claimInputRef.current.focus();
                    }
                  }, 50);
                }
              }}
              placeholder="Scan barcode or enter manually"
              className="absolute left-[62%] top-[55%] transform -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 text-black focus:outline-none text-xs placeholder:text-black/70 z-10"
              style={{ width: "60%", height: "45%" }}
              disabled={isCheckingClaim}
              autoFocus
            />
          )}
        </div>

        {/* Balance icon - Displays user's account balance */}
        <div className="relative flex items-center">
          <img
            src={balanceIcon}
            alt="balanceIcon"
            className="h-12 w-auto object-contain"
          />
          {/* Balance display - Overlaid on the icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-black font-bold text-sm drop-shadow-lg">
              {balance}
            </span>
          </div>
        </div>

        {/* Close icon - Button to close/exit the application and logout */}
        <img
          src={closeIcon}
          alt="closeIcon"
          className="h-12 w-auto object-contain cursor-pointer"
          onClick={() => {
            playLoginExitSound();
            if (onLogout) {
              onLogout();
            }
          }}
        />
      </nav>

      {/* Rest of your component remains the same... */}
      {/* 12x12 Grid */}
      <div
        className="grid grid-cols-12 grid-rows-12 gap-1 p-4"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        {/* Row 1 */}
        <div
          className="relative"
          style={{
            gridRow: "1 / 10",
            gridColumn: "1 / 6",
          }}
        >
          <SlotMachine
            className="w-full h-full"
            machineImage={slotMachineImg}
            pictureImages={picSmImages}
            numberImages={numSmImages}
            multiplierImages={winImages}
            state={slotMachineState}
            speed={150}
          />
        </div>
        <div className="flex items-center justify-center text-xs text-white"></div>
        <div className="flex items-center justify-center text-xs text-white"></div>
        <div
          className="relative"
          style={{
            gridRow: "1 / 11",
            gridColumn: "8 / 13",
          }}
        >
          <img
            src={bettingFrame}
            alt="Betting Frame"
            className="w-full h-full object-fill"
          />

          {/* Betting numbers grid - 3 rows x 4 columns */}
          <div className="absolute inset-0 flex flex-col justify-center items-center pt-[6vh] pb-[6vh] px-[4vw]">
            {/* Betting grid */}
            <div className="grid grid-cols-4 gap-2 w-full h-full">
              <div className="flex flex-col items-center justify-center mt-[2vh]">
                <span className="text-white text-[1vw] sm-font w-full text-center">
                  1,2,5,6,9,10
                </span>
                <button 
                  className={`bg-red-600 text-white px-[8%] py-[1%] rounded-full border-2 border-white hover:bg-red-700 transition-colors text-[1vw] font-semibold mb-[2%] w-[70%] hover:scale-105 text-center ${
                    (selectedButton || []).includes('red') ? "ring-2 ring-yellow-400" : ""
                  } ${isBettingDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleButtonSelection('red')}
                  disabled={isBettingDisabled}
                >
                  RED
                </button>
                <div
                  className={`relative w-full transition-transform mt-[1vh] ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  } ${
                    isBettingNumberHighlighted(1)
                      ? "border-2 border-yellow-400 rounded-lg"
                      : ""
                  }`}
                  onClick={() => !isBettingDisabled && handleBettingNumberSelection(1)}
                >
                  <img
                    src={betNum1}
                    alt="Bet Number 1"
                    className="w-full h-[15vh] object-fill"
                  />
                  <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                    <input
                      type="number"
                      value={betValues.bet1}
                      onChange={(e) => handleBetInputChange("bet1", e.target.value)}
                      onBlur={(e) => handleBetValueChange("bet1", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.target.blur();
                        }
                      }}
                      className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="0"
                      onClick={(e) => e.stopPropagation()}
                      disabled={isBettingDisabled}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-[2vh]">
                <span className="text-white text-[1vw] sm-font w-full text-center">
                  3,4,7,8,11,12
                </span>
                <button 
                  className={`bg-gray-800 text-white px-[8%] py-[1%] rounded-full border-2 border-white hover:bg-black transition-colors text-[1vw] font-semibold mb-[2%] w-[70%] hover:scale-105 text-center ${
                    (selectedButton || []).includes('black') ? "ring-2 ring-yellow-400" : ""
                  } ${isBettingDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleButtonSelection('black')}
                  disabled={isBettingDisabled}
                >
                  BLACK
                </button>
                <div
                  className={`relative w-full transition-transform mt-[1vh] ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  } ${
                    isBettingNumberHighlighted(2)
                      ? "border-2 border-yellow-400 rounded-lg"
                      : ""
                  }`}
                  onClick={() => !isBettingDisabled && handleBettingNumberSelection(2)}
                >
                  <img
                    src={betNum2}
                    alt="Bet Number 2"
                    className="w-full h-[15vh] object-fill"
                  />
                  <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                    <input
                      type="number"
                      value={betValues.bet2}
                      onChange={(e) => handleBetInputChange("bet2", e.target.value)}
                      onBlur={(e) => handleBetValueChange("bet2", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.target.blur();
                        }
                      }}
                      className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="0"
                      onClick={(e) => e.stopPropagation()}
                      disabled={isBettingDisabled}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-[2vh]">
                <span className="text-white text-[1vw] sm-font w-full text-center">
                  1,3,5,7,9,11
                </span>
                <button 
                  className={`bg-[#0ac2f6] text-white px-[8%] py-[1%] rounded-full border-2 border-white hover:bg-[#0288ad] transition-colors text-[1vw] font-semibold mb-[2%] w-[70%] hover:scale-105 text-center ${
                    (selectedButton || []).includes('odd') ? "ring-2 ring-yellow-400" : ""
                  } ${isBettingDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleButtonSelection('odd')}
                  disabled={isBettingDisabled}
                >
                  ODD
                </button>
                <div
                  className={`relative w-full transition-transform mt-[1vh] ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  } ${
                    isBettingNumberHighlighted(3)
                      ? "border-2 border-yellow-400 rounded-lg"
                      : ""
                  }`}
                  onClick={() => !isBettingDisabled && handleBettingNumberSelection(3)}
                >
                  <img
                    src={betNum3}
                    alt="Bet Number 3"
                    className="w-full h-[15vh] object-fill"
                  />
                  <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                    <input
                      type="number"
                      value={betValues.bet3}
                      onChange={(e) => handleBetInputChange("bet3", e.target.value)}
                      onBlur={(e) => handleBetValueChange("bet3", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.target.blur();
                        }
                      }}
                      className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="0"
                      onClick={(e) => e.stopPropagation()}
                      disabled={isBettingDisabled}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-[2vh]">
                <span className="text-white text-[1vw] sm-font w-full text-center">
                  2,4,6,8,10,12
                </span>
                <button 
                  className={`bg-[#8b04d2] text-white px-[8%] py-[1%] rounded-full border-2 border-white hover:bg-[#6a039e] transition-colors text-[1vw] font-semibold mb-[2%] w-[70%] hover:scale-105 text-center ${
                    (selectedButton || []).includes('even') ? "ring-2 ring-yellow-400" : ""
                  } ${isBettingDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleButtonSelection('even')}
                  disabled={isBettingDisabled}
                >
                  EVEN
                </button>
                <div
                  className={`relative w-full transition-transform mt-[1vh] ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  } ${
                    isBettingNumberHighlighted(4)
                      ? "border-2 border-yellow-400 rounded-lg"
                      : ""
                  }`}
                  onClick={() => !isBettingDisabled && handleBettingNumberSelection(4)}
                >
                  <img
                    src={betNum4}
                    alt="Bet Number 4"
                    className="w-full h-[15vh] object-fill"
                  />
                  <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                    <input
                      type="number"
                      value={betValues.bet4}
                      onChange={(e) => handleBetInputChange("bet4", e.target.value)}
                      onBlur={(e) => handleBetValueChange("bet4", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.target.blur();
                        }
                      }}
                      className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="0"
                      onClick={(e) => e.stopPropagation()}
                      disabled={isBettingDisabled}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`relative w-full transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                } ${
                  isBettingNumberHighlighted(5)
                    ? "border-2 border-yellow-400 rounded-lg"
                    : ""
                }`}
                onClick={() => !isBettingDisabled && handleBettingNumberSelection(5)}
              >
                <img
                  src={betNum5}
                  alt="Bet Number 5"
                  className="w-full h-[15vh] object-fill"
                />
                <div className="absolute bottom-[22%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                  <input
                    type="number"
                    value={betValues.bet5}
                    onChange={(e) => handleBetInputChange("bet5", e.target.value)}
                    onBlur={(e) => handleBetValueChange("bet5", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBettingDisabled}
                  />
                </div>
              </div>
              <div
                className={`relative w-full transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                } ${
                  isBettingNumberHighlighted(6)
                    ? "border-2 border-yellow-400 rounded-lg"
                    : ""
                }`}
                onClick={() => !isBettingDisabled && handleBettingNumberSelection(6)}
              >
                <img
                  src={betNum6}
                  alt="Bet Number 6"
                  className="w-full h-[15vh] object-fill"
                />
                <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                  <input
                    type="number"
                    value={betValues.bet6}
                    onChange={(e) => handleBetInputChange("bet6", e.target.value)}
                    onBlur={(e) => handleBetValueChange("bet6", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBettingDisabled}
                  />
                </div>
              </div>
              <div
                className={`relative w-full transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                } ${
                  isBettingNumberHighlighted(7)
                    ? "border-2 border-yellow-400 rounded-lg"
                    : ""
                }`}
                onClick={() => !isBettingDisabled && handleBettingNumberSelection(7)}
              >
                <img
                  src={betNum7}
                  alt="Bet Number 7"
                  className="w-full h-[15vh] object-fill"
                />
                <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                  <input
                    type="number"
                    value={betValues.bet7}
                    onChange={(e) => handleBetInputChange("bet7", e.target.value)}
                    onBlur={(e) => handleBetValueChange("bet7", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBettingDisabled}
                  />
                </div>
              </div>
              <div
                className={`relative w-full transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                } ${
                  isBettingNumberHighlighted(8)
                    ? "border-2 border-yellow-400 rounded-lg"
                    : ""
                }`}
                onClick={() => !isBettingDisabled && handleBettingNumberSelection(8)}
              >
                <img
                  src={betNum8}
                  alt="Bet Number 8"
                  className="w-full h-[15vh] object-fill"
                />
                <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                  <input
                    type="number"
                    value={betValues.bet8}
                    onChange={(e) => handleBetInputChange("bet8", e.target.value)}
                    onBlur={(e) => handleBetValueChange("bet8", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBettingDisabled}
                  />
                </div>
              </div>
              <div
                className={`relative w-full transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                } ${
                  isBettingNumberHighlighted(9)
                    ? "border-2 border-yellow-400 rounded-lg"
                    : ""
                }`}
                onClick={() => !isBettingDisabled && handleBettingNumberSelection(9)}
              >
                <img
                  src={betNum9}
                  alt="Bet Number 9"
                  className="w-full h-[15vh] object-fill"
                />
                <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                  <input
                    type="number"
                    value={betValues.bet9}
                    onChange={(e) => handleBetInputChange("bet9", e.target.value)}
                    onBlur={(e) => handleBetValueChange("bet9", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBettingDisabled}
                  />
                </div>
              </div>
              <div
                className={`relative w-full transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                } ${
                  isBettingNumberHighlighted(10)
                    ? "border-2 border-yellow-400 rounded-lg"
                    : ""
                }`}
                onClick={() => !isBettingDisabled && handleBettingNumberSelection(10)}
              >
                <img
                  src={betNum10}
                  alt="Bet Number 10"
                  className="w-full h-[15vh] object-fill"
                />
                <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                  <input
                    type="number"
                    value={betValues.bet10}
                    onChange={(e) => handleBetInputChange("bet10", e.target.value)}
                    onBlur={(e) => handleBetValueChange("bet10", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBettingDisabled}
                  />
                </div>
              </div>
              <div
                className={`relative w-full transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                } ${
                  isBettingNumberHighlighted(11)
                    ? "border-2 border-yellow-400 rounded-lg"
                    : ""
                }`}
                onClick={() => !isBettingDisabled && handleBettingNumberSelection(11)}
              >
                <img
                  src={betNum11}
                  alt="Bet Number 11"
                  className="w-full h-[15vh] object-fill"
                />
                <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                  <input
                    type="number"
                    value={betValues.bet11}
                    onChange={(e) => handleBetInputChange("bet11", e.target.value)}
                    onBlur={(e) => handleBetValueChange("bet11", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBettingDisabled}
                  />
                </div>
              </div>
              <div
                className={`relative w-full transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                } ${
                  isBettingNumberHighlighted(12)
                    ? "border-2 border-yellow-400 rounded-lg"
                    : ""
                }`}
                onClick={() => !isBettingDisabled && handleBettingNumberSelection(12)}
              >
                <img
                  src={betNum12}
                  alt="Bet Number 12"
                  className="w-full h-[15vh] object-fill"
                />
                <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[60%] h-[20%] bg-black rounded-full flex items-center justify-center">
                  <input
                    type="number"
                    value={betValues.bet12}
                    onChange={(e) => handleBetInputChange("bet12", e.target.value)}
                    onBlur={(e) => handleBetValueChange("bet12", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    className="w-full h-full bg-transparent border-none outline-none text-white text-center text-[1vw] font-semibold placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isBettingDisabled}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Images - Positioned on the right side of betting area */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <img
              src={arrowLeft}
              alt="Arrow Up"
              className={`absolute object-contain transition-transform pointer-events-auto ${
                isBettingDisabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 cursor-pointer"
              } ${
                (selectedButton || []).includes('arrow1') ? "rounded-lg" : ""
              }`}
              style={{
                width: "8%",
                height: "auto",
                top: "28.5%",
                right: "0%",
              }}
              onClick={() => !isBettingDisabled && handleButtonSelection('arrow1')}
            />
            <img
              src={arrowLeft}
              alt="Arrow Up"
              className={`absolute object-contain transition-transform pointer-events-auto ${
                isBettingDisabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 cursor-pointer"
              } ${
                (selectedButton || []).includes('arrow2') ? "rounded-lg" : ""
              }`}
              style={{
                width: "8%",
                height: "auto",
                top: "51.5%",
                right: "0%",
              }}
              onClick={() => !isBettingDisabled && handleButtonSelection('arrow2')}
            />
            <img
              src={arrowLeft}
              alt="Arrow Up"
              className={`absolute object-contain transition-transform pointer-events-auto ${
                isBettingDisabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 cursor-pointer"
              } ${
                (selectedButton || []).includes('arrow3') ? "rounded-lg" : ""
              }`}
              style={{
                width: "8%",
                height: "auto",
                top: "76%",
                right: "0%",
              }}
              onClick={() => !isBettingDisabled && handleButtonSelection('arrow3')}
            />
            <img
              src={arrowUp}
              alt="Arrow Left"
              className={`absolute object-contain transition-transform pointer-events-auto ${
                isBettingDisabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 cursor-pointer"
              } ${
                (selectedButton || []).includes('arrow4') ? "rounded-lg" : ""
              }`}
              style={{
                width: "8%",
                height: "auto",
                bottom: "0%",
                left: "15.5%",
              }}
              onClick={() => !isBettingDisabled && handleButtonSelection('arrow4')}
            />
            <img
              src={arrowUp}
              alt="Arrow Left"
              className={`absolute object-contain transition-transform pointer-events-auto ${
                isBettingDisabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 cursor-pointer"
              } ${
                (selectedButton || []).includes('arrow5') ? "rounded-lg" : ""
              }`}
              style={{
                width: "8%",
                height: "auto",
                bottom: "0%",
                left: "36%",
              }}
              onClick={() => !isBettingDisabled && handleButtonSelection('arrow5')}
            />
            <img
              src={arrowUp}
              alt="Arrow Left"
              className={`absolute object-contain transition-transform pointer-events-auto ${
                isBettingDisabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 cursor-pointer"
              } ${
                (selectedButton || []).includes('arrow6') ? "rounded-lg" : ""
              }`}
              style={{
                width: "8%",
                height: "auto",
                bottom: "0%",
                left: "56.5%",
              }}
              onClick={() => !isBettingDisabled && handleButtonSelection('arrow6')}
            />
            <img
              src={arrowUp}
              alt="Arrow Left"
              className={`absolute object-contain transition-transform pointer-events-auto ${
                isBettingDisabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 cursor-pointer"
              } ${
                (selectedButton || []).includes('arrow7') ? "rounded-lg" : ""
              }`}
              style={{
                width: "8%",
                height: "auto",
                bottom: "0%",
                left: "77%",
              }}
              onClick={() => !isBettingDisabled && handleButtonSelection('arrow7')}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-center text-white"></div>
        <div className="flex items-center justify-center text-white"></div>

        {/* Row 3 */}
        <div
          className="border-2 border-yellow-500 bg-gray-900 relative flex flex-col overflow-hidden"
          style={{
            gridRow: "span 8",
            gridColumn: "span 2",
          }}
        >
          {/* DRAW TIME Banner */}
          <div className="bg-amber-900 border-yellow-500 py-1 px-2">
            <div className="text-yellow-400 font-bold text-center text-md">
              DRAW TIME
            </div>
          </div>

          {/* Running Game Time Display */}
          <div className="bg-purple-800 border-t-2 border-yellow-500 py-2 px-2">
            <div className="text-white font-bold text-center text-3xl">
              {runningGameTime || "--:--"}
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-teal-800 border-t-2 border-yellow-500 py-2 px-4 flex">
            <div className="flex-1 text-white font-bold text-md text-center">TIME</div>
            <div className="flex-1 text-white font-bold text-md text-center"> RESULT </div>
          </div>

          {/* Table Rows */}
          <div className="flex-1 border-t-2 border-yellow-500 overflow-y-auto">
            <table className="w-full h-full border-collapse">
              <tbody className="h-full">
                {latestGames.length > 0 ? (
                  latestGames.map((draw, index) => (
                    <tr
                      key={index}
                      className="bg-blue-600 border-b border-yellow-500"
                    >
                      <td className="text-white text-sm px-2 border border-yellow-500 timeResult">
                        {draw.time}
                      </td>
                      <td className="text-yellow-400 text-sm px-2 border border-yellow-500 text-center">
                        {draw.result ? (
                          <div className="flex items-center justify-center gap-2">
                            <img
                              src={getDrawIcon(draw.result)}
                              alt={`Result ${draw.result}`}
                              className="imgResult object-contain"
                            />
                            <span className="textMultiplier">{draw.multiplier}x</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-white text-sm py-4 px-4 text-center"
                    >
                      No game data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 4 */}

        {/* Row 5 */}

        {/* Row 6 */}

        {/* Row 7 */}

        {/* Row 8 */}

        {/* Row 9 */}

        {/* Row 10 */}
        <div
          className="relative ml-[5vh] mr-[5vh]"
          style={{
            gridColumn: "span 5",
          }}
        >
          <img
            src={playAndWin}
            alt="Play and Win"
            className="w-full h-full object-fill betStatusText"
          />
          <div className="absolute inset-0 flex items-center justify-around ">
            <div className="text-white font-bold text-2xl">
              PLAY: <span className="text-orange-500">{totalBetPlacedInRound}</span>
            </div>
            <div className="text-white font-bold text-2xl">
              WIN: <span className="text-green-500">{winAmount}</span>
            </div>
          </div>
        </div>

        {/* Row 11 - Merged cell with buttons on left and coins on right */}
        <div
          className="relative"
          style={{
            gridRow: "span 2",
            gridColumn: "span 12",
          }}
        >
          <div className="relative w-full h-full flex">
            {/* Left half - Buttons */}
            <div className="w-1/2 h-full flex items-center justify-around gap-2 p-4">
              <div
                className={`relative w-36 h-36 transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                }`}
                onClick={() => !isBettingDisabled && handleRepeatClick()}
              >
                <img
                  src={betButton}
                  alt="Bet Button 1"
                  className="h-full max-h-full w-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-lg">REPEAT</span>
                </div>
              </div>
              <div
                className={`relative w-36 h-36 transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                }`}
                onClick={() => !isBettingDisabled && handleDoubleClick()}
              >
                <img
                  src={betButton}
                  alt="Bet Button 2"
                  className="h-full max-h-full w-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-lg">DOUBLE</span>
                </div>
              </div>
              <div
                className={`relative w-36 h-36 transition-transform ${
                  isBettingDisabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                }`}
                onClick={() => {
                  playAllBtnSound();
                  if (isBettingDisabled) {
                    toast.error("Betting is disabled in the last 20 seconds of the round.");
                    return;
                  }
                  const emptyBets = {};
                  for (let i = 1; i <= 12; i++) {
                    emptyBets[`bet${i}`] = "";
                  }
                  setBetValues(emptyBets);
                  clearAllSelections();
                }}
              >
                <img
                  src={betButton}
                  alt="Bet Button 3"
                  className="h-full max-h-full w-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-lg">CLEAR</span>
                </div>
              </div>
              <div
                className={`relative w-36 h-36 transition-transform ${
                  isBettingDisabled || isBettingInProgress
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:scale-105"
                }`}
                onClick={() => !isBettingDisabled && !isBettingInProgress && handleBetClick()}
              >
                <img
                  src={betButton}
                  alt="Bet Button 4"
                  className="h-full max-h-full w-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-lg">BET</span>
                </div>
              </div>
            </div>
            {/* Right half - Coins with background */}
            <div className="w-1/2 h-full relative">
              {/* Background image */}
              <img
                src={betCoinBg}
                alt="Bet Coin Background"
                className="w-full h-full absolute inset-0"
              />
              {/* Bet coins overlay */}
              <div className="relative w-full h-full flex items-center justify-around gap-2 p-4 pl-8">
                <img
                  src={betCoin10}
                  alt="10 Coin"
                  className={`h-full max-h-full w-auto object-contain transition-transform ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  }`}
                  onClick={() => !isBettingDisabled && handleCoinClick(10)}
                />
                <img
                  src={betCoin20}
                  alt="20 Coin"
                  className={`h-full max-h-full w-auto object-contain transition-transform ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  }`}
                  onClick={() => !isBettingDisabled && handleCoinClick(20)}
                />
                <img
                  src={betCoin50}
                  alt="50 Coin"
                  className={`h-full max-h-full w-auto object-contain transition-transform ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  }`}
                  onClick={() => !isBettingDisabled && handleCoinClick(50)}
                />
                <img
                  src={betCoin100}
                  alt="100 Coin"
                  className={`h-full max-h-full w-auto object-contain transition-transform ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  }`}
                  onClick={() => !isBettingDisabled && handleCoinClick(100)}
                />
                <img
                  src={betCoin500}
                  alt="500 Coin"
                  className={`h-full max-h-full w-auto object-contain transition-transform ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  }`}
                  onClick={() => !isBettingDisabled && handleCoinClick(500)}
                />
                <img
                  src={betCoin1000}
                  alt="1000 Coin"
                  className={`h-full max-h-full w-auto object-contain transition-transform ${
                    isBettingDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:scale-105"
                  }`}
                  onClick={() => !isBettingDisabled && handleCoinClick(1000)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Popup Modal */}
      <InformationPopup
        isOpen={showInfoPopup}
        onClose={() => setShowInfoPopup(false)}
        userId={userId}
      />

      {/* Receipt Popup */}
      {showReceipt && receiptData && (
        <Receipt
          receiptData={receiptData}
          onClose={() => {
            setShowReceipt(false);
            setReceiptData(null);
          }}
        />
      )}

      {/* Attention Popup - Already Scanned */}
      {showAttentionPopup && (
        <AttentionPopup
          message={claimMessage || "This ticket has already been scanned."}
          onClose={() => {
            setShowAttentionPopup(false);
            setClaimMessage("");
          }}
        />
      )}

      {/* Congratulations Popup - Winner */}
      {showCongratulationsPopup && (
        <CongratulationsPopup
          coins={claimCoins}
          message={`You have won `}
          onClose={() => {
            setShowCongratulationsPopup(false);
            setClaimCoins(0);
          }}
        />
      )}

      {/* Oops Popup - No Winner */}
      {showOopsPopup && (
        <OopsPopup
          message={claimMessage || "There have no winning ticket. Better luck next time."}
          onClose={() => {
            setShowOopsPopup(false);
            setClaimMessage("");
          }}
        />
      )}
    </div>
  );
};

export default Landing;

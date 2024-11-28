import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDyzIuow1wVwnysfY2WHGUeBhKBGDXVZuc",
  authDomain: "ultimate-analytics-9d0be.firebaseapp.com",
  projectId: "ultimate-analytics-9d0be",
  storageBucket: "ultimate-analytics-9d0be.firebasestorage.app",
  messagingSenderId: "108249184507",
  appId: "1:108249184507:web:d4653164cec30c6fecd85e",
  measurementId: "G-85NGN7TB3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// App identifier to distinguish from other apps
const APP_ID = 'hercules_dex';

// Custom event logger that includes app identifier
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  const enhancedParams = {
    ...eventParams,
    app_id: APP_ID,
    timestamp: new Date().toISOString()
  };
  
  logEvent(analytics, eventName, enhancedParams);
};

// Predefined events
export const Events = {
  // Wallet events
  WALLET_CONNECTED: 'wallet_connected',
  WALLET_DISCONNECTED: 'wallet_disconnected',
  NETWORK_SWITCHED: 'network_switched',
  
  // Swap events
  SWAP_INITIATED: 'swap_initiated',
  SWAP_COMPLETED: 'swap_completed',
  SWAP_FAILED: 'swap_failed',
  SWAP_CANCELLED: 'swap_cancelled',
  
  // Token selection events
  TOKEN_SELECTED: 'token_selected',
  
  // Amount input events
  AMOUNT_ENTERED: 'amount_entered',
  MAX_AMOUNT_SELECTED: 'max_amount_selected',
  
  // Transaction events
  TRANSACTION_SUBMITTED: 'transaction_submitted',
  TRANSACTION_CONFIRMED: 'transaction_confirmed',
  TRANSACTION_FAILED: 'transaction_failed',
  
  // Approval events
  TOKEN_APPROVAL_INITIATED: 'token_approval_initiated',
  TOKEN_APPROVAL_COMPLETED: 'token_approval_completed',
  TOKEN_APPROVAL_FAILED: 'token_approval_failed'
};

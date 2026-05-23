export const FIREBASE_PATHS = {
  users: 'users',
  devices: 'devices',
  feedingLogs: 'feedingLogs',
  sensorData: 'sensorData',
  schedules: 'feedingSchedules',
  notifications: 'notifications',
  camera: 'camera',
};

const stub = () => console.warn('Firebase not configured — running in demo mode');

export const getAuth = () => ({currentUser: null, onAuthStateChanged: stub});
export const getDatabase = () => ({ref: stub});
export const getStorage = () => ({ref: stub});
export const getMessaging = () => ({onMessage: stub, getToken: stub});

export const signUpWithEmail = stub;
export const signInWithEmail = stub;
export const signOut = stub;
export const getCurrentUser = () => null;
export const onAuthStateChanged = stub;
export const getDeviceData = stub;
export const getDeviceStatus = stub;
export const sendFeedCommand = stub;
export const getFeedingLogs = stub;
export const addFeedingSchedule = stub;
export const getFeedingSchedules = stub;
export const updateFeedingSchedule = stub;
export const deleteFeedingSchedule = stub;
export const getNotifications = stub;
export const markNotificationRead = stub;
export const getCameraStreamUrl = stub;
export const requestNotificationPermission = async () => true;
export const getFcmToken = async () => null;
export const onMessageReceived = stub;
export const onNotificationOpenedApp = stub;
export const getInitialNotification = async () => null;

export default {
  FIREBASE_PATHS,
  getAuth,
  getDatabase,
  getStorage,
  signUpWithEmail,
  signInWithEmail,
  signOut,
  getCurrentUser,
  onAuthStateChanged,
};

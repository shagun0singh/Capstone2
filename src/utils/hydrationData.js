// Constants
const STORAGE_KEYS = {
  USER_DATA: 'userData',
  TODAY_INTAKE: 'todayWaterIntake',
  WEEKLY_STATS: 'weeklyStats',
  HYDRATION_GOAL: 'hydrationGoal',
  STREAK: 'streak',
  LAST_UPDATED: 'lastUpdated',
  TODAY_HISTORY: 'todayHistory'
};

// Helper functions
const getCurrentDate = () => {
  return new Date().toLocaleDateString();
};

const getDayOfWeek = () => {
  return new Date().getDay();
};

// Data management functions
export const initializeData = () => {
  const lastUpdated = localStorage.getItem(STORAGE_KEYS.LAST_UPDATED);
  const today = getCurrentDate();

  // Reset daily intake if it's a new day
  if (lastUpdated !== today) {
    localStorage.setItem(STORAGE_KEYS.TODAY_INTAKE, '0');
    localStorage.setItem(STORAGE_KEYS.TODAY_HISTORY, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATED, today);
    
    // Update streak if goal was met yesterday
    const yesterdayIntake = parseInt(localStorage.getItem(STORAGE_KEYS.TODAY_INTAKE) || '0');
    const goal = parseInt(localStorage.getItem(STORAGE_KEYS.HYDRATION_GOAL) || '2000');
    const currentStreak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0');
    
    if (yesterdayIntake >= goal) {
      localStorage.setItem(STORAGE_KEYS.STREAK, (currentStreak + 1).toString());
    } else {
      localStorage.setItem(STORAGE_KEYS.STREAK, '0');
    }
  }
};

export const updateWaterIntake = (amount) => {
  const currentIntake = parseInt(localStorage.getItem(STORAGE_KEYS.TODAY_INTAKE) || '0');
  const newIntake = currentIntake + amount;
  localStorage.setItem(STORAGE_KEYS.TODAY_INTAKE, newIntake.toString());

  // Update history
  const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODAY_HISTORY) || '[]');
  const newEntry = {
    amount,
    time: new Date().toLocaleTimeString()
  };
  history.unshift(newEntry);
  localStorage.setItem(STORAGE_KEYS.TODAY_HISTORY, JSON.stringify(history));

  // Update weekly stats
  const dayOfWeek = getDayOfWeek();
  const weeklyStats = JSON.parse(localStorage.getItem(STORAGE_KEYS.WEEKLY_STATS) || '{"labels":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"datasets":[{"data":[0,0,0,0,0,0,0]}]}');
  weeklyStats.datasets[0].data[dayOfWeek] = newIntake;
  localStorage.setItem(STORAGE_KEYS.WEEKLY_STATS, JSON.stringify(weeklyStats));

  // Update streak if goal is met
  const goal = parseInt(localStorage.getItem(STORAGE_KEYS.HYDRATION_GOAL) || '2000');
  if (newIntake >= goal) {
    const currentStreak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0');
    localStorage.setItem(STORAGE_KEYS.STREAK, (currentStreak + 1).toString());
  }

  return { newIntake, history };
};

export const getHydrationData = () => {
  return {
    todayIntake: parseInt(localStorage.getItem(STORAGE_KEYS.TODAY_INTAKE) || '0'),
    goal: parseInt(localStorage.getItem(STORAGE_KEYS.HYDRATION_GOAL) || '2000'),
    streak: parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0'),
    weeklyStats: JSON.parse(localStorage.getItem(STORAGE_KEYS.WEEKLY_STATS) || '{"labels":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"datasets":[{"data":[0,0,0,0,0,0,0]}]}'),
    userData: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_DATA) || '{"name":"John Doe","weight":70,"dailyGoal":2000}'),
    history: JSON.parse(localStorage.getItem(STORAGE_KEYS.TODAY_HISTORY) || '[]')
  };
};

export const updateUserData = (userData) => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  localStorage.setItem(STORAGE_KEYS.HYDRATION_GOAL, userData.dailyGoal.toString());
};

export const resetDailyIntake = () => {
  localStorage.setItem(STORAGE_KEYS.TODAY_INTAKE, '0');
  localStorage.setItem(STORAGE_KEYS.TODAY_HISTORY, JSON.stringify([]));
  return { newIntake: 0, history: [] };
}; 
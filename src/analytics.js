import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-KR4JLWWJ8R'); // Replace with your Google Analytics tracking ID
};

export const logPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const logEvent = (category, action) => {
  ReactGA.event({
    category,
    action,
  });
};

export const trackDailyVisits = () => {
  ReactGA.set({ dimension1: new Date().toISOString().slice(0, 10) });
  ReactGA.event({
    category: 'Daily Metrics',
    action: 'Visit',
  });
};

export const trackUsageTime = startTime => {
  const currentTime = new Date();
  const elapsedTimeInSeconds = (currentTime - startTime) / 1000;
  ReactGA.timing({
    category: 'Daily Metrics',
    variable: 'Usage Time',
    value: elapsedTimeInSeconds,
  });
};

import ReactGA from "react-ga4";

ReactGA.initialize("YOUR-GA4-MEASUREMENT-ID");

export const trackEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

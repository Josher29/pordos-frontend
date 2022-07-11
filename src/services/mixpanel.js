import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN,{
    persistence: "localStorage",
    secure_cookie: true,
});

const Mixpanel = {
    identify: (id) => {
        mixpanel.identify(id);
    },
    alias: (id) => {
        mixpanel.alias(id);
    },
    track: (name, props) => {
        mixpanel.track(name, props);
    },
    people: {
        set: (props) => {
            mixpanel.people.set(props);
        }
    },
    TYPES: {
        OPEN_PROFILE: "OPEN_PROFILE",
        LOG_OUT: "LOG_OUT",
        OPEN_THEME_BY_SIDEBAR: "OPEN_THEME_BY_SIDEBAR",
    }
};

export default Mixpanel;
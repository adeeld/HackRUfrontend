/**
 * @author Shivan Modha
 * @description Application default settings
 * @version 0.0.1
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React from "react";
import About from "./components/Landing/Sections/About";
import Schedule from "./components/Landing/Sections/Schedule";
import Sponsors from "./components/Landing/Sections/Sponsors";
import FAQs from "./components/Landing/Sections/Faqs";
import Footer from "./components/Landing/Sections/Footer";
/***************************************************************IMPORTS***************************************************************/

/***************************************************************STRINGS***************************************************************/
const defaults =  {
    "title": "HackRU Spring 2019",
    "dateText": "March 9th-10th",
    "locationText": "College Avenue Student Center",
    "universityText": "Rutgers University",
    "mobileWidthThresholdSensitive": 1500,
    "mobileWidthThresholdRelaxed": 1200,
    "poc": true,
    "rest": {
        "dev": "https://7c5l6v7ip3.execute-api.us-west-2.amazonaws.com/lcs-test",
        "prod": "https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest"
    }
}
/***************************************************************STRINGS***************************************************************/

/***************************************************************NAVLINK***************************************************************/
const navlinks = {
    "About Us": {
        "url": "#about",
        "enabled": true,
        "fullHeight": false,
        "component": (props) => <About {...props} />
    },
    "Schedule": {
        "url": "#schedule",
        "enabled": true,
        "fullHeight": false,
        "component": (props) => <Schedule {...props} />
    },
    "Sponsors": {
        "url": "#sponsors",
        "enabled": true,
        "fullHeight": false,
        "component": (props) => <Sponsors {...props} />
    },
    "FAQs": {
        "url": "#faqs",
        "enabled": true,
        "fullHeight": false,
        "component": (props) => <FAQs {...props} />
    },
    "Footer": {
        "url": "#footer",
        "enabled": true,
        "fullHeight": false,
        "skew": false,
        "component": (props) => <Footer {...props} />
    }
}
/***************************************************************NAVLINK***************************************************************/

/****************************************************************THEME****************************************************************/
const theme = {
    "primary": ["#26E8BD", "#5FFFDC"],
    "secondary": ["#5A7A96", "#354a5f"],
    "accent": ["#FF80CF", "#F8A5FF"]
}
/****************************************************************THEME****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export {
    defaults,
    navlinks,
    theme
};
/***************************************************************EXPORTS***************************************************************/
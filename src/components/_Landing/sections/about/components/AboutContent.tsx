/* eslint-disable no-unreachable */
/* eslint-disable indent */
import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import Card from "../../../global_components/CardAbout";
import { theme } from "../../../Default";
import squirrel from "../../../assets/ananyaSquirrel.png";
import bear from "../../../assets/judyBear.png";
import hedgehog from "../../../assets/katrinaHedgehog.png";
import useAboutConfig from "../hooks/useConfigAbout";
import "./AboutContent.css";
import { defaults } from "../../../Default";


const Introduction = (headerTextAlignment: string) => {
    switch (headerTextAlignment) {
        case "left":
            return "text-5xl theme-font ml-6";
        case "middle":
            return "text-5xl theme-font ml-6 text-center pr-5";
        default:

    }
};

const subTextAlignmentPosition = (subTextAlignment: string) => {
    switch (subTextAlignment) {
        case "left":
            return "text-left";
        case "middle":
            return "text-center";
        case "right":
            return "text-right";
        default:
            return "";
    }
};

const showHorizontalLine = (horizontalBar: boolean) => {
    switch (horizontalBar) {
        case true:
            return;
        default:
            return "hidden";
    }
};

function TypeOfIcon(props: {
    type: string
}) {
    const { type } = props;
    switch (type) {
        case "questionmark":
            return (<div style={{
                display: "flex",

            }}>
                <AiFillQuestionCircle />
                <span style={{
                    marginLeft: 10
                }}>
                    What?
                </span>

            </div>);
        case "calendar":
            return (<div style={{
                display: "flex",

            }}>
                <BsFillCalendarCheckFill />
                <span style={{
                    marginLeft: 10
                }}>
                    When?
                </span>

            </div>);
            {/* last one is location icon */ }
        default:
            return (<div style={{
                display: "flex",

            }}>
                <MdLocationOn />
                <span style={{
                    marginLeft: 10
                }}>
                    Where?
                </span>

            </div>);
    }

}
function HeaderTextAlignmentFunc(props: {
    subTextAlignment: 'left' | 'middle' | 'right' | 'NA',
    icon: string
}) {
    const { subTextAlignment, icon } = props;
    switch (subTextAlignment) {
        case "left":
            return (<h2
                className="display-6 text-4xl"
                style={{
                    display: "inline-block",
                    marginBottom: 25,
                    backgroundColor: theme.accent[1],
                    padding: 10,
                    marginLeft: -50,
                    paddingLeft: 50,
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    paddingRight: 25,
                }}
            >
                <TypeOfIcon type={icon} />
            </h2>);
        case "middle":
            return (
                <h2
                    className="display-6 text-4xl"
                    style={{

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 25,
                        backgroundColor: theme.accent[1],
                        padding: 12,
                        paddingLeft: 13,
                        paddingRight: 20,
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderTopLeftRadius: 25,
                    }}
                >
                    <TypeOfIcon type={icon} />


                </h2>);

        default:
            return (
                <h2
                    className="display-6 text-4xl"
                    style={{
                        display: "inline-block",
                        marginBottom: 25,
                        backgroundColor: theme.accent[1],
                        padding: 10,
                        marginLeft: -50,
                        paddingLeft: 50,
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                        paddingRight: 25,
                    }}
                >
                    <TypeOfIcon type={icon} />

                </h2>);
    }
}




function AboutContent() {
    const { mainComponent } = useAboutConfig();
    const {
        horizontalBarsVisible,
        headerTextAlignment,
        subTextAlignment,
        useSplitCards,
    } = mainComponent;

    if (useSplitCards) {
        return (
            <div className="grid sm-about:grid-cols-1 lg-about:grid-cols-2 xl-about:grid-cols-2 max-w-[120rem]">
                {/* Header Text */}
                <div className="glow basis-1 lg-about:col-span-2 flex HeaderText text-7xl text-text glow-subtitles font-semibold"
                    style={{
                        margin: "60px 100px 0px 100px"
                    }}>
                    About
                </div>

                {/* first row */}
                <div className='sm-about:order-1 lg-about:order-1'
                    style={{
                        margin: "auto"
                    }}>
                    <Card backgroundColor={theme.splitCard[0]}>
                        <div style={{}}>
                            <h1 className="glow text-6xl text-text">
                                What
                            </h1>
                            <p className="textStyle">
                                HackRU is a 24-hour hackathon at Rutgers University. We welcome
                                hundreds of students to join us in building awesome tech projects.
                                Industry experts and mentors help foster an atmosphere of learning
                                through tech-talks and one-on-one guidance. We encourage all
                                students, no matter their experience level or educational
                                background, to challenge themselves and expand their creative,
                                technical, and collaboration skills at HackRU.
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="flex justify-center sm-about:order-2 lg-about:order-2" >
                    <img src={bear}
                        className="imgClass floating"
                        alt="problem" />
                </div>

                {/* second row */}
                {/* xsm is created because the order reverts back in 300px measurements idk why. */}
                {/* there is not sm/xs ordering. IDK why but once after merge with main, it didn't work */}
                <div className="flex justify-center sm-about:order-4 lg-about:order-3" >
                    <img src={hedgehog}
                        className="imgClass floating"
                        alt="problem" />
                </div>

                <div className='sm-about:order-3 lg-about:order-4'
                    style={{
                        margin: "auto"
                    }}>
                    <Card backgroundColor={theme.splitCard[0]}>
                        <div style={{}}>
                            <h1 className="glow text-6xl text-text">
                                Where
                            </h1>
                            <p className="textStyle">
                                HackRU is at The Rutgers College Ave Student Center for Spring 2023!
                            </p>
                        </div>
                    </Card>
                </div>



                {/* third row */}
                <div className='sm-about:order-5  lg-about:order-5'
                    style={{
                        margin: "auto"
                    }}>
                    <Card backgroundColor={theme.splitCard[0]}>
                        <div style={{}}>
                            <h1 className="glow text-6xl text-text">
                                Join Us!
                            </h1>
                            <p className="textStyle">
                                <div>
                                    Want to help? Sign up to{" "}
                                    <a className="underline"
                                        href={defaults.volunteers.vol_url}>volunteer</a> or{" "}
                                    <a className="underline"
                                        href={defaults.volunteers.mentor_url}>mentor</a>!
                                </div>
                            </p>
                            <p className="textStyle">
                                <div>
                                    Want to receive updates? Subscribe{" "}
                                    <a className="underline"
                                        href={defaults.mailing}>here</a>!
                                </div>
                            </p>
                        </div>
                    </Card>
                </div>
                <div className="flex justify-center sm-about:order-6 lg-about:order-6" >
                    <img src={squirrel}
                        className="imgClass floating"
                        alt="problem" />
                </div>
            </div>

        );
    }
    else {
        return (
            <Card backgroundColor={theme.secondary[1]}
                sideBar={theme.accent[0]}>
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: 30,
                            right: 20,
                            userSelect: "none",
                            pointerEvents: "none",
                            zIndex: 10,
                            transform: "rotate(-175deg)",
                        }}
                    >
                    </div>
                    <h1 className={`${Introduction(headerTextAlignment)}`}>About HackRU</h1>
                    {/* entire card besides "About HackRU" */}
                    <div className="flex flex-wrap  mb-3"
                        style={{ marginLeft: -20 }}>

                        {/* What Section */}
                        <div
                            style={{ color: "white", padding: 50, paddingBottom: 10 }}
                            className="sm-about:w-full pr-4 pl-4 sm-about:w-full pr-4 pl-4"
                        >
                            {/* thickness of horizontal bar in What */}
                            <div className={`${showHorizontalLine(horizontalBarsVisible)}`}
                                style={{
                                    position: "absolute",
                                    backgroundColor: theme.accent[0],
                                    height: 10,
                                    width: "calc(100% - 228px)",
                                    right: 0,
                                    marginTop: 23,
                                }}
                            ></div>
                            {/* bubble of header text */}
                            <HeaderTextAlignmentFunc subTextAlignment={subTextAlignment}
                                icon="questionmark" />
                            <p style={{ display: "inline-block" }}
                                className={` text-xl font-light ${subTextAlignmentPosition(subTextAlignment)}`}>
                                HackRU is a 24-hour hackathon at Rutgers University. We welcome
                                hundreds of students to join us in building awesome tech projects.
                                Industry experts and mentors help foster an atmosphere of learning
                                through tech-talks and one-on-one guidance. We encourage all
                                students, no matter their experience level or educational
                                background, to challenge themselves and expand their creative,
                                technical, and collaboration skills at HackRU.
                            </p>
                        </div>
                        {/* When Section */}
                        <div
                            style={{ color: "white", padding: 50, paddingBottom: 10 }}
                            className="sm-about:w-full pr-4 pl-4 sm-about:w-full pr-4 pl-4"
                        >
                            {/* thickness of horizontal bar in When */}
                            <div className={`${showHorizontalLine(horizontalBarsVisible)}`}
                                style={{
                                    position: "absolute",
                                    height: 10,
                                    backgroundColor: theme.accent[0],
                                    width: "calc(100% - 228px)",
                                    right: 0,
                                    marginTop: 23,
                                }}
                            ></div>
                            {/* bubble of header text */}
                            <HeaderTextAlignmentFunc subTextAlignment={subTextAlignment}
                                icon="calendar" />
                            <p className={` text-xl font-light ${subTextAlignmentPosition(subTextAlignment)}`}>HackRU is from February 25th- 26th, 2023.</p>
                        </div>
                        {/* Where Section */}
                        <div
                            style={{ color: "white", padding: 50, paddingBottom: 10 }}
                            className="sm-about:w-full pr-4 pl-4 sm-about:w-full pr-4 pl-4"
                        >
                            {/* thickness of horizontal bar in Where */}
                            <div
                                className={`${showHorizontalLine(horizontalBarsVisible)}`}
                                style={{
                                    position: "absolute",
                                    height: 10,
                                    backgroundColor: theme.accent[0],
                                    width: "calc(100% - 228px)",
                                    right: 0,
                                    marginTop: 23,
                                }}
                            ></div>
                            {/* bubble of header text */}
                            <HeaderTextAlignmentFunc subTextAlignment={subTextAlignment}
                                icon="location" />
                            <p className={` text-xl font-light ${subTextAlignmentPosition(subTextAlignment)}`}>
                                HackRU is at The Rutgers College Ave Student Center for Spring 2023!
                            </p>
                        </div>
                    </div>

                </>
            </Card>
        );
    }

}

export default AboutContent;
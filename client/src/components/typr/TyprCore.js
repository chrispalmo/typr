import React from "react";

import { connect } from "react-redux";
import {
    fetchNews,
    fetchUser,
    prevParagraph,
    nextParagraph,
    addLocalEntryDailyKeylog
} from "../../actions";

import { TyprTextDisplay } from "./TyprTextDisplay";
import { TyprSessionStats } from "./TyprSessionStats";
import { textToArrayOfWords } from "./textConversions";
import TyprProgressBar from "./TyprProgressBar";
import charKeys from "./charKeys";

const debug = false;

//TODO: add warning when Caps Lock is engaged

//TODO: create list of subsitute keys for non-standard characters that appear in english language, i.e european accent characters, non-standard commas etc.
//i.e in "Einstein’s general relativity" -- key: "Quote" should work for "’"

class TyprCore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            textArray: textToArrayOfWords(this.props.text),
            key: 0,
            isCapital: 0,
            wordPos: 0,
            charPos: 0,
            mistakeBefore: false,
            charKeys: charKeys,
            shouldComponentUpdate: true,
            windowWidth: 500,
            windowHeight: 0
        };

        //Arrow functions cannot be passed to event listeners, otherwise a new function is created which cannot be referred to when the event listener needs to be removed. Using a normal function instead of an arrow function afects the context within the funciton (.this) is affected, so the context needs to be bound to the class instance:
        this.handleKeyPressWrapper = this.handleKeyPressWrapper.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    render() {
        debug ? console.log("TyprCore.render() called") : null;
        const wpm = this.instantaneousWPM();
        return (
            <div>
                <TyprTextDisplay
                    className="typrTextDisplay"
                    ref={this.textDisplay}
                    textArray={this.state.textArray}
                />
                <TyprProgressBar
                    ref={this.WPMMeter}
                    percent={wpm / 150}
                    width={this.state.windowWidth}
                    height={17}
                    rounded={true}
                />
                <TyprSessionStats
                    ref={this.statsDisplay}
                    keyPressLog={this.props.keylog}
                />
                <div className="wpmText">WPM: {wpm}</div>
            </div>
        );
    }

    componentWillMount() {
        this.updateWindowDimensions();
    }

    componentDidMount() {
        //Initialize cursor
        this.renderCurrentChar("charActive");
        document.addEventListener("keydown", this.handleKeyPressWrapper);
        window.addEventListener("resize", this.updateWindowDimensions);
        //TODO: REACTIVATE INTERVAL BEFORE DEPLOYMENT
        //Trigger regular renders to keep WPM bar moving
        this.interval = setInterval(() => this.forceUpdate(), 250);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPressWrapper);
        window.removeEventListener("resize", this.updateWindowDimensions);
        //TODO: REACTIVATE INTERVAL BEFORE DEPLOYMENT
        //Clear regular renders required to keep WPM bar moving
        clearInterval(this.interval);
    }

    updateWindowDimensions() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    }

    handleKeyPressWrapper(e) {
        debug ? console.log("KEYPRESS: e.key===" + e.key) : null;
        this.handleKeyPress(e);
        this.forceUpdate();
        this.setState(prevState => ({ shouldComponentUpdate: true }));
    }

    handleKeyPress(e) {
        if (e.key === "ArrowRight") {
            this.props.nextParagraph(this.props.news.length);
            return;
        }

        if (!this.state.charKeys.includes(e.key)) {
            //Check if the actions corresponds to a list of trackable keys
            return;
        }

        //Key actions handled above here will not be logged

        this.logKey(e, Date.now());

        if (e.key === "Backspace") {
            if (e.ctrlKey) {
                //Backspace entire word
                if (this.state.charPos === 0) {
                    this.moveLeft(e);
                }
                let i = 1;
                let n = this.state.charPos;
                while (i <= n) {
                    this.moveLeft(e);
                    i += 1;
                }
                return;
            } else {
                //Backspace single character
                this.moveLeft(e);
                return;
            }
        }

        let currentWordLength = this.state.textArray[this.state.wordPos].length;
        let wordCount = this.state.textArray.length;
        if (
            this.state.charPos + 1 === currentWordLength &&
            this.state.wordPos + 1 === wordCount
        ) {
            this.props.nextParagraph(this.props.news.length);
            return;
        }

        let currentChar = this.state.textArray[this.state.wordPos][
            this.state.charPos
        ].char;
        if (e.key === currentChar) {
            this.correct(e);
        } else {
            this.incorrect(e);
        }
    }

    correct(e) {
        this.renderCurrentChar("charCorrect");
        this.setState(prevState => ({
            mistakeBefore: false
        }));
        this.moveRight(e);
        this.renderCurrentChar("charActive");
    }

    incorrect(e) {
        //Won't allow cursor to progress directly after a mistake
        if (!this.state.mistakeBefore) {
            this.renderCurrentChar("charIncorrect");
            this.moveRight(e);
            this.renderCurrentChar("charActive");
        }
        this.setState(prevState => ({
            mistakeBefore: true
        }));
        //TODO: add red flash -> fade out simlar to being shot in a FPS game. Or maybe animate the incorrect character.
        return;
    }

    moveRight(e) {
        let currentWordLength = this.state.textArray[this.state.wordPos].length;
        if (this.state.charPos + 1 < currentWordLength) {
            let newCharPos = this.state.charPos + 1;
            this.setState(prevState => ({
                charPos: newCharPos
            }));
        } else {
            let newWordPos = this.state.wordPos + 1;
            this.setState(prevState => ({
                charPos: 0,
                wordPos: newWordPos
            }));
        }
        return;
    }

    moveLeft(e) {
        this.setState(prevState => ({
            mistakeBefore: false
        }));
        this.renderCurrentChar("char");
        if (this.state.charPos === 0 && this.state.wordPos > 0) {
            let newWordPos = this.state.wordPos - 1;
            let newWordLength = this.state.textArray[this.state.wordPos - 1]
                .length;
            this.setState(prevState => ({
                wordPos: newWordPos,
                charPos: newWordLength - 1
            }));
        } else if (this.state.charPos !== 0) {
            let newCharPos = this.state.charPos - 1;
            this.setState(prevState => ({
                charPos: newCharPos
            }));
        }
        this.renderCurrentChar("charActive");
        return;
    }

    renderCurrentChar(className) {
        let newText = [...this.state.textArray];
        newText[this.state.wordPos][this.state.charPos].className = className;
        this.setState(prevState => ({
            text: newText
        }));
    }

    getPrevWordChar(wordPos, charPos) {
        if (wordPos === 0 && charPos === 0) {
            return [undefined, undefined];
        } else if (wordPos > 0 && charPos === 0) {
            return [wordPos - 1, this.state.textArray[wordPos - 1].length - 1];
        } else {
            return [wordPos, charPos - 1];
        }
    }

    /**
     * logKey accepts timestamp to ensure timestamp is only ever computed once for any key press event
     */
    logKey(e, timestamp) {
        const key = e.key; // could reduce this to e.key if performance becomes an issue
        const char = this.state.textArray[this.state.wordPos][
            this.state.charPos
        ].char;
        const word = this.state.textArray[this.state.wordPos]
            .map(i => {
                return i.char;
            })
            .join("")
            .trim();
        const className = this.state.textArray[this.state.wordPos][
            this.state.charPos
        ].className;
        let wpmCounter = 0;

        if (key === "Backspace") {
            const [wordPrev, charPrev] = this.getPrevWordChar(
                this.state.wordPos,
                this.state.charPos
            );
            if (charPrev === undefined) {
                wpmCounter = 0;
            } else if (
                this.state.textArray[wordPrev][charPrev].className ===
                "charCorrect"
            ) {
                wpmCounter = -1;
            } else {
                wpmCounter = 0;
            }
        } else {
            if (key === char) {
                wpmCounter = 1;
            } else {
                wpmCounter = 0;
            }
        }

        var keyDataEntry = {
            timestamp: timestamp,
            event: {
                altKey: e.altKey,
                charCode: e.charCode,
                code: e.code,
                ctrlKey: e.ctrlKey,
                key: e.key,
                keyCode: e.keyCode,
                shiftKey: e.shiftKey,
                which: e.which
            },
            char: char,
            word: word,
            className: className,
            wpmCounter: wpmCounter
        };
        this.props.addLocalEntryDailyKeylog(keyDataEntry);
    }

    instantaneousWPM() {
        debug
            ? console.log("TyprSessionStats.instantaneousWPM() called")
            : null;
        if (!this.props.keylog) return 0;
        const length = this.props.keylog.length;
        if (length < 2) {
            return 0;
        }
        var sampleSize = 30;
        if (sampleSize > length) {
            sampleSize = length;
        }
        const totalCorrectChars = this.props.keylog
            .slice(-sampleSize)
            .reduce((total, dataLine) => {
                return total + dataLine.wpmCounter;
            }, 0);
        const time1 = this.props.keylog[length - sampleSize].timestamp;
        const wpm = Math.round(
            totalCorrectChars / 5 / ((Date.now() - time1) / 60000)
        );
        if (wpm < 0) {
            return 0;
        }
        return wpm;
    }

    shouldComponentUpdate() {
        return this.state.shouldComponentUpdate;
    }
}

const mapStateToProps = state => {
    return { news: state.news, auth: state.auth, keylog: state.keylog };
};

export default connect(
    mapStateToProps,
    {
        fetchNews,
        fetchUser,
        prevParagraph,
        nextParagraph,
        addLocalEntryDailyKeylog
    }
)(TyprCore);

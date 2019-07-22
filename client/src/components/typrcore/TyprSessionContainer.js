import React from "react";
import { TyprTextDisplay } from "./TyprTextDisplay";
import { TyprSessionStats } from "./TyprSessionStats";
import { textToArrayOfWords } from "./textConversions";
import TyprProgressBar from "./TyprProgressBar";
import charKeys from "./charKeys";

export class TyprSessionContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startedSession: false,
            startDateTime: -1,
            activeSession: false,
            keyPressLog: [],
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
    }

    render() {
        console.log("TyprSessionContainer.render() called");
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
                    width={this.state.windowWidth - 50}
                    height={17}
                    rounded={false}
                />
                <div className="wpmText">WPM: {wpm}</div>
            </div>
        );
        // <TyprSessionStats
        //  ref={this.statsDisplay}
        //  keyPressLog={this.state.keyPressLog}
        // />
    }

    componentWillMount() {
        this.updateWindowDimensions();
    }

    componentDidMount() {
        //Initialize cursor
        this.renderCurrentChar("charActive");
        document.addEventListener("keydown", e => {
            //Limit component updates to one per key event
            this.setState(prevState => ({ shouldComponentUpdate: false }));
            this.handleKeyPress(e);
            this.forceUpdate();
            this.setState(prevState => ({ shouldComponentUpdate: true }));
        });
        window.addEventListener(
            "resize",
            this.updateWindowDimensions.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "resize",
            this.updateWindowDimensions.bind(this)
        );
    }

    updateWindowDimensions() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    }

    handleKeyPress(e) {
        //Mo's stat tracking code
        const timestamp = Date.now();
        if (this.startedSession === false) {
            this.startDateTime = timestamp;
            this.startedSession = true;
            this.activeSession = true;
        }

        if (!this.state.charKeys.includes(e.key)) {
            return;
        }

        this.logKey(e, timestamp);

        if (e.key === "Backspace") {
            if (e.ctrlKey) {
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
            console.log("nextPara() to be implemented...");
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
            .join("");
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

        var logData = {
            timestamp: timestamp,
            event: e,
            char: char,
            word: word,
            className: className,
            wpmCounter: wpmCounter
        };
        this.setState(prevState => ({
            keyPressLog: [...prevState.keyPressLog, logData]
        }));
    }

    instantaneousWPM() {
        console.log("TyprSessionStats.instantaneousWPM() called");
        if (this.state.keyPressLog.length < 2) {
            return 0;
        }
        var sampleSize = 30;
        if (sampleSize > this.state.keyPressLog.length) {
            sampleSize = this.state.keyPressLog.length;
        }
        const totalCorrectChars = this.state.keyPressLog
            .slice(-sampleSize)
            .reduce((total, dataLine) => {
                return total + dataLine.wpmCounter;
            }, 0);
        const time1 = this.state.keyPressLog[
            this.state.keyPressLog.length - sampleSize
        ].timestamp;
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
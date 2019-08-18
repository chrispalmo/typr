import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
    prevParagraph,
    nextParagraph,
    addLocalEventKeylog,
    saveKeylog
} from "../../actions";

import { TyprTextDisplay } from "./TyprTextDisplay";
// import { TyprSessionStats } from "./TyprSessionStats";
import { textToArrayOfWords } from "./textConversions";
import charKeys from "./charKeys";

const debug = false;

//TODO: add warning when Caps Lock is engaged

//TODO: create list of subsitute keys for non-standard characters that appear in english language, i.e european accent characters, non-standard commas etc.
//i.e in "Einstein’s general relativity" -- key: "Quote" should work for "’"
//i.e "-" should register as correct for "—",
//i.e standard non-directional double-quote should work for "“" and "”"

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
    }

    render() {
        debug ? console.log("TyprCore.render() called") : null;

        return (
            <div>
                <TyprTextDisplay
                    className="typrTextDisplay"
                    ref={this.textDisplay}
                    textArray={this.state.textArray}
                />
            </div>
        );
    }
    // <TyprSessionStats
    //     ref={this.statsDisplay}
    //     keyPressLog={this.props.keylog}
    // />

    componentDidMount() {
        //Initialize cursor
        this.renderCurrentChar("charActive");
        document.addEventListener("keydown", this.handleKeyPressWrapper);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPressWrapper);
    }

    handleKeyPressWrapper(e) {
        debug ? console.log("KEYPRESS: e.key===" + e.key) : null;
        this.handleKeyPress(e);
        this.forceUpdate();
        this.setState(prevState => ({ shouldComponentUpdate: true }));
    }

    handleKeyPress(e) {
        if (!this.props.demoMode && e.key === "ArrowRight") {
            this.props.saveKeylog(this.props.keylog);
            this.props.nextParagraph(this.props.news.length);
            return;
        }

        if (!this.state.charKeys.includes(e.key)) {
            //Check if the actions corresponds to a list of trackable keys
            return;
        }
        // prevent space bar scrolling
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }

        //Key actions handled above here will not be logged

        const timestamp = moment()
            .utc()
            .valueOf();
        this.logKey(e, timestamp);

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
            if (!this.props.demoMode) {
                this.props.saveKeylog(this.props.keylog);
                this.props.nextParagraph(this.props.news.length);
            }
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
        this.props.addLocalEventKeylog(keyDataEntry);
        // console.log(keyDataEntry);
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
        prevParagraph,
        nextParagraph,
        addLocalEventKeylog,
        saveKeylog
    }
)(TyprCore);

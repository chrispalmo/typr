export function textToArrayOfWords(text) {
    //input string, outputs a list of "words",
    //each of which comprises a list of characters.
    //text="makeshift test text in textToArrayOfWords function"
    return text.split(" ").map(word => {
        return wordToArrayOfChars(word);
    });
}

export function wordToArrayOfChars(word) {
    //Converts a single word list of characters
    //Each character is accompanied by its rendering style
    //(default "char" for regular "untyped" black text)
    var characters = word.split("").map(char => {
        return { char: char, className: "char" };
    });
    //add a space character at end of the word:
    return [...characters, { char: " ", className: "char" }];
}

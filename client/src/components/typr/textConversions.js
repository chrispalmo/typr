export function textToArrayOfWords(text) {
    //input string, outputs a list of "words",
    //each of which comprises a list of characters.
    //text="makeshift test text in textToArrayOfWords function"
    var arrayOfWords = text.split(" ").map(word => {
        return wordToArrayOfChars(word);
    });
    console.log(arrayOfWords)
    //remove trailing space on last word
    console.log(arrayOfWords[arrayOfWords.length-1])
    arrayOfWords[arrayOfWords.length-1].pop(arrayOfWords[arrayOfWords.length-1].length-1)
    console.log(arrayOfWords)
    return arrayOfWords
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

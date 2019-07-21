import React, { Component } from "react";
import { TyprSessionContainer } from "./TyprSessionContainer";
import "./TyprCore.css";

//const defaultText = `Before microprocessors, small computers had been built using racks of circuit boards with many medium- and small-scale integrated circuits. Microprocessors combined this into one or a few large-scale ICs. Continued increases in microprocessor capacity have since rendered other forms of computers almost completely obsolete (see history of computing hardware), with one or more microprocessors used in everything from the smallest embedded systems and handheld devices to the largest mainframes and supercomputers.`;
const defaultText =
  "Welcome to typr! Register for free to practice typing your favourite books, breaking news articles and unique, algorithmically-generated exercises that target your identified weaknesses. Customize your content feed using the library-builder, track progress with detailed analytics, and 10x your learning efficiency while reading the things you want to be reading.";

class TyprCore extends Component {
  render() {
    return <TyprSessionContainer text={defaultText} />;
  }
}

export default TyprCore;

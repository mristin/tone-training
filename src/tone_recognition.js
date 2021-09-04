import 'regenerator-runtime/runtime'
import * as Tone from 'tone'

/**
 * Represent the state of the application.
 * @typedef {Object} State
 * @property {string} tone - The tone to be played
 * @property {string[]} allTones - all the available tones to be tested
 */

/**
 * Initialize the application state.
 * @return {State} initialized state
 */
function initializeState() {
    const allTones = [
        "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"
    ];

    return {
      allTones: allTones,
      tone: allTones[Math.floor(Math.random() * allTones.length)]
    }
}

/**
 * Randomly pick the next tone without repeating the current one.
 * @param {string} currentTone the currently playing tone
 * @param {string[]} allTones available tones to choose from
 * @return {string} randomly selected tone
 */
function nextTone(currentTone, allTones) {
    let tone = allTones[
        Math.floor(Math.random() * allTones.length)];

    while(tone === currentTone) {
        tone = allTones[
            Math.floor(Math.random() * allTones.length)];
    }

    return tone;
}


/**
 * Play the current tone.
 * @param {State} state
 * @param synth initialized synthesizer
 */
const play = async (state, synth) => {
    await Tone.start();
    synth.triggerAttackRelease(state.tone, "4n");
}

/**
 * Reveal the played tone.
 * @param state of the application
 */
function reveal(state) {
    document.getElementById("revelation").innerText = state.tone;
}

/**
 * Hide the revealed tone.
 */
function hide() {
    document.getElementById("revelation").innerHTML = (
        "<i>Press \"reveal\" for revelation</i>");
}

window.onload = function() {
    const state = initializeState();
    const synth = new Tone.Synth().toDestination();

    hide();

    document.getElementById("play").addEventListener("click",
        function() {
            play(state, synth);
        });

    document.getElementById("next").addEventListener("click",
        function() {
            hide();
            state.tone = nextTone(state.tone, state.allTones);
            play(state, synth);
        });

    document.getElementById("reveal").addEventListener("click",
        function() {
            reveal(state);
        });
};

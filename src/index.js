import * as Tone from 'tone'

/**
 * Represent the state of the application.
 * @typedef {Object} State
 * @property {string} tone - The tone to be played
 */

/**
 * Initialize the application state.
 * @return {State} initialized state
 */
function initializeState() {
    const allTones = [
        "C3", "D3", "E3", "F3", "G3", "A3", "H3", "C4"
    ];

    return {
      allTones: allTones,
      tone: pickNextTone(allTones)
    }
}

/**
 * Randomly pick the next tone.
 * @param {string[]} allTones
 * @return {string} one of the allTones
 */
function pickNextTone(allTones) {
    return allTones[Math.floor(Math.random() * allTones.length)];
}


/**
 * Play the current tone.
 * @param {State} state
 * @param synth initialized synthesizer
 */
function play(state, synth) {
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

window.onload = function(event) {
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
            state.tone = pickNextTone(state.allTones);
            play(state, synth);
        });

    document.getElementById("reveal").addEventListener("click",
        function() {
            reveal(state);
        });
};

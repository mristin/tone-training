import 'regenerator-runtime/runtime'
import * as Tone from 'tone'

/**
 * Represent an interval.
 * @typedef {Object} Interval
 * @property {string} first - tone of the interval
 * @property {string} second - tone of the interval
 */

/**
 * Check whether the two intervals are equal.
 * @param {Interval} that
 * @param {Interval} another
 */
function intervalsEqual(that, another) {
    return that.first === another.first && that.second === another.second;
}


/**
 * Represent the state of the application.
 * @typedef {Object} State
 * @property {Interval} interval - to be played
 * @property {string[]} allTones - all the available tones
 */

/**
 * Generate randomly an interval.
 * @param {string[]} allTones - all the available tones
 * @return {Interval} a random non-octave interval
 */
function generateInterval(allTones) {
    const first = allTones[Math.floor(Math.random() * allTones.length)];

    /**
     * @type {string|null}
     */
    let second = null;

    while (second === null || second === first) {
        second = allTones[Math.floor(Math.random() * allTones.length)];
    }

    return {first: first, second: second};
}

/**
 * Initialize the application state.
 * @return {State} initialized state
 */
function initializeState() {
    const allTones = [
        "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"
    ];

    return {
        interval: generateInterval(allTones),
        allTones: allTones
    }
}

/**
 * Randomly pick the next interval without repeating the current one.
 * @param {Interval} currentInterval the currently playing interval
 * @param {string[]} allTones available tones to choose from
 * @return {Interval} randomly selected interval
 */
function nextInterval(currentInterval, allTones) {
    let interval = generateInterval(allTones);

    while (intervalsEqual(interval, currentInterval)) {
        interval = generateInterval(allTones);
    }

    return interval;
}

async function play(interval, synth) {
    await Tone.start();
    const now = Tone.now();
    synth.triggerAttackRelease(interval.first, '4n', now);
    synth.triggerAttackRelease(interval.second, '4n', now + 1);
}

/**
 * Reveal the played interval.
 * @param {Interval} interval
 */
function reveal(interval) {
    document.getElementById("revelation").innerText = (
        interval.first + " " + interval.second);
}

/**
 * Hide the revealed interval.
 */
function hide() {
    document.getElementById("revelation").innerHTML = (
        "<i>Press \"reveal\" for revelation</i>");
}

window.onload = function () {
    const state = initializeState();
    const synth = new Tone.Synth().toDestination();

    hide();

    let lastSequence = null;

    document.getElementById("play").addEventListener("click",
        function () {
            play(state.interval, synth);
        });

    document.getElementById("next").addEventListener("click",
        function () {
            hide();
            state.interval = nextInterval(state.interval, state.allTones);
            play(state.interval, synth);
        });

    document.getElementById("reveal").addEventListener("click",
        function () {
            reveal(state.interval);
        });
};

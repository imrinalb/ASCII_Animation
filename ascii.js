"use strict"
window.onload = pageLoad;
const elements = new Object;

//MODULE : animation tracker i.e. responsible for all tracking and animating
var animationTracker = (function() {
    var currentSpeed = 250;
    var currentAnimationText = "";
    var intervalId = null;

    var animArray = [];
    var animIndex = 0; //Initiate animation text from first index

    function setAnimationText(text) {
        currentAnimationText = text;
        animArray = text.split('====\n');
    }

    function initIndex() {
        animIndex = 0;
    }

    function clearAnimationInterval() {
        if (intervalId)
            clearInterval(intervalId);
    }

    function startInterval() {
        intervalId = setInterval(function() {
            if (animIndex === animArray.length) {
                animIndex = 0;
            }
            setMainTextValue(animArray[animIndex++]);
        }, currentSpeed);
    }

    function setMainTextValue(value) {
        elements.maintxt.value = value;
    }

    function resetAnimation() {
        clearAnimationInterval();
        setMainTextValue(currentAnimationText);
    }

    function decreaseSpeed() {
        currentSpeed = 50;
    }

    function resetSpeed() {
        currentSpeed = 250;
    }

    return {
        currentAnimationText: function() {
            return currentAnimationText;
        },

        setCurrentAnimationText: function(text) {
            setAnimationText(text);
        },
        resetAnimationIndex: function() {
            initIndex();
        },
        clearAnimationInterval: function() {
            clearAnimationInterval();
        },
        startInterval: function() {
            startInterval();
        },
        resetAnimation: function() {
            resetAnimation();
        },
        decreaseSpeed: function() {
            decreaseSpeed();
        },
        resetSpeed: function() {
            resetSpeed();
        }


    }



})();


// Initialize DOM elements
function initializeElements() {
    elements.maintxt = document.getElementById("maintxt");
    elements.controlSize = document.getElementById("controlSize");
    elements.controlAnimation = document.getElementById("controlAnimation");
    elements.turboCheckBox = document.getElementById("turboChk");
    elements.btnStart = document.getElementById("btnStart");
    elements.btnStop = document.getElementById("btnStop");
}
//Bind all events
function bindEvents() {
    // elements.controlSize.addEventListener('change', sizeChanged);
    elements.controlSize.onchange = sizeChanged;
    elements.controlAnimation.addEventListener('change', animationChanged);
    // elements.controlAnimation.change = animationChanged.bind(elements.controlAnimation);
    elements.turboCheckBox.addEventListener('change', speedChanged);
    elements.btnStart.onclick = start;
    elements.btnStop.onclick = stop;
}

function pageLoad(e) {
    initializeElements();
    bindEvents();
}

//On button start click
function start() {
    animationTracker.setCurrentAnimationText(elements.maintxt.value)
        //Do nothing if there's no text
    if (!animationTracker.currentAnimationText())
        return;
    toggleinteractability(true);
    animationTracker.setCurrentAnimationText(elements.maintxt.value);
    animationTracker.resetAnimationIndex();
    animationStart();

}

//Stop animation and reset controls
function stop() {
    toggleinteractability(false);
    animationTracker.resetAnimation();

}

//Disable OR Enable corresponding elements
function toggleinteractability(isStarted) {
    elements.btnStart.disabled = isStarted ? true : false;
    elements.btnStop.disabled = isStarted ? false : true;
    elements.controlAnimation.disabled = isStarted ? true : false;
}

function animationStart() {
    animationTracker.clearAnimationInterval();
    animationTracker.startInterval();
}

//On text size change request
var sizeChanged = function(e) {
    let selectedValue = e.currentTarget.value;
    elements.maintxt.style.fontSize = selectedValue;

}

//Change animation type/text
var animationChanged = function(e) {
        let selectedValue = e.currentTarget.value;
        elements.maintxt.value = ANIMATIONS[selectedValue];
    }
    //Change global value of currentspeed upon changes
var speedChanged = function(e) {
    if (e.currentTarget.checked) {
        animationTracker.decreaseSpeed();
        animationStart();
    } else {
        animationTracker.resetSpeed();
        animationStart();

    }

}
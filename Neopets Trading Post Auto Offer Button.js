// ==UserScript==
// @name         Neopets Trading Post Auto Offer Button
// @namespace    neopets
// @version      1.2
// @description  Adds a button to auto-select first 10 items and make an offer on Neopets Trading Post
// @author       Pomelo
// @match        https://www.neopets.com/island/tradingpost.phtml
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the button
    const button = document.createElement('button');
    button.textContent = 'Auto Offer First 10 Items';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Append the button to the body
    document.body.appendChild(button);

    // Add click event to the button
    button.addEventListener('click', function() {
        // Select the first 10 checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (let i = 0; i < 10 && i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }

        // Click the "Make an offer!" button
        const offerButton = document.querySelector('input[type="submit"][value="Make an offer!"]');
        if (offerButton) {
            offerButton.click();
        }
    });

    // Bypass confirmation popup
    window.confirm = function() { return true; };
})();

// ==UserScript==
// @name         Neofriends On Sidebar
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Moves Neofriends avatars and makes them clickable, along with the usernames, to the left sidebar with styleable CSS classes.
// @author       Pomelo
// @match        *://www.neopets.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
        #avatars-sidebar {
            padding: 1px;
            background-color:#ffffff6c;
            margin-top: 5px;
        }

        #avatars-sidebar h3 {
	margin: 0px;
	padding-right: 1px;
	text-decoration: none;
	font-family: "Cafeteria", 'Arial Bold', sans-serif;;
	color: #000000;
	font-size: 20px;
	font-weight: normal;
	font-style: none;
	background-size: 5px 5px;
	border-bottom: 4px solid #26bee6;
	text-transform: uppercase;
    font-weight: bold;
	text-align: left;
	margin-bottom: 4px;
	margin-top: 5px;
	padding-bottom: 0px;

        }
        .cloned-neofriend-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2px;
        }
        .cloned-neofriend-avatar {
            width: 40px;
            height: 40px;
            background-size: cover;
            background-position: center;
            background-color: #ffffff00;
        }
        .cloned-neofriend-username {
            text-align: left;
            font-family: arial;
            margin-left: 10px;
            font-size: 12px;
            color: #000;
            flex-grow: 1;
            cursor: pointer;
        }
        .neomail-button {
            padding: 5px 10px;
            border-radius: 30px;
            background-color: #0073e6;
            color: white; 
            text-align: center; 
            font-size: 12px;
            font-family: arial;
            text-decoration: none; 
            transition: background-color 0.3s;
        }
        .neomail-button:hover {
            background-color: #005bb5; 
        }
        `;
        document.head.appendChild(style);
    }

    function moveNeofriendsAvatarsToSidebar() {
        const neofriendsList = document.querySelector('.neofriendsOnline'); // Selector for Neofriends online list
        const sidebar = document.querySelector('.nav-profile-dropdown__2020'); // Selector for the sidebar

        if (neofriendsList && sidebar) {
            const avatarsContainer = document.createElement('div');
            avatarsContainer.id = 'avatars-sidebar'; // ID for the container

            const avatarsHeader = document.createElement('h3');
            avatarsHeader.innerText = 'Neofriends Online';
            avatarsContainer.appendChild(avatarsHeader);

            const avatars = neofriendsList.querySelectorAll('.neofriend'); // Select each Neofriend element

            avatars.forEach(neofriend => {
                const itemWrapper = document.createElement('div');
                itemWrapper.className = 'cloned-neofriend-item'; // Class for flex item layout

                // Get the username
                const username = neofriend.querySelector('p') ? neofriend.querySelector('p').innerText : 'Unknown';
                const usernameUrl = neofriend.querySelector('a').href; // Get the href for the Neofriend's profile

                // Create a clickable link for the avatar
                const avatarWrapper = document.createElement('a');
                avatarWrapper.className = 'cloned-neofriend-avatar'; // Add class for styling
                avatarWrapper.href = usernameUrl; // Set link to user lookup page

                const avatar = neofriend.querySelector('.neofriendAv');
                const bgImage = avatar ? avatar.style.backgroundImage : null;

                if (bgImage) {
                    avatarWrapper.style.backgroundImage = bgImage;
                }

                // Create a clickable link for the username
                const usernameLabel = document.createElement('a');
                usernameLabel.innerText = username;
                usernameLabel.className = 'cloned-neofriend-username'; // Add class for styling
                usernameLabel.href = usernameUrl; // Set link to user lookup page

                // Create Neomail button
                const neomailButton = document.createElement('a');
                neomailButton.innerText = 'Neomail';
                neomailButton.className = 'neomail-button'; // Class for styling
                neomailButton.href = `/neomessages.phtml?type=send&recipient=${username}`; // Neomail link

                // Append avatar link, username link, and Neomail button to the item wrapper
                itemWrapper.appendChild(avatarWrapper);
                itemWrapper.appendChild(usernameLabel);
                itemWrapper.appendChild(neomailButton); // Append Neomail button to item wrapper

                avatarsContainer.appendChild(itemWrapper);
            });

            sidebar.appendChild(avatarsContainer);
            console.log('Neofriends avatars and names moved to sidebar successfully!');
        } else {
            console.error('Neofriends list or sidebar not found.');
        }
    }

    injectStyles();
    window.addEventListener('load', moveNeofriendsAvatarsToSidebar);
})();

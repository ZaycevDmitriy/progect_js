'use strict';

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import changeImage from "./modules/changeImage";
import validateCalculated from "./modules/validateCalculated";
import validateFeedbackForm from "./modules/validateFeedbackForm";
import sendForm from "./modules/sendForm";

// Таймер
countTimer('18:40 5 July 2021');

// Menu
toggleMenu();

// popup
togglePopUp();

// Tabs
tabs();

// slider
slider();

//change images on hover
changeImage();

// validation Calculated
validateCalculated();

// validation forms
validateFeedbackForm();

// send-ajax-form
sendForm();

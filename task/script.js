'use strict';
const daysWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', ];
const date = new Date();
const newYear = new Date('2022').getTime();
let hours = date.getHours();
let day = date.getDay();

if (hours > 8 && hours <= 12) console.log('Доброе утро');
if (hours > 12 && hours <= 18) console.log('Доброе день');
if (hours > 18 && hours <= 24) console.log('Добрый вечер');
if (hours > 0 && hours <= 8) console.log('Доброй ночи');
console.log(`Сегодня: ${daysWeek[day]}`);
console.log(`Текущее время: ${date.toLocaleTimeString("en")}`);
let daysToNewYear = Math.round((newYear - date.getTime()) / (1000 * 60 * 60 * 24));
console.log(`До нового года осталось ${daysToNewYear} дней`);
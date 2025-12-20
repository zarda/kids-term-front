import type { LanguagePackData } from '../../types/language.types'

const frenchPack: LanguagePackData = {
  id: 'en-fr',
  words: [
    // Greetings
    { id: 'fr-1', term: 'Bonjour', definition: 'Hello/Good day', pronunciation: 'bohn-ZHOOR', examples: ['Bonjour, comment allez-vous?'], category: 'greetings', difficulty: 'beginner' },
    { id: 'fr-2', term: 'Bonsoir', definition: 'Good evening', pronunciation: 'bohn-SWAHR', examples: ['Bonsoir, madame.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'fr-3', term: 'Au revoir', definition: 'Goodbye', pronunciation: 'oh ruh-VWAHR', examples: ['Au revoir, à demain!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'fr-4', term: 'Merci', definition: 'Thank you', pronunciation: 'mehr-SEE', examples: ['Merci beaucoup!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'fr-5', term: "S'il vous plaît", definition: 'Please', pronunciation: 'seel voo PLEH', examples: ["Un café, s'il vous plaît."], category: 'greetings', difficulty: 'beginner' },
    { id: 'fr-6', term: 'Excusez-moi', definition: 'Excuse me', pronunciation: 'ehk-skew-zay MWAH', examples: ['Excusez-moi, où est la gare?'], category: 'greetings', difficulty: 'beginner' },
    // Food
    { id: 'fr-7', term: 'Eau', definition: 'Water', pronunciation: 'oh', examples: ["Un verre d'eau, s'il vous plaît."], category: 'food', difficulty: 'beginner' },
    { id: 'fr-8', term: 'Pain', definition: 'Bread', pronunciation: 'pahn', examples: ['Le pain est frais.'], category: 'food', difficulty: 'beginner' },
    { id: 'fr-9', term: 'Pomme', definition: 'Apple', pronunciation: 'puhm', examples: ['La pomme est rouge.'], category: 'food', difficulty: 'beginner' },
    { id: 'fr-10', term: 'Café', definition: 'Coffee', pronunciation: 'kah-FAY', examples: ['Je voudrais un café.'], category: 'food', difficulty: 'beginner' },
    { id: 'fr-11', term: 'Fromage', definition: 'Cheese', pronunciation: 'froh-MAHZH', examples: ['Le fromage français est délicieux.'], category: 'food', difficulty: 'beginner' },
    { id: 'fr-12', term: 'Vin', definition: 'Wine', pronunciation: 'vahn', examples: ['Un verre de vin rouge.'], category: 'food', difficulty: 'beginner' },
    // Travel
    { id: 'fr-13', term: 'Aéroport', definition: 'Airport', pronunciation: 'ah-ay-roh-POHR', examples: ["L'aéroport est loin."], category: 'travel', difficulty: 'intermediate' },
    { id: 'fr-14', term: 'Hôtel', definition: 'Hotel', pronunciation: 'oh-TEHL', examples: ["L'hôtel a une piscine."], category: 'travel', difficulty: 'beginner' },
    { id: 'fr-15', term: 'Gare', definition: 'Train station', pronunciation: 'gahr', examples: ['Où est la gare?'], category: 'travel', difficulty: 'beginner' },
    { id: 'fr-16', term: 'Billet', definition: 'Ticket', pronunciation: 'bee-YEH', examples: ['Un billet pour Paris.'], category: 'travel', difficulty: 'intermediate' },
    // Numbers
    { id: 'fr-17', term: 'Un', definition: 'One', pronunciation: 'uhn', examples: ["J'en ai un."], category: 'numbers', difficulty: 'beginner' },
    { id: 'fr-18', term: 'Deux', definition: 'Two', pronunciation: 'duh', examples: ["J'ai deux frères."], category: 'numbers', difficulty: 'beginner' },
    { id: 'fr-19', term: 'Trois', definition: 'Three', pronunciation: 'twah', examples: ['Il est trois heures.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'fr-20', term: 'Dix', definition: 'Ten', pronunciation: 'dees', examples: ["J'ai dix ans."], category: 'numbers', difficulty: 'beginner' },
    // Colors
    { id: 'fr-21', term: 'Rouge', definition: 'Red', pronunciation: 'roozh', examples: ['La voiture est rouge.'], category: 'colors', difficulty: 'beginner' },
    { id: 'fr-22', term: 'Bleu', definition: 'Blue', pronunciation: 'bluh', examples: ['Le ciel est bleu.'], category: 'colors', difficulty: 'beginner' },
    { id: 'fr-23', term: 'Vert', definition: 'Green', pronunciation: 'vehr', examples: ["L'herbe est verte."], category: 'colors', difficulty: 'beginner' },
    { id: 'fr-24', term: 'Jaune', definition: 'Yellow', pronunciation: 'zhohn', examples: ['Le soleil est jaune.'], category: 'colors', difficulty: 'beginner' },
    // Daily
    { id: 'fr-25', term: 'Maison', definition: 'House', pronunciation: 'meh-ZOHN', examples: ['Ma maison est grande.'], category: 'daily', difficulty: 'beginner' },
    { id: 'fr-26', term: 'Travail', definition: 'Work', pronunciation: 'trah-VY', examples: ['Je vais au travail.'], category: 'daily', difficulty: 'beginner' },
    { id: 'fr-27', term: 'Famille', definition: 'Family', pronunciation: 'fah-MEE', examples: ['Ma famille est grande.'], category: 'daily', difficulty: 'beginner' },
    { id: 'fr-28', term: 'Ami', definition: 'Friend', pronunciation: 'ah-MEE', examples: ['Il est mon ami.'], category: 'daily', difficulty: 'beginner' },
    // Time
    { id: 'fr-29', term: "Aujourd'hui", definition: 'Today', pronunciation: 'oh-zhoor-DWEE', examples: ["Aujourd'hui c'est lundi."], category: 'time', difficulty: 'beginner' },
    { id: 'fr-30', term: 'Demain', definition: 'Tomorrow', pronunciation: 'duh-MAHN', examples: ['À demain!'], category: 'time', difficulty: 'beginner' },
  ],
}

export default frenchPack

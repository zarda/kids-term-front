import type { LanguagePackData } from '../../types/language.types'

const germanPack: LanguagePackData = {
  id: 'en-de',
  words: [
    // Greetings
    { id: 'de-1', term: 'Hallo', definition: 'Hello', pronunciation: 'HAH-loh', examples: ['Hallo, wie geht es dir?'], category: 'greetings', difficulty: 'beginner' },
    { id: 'de-2', term: 'Guten Morgen', definition: 'Good morning', pronunciation: 'GOO-ten MOR-gen', examples: ['Guten Morgen, Herr Schmidt.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'de-3', term: 'Gute Nacht', definition: 'Good night', pronunciation: 'GOO-te nakht', examples: ['Gute Nacht, schlaf gut!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'de-4', term: 'Auf Wiedersehen', definition: 'Goodbye', pronunciation: 'owf VEE-der-zay-en', examples: ['Auf Wiedersehen, bis morgen!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'de-5', term: 'Danke', definition: 'Thank you', pronunciation: 'DAHN-keh', examples: ['Danke schön!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'de-6', term: 'Bitte', definition: 'Please/You\'re welcome', pronunciation: 'BIT-teh', examples: ['Bitte schön.'], category: 'greetings', difficulty: 'beginner' },
    // Food
    { id: 'de-7', term: 'Wasser', definition: 'Water', pronunciation: 'VAH-ser', examples: ['Ein Glas Wasser, bitte.'], category: 'food', difficulty: 'beginner' },
    { id: 'de-8', term: 'Brot', definition: 'Bread', pronunciation: 'broht', examples: ['Das Brot ist frisch.'], category: 'food', difficulty: 'beginner' },
    { id: 'de-9', term: 'Apfel', definition: 'Apple', pronunciation: 'AHP-fel', examples: ['Der Apfel ist rot.'], category: 'food', difficulty: 'beginner' },
    { id: 'de-10', term: 'Kaffee', definition: 'Coffee', pronunciation: 'KAH-fay', examples: ['Ich möchte einen Kaffee.'], category: 'food', difficulty: 'beginner' },
    { id: 'de-11', term: 'Bier', definition: 'Beer', pronunciation: 'beer', examples: ['Ein Bier, bitte.'], category: 'food', difficulty: 'beginner' },
    { id: 'de-12', term: 'Wurst', definition: 'Sausage', pronunciation: 'voorst', examples: ['Die Wurst ist lecker.'], category: 'food', difficulty: 'beginner' },
    // Travel
    { id: 'de-13', term: 'Flughafen', definition: 'Airport', pronunciation: 'FLOOK-hah-fen', examples: ['Der Flughafen ist weit.'], category: 'travel', difficulty: 'intermediate' },
    { id: 'de-14', term: 'Hotel', definition: 'Hotel', pronunciation: 'hoh-TEL', examples: ['Das Hotel hat einen Pool.'], category: 'travel', difficulty: 'beginner' },
    { id: 'de-15', term: 'Bahnhof', definition: 'Train station', pronunciation: 'BAHN-hohf', examples: ['Wo ist der Bahnhof?'], category: 'travel', difficulty: 'beginner' },
    { id: 'de-16', term: 'Fahrkarte', definition: 'Ticket', pronunciation: 'FAHR-kar-teh', examples: ['Eine Fahrkarte nach Berlin.'], category: 'travel', difficulty: 'intermediate' },
    // Numbers
    { id: 'de-17', term: 'Eins', definition: 'One', pronunciation: 'ayns', examples: ['Ich habe eins.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'de-18', term: 'Zwei', definition: 'Two', pronunciation: 'tsvy', examples: ['Ich habe zwei Brüder.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'de-19', term: 'Drei', definition: 'Three', pronunciation: 'dry', examples: ['Es ist drei Uhr.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'de-20', term: 'Zehn', definition: 'Ten', pronunciation: 'tsayn', examples: ['Ich bin zehn Jahre alt.'], category: 'numbers', difficulty: 'beginner' },
    // Colors
    { id: 'de-21', term: 'Rot', definition: 'Red', pronunciation: 'roht', examples: ['Das Auto ist rot.'], category: 'colors', difficulty: 'beginner' },
    { id: 'de-22', term: 'Blau', definition: 'Blue', pronunciation: 'blow', examples: ['Der Himmel ist blau.'], category: 'colors', difficulty: 'beginner' },
    { id: 'de-23', term: 'Grün', definition: 'Green', pronunciation: 'grewn', examples: ['Das Gras ist grün.'], category: 'colors', difficulty: 'beginner' },
    { id: 'de-24', term: 'Gelb', definition: 'Yellow', pronunciation: 'gelp', examples: ['Die Sonne ist gelb.'], category: 'colors', difficulty: 'beginner' },
    // Daily
    { id: 'de-25', term: 'Haus', definition: 'House', pronunciation: 'hows', examples: ['Mein Haus ist groß.'], category: 'daily', difficulty: 'beginner' },
    { id: 'de-26', term: 'Arbeit', definition: 'Work', pronunciation: 'AR-byt', examples: ['Ich gehe zur Arbeit.'], category: 'daily', difficulty: 'beginner' },
    { id: 'de-27', term: 'Familie', definition: 'Family', pronunciation: 'fah-MEE-lee-eh', examples: ['Meine Familie ist groß.'], category: 'daily', difficulty: 'beginner' },
    { id: 'de-28', term: 'Freund', definition: 'Friend', pronunciation: 'froynt', examples: ['Er ist mein Freund.'], category: 'daily', difficulty: 'beginner' },
    // Time
    { id: 'de-29', term: 'Heute', definition: 'Today', pronunciation: 'HOY-teh', examples: ['Heute ist Montag.'], category: 'time', difficulty: 'beginner' },
    { id: 'de-30', term: 'Morgen', definition: 'Tomorrow', pronunciation: 'MOR-gen', examples: ['Bis morgen!'], category: 'time', difficulty: 'beginner' },
  ],
}

export default germanPack

import type { LanguagePackData } from '../../types/language.types'

const englishPack: LanguagePackData = {
  id: 'en-en',
  words: [
    // Greetings
    { id: 'en-1', term: 'Hello', definition: 'A common greeting', pronunciation: 'heh-LOH', examples: ['Hello, how are you?'], category: 'greetings', difficulty: 'beginner' },
    { id: 'en-2', term: 'Good morning', definition: 'Greeting used in the morning', pronunciation: 'good MOR-ning', examples: ['Good morning, everyone!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'en-3', term: 'Good night', definition: 'Said before sleeping or leaving at night', pronunciation: 'good NITE', examples: ['Good night, sleep well!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'en-4', term: 'Goodbye', definition: 'Said when leaving', pronunciation: 'good-BYE', examples: ['Goodbye, see you tomorrow!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'en-5', term: 'Thank you', definition: 'Expression of gratitude', pronunciation: 'THANK yoo', examples: ['Thank you for your help!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'en-6', term: 'Please', definition: 'Polite word when requesting', pronunciation: 'pleez', examples: ['Please help me.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'en-7', term: 'Excuse me', definition: 'Polite way to get attention or apologize', pronunciation: 'ek-SKYOOZ mee', examples: ['Excuse me, where is the station?'], category: 'greetings', difficulty: 'beginner' },
    { id: 'en-8', term: "You're welcome", definition: 'Response to thank you', pronunciation: 'yoor WEL-kum', examples: ["You're welcome, anytime!"], category: 'greetings', difficulty: 'beginner' },
    // Food
    { id: 'en-9', term: 'Water', definition: 'Clear liquid for drinking', pronunciation: 'WAH-ter', examples: ['Can I have some water?'], category: 'food', difficulty: 'beginner' },
    { id: 'en-10', term: 'Bread', definition: 'Baked food made from flour', pronunciation: 'bred', examples: ['The bread is fresh.'], category: 'food', difficulty: 'beginner' },
    { id: 'en-11', term: 'Apple', definition: 'Round red or green fruit', pronunciation: 'AP-ul', examples: ['I eat an apple every day.'], category: 'food', difficulty: 'beginner' },
    { id: 'en-12', term: 'Coffee', definition: 'Hot brown drink from beans', pronunciation: 'KAW-fee', examples: ['I need my morning coffee.'], category: 'food', difficulty: 'beginner' },
    { id: 'en-13', term: 'Breakfast', definition: 'First meal of the day', pronunciation: 'BREK-fust', examples: ['Breakfast is at 8 AM.'], category: 'food', difficulty: 'beginner' },
    { id: 'en-14', term: 'Lunch', definition: 'Midday meal', pronunciation: 'lunch', examples: ["Let's have lunch together."], category: 'food', difficulty: 'beginner' },
    { id: 'en-15', term: 'Dinner', definition: 'Evening meal', pronunciation: 'DIN-er', examples: ['Dinner is ready!'], category: 'food', difficulty: 'beginner' },
    // Travel
    { id: 'en-16', term: 'Airport', definition: 'Place where planes take off and land', pronunciation: 'AIR-port', examples: ['The airport is far from here.'], category: 'travel', difficulty: 'beginner' },
    { id: 'en-17', term: 'Hotel', definition: 'Place to stay when traveling', pronunciation: 'hoh-TEL', examples: ['The hotel has a pool.'], category: 'travel', difficulty: 'beginner' },
    { id: 'en-18', term: 'Ticket', definition: 'Paper or digital pass for travel', pronunciation: 'TIK-it', examples: ['I bought a train ticket.'], category: 'travel', difficulty: 'beginner' },
    { id: 'en-19', term: 'Passport', definition: 'Document for international travel', pronunciation: 'PASS-port', examples: ['I need my passport.'], category: 'travel', difficulty: 'intermediate' },
    { id: 'en-20', term: 'Luggage', definition: 'Bags and suitcases for travel', pronunciation: 'LUG-ij', examples: ['My luggage is heavy.'], category: 'travel', difficulty: 'intermediate' },
    // Numbers
    { id: 'en-21', term: 'One', definition: 'The number 1', pronunciation: 'wun', examples: ['I have one brother.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'en-22', term: 'Two', definition: 'The number 2', pronunciation: 'too', examples: ['I have two cats.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'en-23', term: 'Three', definition: 'The number 3', pronunciation: 'three', examples: ["It's three o'clock."], category: 'numbers', difficulty: 'beginner' },
    { id: 'en-24', term: 'Ten', definition: 'The number 10', pronunciation: 'ten', examples: ['I am ten years old.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'en-25', term: 'Hundred', definition: 'The number 100', pronunciation: 'HUN-dred', examples: ['It costs one hundred dollars.'], category: 'numbers', difficulty: 'beginner' },
    // Colors
    { id: 'en-26', term: 'Red', definition: 'Color of blood or fire', pronunciation: 'red', examples: ['The car is red.'], category: 'colors', difficulty: 'beginner' },
    { id: 'en-27', term: 'Blue', definition: 'Color of the sky', pronunciation: 'bloo', examples: ['The sky is blue.'], category: 'colors', difficulty: 'beginner' },
    { id: 'en-28', term: 'Green', definition: 'Color of grass', pronunciation: 'green', examples: ['The grass is green.'], category: 'colors', difficulty: 'beginner' },
    { id: 'en-29', term: 'Yellow', definition: 'Color of the sun', pronunciation: 'YEL-oh', examples: ['The sun is yellow.'], category: 'colors', difficulty: 'beginner' },
    // Daily
    { id: 'en-30', term: 'House', definition: 'Building where people live', pronunciation: 'hows', examples: ['My house is big.'], category: 'daily', difficulty: 'beginner' },
    { id: 'en-31', term: 'Family', definition: 'Parents, children, and relatives', pronunciation: 'FAM-uh-lee', examples: ['I love my family.'], category: 'daily', difficulty: 'beginner' },
    { id: 'en-32', term: 'Friend', definition: 'Person you like and trust', pronunciation: 'frend', examples: ['She is my best friend.'], category: 'daily', difficulty: 'beginner' },
    { id: 'en-33', term: 'School', definition: 'Place for learning', pronunciation: 'skool', examples: ['I go to school every day.'], category: 'daily', difficulty: 'beginner' },
    { id: 'en-34', term: 'Work', definition: 'Job or employment', pronunciation: 'werk', examples: ['I go to work at 9 AM.'], category: 'daily', difficulty: 'beginner' },
    // Time
    { id: 'en-35', term: 'Today', definition: 'This current day', pronunciation: 'tuh-DAY', examples: ['Today is Monday.'], category: 'time', difficulty: 'beginner' },
    { id: 'en-36', term: 'Tomorrow', definition: 'The day after today', pronunciation: 'tuh-MOR-oh', examples: ['See you tomorrow!'], category: 'time', difficulty: 'beginner' },
    { id: 'en-37', term: 'Yesterday', definition: 'The day before today', pronunciation: 'YES-ter-day', examples: ['Yesterday was Sunday.'], category: 'time', difficulty: 'beginner' },
    { id: 'en-38', term: 'Week', definition: 'Seven days', pronunciation: 'week', examples: ['I work five days a week.'], category: 'time', difficulty: 'beginner' },
    { id: 'en-39', term: 'Month', definition: 'About 30 days', pronunciation: 'munth', examples: ['January is the first month.'], category: 'time', difficulty: 'beginner' },
    { id: 'en-40', term: 'Year', definition: '12 months or 365 days', pronunciation: 'yeer', examples: ['Happy New Year!'], category: 'time', difficulty: 'beginner' },
  ],
}

export default englishPack

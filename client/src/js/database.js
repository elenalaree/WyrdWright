import { openDB } from 'idb';

const initdb = async () =>
  openDB('wyrd_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('wyrd')) {
        console.log('wyrd database already exists');
        return;
      }
      db.createObjectStore('wyrd', { keyPath: 'id', autoIncrement: true });
      console.log('wyrd database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  const wyrdDb = await openDB('wyrd_db', 1);

  const tx = wyrdDb.transaction('wyrd', 'readwrite');

  const store = tx.objectStore('wyrd');

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

	//connection to IndexedDB database and version.
	const wyrdDb = await openDB("wyrd_db", 1);

	//create new transaction and which store/data privilages
	const tx = wyrdDb.transaction("wyrd", "readonly");

	//Open up desired object store.
	const store = tx.objectStore("wyrd");

	//Use the .getAll() method to get all data in database
	const request = store.getAll();

	//GET confirmation of the request
	const result = await request;
	console.log("result.value", result);
	return result;
};

initdb();

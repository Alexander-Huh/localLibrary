function findAuthorById(authors, id) {
  // uses find function to look for matching ID in authors array usind ID parameter
  const result = authors.find(ID => ID.id === id);
  return result;
}

function findBookById(books, id) {
  // uses find function to look for matching ID in books array usind ID parameter 
  const result = books.find(ID => ID.id === id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let borrowed = [];
  let returned = [];
  let result = [];

  for (const index in books) {
    let returnStatus = books[index].borrows[0].returned;
    if (returnStatus === false) {
      borrowed.push(books[index]);
    } else {
      returned.push(books[index]);
    }
  }
  result.push(borrowed);
  result.push(returned);
  return result;
}

function getBorrowersForBook(book, accounts) {
  // default value
  let result = [];
  // limit on length of result array
  const resultLimit = 10;

  // get the borrows array from book object
  const borrowIDs = book.borrows;

  // test to see what account IDs match the borrowsID ids
  for (const index in borrowIDs) {
    for (const accountIndex in accounts) {
      const account = accounts[accountIndex];
      if (accounts[accountIndex].id === borrowIDs[index].id) {

        // sets variables for objects in respective arrays/objects to recreate account object
        const id = account.id;
        const returned = borrowIDs[index].returned;
        const picture = account.picture;
        const age = account.age;
        const firstName = account.name.first;
        const lastName = account.name.last;
        const company = account.company;
        const email = account.email;
        const registered = account.registered;

        // push new account object to results array
        result.push({
          id: id,
          returned: returned,
          picture: picture,
          age: age,
          name: {
            first: firstName,
            last: lastName,
          },
          company: company,
          email: email,
          registered: registered,
        });
      }
    }
  }

  // limit results length to the resultLimit(10)
  return result.slice(0,resultLimit);
  }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

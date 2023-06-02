function getTotalBooksCount(books) {
  // default value
  let result = 0;
  result = books.length;
  return result;
}

function getTotalAccountsCount(accounts) {
  // default value
  let result = 0;
  result = accounts.length;
  return result;
}

function getBooksBorrowedCount(books) {
  // default value is 0 if there no books being borrowed
  let result = 0;
  // iterate through books array to get first index of borrows array to get return status of a book
  //   and test to see if equal to false, increment result
  books.forEach((element) => {
    if (element.borrows[0].returned === false) {
      result++;
    }
  });
  // return a number equal the number of books borred
  return result;
}

// ///////////////////////   
// HELPER FUNCTION  for getMostCommonGenres
/////////////////////////

// formats a given object in the shape of:
// {genre:integer, genre:integer}
//  to return an object in the shape of:
// {name: genre, count: integer}
const format = (occurrences) => {
  let result = [];

  // gets keys only
  const keys = Object.keys(occurrences);
  // gets values only
  const value = Object.values(occurrences);

  // keys and values will always be of same length, for/in loop can be perfomred on either array 
  for (const index in keys) {
    result.push({ name: keys[index], count: value[index] });
  }

  // limits results to nth entires
  const sliced = result.slice(0, 5);
  // sorts result in decending order
  sliced.sort((a, b) => b.count - a.count);

  result = sliced;
  return result;
};

function getMostCommonGenres(books) {
  // returns an object that conatins the names of all genres and the number of times they occur
  const occurrences = books.reduce((acc, currGenre) => {
    return { ...acc, [currGenre.genre]: (acc[currGenre.genre] || 0) + 1 };
  }, {});

  const result = format(occurrences);
  return result;
}


function getMostPopularBooks(books) {
  // return result is an array that holds objects of this shape:
  // {name: "Book Title",count: 11 }
  // name is title of book and count is number of times a book was borrowed

  // default value
  let result = [];

  // contains array of book names
  let titles = [];

  // number of unique titles to collect from books array
  let booksLimit = 5;

  // sortes books most indexes in borrows array
  const sortedBooks = books.sort((a, b) => b.borrows.length - a.borrows.length);

  // adds first nth number of unique book names to titles array
  sortedBooks.forEach((element) => {
    if (!titles.includes(element.title) && titles.length < booksLimit) {
      titles.push(element.title);
    }
  });

  // count how namy times a book titles appears in books array
  // for each title saved in titles array, get borrows array length from book with matching title
  for (const index in titles) {
    let count = 0;
    for (const bookIndex in sortedBooks) {
      if (titles[index] === sortedBooks[bookIndex].title) {
        count = sortedBooks[bookIndex].borrows.length;
      }
    }
    // add the name of book and number of borrows, as an object, to result array
    result.push({ name: titles[index], count: count });
  }

  // sorts results array by value of count in decending order
  result.sort((a, b) => b.count - a.count);

  return result;
}

function getMostPopularAuthors(books, authors) {
  // default value
  let result = [];
  let authorIDs = [];
  let IDsandBorrows = [];

  // gets authorID's of all books and stores in array called authorBookCount
  books.forEach((element) => {
    const authorId = element.authorId;
    if (!authorIDs.includes(authorId)) {
      authorIDs.push(authorId);
    }
  });

  // count how many times books have been borrowed
  books.forEach((element) => {
    const authorId = element.authorId;
    IDsandBorrows.push({ ID: authorId, count: element.borrows.length });
  });

  // combine all like author ID's and sum values

  let IDandCountSum = [];
  for (const index in authorIDs) {
    let totCount = 0;
    const ID = authorIDs[index];
    for (const index in IDsandBorrows) {
      if (IDsandBorrows[index].ID === ID) {
        totCount += IDsandBorrows[index].count;
      }
    }
    IDandCountSum.push({ ID: ID, count: totCount });
  }

  // returns an object that contains full name of author and and number of times book has been borrowed
  for (let i = 0; i < authors.length; i++) {
    for (const index in IDandCountSum) {
      if (IDandCountSum[index].ID === authors[i].id) {
        const firstName = authors[i].name.first;
        const lastName = authors[i].name.last;
        const count = IDandCountSum[index].count;

        result.push({ name: `${firstName} ${lastName}`, count: count });
      }
    }
  }
  // order/sort books by borrowed amount
  result.sort((a, b) => b.count - a.count);

  // set limit of result
  const limit = 5;

  return result.slice(0, limit);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};



function findAccountById(accounts, id) {
  // set default value of result
  let result = null;
  // for/in loop to iterate through each object in array
  for (const index in accounts) {
    // call id from accounts objects
    const idNumber = accounts[index].id;
    // if statement to test equality of given id with id from accounts array
    if (idNumber === id) {
      result = accounts[index];
    }
  }
  return result;
}

function sortAccountsByLastName(accounts) {
    // sort array by lastname
   return accounts.sort((a,b) => (a.name.last > b.name.last) ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  // default value
  let result = 0;

  // destructring of id from account object
  const {id} = account;

  // get all borrows arrays from book array
  let allBorrows = [];
  for(const index in books){
    allBorrows.push(...books[index].borrows)
  }


  // compare if any id in all borrows array matches account id, count total
  for(const index in allBorrows){
    if(allBorrows[index].id === id){
      result += 1;
    }
  }
  return result;
}

// ///////////////////////  HELPER FUNCTION  /////////////////
//helper function used to return an authors object with a matching ID number
const findAuthor = (id, authors) => {
  const result = authors.filter((author) =>{
    return author.id.toString() === id.toString();
  });
  return result[0];
};

// /////////////////////////  HELPER FUNCTION  ////////////////
  // find book objects that contain a matching ID parameter in the first index of the borrows array to a given account number
  const getBorrowedBooks = (id, books) => {
    let result = [];
    for (const index in books) {
      if (books[index].borrows[0].id === id.toString()) {
        result.push(books[index]);
      }
    }
    return result;
  };


function getBooksPossessedByAccount(account, books, authors) {
    // return value
    let result;

    // destructing id parameter from account object
    const {id} = account;

const borrowedBooks = getBorrowedBooks(id, books);
// nest each authors info inside of book object in borrowedBooks
result= borrowedBooks.map(element => {
  let result = {};
  const authorId = element.authorId;
  const author = findAuthor(authorId,authors);
  const firstName = author.name.first;
  const lastName = author.name.last;

  result.id = element.id;
  result.title=element.title,
    result.genre=element.genre,
    result.authorId=element.authorId,
    result.author= {
      id:author.id,
      name: {
      first:firstName,
      last:lastName,            
      },
    },
    result.borrows=[
      element.borrows
    ]
  return result
})

return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

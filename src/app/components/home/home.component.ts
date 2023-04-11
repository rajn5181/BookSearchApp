//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  isLoading = false;
  allBooks: Book[] = [];
  totalSearchResults = 0;
  currentPage = 1;
  showerror = '';
  error = '';
  booklist: Book[] = [];
  showTrendingSubjects = true;
  showClearButton = false;

  constructor(private getbook: SubjectsService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.showTrendingSubjects = true;
    this.bookSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        this.searchBooks(value);
      });
  }
  async searchBooks(searchTerm: string) {
    const url = `http://openlibrary.org/search.json?q=${searchTerm}&offset=${
      (this.currentPage - 1) * 10
    }`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result && result.docs && result.docs.length > 0) {
        this.allBooks = result.docs.map((doc: any) => ({
          title: doc.title,
          author: doc.author_name?.[0] || 'Unknown Author',
          coverUrl: `http://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
          key: doc.key,
        }));
        this, (this.showTrendingSubjects = false);
        this.showClearButton = true;
        this.booklist = this.allBooks;
        console.warn(this.booklist);
        this.totalSearchResults = result.numFound;
      } else {
        this.allBooks = [];
        this.booklist = [];
        this.totalSearchResults = 0;
        this.showerror = 'No search results found';
      }
    } catch (error) {
      // eslint-disable-next-line no-ex-assign
      error = 'Error fetching search results:';
    }
  }
  nextPage(): void {
    if (this.currentPage * 10 < this.totalSearchResults) {
      this.currentPage++;
      const start = (this.currentPage - 1) * 10;
      this.booklist = this.allBooks.slice(start, start + 10);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      const start = (this.currentPage - 1) * 10;
      this.booklist = this.allBooks.slice(start, start + 10);
    }
  }

  clearSearch(): void {
    this.bookSearch.setValue('');
    this.booklist = [];
    this.totalSearchResults = 0;
    this.currentPage = 1;
    this.showTrendingSubjects = true;
    this.showerror = '';
    this.showClearButton = false;
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { debounceTime } from 'rxjs/operators';
// import { Book } from 'src/app/core/models/book-response.model';
// import { SubjectsService } from 'src/app/core/services/subjects.service';

// @Component({
//   selector: 'front-end-internship-assignment-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements OnInit {
//   bookSearch: FormControl;
//   isLoading = false;
//   allBooks: Book[] = [];
//   totalSearchResults = 0;
//   currentPage = 1;
//   error = 'Not Found';
//   booklist: Book[] = [];

//   constructor(private getbook: SubjectsService) {
//     this.bookSearch = new FormControl('');
//   }

//   trendingSubjects: Array<any> = [
//     { name: 'JavaScript' },
//     { name: 'CSS' },
//     { name: 'HTML' },
//     { name: 'Harry Potter' },
//     { name: 'Crypto' },
//   ];

//   ngOnInit(): void {
//     this.bookSearch.valueChanges
//       .pipe(debounceTime(300))
//       .subscribe((value: string) => {
//         this.searchBooks(value);
//       });
//   }

//     searchBooks(value: string) {
//       this.getbook.getAllBooks(value).subscribe((data) => {
//         this.allBooks = data?.works;
//         console.warn(this.allBooks);
//         // this.subjectsArray = data;
//         this.isLoading = false;
//       });
//     }
//   }
//   searchBooks(searchTerm: string): void {
//     this.isLoading = true;
//     this.getbook
//       .getAllBooks(searchTerm, (this.currentPage - 1) * 10)
//       .subscribe((result) => {
//         const filteredBooks = result?.works.filter((book) => {
//           // Check if the book title or any author name matches the search term
//           return (
//             book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             book.authors.some((author) =>
//               author.name.toLowerCase().includes(searchTerm.toLowerCase())
//             )
//           );
//         });
//         this.allBooks = filteredBooks;
//         console.warn(this.allBooks);
//         this.totalSearchResults = filteredBooks.length;
//         this.isLoading = false;
//       });
//   }
//   async searchBooks(searchTerm: string) {
//     const url = `http://openlibrary.org/search.json?q=${searchTerm}`;
//     const response = await fetch(url);
//     const result = await response.json();
//     if (result) {
//       const booklist = result.docs.map((doc: any) => ({
//         title: doc.title,
//         author: doc.author_name?.[0] || 'Unknown Author',
//         coverUrl: `http://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
//         key: doc.key,
//       }));
//     } else {
//       console.warn(this.error);
//     }
//   }

//   searchBooks(searchTerm: string): void {
//     this.isLoading = true;
//     this.getbook
//       .getAllBooks(searchTerm, (this.currentPage - 1) * 10)
//       .subscribe((result) => {
//         this.allBooks = result?.works;
//         console.warn(this.allBooks);
//         this.totalSearchResults = result.works.length;
//         this.isLoading = false;
//       });
//   }

//   nextPage(): void {
//     if (this.currentPage * 10 < this.totalSearchResults) {
//       this.currentPage++;
//       const start = (this.currentPage - 1) * 10;
//       this.booklist = this.allBooks.slice(start, start + 10);
//     }
//   }

//   prevPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       const start = (this.currentPage - 1) * 10;
//       this.booklist = this.allBooks.slice(start, start + 10);
//     }
//   }

//   clearSearch(): void {
//     this.bookSearch.setValue('');
//     this.booklist = [];
//     this.totalSearchResults = 0;
//     this.currentPage = 1;
//   }
// }
// function nextPage() {
//   throw new Error('Function not implemented.');
// }
// function authors(value: Book, index: number, array: Book[]): value is Book {
//   throw new Error('Function not implemented.');
// }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// async searchBooks(searchTerm: string) {
//   const url = `http://openlibrary.org/search.json?q=${searchTerm}&limit=10&offset=${
//     (this.currentPage - 1) * 10
//   }`;
//   const response = await fetch(url);
//   const result = await response.json();
//     this.allBooks = result.docs.map((doc: any) => ({
//       title: doc.title,
//       author: doc.author_name?.[0] || 'Unknown Author',
//       coverUrl: `http://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
//       key: doc.key,
//     }));
//     this.booklist = this.allBooks;
//     console.warn(this.booklist);
//     this.totalSearchResults = result.numFound;
// }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

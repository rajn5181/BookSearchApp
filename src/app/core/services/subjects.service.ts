/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private apiService: ApiService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllBooks(
    subjectName: string,
    _startIndex: number = 1
  ): Observable<BookResponse> {
    const limit = 10;
    return this.apiService.get(
      `/subjects/${subjectName
        .toLowerCase()
        .split(' ')
        .join('_')}.json?limit=${limit}`
    );
  }
}
// ---------------------------------------------------------------------------------------------------------
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ApiService } from '../services/api.service';
// import { BookResponse } from 'src/app/core/models/book-response.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class SubjectsService {
//   constructor(private apiService: ApiService) {}

//   getAllBooks(
//     subjectName: string,
//     startIndex: number,
//     limit: number
//   ): Observable<BookResponse[]> {
//     const sanitizedSubjectName = subjectName.toLowerCase().split(' ').join('_');
//     const url = `/subjects/${sanitizedSubjectName}.json?start=${startIndex}&limit=${limit}`;

//     return this.apiService.get<BookResponse[]>(url);
//   }
// }

export interface LibraryBook {
  id: string
  title: string
  author: string
  callNumber?: string
  isbn?: string
  category?: string
}

export interface IssuedBook {
  id: string
  book: LibraryBook
  issueDate: Date | string
  dueDate: Date | string
  status: 'ISSUED' | 'OVERDUE' | 'RENEWED'
}

export interface Reservation {
  id: string
  book: LibraryBook
  reservationDate: Date | string
  status: 'PENDING' | 'AVAILABLE' | 'EXPIRED'
  queuePosition: number
}

export interface LibraryDue {
  id: string
  amount: number
  description: string
  date: Date | string
}

export interface EResource {
  id: string
  title: string
  url: string
  type: string
  category: string
}

export interface LibraryStatus {
  issuedBooks: IssuedBook[]
  reservations: Reservation[]
  dues: LibraryDue[]
  eResources: EResource[]
}

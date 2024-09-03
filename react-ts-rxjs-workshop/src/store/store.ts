import { BehaviorSubject, Observable } from "rxjs";

export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  image: string;
  duration: number;
}

export class RxJsStore {
  private static instance: RxJsStore;
  private sub$: BehaviorSubject<ReadonlyArray<Session>>;
  private arr: ReadonlyArray<Session>;
  
  private constructor() {
    this.arr = [];
    this.sub$ = new BehaviorSubject<ReadonlyArray<Session>>(this.arr);
  }

  static getInstance(): RxJsStore {
    if (!RxJsStore.instance) {
      RxJsStore.instance = new RxJsStore();
    }

    return RxJsStore.instance;
  }

  add(session: Session): void {
    this.arr = [...this.arr, session];
    this.sub$.next(this.arr);
  }

  delete(id: string): void {
    this.arr = [...this.arr.filter(x => x.id !== id)];
    this.sub$.next(this.arr);
  }

  get(): Observable<ReadonlyArray<Session>> {
    return this.sub$.asObservable();
  }
}
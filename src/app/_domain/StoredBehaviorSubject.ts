import { BehaviorSubject } from 'rxjs';

/**
 * BehaviorSubject is a special observable provided by rxjs that allows external classes to get the current value
 * by calling .getValue(), that way they don't have to wait for the next change by subscribing.
 * This class extends that observable by providing methods for persisting the subject via localstorage.
 *
 * @author Floris de Bijl
 */
export class StoredBehaviorSubject<T> extends BehaviorSubject<T> {
  private key: string;

  constructor(key: string, _value?: T) {
    if (!_value) {
      _value = JSON.parse(localStorage.getItem(key)) as T;
    }

    super(_value);
    this.key = key;

    this.subscribe({
      next: (value) => {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });
  }

  isSet(): boolean {
    return !!localStorage.getItem(this.key);
  }

  clear(): void {
    this.next(null);
    localStorage.removeItem(this.key);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private router: Router) {}

  /**
   * Salva il token di autenticazione nel localStorage
   * @param token - Il token Bearer da salvare
   */
  login(token: string): void {
    if (token?.trim()) {
      localStorage.setItem(this.TOKEN_KEY, token.trim());
      console.log('AuthService: token salvato con successo');
      this.router.navigate(['/users']);
    } else {
      console.log('AuthService: nessun token fornito');
    }
  }

  /**
   * Rimuove il token di autenticazione e reindirizza al login
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    console.log('AuthService: logout effettuato');
    this.router.navigate(['/auth']);
  }

  /**
   * Rimuove il token e reindirizza al login con un messaggio di errore
   * @param errorMessage - Il messaggio di errore da mostrare nella pagina di login
   */
  logoutWithError(errorMessage: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    console.log('AuthService: logout con errore -', errorMessage);
    this.router.navigate(['/auth'], { queryParams: { error: errorMessage } });
  }

  /**
   * Verifica se l'utente è autenticato
   * @returns true se il token esiste, false altrimenti
   */
  isAuthenticated(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Recupera il token corrente
   * @returns Il token se presente, null altrimenti
   */
  getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(this.TOKEN_KEY) : null;
  }
}

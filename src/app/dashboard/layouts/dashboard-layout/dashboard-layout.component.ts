import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent { 
  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );


  onLogout(){
    this.authService.logout()

  }
}


import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ViewType = 'dashboard' | 'students';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SidebarComponent {
  currentView = input.required<ViewType>();
  @Output() navigate = new EventEmitter<ViewType>();

  navItems = [
    { id: 'dashboard', icon: 'M9 17v-2a4 4 0 00-4-4H3V9a4 4 0 004-4h2a4 4 0 004 4v2m-6 4h6m-6-4H9', label: 'Dashboard' },
    { id: 'students', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', label: 'Students' },
    { id: 'faculty', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Faculty' },
    { id: 'academics', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5-1.253', label: 'Academics' },
    { id: 'finance', icon: 'M9 8h6m-5 4h4m5 4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2z', label: 'Finance' },
    { id: 'library', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z', label: 'Library' },
  ];

  isNavItem(id: string): id is ViewType {
    return id === 'dashboard' || id === 'students';
  }

  changeView(view: string) {
    if (this.isNavItem(view)) {
      this.navigate.emit(view);
    }
    // For non-implemented views, we can just console log or show an alert.
    if (!this.isNavItem(view)) {
      alert(view + ' module is not implemented yet.');
    }
  }
}

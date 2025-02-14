import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  totalUsers: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  filterText: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const skip = (this.currentPage - 1) * this.pageSize;
    this.userService.getUsers(this.pageSize, skip).subscribe(data => {
      this.users = data.users;
      this.totalUsers = data.total;
      this.filterUsers();
    });
  }

  filterUsers(): void {
    if (this.filterText) {
      const text = this.filterText.toLowerCase();
      this.filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(text) ||
        user.lastName.toLowerCase().includes(text) ||
        user.email.toLowerCase().includes(text)
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  sortUsers(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
      const valueA = this.getPropertyValue(a, column);
      const valueB = this.getPropertyValue(b, column);

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getPropertyValue(obj: any, path: string): any {
    const parts = path.split('.');
    let value = obj;
    for (const part of parts) {
      value = value[part];
    }
    return value;
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadUsers();
  }

  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.totalUsers / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss'
})
export class CreateRoleComponent {
  roleForm!: FormGroup;
  permissionSections: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Define the form structure
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
      permission: this.fb.group({
        dashboard: this.createPermissionGroup([
          'view',
          'totalUser',
          'totalPendingEvent',
          'totalActiveEvent',
          'totalEventJoins'
        ]),
        user: this.createPermissionGroup(['view', 'create', 'edit', 'delete']),
        event: this.createPermissionGroup([
          'view',
          'create',
          'edit',
          'delete',
          'approved',
          'join'
        ]),
        role: this.createPermissionGroup(['view', 'create', 'edit', 'delete'])
      })
    });

    // Generate sections for UI
    this.permissionSections = [
      {
        label: 'Dashboard Permissions',
        permissions: this.generatePermissionArray('dashboard', [
          { key: 'view', label: 'View' },
          { key: 'totalUser', label: 'Total Users' },
          { key: 'totalPendingEvent', label: 'Total Pending Events' },
          { key: 'totalActiveEvent', label: 'Total Active Events' },
          { key: 'totalEventJoins', label: 'Total Event Joins' }
        ])
      },
      {
        label: 'User Permissions',
        permissions: this.generatePermissionArray('user', [
          { key: 'view', label: 'View' },
          { key: 'create', label: 'Create' },
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete' }
        ])
      },
      {
        label: 'Event Permissions',
        permissions: this.generatePermissionArray('event', [
          { key: 'view', label: 'View' },
          { key: 'create', label: 'Create' },
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete' },
          { key: 'approved', label: 'Approved' },
          { key: 'join', label: 'Join' }
        ])
      },
      {
        label: 'Role Permissions',
        permissions: this.generatePermissionArray('role', [
          { key: 'view', label: 'View' },
          { key: 'create', label: 'Create' },
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete' }
        ])
      }
    ];
  }

  // Create a FormGroup for permissions
  createPermissionGroup(keys: string[]): FormGroup {
    const group: any = {};
    keys.forEach((key) => {
      group[key] = new FormControl(false);
    });
    return this.fb.group(group);
  }

  // Generate array for UI rendering
  generatePermissionArray(section: string, permissions: any[]) {
    return permissions.map((perm) => ({
      ...perm,
      key: `${section}.${perm.key}`
    }));
  }

  // Submit form
  onSubmit(): void {
    if (this.roleForm.valid) {
      console.log('Form Submitted:', this.roleForm.value);
    } else {
      console.error('Form is invalid!');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Department, DepartmentService } from 'src/app/modules-admin/layout/services/master/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-department.component.html',
})
export class ListDepartmentComponent implements OnInit {
  loading = false;
  error = '';

  departments: Department[] = [];

  // ✅ pagination
  page = 0;
  size = 5;
  total = 0;
  totalPages = 0;
  pageSizes = [5, 10, 15, 20, 25];

  // modal
  modalOpen = false;
  mode: 'create' | 'edit' = 'create';
  editingId: number | null = null;

  form = this.fb.group({
    nameTh: ['', [Validators.required]],
    nameEn: ['', [Validators.required]],
    description: [''],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.error = '';

    this.departmentService.list(this.page, this.size).subscribe({
      next: (res) => {
        this.departments = res?.items ?? [];
        this.total = res?.total ?? 0;
        this.page = res?.page ?? this.page;
        this.size = res?.size ?? this.size;
        this.totalPages = res?.totalPages ?? 0;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Load departments failed';
      },
    });
  }

  // ✅ pagination actions
  prevPage(): void {
    if (this.page <= 0) return;
    this.page--;
    this.loadDepartments();
  }

  nextPage(): void {
    if (this.page >= this.totalPages - 1) return;
    this.page++;
    this.loadDepartments();
  }

  changePageSize(raw: any): void {
    const s = Number(raw);
    if (!s || s === this.size) return;
    this.size = s;
    this.page = 0;
    this.loadDepartments();
  }

  openCreate(): void {
    this.mode = 'create';
    this.editingId = null;
    this.form.reset({ nameTh: '', nameEn: '', description: '' });
    this.modalOpen = true;
  }

  openEdit(item: Department): void {
    this.mode = 'edit';
    this.editingId = (item as any).id ?? null;

    this.form.reset({
      nameTh: item.nameTh ?? '',
      nameEn: item.nameEn ?? '',
      description: item.description ?? '',
    });

    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload: Department = {
      nameTh: this.form.value.nameTh!,
      nameEn: this.form.value.nameEn!,
      description: this.form.value.description ?? '',
    };

    this.loading = true;
    this.error = '';

    if (this.mode === 'create') {
      this.departmentService.create(payload).subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
          this.loadDepartments();
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.message ?? 'Create failed';
        },
      });
      return;
    }

    if (!this.editingId) {
      this.loading = false;
      this.error = 'Missing department id';
      return;
    }

    this.departmentService.update(this.editingId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.closeModal();
        this.loadDepartments();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Update failed';
      },
    });
  }

  remove(item: Department): void {
    const id = (item as any).id;
    if (id == null) {
      this.error = 'Missing department id';
      return;
    }

    const ok = confirm(`ยืนยันลบแผนก: ${item.nameTh || item.nameEn || id} ?`);
    if (!ok) return;

    this.loading = true;
    this.error = '';

    this.departmentService.delete(id).subscribe({
      next: () => {
        this.loading = false;

        // ถ้าลบตัวสุดท้ายของหน้าปัจจุบัน ให้ถอยกลับหน้าเดิม
        if (this.page > 0 && this.departments.length === 1) this.page--;

        this.loadDepartments();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Delete failed';
      },
    });
  }

  trackById = (_: number, item: Department) => (item as any).id ?? item.nameEn ?? _;

  addPosition(d: any) {
    console.log(d);
    this.router.navigate(['/en/list-position-by-dept/', d.id]);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Position, PositionService } from 'src/app/modules-admin/layout/services/master/position.service';
import { Department, DepartmentService } from 'src/app/modules-admin/layout/services/master/department.service';

@Component({
  selector: 'app-list-position',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-position.component.html',
  styleUrls: ['./list-position.component.css'],
})
export class ListPositionComponent implements OnInit {
  loading = false;
  error = '';

  positions: Position[] = [];

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
    departmentId: [null as unknown as number, [Validators.required]],
    description: [''],
  });

  // ✅ Department picker (searchable)
  departments: Department[] = [];
  deptOpen = false;
  deptSearch = '';

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.loadDepartments();   // ✅ โหลดชื่อแผนกมาไว้ค้นหา
    this.loadPositions();
  }

  loadDepartments(): void {
    this.departmentService.list(0, 1000).subscribe({
      next: (res) => {
        const items = res?.items ?? [];

        // ✅ เรียงตาม id จากน้อย → มาก (1,2,3,4)
        this.departments = items.sort(
          (a: any, b: any) => (a.id ?? 0) - (b.id ?? 0)
        );
      },
      error: () => (this.departments = []),
    });
  }

  get filteredDepartments(): Department[] {
    const q = (this.deptSearch || '').trim().toLowerCase();
    if (!q) return this.departments;

    return this.departments.filter(d => {
      const th = (d.nameTh || '').toLowerCase();
      const en = (d.nameEn || '').toLowerCase();
      return th.includes(q) || en.includes(q);
    });
  }

  getDepartmentLabelById(id?: number | null): string {
    if (!id) return '';
    const d = this.departments.find(x => (x as any).id === id);
    if (!d) return `#${id}`;
    return `${d.nameTh ?? ''}${d.nameEn ? ` (${d.nameEn})` : ''}`.trim();
  }

  toggleDept(open?: boolean): void {
    this.deptOpen = open ?? !this.deptOpen;
    if (this.deptOpen) this.deptSearch = '';
  }

  selectDepartment(d: Department): void {
    const id = (d as any).id;
    this.form.controls.departmentId.setValue(id);
    this.form.controls.departmentId.markAsDirty();
    this.deptOpen = false;
  }

  getDepartmentName(id?: number | null): string {
    if (!id) return '-';
    const d = this.departments.find(x => (x as any).id === id);
    if (!d) return `#${id}`;
    // แสดง ไทย (อังกฤษ)
    return `${d.nameTh ?? ''}${d.nameEn ? ` (${d.nameEn})` : ''}`.trim();
  }

  // ----------------- (ของเดิมคุณ) -----------------
  loadPositions(): void {
    this.loading = true;
    this.error = '';

    this.positionService.list(this.page, this.size).subscribe({
      next: (res) => {
        this.positions = res?.items ?? [];
        this.total = res?.total ?? 0;
        this.page = res?.page ?? this.page;
        this.size = res?.size ?? this.size;
        this.totalPages = res?.totalPages ?? Math.ceil(this.total / this.size);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Load positions failed';
      },
    });
  }

  prevPage(): void { if (this.page <= 0) return; this.page--; this.loadPositions(); }
  nextPage(): void { if (this.page >= this.totalPages - 1) return; this.page++; this.loadPositions(); }

  changePageSize(raw: any): void {
    const s = Number(raw);
    if (!s || s === this.size) return;
    this.size = s;
    this.page = 0;
    this.loadPositions();
  }

  openCreate(): void {
    this.mode = 'create';
    this.editingId = null;
    this.form.reset({ nameTh: '', nameEn: '', departmentId: null as any, description: '' });
    this.modalOpen = true;
    this.deptOpen = false;
    this.deptSearch = '';
  }

  openEdit(item: Position): void {
    this.mode = 'edit';
    this.editingId = item.id ?? null;

    this.form.reset({
      nameTh: item.nameTh ?? '',
      nameEn: item.nameEn ?? '',
      departmentId: item.departmentId ?? (null as any),
      description: item.description ?? '',
    });

    this.modalOpen = true;
    this.deptOpen = false;
    this.deptSearch = '';
  }

  closeModal(): void { this.modalOpen = false; this.deptOpen = false; }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload: Position = {
      nameTh: this.form.value.nameTh!,
      nameEn: this.form.value.nameEn!,
      departmentId: Number(this.form.value.departmentId),
      description: this.form.value.description ?? '',
    };

    this.loading = true;
    this.error = '';

    if (this.mode === 'create') {
      this.positionService.create(payload).subscribe({
        next: () => { this.loading = false; this.closeModal(); this.loadPositions(); },
        error: (err) => { this.loading = false; this.error = err?.message ?? 'Create failed'; },
      });
      return;
    }

    if (!this.editingId) { this.loading = false; this.error = 'Missing position id'; return; }

    this.positionService.update(this.editingId, payload).subscribe({
      next: () => { this.loading = false; this.closeModal(); this.loadPositions(); },
      error: (err) => { this.loading = false; this.error = err?.message ?? 'Update failed'; },
    });
  }

  remove(item: Position): void {
    const id = item.id;
    if (id == null) { this.error = 'Missing position id'; return; }
    const ok = confirm(`ยืนยันลบตำแหน่ง: ${item.nameTh || item.nameEn || id} ?`);
    if (!ok) return;

    this.loading = true;
    this.error = '';

    this.positionService.delete(id).subscribe({
      next: () => { this.loading = false; if (this.page > 0 && this.positions.length === 1) this.page--; this.loadPositions(); },
      error: (err) => { this.loading = false; this.error = err?.message ?? 'Delete failed'; },
    });
  }

  trackById = (_: number, item: Position) => item.id ?? item.nameEn ?? _;
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Position, PositionService } from 'src/app/modules-admin/layout/services/master/position.service';
import { Department, DepartmentService } from 'src/app/modules-admin/layout/services/master/department.service';

@Component({
  selector: 'app-list-position-by-dept',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list-position-by-dept.component.html',
  styleUrl: './list-position-by-dept.component.css'
})
export class ListPositionByDeptComponent implements OnInit {

  departmentId!: number;
  department: Department = { nameTh: '', nameEn: '' } as any;

  loading = false;
  error = '';

  positions: Position[] = [];

  // pagination
  page = 0;
  size = 10;
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private positionService: PositionService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.departmentId = Number(this.route.snapshot.paramMap.get('deptId'));
    this.loadDepartment();
    this.loadPositions();
  }

  loadDepartment(): void {
    if (!this.departmentId) return;

    // ถ้า dept service มี getById ใช้เลย
    if ((this.departmentService as any).getById) {
      (this.departmentService as any).getById(this.departmentId).subscribe({
        next: (d: Department) => this.department = d ?? this.department,
        error: () => { /* ไม่ critical */ },
      });
      return;
    }

    // fallback: list แล้วหาเอา
    this.departmentService.list(0, 1000).subscribe({
      next: (res) => {
        const d = (res?.items ?? []).find((x: any) => x.id === this.departmentId);
        if (d) this.department = d;
      },
      error: () => { /* ไม่ critical */ },
    });
  }

  loadPositions(): void {
    if (!this.departmentId) {
      this.error = 'ไม่พบ departmentId';
      return;
    }

    this.loading = true;
    this.error = '';

    this.positionService.listByDepartment(this.departmentId, this.page, this.size).subscribe({
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

  // pagination
  prevPage(): void { if (this.page <= 0) return; this.page--; this.loadPositions(); }
  nextPage(): void { if (this.page >= this.totalPages - 1) return; this.page++; this.loadPositions(); }

  changePageSize(raw: any): void {
    const s = Number(raw);
    if (!s || s === this.size) return;
    this.size = s;
    this.page = 0;
    this.loadPositions();
  }

  // modal actions
  openCreate(): void {
    this.mode = 'create';
    this.editingId = null;
    this.form.reset({ nameTh: '', nameEn: '', description: '' });
    this.modalOpen = true;
  }

  openEdit(item: Position): void {
    this.mode = 'edit';
    this.editingId = item.id ?? null;

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

    const payload: Position = {
      nameTh: this.form.value.nameTh!,
      nameEn: this.form.value.nameEn!,
      description: this.form.value.description ?? '',
      departmentId: this.departmentId, // ✅ fix ตามหน้า dept
    };

    this.loading = true;
    this.error = '';

    if (this.mode === 'create') {
      this.positionService.create(payload).subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
          this.loadPositions();
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
      this.error = 'Missing position id';
      return;
    }

    this.positionService.update(this.editingId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.closeModal();
        this.loadPositions();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Update failed';
      },
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
      next: () => {
        this.loading = false;
        if (this.page > 0 && this.positions.length === 1) this.page--;
        this.loadPositions();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Delete failed';
      },
    });
  }

  trackById = (_: number, item: Position) => item.id ?? item.nameEn ?? _;
}

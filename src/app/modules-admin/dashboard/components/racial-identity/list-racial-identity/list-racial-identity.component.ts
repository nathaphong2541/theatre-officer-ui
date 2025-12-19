import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseMaster } from 'src/app/modules-admin/layout/services/master/model/base';
import { RacialIdentityService } from 'src/app/modules-admin/layout/services/master/racial-identity.service';

@Component({
  selector: 'app-list-racial-identity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-racial-identity.component.html',
  styleUrl: './list-racial-identity.component.css'
})
export class ListRacialIdentityComponent implements OnInit {
  loading = false;
  error = '';

  items: BaseMaster[] = [];

  page = 0;
  size = 5;
  total = 0;
  totalPages = 0;
  pageSizes = [5, 10, 15, 20, 25];

  modalOpen = false;
  mode: 'create' | 'edit' = 'create';
  editingId: number | null = null;

  form = this.fb.group({
    nameTh: ['', Validators.required],
    nameEn: ['', Validators.required],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private service: RacialIdentityService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';

    this.service.list(this.page, this.size).subscribe({
      next: (res: any) => {
        this.items = res?.items ?? [];
        this.total = res?.total ?? 0;
        this.page = res?.page ?? this.page;
        this.size = res?.size ?? this.size;
        this.totalPages = res?.totalPages ?? Math.ceil(this.total / this.size);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message ?? 'Load racial identities failed';
      }
    });
  }

  prevPage() { if (this.page > 0) { this.page--; this.load(); } }
  nextPage() { if (this.page < this.totalPages - 1) { this.page++; this.load(); } }

  changePageSize(raw: any) {
    const s = Number(raw);
    if (!s || s === this.size) return;
    this.size = s;
    this.page = 0;
    this.load();
  }

  openCreate() {
    this.mode = 'create';
    this.editingId = null;
    this.form.reset();
    this.modalOpen = true;
  }

  openEdit(x: BaseMaster) {
    this.mode = 'edit';
    this.editingId = this.getId(x);
    this.form.reset({
      nameTh: this.getNameTh(x),
      nameEn: this.getNameEn(x),
      description: this.getDesc(x),
    });
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload: BaseMaster = {
      nameTh: this.form.value.nameTh!,
      nameEn: this.form.value.nameEn!,
      description: this.form.value.description ?? '',
    } as any;

    this.loading = true;

    if (this.mode === 'create') {
      this.service.create(payload).subscribe({
        next: () => { this.loading = false; this.closeModal(); this.load(); },
        error: e => { this.loading = false; this.error = e?.message ?? 'Create failed'; }
      });
      return;
    }

    if (!this.editingId) return;

    this.service.update(this.editingId, payload).subscribe({
      next: () => { this.loading = false; this.closeModal(); this.load(); },
      error: e => { this.loading = false; this.error = e?.message ?? 'Update failed'; }
    });
  }

  remove(x: BaseMaster) {
    const id = this.getId(x);
    if (!id) return;

    if (!confirm(`ยืนยันลบ: ${this.getNameTh(x) || this.getNameEn(x)}`)) return;

    this.loading = true;
    this.service.delete(id).subscribe({
      next: () => { this.loading = false; this.load(); },
      error: e => { this.loading = false; this.error = e?.message ?? 'Delete failed'; }
    });
  }

  // helpers
  getId(x: BaseMaster): number { return (x as any).id ?? 0; }
  getNameTh(x: BaseMaster): string { return (x as any).nameTh ?? ''; }
  getNameEn(x: BaseMaster): string { return (x as any).nameEn ?? ''; }
  getDesc(x: BaseMaster): string { return (x as any).description ?? ''; }

  trackById = (_: number, x: BaseMaster) => this.getId(x);
}
